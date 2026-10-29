import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Contrast, Palette } from "lucide-react";
import original from "../assets/MyImage.png";
import atlas from "../assets/portrait/smooth-atlas.webp";
import { advancePortraitPose, PORTRAIT_CENTER, portraitTarget, type PortraitPose } from "../domain/portrait";
import type { Season } from "../domain/season";
import { PortraitSeasonDecoration } from "./SeasonalArt";

export function InteractivePortrait({ season = "off" }: { season?: Season }) {
  const frame = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(false);
  const [pose, setPose] = useState<PortraitPose>({ column: 3, row: 3 });
  const [tracking, setTracking] = useState(false);
  const [atlasReady, setAtlasReady] = useState(false);
  const [atlasFailed, setAtlasFailed] = useState(false);
  useEffect(() => {
    // Pointer and motion preferences are external; dispose listeners and the settling frame loop on cleanup.
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let animation = 0;
    let lastTime = 0;
    let current = { column: PORTRAIT_CENTER, row: PORTRAIT_CENTER };
    let target = { ...current };
    const animate = (time: number) => {
      animation = 0;
      current = advancePortraitPose(current, target, lastTime ? time - lastTime : 16);
      lastTime = time;
      setPose((previous) => {
        // Small overlap between adjacent frames prevents jitter at an angle boundary.
        const column = Math.abs(current.column - previous.column) < .6 ? previous.column : Math.round(current.column);
        const row = Math.abs(current.row - previous.row) < .6 ? previous.row : Math.round(current.row);
        return previous.column === column && previous.row === row ? previous : { column, row };
      });
      if (current.column !== target.column || current.row !== target.row) animation = requestAnimationFrame(animate);
      else lastTime = 0;
    };
    const aim = (next: PortraitPose) => {
      target = next;
      if (!animation) animation = requestAnimationFrame(animate);
    };
    const reset = () => aim({ column: PORTRAIT_CENTER, row: PORTRAIT_CENTER });
    const preference = () => {
      cancelAnimationFrame(animation); animation = 0; lastTime = 0;
      current = { column: PORTRAIT_CENTER, row: PORTRAIT_CENTER }; target = { ...current };
      setPose({ column: 3, row: 3 }); setTracking(media.matches);
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch") return;
      const rect = frame.current?.getBoundingClientRect();
      if (rect && !document.hidden && !document.querySelector("dialog[open]")) aim(portraitTarget(event.clientX, event.clientY, rect));
      else reset();
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) reset(); };
    preference();
    media.addEventListener("change", preference);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    document.addEventListener("visibilitychange", reset);
    return () => { cancelAnimationFrame(animation); media.removeEventListener("change", preference); window.removeEventListener("pointermove", move); window.removeEventListener("pointerout", leave); window.removeEventListener("blur", reset); window.removeEventListener("scroll", reset); document.removeEventListener("visibilitychange", reset); };
  }, []);
  const showAtlas = tracking && atlasReady && !atlasFailed;
  const horizontal = pose.column < 2 ? "left" : pose.column > 3 ? "right" : "";
  const vertical = pose.row < 2 ? "up" : pose.row > 3 ? "down" : "";
  const direction = [vertical, horizontal].filter(Boolean).join("-") || "center";
  return <div ref={frame} className={`hero-portrait${color ? " is-color" : ""}`} data-direction={showAtlas ? direction : "center"} data-column={pose.column} data-row={pose.row}>
    <div className="portrait-viewport">
      <img className={`portrait-original${showAtlas ? " is-hidden" : ""}`} src={original} alt="Henry Alicoben portrait" width="400" height="400" />
      {tracking && !atlasFailed && <img className={`portrait-atlas${showAtlas ? " is-active" : ""}`} style={{ "--pose-column": pose.column, "--pose-row": pose.row } as CSSProperties} src={atlas} alt="" aria-hidden="true" onLoad={() => setAtlasReady(true)} onError={() => setAtlasFailed(true)} width="1254" height="1254" />}
    </div>
    <PortraitSeasonDecoration season={season} />
    <button className="icon-button portrait-toggle" type="button" onClick={() => setColor((value) => !value)} aria-pressed={color} aria-label={color ? "Show portrait in black and white" : "Show portrait in color"}>{color ? <Contrast aria-hidden="true" /> : <Palette aria-hidden="true" />}</button>
  </div>;
}
