import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Modal } from "./Modal";
import { ThemeToggle } from "./ThemeToggle";
import { SeasonPicker } from "./SeasonPicker";
import type { SeasonControls } from "../hooks/useSeason";
import type { Theme } from "../hooks/useTheme";
import { portfolio } from "../content/portfolio";

const sections = [["home", "Overview"], ["work", "Projects"], ["about", "About & skills"], ["certifications", "Certifications"], ["activity", "GitHub activity"], ["contact", "Contact"]] as const;
export function SiteHeader({ theme, onThemeChange, seasons }: { theme: Theme; onThemeChange: (value: Theme, origin?: HTMLElement) => void; seasons: SeasonControls }) {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    // Section reading line and responsive menu state come from browser events; clean up subscriptions.
    const update = () => { let current = "home"; for (const [id] of sections) { if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * .3) current = id; } setActive(current); };
    const wide = matchMedia("(min-width: 1024px)");
    const closeWhenWide = () => { if (wide.matches) setMenuOpen(false); };
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); wide.addEventListener("change", closeWhenWide);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); wide.removeEventListener("change", closeWhenWide); };
  }, []);
  const navigation = (close = false) => <nav aria-label={close ? "Mobile navigation" : "Primary navigation"}>{sections.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => { if (close) setMenuOpen(false); }}><span className="nav-number">0{index + 1}</span><span>{label}</span><ArrowUpRight className="nav-arrow" aria-hidden="true" /></a>)}</nav>;
  const themeControl = <div className="theme-control"><ThemeToggle theme={theme} onChange={onThemeChange} /><SeasonPicker {...seasons} /></div>;
  return <>
    <header className="site-header"><a className="identity" href="#home"><span className="identity-mark" aria-hidden="true">ha.</span><span>Henry Alicoben<span className="identity-caption">Engineer & product builder</span></span></a><div className="desktop-navigation">{navigation()}{themeControl}<div className="sidebar-links"><a href={portfolio.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a></div><span className="sidebar-location">Based in the Philippines</span></div><button className="icon-button mobile-menu-toggle" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation" aria-expanded={menuOpen}><Menu /></button></header>
    {menuOpen && <Modal titleId="menu-title" onClose={() => setMenuOpen(false)} className="menu-modal"><header className="modal-header"><h2 id="menu-title">Navigation</h2><button className="icon-button" autoFocus type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button></header>{navigation(true)}{themeControl}</Modal>}
  </>;
}
