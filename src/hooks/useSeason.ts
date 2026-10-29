import { useEffect, useState } from "react";
import { parseSeason, parseSeasonMotion, type Season } from "../domain/season";

function read(key: string) { try { return localStorage.getItem(key); } catch { return null; } }
function save(key: string, value: string) { try { localStorage.setItem(key, value); } catch { /* Controls remain usable without persistence. */ } }

export function useSeason(settleTheme: () => void) {
  const [season, updateSeason] = useState(() => parseSeason(read("portfolio-season")));
  const [motion, updateMotion] = useState(() => parseSeasonMotion(read("portfolio-season-motion")));
  const [instant, setInstant] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia("(prefers-reduced-motion: reduce)").matches);
  const setSeason = (value: Season, keyboard = false) => {
    settleTheme();
    setInstant(keyboard);
    updateSeason(value);
    save("portfolio-season", value);
  };
  const setMotion = (value: boolean) => {
    settleTheme();
    updateMotion(value);
    save("portfolio-season-motion", String(value));
  };
  useEffect(() => {
    // Root tokens synchronize external CSS; user events own preference changes, and cleanup removes owned attributes.
    const root = document.documentElement;
    if (season !== "off") root.dataset.season = season;
    else delete root.dataset.season;
    root.dataset.seasonMotion = motion ? "on" : "off";
    root.dataset.seasonInstant = String(instant);
    return () => { delete root.dataset.season; delete root.dataset.seasonMotion; delete root.dataset.seasonInstant; };
  }, [season, motion, instant]);
  useEffect(() => {
    // Device motion and visibility change outside React; release both subscriptions on disposal.
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const reduce = () => setReducedMotion(media.matches);
    const visibility = () => { document.documentElement.toggleAttribute("data-season-hidden", document.hidden); };
    visibility();
    media.addEventListener("change", reduce);
    document.addEventListener("visibilitychange", visibility);
    return () => { media.removeEventListener("change", reduce); document.removeEventListener("visibilitychange", visibility); document.documentElement.removeAttribute("data-season-hidden"); };
  }, []);
  return { season, motion, reducedMotion, setSeason, setMotion };
}
export type SeasonControls = ReturnType<typeof useSeason>;
