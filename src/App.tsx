import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, Download, Eye, FileText, Github, Linkedin, Mail } from "lucide-react";
import { InteractivePortrait } from "./components/InteractivePortrait";
import { ContactForm } from "./features/contact/ContactForm";
import { portfolio, type Project } from "./content/portfolio";
import { ProjectShowcase } from "./components/ProjectShowcase";
import { SiteHeader } from "./components/SiteHeader";
import { ProjectGallery } from "./components/ProjectGallery";
import { ResumeViewer } from "./components/ResumeViewer";
import { Certifications } from "./components/Certifications";
import { GitHubActivity } from "./components/GitHubActivity";
import { useTheme } from "./hooks/useTheme";
import { useSeason } from "./hooks/useSeason";
import { SeasonalAtmosphere, SeasonalScene } from "./components/SeasonalArt";
import "./seasonal.css";
import { useSectionNavigation } from "./hooks/useSectionNavigation";

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeIntent, setResumeIntent] = useState<"view" | "download" | null>(null);
  const { theme, setTheme, settleTheme } = useTheme();
  const seasons = useSeason(settleTheme);
  useSectionNavigation();
  return <div className="site-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <SeasonalAtmosphere season={seasons.season} />
    <SiteHeader theme={theme} onThemeChange={setTheme} seasons={seasons} />
    <div className="page-content"><main id="main">
      <section id="home" className="hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="hero-greeting">Hey, I’m Henry Dominic.</p><h1 id="hero-title">Full-stack engineer &amp; product builder<span className="display-period">.</span></h1><p className="hero-intro">{portfolio.intro}</p><div className="hero-actions"><a className="button button-primary" href={`mailto:${portfolio.email}`}>Let’s connect <ArrowUpRight /></a><a className="text-link" href="#work">View my work <ArrowDownRight /></a></div></div><InteractivePortrait season={seasons.season} /><SeasonalScene season={seasons.season} /></section>
      <section id="work" className="section-block work-section" aria-labelledby="work-title"><div className="section-heading"><h2 id="work-title"><span className="section-number">02 — </span>projects</h2><p>Selected systems, tools, and experiments—from operational platforms to desktop apps and games.</p></div><div className="featured-projects" role="region" aria-labelledby="featured-projects-title"><h3 id="featured-projects-title" className="project-group-title">Featured projects</h3><div className="project-list">{portfolio.projects.filter((project) => project.group === "featured").map((project, index) => <ProjectShowcase key={project.id} project={project} index={index} onOpen={setSelectedProject} />)}</div></div><div className="other-projects" role="region" aria-labelledby="other-projects-title"><h3 id="other-projects-title" className="project-group-title">Other projects</h3><div className="other-project-grid">{portfolio.projects.filter((project) => project.group === "other").map((project, index) => <ProjectShowcase key={project.id} project={project} index={index + 4} onOpen={setSelectedProject} />)}</div></div></section>
      <section id="about" className="section-block" aria-labelledby="about-title"><div className="section-heading"><h2 id="about-title"><span className="section-number">03 — </span>how I work</h2><p>From fuzzy brief to shipped product, with care in the details that matter after launch.</p></div><div className="approach-grid">{portfolio.approach.map((item) => <article key={item.title}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div><div className="stack-line"><h3>Core stack</h3><div className="stack-list">{portfolio.stack.map((item) => <span key={item}>{item}</span>)}</div></div><div id="skills" className="skills"><h3>Technical skills</h3><div className="skills-groups">{portfolio.technicalSkills.map((group) => <article key={group.title} className="skill-group"><h4>{group.title}</h4><p>{group.items.join(" · ")}</p></article>)}</div></div></section>
      <Certifications />
      <GitHubActivity />
      <section id="contact" className="section-block" aria-labelledby="contact-title"><div className="section-heading"><h2 id="contact-title"><span className="section-number">06 — </span>let’s connect</h2><p>Have a product problem worth solving? Send the context. I’ll reply with useful next steps—not a sales sequence.</p></div><div className="contact-layout"><div className="contact-copy"><div className="social-links" aria-label="Social links"><a href={portfolio.github} target="_blank" rel="noreferrer"><Github /> GitHub <ArrowUpRight /></a><a href={portfolio.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LinkedIn <ArrowUpRight /></a><a href={`mailto:${portfolio.email}`}><Mail /> Email <ArrowUpRight /></a></div><div className="resume-card"><FileText aria-hidden="true" /><h3>My résumé</h3><p>Experience and technical work, in one document.</p><div className="resume-actions"><button className="button button-primary" type="button" onClick={() => setResumeIntent("view")}><Eye /> View résumé</button><button className="text-link" type="button" onClick={() => setResumeIntent("download")}><Download /> Download</button></div><p className="fine-print">A quick verification helps prevent automated downloads.</p></div></div><ContactForm /></div></section>
    </main><footer className="footer"><span>© {new Date().getFullYear()} Henry Dominic Alicoben</span><a href="#home">Back to top ↑</a><span>Designed and engineered in the Philippines.</span></footer></div>
    {selectedProject && <ProjectGallery key={selectedProject.id} project={selectedProject} onClose={() => setSelectedProject(null)} />}
    {resumeIntent && <ResumeViewer intent={resumeIntent} onClose={() => setResumeIntent(null)} />}
  </div>;
}
export default App;
