import { useEffect } from "react";
import { useLenis } from "lenis/react";

export function useSectionNavigation() {
  const lenis = useLenis();
  useEffect(() => {
    // Browser history/input are external; one owner prevents native/Lenis double scrolling.
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    let frame = 0;
    let disposed = false;
    const go = (hash: string, immediate = false, focus = false) => {
      let id: string;
      try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
      const target = document.getElementById(id || "home");
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (disposed) return;
        const focusTarget = () => { if (focus) { target.tabIndex = -1; target.focus({ preventScroll: true }); } };
        if (lenis) { lenis.resize(); lenis.scrollTo(target, { immediate, duration: .8, onComplete: focusTarget }); }
        else { target.scrollIntoView({ behavior: immediate || matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); focusTarget(); }
      });
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="#"]') : null;
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash || !document.getElementById(url.hash.slice(1))) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      go(url.hash, false, true);
    };
    const restore = () => go(location.hash, true);
    document.addEventListener("click", click);
    window.addEventListener("popstate", restore);
    window.addEventListener("hashchange", restore);
    void document.fonts.ready.then(() => { if (!disposed && location.hash) restore(); });
    return () => { disposed = true; cancelAnimationFrame(frame); history.scrollRestoration = previous; document.removeEventListener("click", click); window.removeEventListener("popstate", restore); window.removeEventListener("hashchange", restore); };
  }, [lenis]);
}
