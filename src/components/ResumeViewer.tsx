import { Download, X } from "lucide-react";
import { useEffect, useRef } from "react";

type ResumeViewerProps = { src: string; onClose: () => void };

export function ResumeViewer({ src, onClose }: ResumeViewerProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    // External sync only: the modal owns body scroll while mounted; cleanup restores it and focus.
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLButtonElement>("[data-autofocus]")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return <div
    ref={dialogRef}
    className="project-dialog resume-dialog"
    role="dialog"
    tabIndex={-1}
    data-lenis-prevent
    aria-labelledby="resume-title"
    aria-modal="true"
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}
  >
    <div className="gallery-panel resume-panel">
      <header className="gallery-header resume-header">
        <div><p className="gallery-kicker">PDF document</p><h2 id="resume-title">Alicoben Resume</h2></div>
        <div className="resume-header-actions">
          <a className="resume-download" href={src} download="Alicoben-Resume.pdf"><Download aria-hidden="true" /> Download PDF</a>
          <button className="icon-button" type="button" data-autofocus onClick={onClose} aria-label="Close resume viewer"><X aria-hidden="true" /></button>
        </div>
      </header>
      <div className="gallery-stage resume-stage">
        <iframe className="resume-frame" src={src} title="Alicoben resume PDF" />
      </div>
    </div>
  </div>;
}
