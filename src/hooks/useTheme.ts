import { useEffect, useRef, useState } from "react";
import { cancelThemeTransition, revealTheme } from "./themeTransition";

export type Theme = "system" | "light" | "dark";
export function useTheme() {
  const [theme, updateTheme] = useState<Theme>(() => { try { const saved = localStorage.getItem("portfolio-theme"); return saved === "dark" || saved === "light" ? saved : "system"; } catch { return "system"; } });
  const preference = useRef(theme);
  const resolve = (value: Theme) => value === "system" ? matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : value;
  const settleTheme = () => revealTheme(resolve(preference.current), undefined, false);
  const setTheme = (value: Theme, origin?: HTMLElement) => {
    preference.current = value;
    updateTheme(value);
    try { localStorage.setItem("portfolio-theme", value); } catch { /* Preference remains usable with storage blocked. */ }
    revealTheme(resolve(value), origin);
  };
  useEffect(() => {
    // OS preferences can change outside React; events own user changes, and cleanup releases browser listeners/snapshots.
    const media = matchMedia("(prefers-color-scheme: dark)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const current = () => preference.current === "system" ? media.matches ? "dark" : "light" : preference.current;
    const update = () => { if (preference.current === "system") revealTheme(current(), undefined, false); };
    const settle = () => { if (motion.matches) revealTheme(current(), undefined, false); };
    revealTheme(current(), undefined, false);
    media.addEventListener("change", update);
    motion.addEventListener("change", settle);
    return () => { media.removeEventListener("change", update); motion.removeEventListener("change", settle); cancelThemeTransition(); };
  }, []);
  return { theme, setTheme, settleTheme };
}
