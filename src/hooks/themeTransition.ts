import { themeRevealFrames } from "../domain/themeReveal";

let active: ViewTransition | undefined;
let activeAnimation: Animation | undefined;
let generation = 0;

export function cancelThemeTransition() {
  generation++;
  active?.skipTransition();
  activeAnimation?.cancel();
  activeAnimation = undefined;
  active = undefined;
  delete document.documentElement.dataset.themeReveal;
}

export function revealTheme(theme: "light" | "dark", origin?: HTMLElement, animate = true) {
  cancelThemeTransition();
  const root = document.documentElement;
  if (root.dataset.theme === theme) return;
  if (!animate || !document.startViewTransition || !root.animate || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.dataset.theme = theme;
    return;
  }
  const rect = origin?.getBoundingClientRect();
  const x = Math.max(0, Math.min(innerWidth, rect ? rect.left + rect.width / 2 : innerWidth / 2));
  const y = Math.max(0, Math.min(innerHeight, rect ? rect.top + rect.height / 2 : innerHeight / 2));
  const revision = generation;
  root.dataset.themeReveal = "pixel";
  try {
    const transition = document.startViewTransition(() => { if (revision === generation) root.dataset.theme = theme; });
    active = transition;
    void transition.ready.then(() => {
      if (active !== transition) return;
      activeAnimation = root.animate({ clipPath: themeRevealFrames(x, y, innerWidth, innerHeight) }, {
        duration: 580,
        easing: "cubic-bezier(.4,0,.2,1)",
        fill: "both",
        pseudoElement: "::view-transition-new(root)",
      });
    }).catch(() => {
      if (active === transition) { root.dataset.theme = theme; transition.skipTransition(); }
    });
    const finish = () => { if (active === transition) { activeAnimation?.cancel(); activeAnimation = undefined; active = undefined; delete root.dataset.themeReveal; } };
    void transition.finished.then(finish, finish);
  } catch {
    delete root.dataset.themeReveal;
    root.dataset.theme = theme;
  }
}
