import { ArrowUpRight, Images } from "lucide-react";
import type { Project } from "../content/portfolio";

export function ProjectShowcase({ project, index, onOpenGallery }: { project: Project; index: number; onOpenGallery: (project: Project) => void }) {
  return <article className="project">
    <div className="project-media">{project.image ? <button className="project-image-button" type="button" onClick={() => onOpenGallery(project)} aria-label={`Open ${project.title} image gallery`}><img src={project.image} alt={project.imageAlt} loading={index === 0 ? "eager" : "lazy"} width="1200" height="800" /><span className="project-image-hint"><Images /> {project.gallery.length} snapshots <ArrowUpRight /></span></button> : <p>Project preview unavailable</p>}</div>
    <div className="project-copy"><div className="project-meta"><span>{project.kicker}</span><span>{project.period}</span></div><h3>{project.title}</h3><p className="project-summary">{project.summary}</p><p>{project.contribution}</p><div className="project-stack" aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div><details className="project-details"><summary>Project details</summary><p className="project-organization">{project.organization} · {project.location}</p><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details><div className="project-footer"><button type="button" onClick={() => onOpenGallery(project)}>Explore gallery <ArrowUpRight /></button>{project.repository ? <a href={project.repository} target="_blank" rel="noreferrer">Repository <ArrowUpRight /></a> : <span>Details on request</span>}</div></div>
  </article>;
}
