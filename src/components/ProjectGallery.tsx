import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Project } from "../content/portfolio";
import { Modal } from "./Modal";

export function ProjectGallery({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = project.gallery[activeIndex];
  if (!activeImage) return null;
  const move = (direction: number) => setActiveIndex((current) => (current + direction + project.gallery.length) % project.gallery.length);
  return <Modal titleId="gallery-title" onClose={onClose} className="gallery-modal" onKeyDown={(event) => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); } }}>
    <header className="modal-header"><h2 id="gallery-title">{project.title}</h2><button className="icon-button" autoFocus type="button" onClick={onClose} aria-label="Close image gallery"><X /></button></header>
    <div className="gallery-stage"><img src={activeImage.src} alt={activeImage.alt} /></div>
    <div className="gallery-controls"><button className="icon-button" type="button" onClick={() => move(-1)} aria-label="Previous snapshot" disabled={project.gallery.length < 2}><ArrowLeft /></button><p aria-live="polite">{activeIndex + 1} / {project.gallery.length}</p><button className="icon-button" type="button" onClick={() => move(1)} aria-label="Next snapshot" disabled={project.gallery.length < 2}><ArrowRight /></button></div>
    <p className="gallery-caption">{activeImage.alt}</p><div className="gallery-thumbnails" aria-label="Project snapshots">{project.gallery.map((image, index) => <button key={image.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`View snapshot ${index + 1}`} aria-pressed={index === activeIndex}><img src={image.src} alt="" /></button>)}</div>{project.repository && <a className="text-link" href={project.repository} target="_blank" rel="noreferrer">Inspect repository <ArrowUpRight /></a>}
  </Modal>;
}
