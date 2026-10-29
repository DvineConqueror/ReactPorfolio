import { Monitor, Moon, Sun } from "lucide-react";
import type { Theme } from "../hooks/useTheme";

export function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (value: Theme, origin?: HTMLElement) => void }) {
  const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
  const Icon = theme === "system" ? Monitor : theme === "light" ? Sun : Moon;
  return <button className="icon-button theme-toggle" type="button" onClick={(event) => onChange(next, event.currentTarget)} aria-label={`Theme: ${theme}. Switch to ${next} theme`} title={`Theme: ${theme} · Switch to ${next}`}><Icon aria-hidden="true" /></button>;
}
