import { useEffect, useState, type MouseEvent } from "react";
import { Moon, Sun } from "lucide-react";

const sectionIds = ["home", "work", "about", "contact"] as const;
type SectionId = (typeof sectionIds)[number];

export function SiteHeader({ theme, onToggleTheme, onNavigate }: { theme: "dark" | "light"; onToggleTheme: () => void; onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    // External sync only: mirror the section crossing the reading line into the nav, then clean up.
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.35;
      let nextSection: SectionId = "home";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) nextSection = id;
      }
      setActiveSection(nextSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return <header className="site-header" aria-label="Site navigation">
    <nav aria-label="Primary navigation">
      {sectionIds.map((id) => {
        const label = id === "home" ? "Home" : id === "work" ? "Projects" : id === "about" ? "About" : "Contact";
        return <a className={`header-nav-link ${activeSection === id ? "is-active" : ""}`} aria-current={activeSection === id ? "location" : undefined} href={`#${id}`} onClick={onNavigate} key={id}>{label}</a>;
      })}
    </nav>
    <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${nextTheme} theme`} aria-pressed={theme === "light"}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  </header>;
}
