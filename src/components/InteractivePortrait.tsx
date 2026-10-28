import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Contrast, Palette } from "lucide-react";
import original from "../assets/MyImage.png";
import atlas from "../assets/portrait/directional-atlas.webp";
import { portraitDirection, type PortraitDirection } from "../domain/portrait";

const positions: Record<PortraitDirection, [number, number]> = {
  "up-left": [0, 0], up: [1, 0], "up-right": [2, 0], left: [0, 1], center: [1, 1], right: [2, 1], "down-left": [0, 2], down: [1, 2], "down-right": [2, 2],
};

export function InteractivePortrait() {
  const frame = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState(false);
  const [direction, setDirection] = useState<PortraitDirection>("center");
  const [tracking, setTracking] = useState(false);
  const [atlasReady, setAtlasReady] = useState(false);
  const [atlasFailed, setAtlasFailed] = useState(false);
  useEffect(() => {
    // Browser pointer/preferences own this interaction; remove listeners and pending frame on cleanup.
    const media = matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let animation = 0;
    const reset = () => { cancelAnimationFrame(animation); setDirection("center"); };
    const preference = () => { setTracking(media.matches); reset(); };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(animation);
      animation = requestAnimationFrame(() => {
        const rect = frame.current?.getBoundingClientRect();
        setDirection(rect && !document.hidden && !document.querySelector("dialog[open]") ? portraitDirection(event.clientX, event.clientY, rect) : "center");
      });
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
  const [column, row] = positions[direction];
  const showAtlas = tracking && atlasReady && !atlasFailed;
  return <div ref={frame} className={`hero-portrait${color ? " is-color" : ""}`} data-direction={showAtlas ? direction : "center"}>
    <div className="portrait-viewport" style={{ "--pose-column": column, "--pose-row": row } as CSSProperties}>
      <img className={`portrait-original${showAtlas ? " is-hidden" : ""}`} src={original} alt="Henry Alicoben portrait" width="400" height="400" />
      {tracking && !atlasFailed && <img className={`portrait-atlas${showAtlas ? " is-ready" : ""}`} src={atlas} alt="" aria-hidden="true" onLoad={() => setAtlasReady(true)} onError={() => setAtlasFailed(true)} width="1254" height="1254" />}
    </div>
    <button className="icon-button portrait-toggle" type="button" onClick={() => setColor((value) => !value)} aria-pressed={color} aria-label={color ? "Show portrait in black and white" : "Show portrait in color"}>{color ? <Contrast aria-hidden="true" /> : <Palette aria-hidden="true" />}</button>
  </div>;
}
