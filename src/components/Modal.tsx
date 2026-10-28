import { useEffect, useRef, type ReactNode, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";

export function Modal({ titleId, onClose, children, className = "", onKeyDown }: { titleId: string; onClose: () => void; children: ReactNode; className?: string; onKeyDown?: (event: KeyboardEvent<HTMLDialogElement>) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const lenis = useLenis();
  useEffect(() => {
    // Native dialog owns focus/inertness; restore external Lenis/body state on disposal.
    const dialog = ref.current;
    if (!dialog) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => { dialog.close(); document.body.style.overflow = overflow; lenis?.start(); previous?.focus({ preventScroll: true }); };
  }, [lenis]);
  return createPortal(<dialog ref={ref} className={`modal ${className}`} aria-labelledby={titleId} data-lenis-prevent onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose(); } }} onKeyDown={onKeyDown}>{children}</dialog>, document.body);
}
