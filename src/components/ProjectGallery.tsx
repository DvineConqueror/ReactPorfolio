import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Link, X } from "lucide-react";
import type { Project } from "../content/portfolio";
import { Modal } from "./Modal";
import { projectHash } from "../domain/projectNavigation";

export function ProjectGallery({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [linkMessage, setLinkMessage] = useState("");
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(`${location.origin}${location.pathname}${location.search}${projectHash(project.id)}`); setLinkMessage("Project link copied."); }
    catch { setLinkMessage("Copy this page’s address to share this project."); }
  };
  const activeImage = project.gallery[activeIndex];
  const hasMultipleImages = project.gallery.length > 1;
  const context = [project.period, project.organization, project.location].filter(Boolean).join(" · ");
  const move = (direction: number) => setActiveIndex((current) => (current + direction + project.gallery.length) % project.gallery.length);
  return <Modal titleId="project-title" onClose={onClose} className="project-modal" onKeyDown={(event) => { if (hasMultipleImages && !event.altKey && !event.ctrlKey && !event.metaKey && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
    <header className="modal-header"><h2 id="project-title">{project.title}</h2><button className="icon-button" autoFocus type="button" onClick={onClose} aria-label="Close project details"><X /></button></header>
    <div className="project-modal-content">
      {activeImage && <section aria-label={`${project.title} screenshots`}>
        <div className="gallery-stage"><img src={activeImage.src} alt={activeImage.alt} /></div>
        <div className="gallery-controls">{hasMultipleImages && <button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Previous snapshot"><ArrowLeft /></button>}<p aria-live="polite" aria-atomic="true">{activeIndex + 1} / {project.gallery.length}</p>{hasMultipleImages && <button className="icon-button" type="button" onClick={() => move(1)} aria-label="Next snapshot"><ArrowRight /></button>}</div>
        <p className="gallery-caption">{activeImage.alt}</p>
        {hasMultipleImages && <div className="gallery-thumbnails" aria-label="Project snapshots">{project.gallery.map((image, index) => <button key={image.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`View snapshot ${index + 1}`} aria-pressed={index === activeIndex}><img src={image.src} alt="" loading="lazy" /></button>)}</div>}
      </section>}
      <section className="project-overview" aria-labelledby="project-overview-title"><h3 id="project-overview-title">The problem</h3><p>{project.summary}</p>{context && <p className="project-context">{context}</p>}<dl className="project-role"><dt>Role</dt><dd>{project.role}</dd>{project.status && <><dt>Status</dt><dd>{project.status}</dd></>}</dl><h3>My contribution</h3><p>{project.contribution}</p></section>
      {project.decision && <section aria-labelledby="project-decision-title"><h3 id="project-decision-title">Engineering decision</h3><p>{project.decision}</p></section>}
      {project.evidence && <section aria-labelledby="project-evidence-title"><h3 id="project-evidence-title">What you can inspect</h3><p>{project.evidence}</p></section>}
      <section className="project-feature-list" aria-labelledby="project-features-title"><h3 id="project-features-title">A closer look</h3><ul>{project.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></section>
      <section aria-labelledby="project-stack-title"><h3 id="project-stack-title">Built with</h3><div className="project-stack">{(project.fullStack ?? project.stack).map((item) => <span key={item}>{item}</span>)}</div></section>
      <div className="project-share">{project.repository && <a className="text-link project-source" href={project.repository} target="_blank" rel="noreferrer">Source <ArrowUpRight aria-hidden="true" /></a>}<button className="text-link" type="button" onClick={() => void copyLink()}><Link aria-hidden="true" /> Copy project link</button><p role="status" aria-live="polite">{linkMessage}</p></div>
    </div>
  </Modal>;
}
