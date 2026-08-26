import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "../content/portfolio";

export function ProjectShowcase({ project, index, onOpenGallery }: { project: Project; index: number; onOpenGallery: (project: Project) => void }) {
  return <article className="project">
    <div className="project-topline"><span className="project-name"><Github /> {project.title}</span><span className="project-position">{String(index + 1).padStart(2, "0")}</span></div>
    {project.image && project.gallery.length > 0 ? <button className="project-image-button" type="button" onClick={() => onOpenGallery(project)} aria-label={`Open ${project.title} image gallery`}>
      <img src={project.image} alt={project.imageAlt} loading={index === 0 ? "eager" : "lazy"} />
      <span className="project-image-hint">Open gallery <ArrowUpRight /></span>
    </button> : <div className="project-image-placeholder" role="img" aria-label={project.imageAlt}>
      <span className="project-placeholder-mark" aria-hidden="true">{project.title.slice(0, 1)}</span>
      <strong>Gallery coming soon</strong>
      <span>{project.imageAlt}</span>
    </div>}
    <div className="project-copy">
      <div className="project-meta"><span>{project.kicker}</span><span>{project.period}</span></div>
      <p className="project-organization">{project.organization} · {project.location}</p>
      <h3>{project.summary}</h3>
      <p>{project.contribution}</p>
      <ul className="project-details">{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
      <div className="project-stack" aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
    <div className="project-footer">{project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">Repository <ArrowUpRight /></a> : <span>Details on request</span>}</div>
    </div>
  </article>;
}
