import { useLenis } from "lenis/react";
import { useState, type MouseEvent } from "react";
import { ArrowDownRight, Atom, Boxes, Braces, Code2, Contrast, Database, Download, Eye, Figma, FileText, Github, Lightbulb, Linkedin, Mail, Palette, Route, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import myImage from "./assets/MyImage.png";
import resumePdf from "./assets/Alicoben-Resume.pdf";
import { ContactForm } from "./features/contact/ContactForm";
import { portfolio } from "./content/portfolio";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { SiteHeader } from "./components/SiteHeader";
import { ProjectGallery } from "./components/ProjectGallery";
import { ResumeViewer } from "./components/ResumeViewer";
import type { Project } from "./content/portfolio";

const stackIcons: Record<string, LucideIcon> = {
  "React/Next.js": Atom,
  TypeScript: Braces,
  JavaScript: Code2,
  "Node.js": Server,
  "REST APIs": Route,
  TailwindCSS: Palette,
  Django: Boxes,
  MongoDB: Database,
  Figma,
};
const skillGroupIcons: Record<string, LucideIcon> = { Languages: Code2, "Frameworks & Libraries": Boxes, Databases: Database, "Tools & Platforms": Wrench, Concepts: Lightbulb };

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [portraitColor, setPortraitColor] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const lenis = useLenis();
  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.hash;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (!target) return;

    event.preventDefault();
    if (lenis) {
      lenis.scrollTo(target, { offset: 96, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (window.location.hash !== hash) window.history.pushState(null, "", hash);
  };

  return (
    <div className="site-shell" data-theme={theme}>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader theme={theme} onToggleTheme={() => setTheme((current) => current === "dark" ? "light" : "dark")} onNavigate={scrollToSection} />
      <main id="main">
        <section id="home" className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-surface">
            <div className="hero-copy">
              <p className="hero-greeting">Hey, I’m Henry Dominic</p>
              <h1 id="hero-title" className="hero-title"><span>Full-stack engineer &amp;</span><span>product builder</span></h1>
              <p className="hero-intro">{portfolio.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`mailto:${portfolio.email}`}>Contact <Mail /></a>
                <a className="button button-ghost" href="#work" onClick={scrollToSection}>View my work <ArrowDownRight /></a>
              </div>
            </div>
            <div className="hero-portrait-wrap">
              <div className="hero-portrait-card">
                <div className="hero-portrait-media">
                  <img className="hero-portrait-image hero-portrait-image-grayscale" src={myImage} alt="Henry Alicoben portrait" />
                  <img className={`hero-portrait-image hero-portrait-image-color${portraitColor ? " is-visible" : ""}`} src={myImage} alt="" aria-hidden="true" />
                </div>
                <button
                  className="hero-portrait-badge"
                  type="button"
                  onClick={() => setPortraitColor((current) => !current)}
                  aria-pressed={portraitColor}
                  aria-label={portraitColor ? "Show portrait in black and white" : "Show portrait in color"}
                  title={portraitColor ? "Show black and white portrait" : "Show color portrait"}
                >
                  {portraitColor ? <Contrast aria-hidden="true" /> : <Palette aria-hidden="true" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="section-shell section-block work-section" aria-labelledby="work-title">
          <div className="section-heading section-heading-centered">
            <h2 id="work-title">My projects</h2>
            <p>From operational tools to focused product surfaces, a look at the work I’m proud to have shipped.</p>
          </div>
          <div className="project-list">
            {portfolio.projects.map((project, index) => <ProjectShowcase key={project.title} project={project} index={index} onOpenGallery={setSelectedProject} />)}
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <h2 id="about-title" className="sr-only">About</h2>
          <section className="section-shell section-block approach" aria-labelledby="approach-title">
            <div className="section-heading section-heading-centered"><h2 id="approach-title">How I work</h2><p>From fuzzy brief to shipped product, with care in the details that matter after launch.</p></div>
            <div className="approach-grid">
              {portfolio.approach.map((item) => <article key={item.title}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
            </div>
            <div className="stack-line"><strong>Core stack</strong><div className="stack-list">{portfolio.stack.map((item) => { const Icon = stackIcons[item] || Code2; return <span className="stack-chip" key={item}><Icon aria-hidden="true" />{item}</span>; })}</div></div>
          </section>

          <section id="skills" className="section-shell section-block skills" aria-labelledby="skills-title">
            <div className="section-heading section-heading-centered"><h2 id="skills-title">Technical skills</h2><p>A broad working range across product interfaces, backend systems, cloud delivery, and applied AI.</p></div>
            <div className="skills-groups">
              {portfolio.technicalSkills.map((group) => { const Icon = skillGroupIcons[group.title] || Code2; return <article className="skill-group" key={group.title}>
                <div className="skill-group-heading"><Icon aria-hidden="true" /><h3>{group.title}</h3></div>
                <div className="skill-list">{group.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>; })}
            </div>
          </section>
        </section>

        <section id="contact" className="section-shell section-block contact" aria-labelledby="contact-title">
          <div className="contact-copy">
            <h2 id="contact-title">Let’s connect</h2>
            <p>Have a product problem worth solving? Send the context. I’ll reply with useful next steps—not a sales sequence.</p>
            <div className="social-links" aria-label="Social links">
              <a href={portfolio.github} target="_blank" rel="noreferrer"><Github /> GitHub</a>
              <a href={portfolio.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a>
              <a href={`mailto:${portfolio.email}`}><Mail /> Email</a>
            </div>
            <div className="resume-card">
              <div className="resume-card-copy"><FileText aria-hidden="true" /><div><strong>My Résumé</strong><span>View my experience and technical work.</span></div></div>
              <div className="resume-actions"><button type="button" onClick={() => setResumeOpen(true)}><Eye aria-hidden="true" /> View résumé</button><a href={resumePdf} download="Alicoben-Resume.pdf"><Download aria-hidden="true" /> Download</a></div>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>
      {selectedProject && <ProjectGallery project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {resumeOpen && <ResumeViewer src={resumePdf} onClose={() => setResumeOpen(false)} />}
      <footer className="section-shell footer"><span>© {new Date().getFullYear()} Henry Dominic Alicoben</span><span>Designed and engineered in the Philippines.</span></footer>
    </div>
  );
}

export default App;
