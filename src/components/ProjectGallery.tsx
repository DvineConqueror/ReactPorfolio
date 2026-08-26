import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import type { Project } from "../content/portfolio";

export function ProjectGallery({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = project.gallery[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // External sync only: the overlay owns body scroll while mounted; cleanup restores it.
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLButtonElement>("[data-autofocus]")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  if (!activeImage) return null;

  const move = (direction: number) => setActiveIndex((current) => (current + direction + project.gallery.length) % project.gallery.length);
  const close = onClose;

  return <div
    ref={dialogRef}
    className="project-dialog"
    role="dialog"
    tabIndex={-1}
    data-lenis-prevent
    aria-labelledby="gallery-title"
    aria-modal="true"
    onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    onKeyDown={(event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") event.preventDefault();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }}
  >
    <div className="gallery-panel">
      <header className="gallery-header">
        <div><p className="gallery-kicker">Project snapshots</p><h2 id="gallery-title">{project.title}</h2></div>
        <button className="icon-button" type="button" data-autofocus onClick={close} aria-label="Close image gallery"><X /></button>
      </header>
      <div className="gallery-stage">
        <img src={activeImage.src} alt={activeImage.alt} />
        <button className="gallery-arrow gallery-arrow-left" type="button" onClick={() => move(-1)} aria-label="Previous snapshot" disabled={project.gallery.length < 2}><ArrowLeft /></button>
        <button className="gallery-arrow gallery-arrow-right" type="button" onClick={() => move(1)} aria-label="Next snapshot" disabled={project.gallery.length < 2}><ArrowRight /></button>
      </div>
      <p className="sr-only" aria-live="polite">Snapshot {activeIndex + 1} of {project.gallery.length}: {activeImage.alt}</p>
      <footer className="gallery-footer"><span>{String(activeIndex + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}</span><span>{activeImage.alt}</span>{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">Inspect repository <ArrowUpRight /></a>}</footer>
      <div className="gallery-thumbnails" aria-label="Project snapshots">{project.gallery.map((image, index) => <button className={index === activeIndex ? "active" : ""} key={image.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`View snapshot ${index + 1}`} aria-pressed={index === activeIndex}><img src={image.src} alt="" /></button>)}</div>
    </div>
  </div>;
}
