import { ArrowUpRight, Images } from "lucide-react";
import type { Project } from "../content/portfolio";

export function ProjectShowcase({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const compact = project.group === "other";
  return <article className={compact ? "project project-compact" : "project"} data-project={project.id}>
    <div className="project-media">{project.image && <button className="project-image-button" type="button" onClick={() => onOpen(project)} aria-label={`Open ${project.title} project details`}>
      <img src={project.image} alt={project.imageAlt} loading={index === 0 ? "eager" : "lazy"} width="1200" height="800" />
      <span className="project-image-hint"><Images aria-hidden="true" /> {project.gallery.length} {project.gallery.length === 1 ? "snapshot" : "snapshots"}<ArrowUpRight aria-hidden="true" /></span>
    </button>}</div>
    <div className="project-copy">
      <div className="project-meta"><span>{project.kicker}</span>{project.period && <span>{project.period}</span>}{project.status && <span className="project-status">{project.status}</span>}</div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      {!compact && <><p className="project-contribution"><strong>My part</strong> {project.contribution}</p><div className="project-stack" aria-label={`${project.title} technology stack`}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div></>}
      <div className="project-footer"><button type="button" onClick={() => onOpen(project)} aria-label={`Explore ${project.title} project`}>Explore project <ArrowUpRight aria-hidden="true" /></button>{!compact && project.repository && <a href={project.repository} target="_blank" rel="noreferrer">Source <ArrowUpRight aria-hidden="true" /></a>}</div>
    </div>
  </article>;
}
