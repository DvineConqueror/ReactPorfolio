import { useEffect, useState } from "react";

export type Theme = "system" | "light" | "dark";
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => { try { const saved = localStorage.getItem("portfolio-theme"); return saved === "dark" || saved === "light" ? saved : "system"; } catch { return "system"; } });
  useEffect(() => {
    // Synchronize root tokens, OS preference and storage; remove browser subscription on cleanup.
    const media = matchMedia("(prefers-color-scheme: dark)");
    const update = () => { document.documentElement.dataset.theme = theme === "system" ? media.matches ? "dark" : "light" : theme; };
    update();
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Preference remains usable with storage blocked. */ }
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [theme]);
  return { theme, setTheme };
}
