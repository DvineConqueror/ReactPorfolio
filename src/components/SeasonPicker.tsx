import { useCallback, useEffect, useId, useRef, useState } from "react";
import { seasonNames, type Season } from "../domain/season";
import type { SeasonControls } from "../hooks/useSeason";
import { SeasonGlyph } from "./SeasonalArt";

export function SeasonPicker({ season, motion, reducedMotion, setSeason, setMotion }: SeasonControls) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const keyboard = useRef(false);
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const native = typeof HTMLElement.prototype.showPopover === "function";
  const close = (restore = false) => {
    if (native && panel.current?.matches(":popover-open")) panel.current.hidePopover();
    setOpen(false);
    if (restore) trigger.current?.focus();
  };
  const position = useCallback(() => {
    const element = panel.current, button = trigger.current;
    if (!element || !button) return;
    const rect = button.getBoundingClientRect();
    const height = element.getBoundingClientRect().height;
    element.style.left = `${Math.max(8, Math.min(rect.left, innerWidth - element.offsetWidth - 8))}px`;
    element.style.top = `${Math.max(8, Math.min(rect.top >= height + 12 ? rect.top - height - 8 : rect.bottom + 8, innerHeight - height - 8))}px`;
    element.style.transformOrigin = rect.top >= height + 12 ? "bottom left" : "top left";
  }, []);
  useEffect(() => {
    // React 18 predates popover props; synchronize the native element and toggle event directly, then detach.
    const element = panel.current;
    if (!native || !element) return;
    element.popover = "auto";
    const toggle = () => setOpen(element.matches(":popover-open"));
    element.addEventListener("toggle", toggle);
    return () => element.removeEventListener("toggle", toggle);
  }, [native]);
  useEffect(() => {
    // Popover dismissal/viewport movement are browser-owned; inline fallback uses the same listeners, cleaned on close.
    if (!open) return;
    const outside = (event: PointerEvent | FocusEvent) => {
      if (event.target instanceof Node && !panel.current?.contains(event.target) && !trigger.current?.contains(event.target)) {
        if (!native) { setOpen(false); }
      }
    };
    position();
    panel.current?.querySelector<HTMLInputElement>("input:checked")?.focus();
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    return () => { window.removeEventListener("resize", position); window.removeEventListener("scroll", position, true); document.removeEventListener("pointerdown", outside); document.removeEventListener("focusin", outside); };
  }, [open, native, position]);
  return <div className="season-control">
    <button ref={trigger} className="icon-button season-toggle" type="button" aria-label={`Season: ${seasonNames[season]}. Choose seasonal mode`} title={`Season: ${seasonNames[season]}`} aria-expanded={open} aria-controls={id} onClick={(event) => {
      keyboard.current = event.detail === 0; setInstant(keyboard.current);
      if (open) { close(); return; }
      if (native) { panel.current?.showPopover(); position(); }
      setOpen(true);
    }}><SeasonGlyph season={season} /></button>
    <div ref={panel} id={id} className="season-picker" data-fallback-open={!native && open} data-instant={instant} onKeyDownCapture={(event) => {
      keyboard.current = true; setInstant(true);
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(true); }
    }} onPointerDownCapture={() => { keyboard.current = false; setInstant(false); }}>
      <fieldset><legend>Seasonal mode</legend>{(["off", "halloween", "christmas"] as const).map((value: Season) => <label className="season-option" key={value} data-selected={value === season}><SeasonGlyph season={value} /><span>{seasonNames[value]}</span><input type="radio" name={`season-${id}`} value={value} checked={value === season} onClick={() => { if (value === season) close(true); }} onChange={() => { setSeason(value, keyboard.current); close(true); }} /></label>)}</fieldset>
      <label className="season-motion"><span>Animate decorations</span><input type="checkbox" role="switch" checked={motion} disabled={reducedMotion} onChange={(event) => setMotion(event.target.checked)} /></label>
      {reducedMotion && <p className="season-device-note">Your device reduces motion. Decorations stay still.</p>}
    </div>
  </div>;
}
