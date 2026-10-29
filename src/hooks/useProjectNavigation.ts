import { useEffect, useRef, useState } from "react";
import type { Project } from "../content/portfolio";
import { projectHash, projectIdFromHash } from "../domain/projectNavigation";

export function useProjectNavigation(projects: Project[]) {
  const fromLocation = () => projects.find(project => project.id === projectIdFromHash(location.hash)) ?? null;
  const [selectedProject, setSelectedProject] = useState<Project | null>(fromLocation);
  const openedHere = useRef(false);
  useEffect(() => {
    // Browser history is external; clicks update synchronously, back/forward subscribe here.
    const sync = () => {
      openedHere.current = false;
      setSelectedProject(projects.find(project => project.id === projectIdFromHash(location.hash)) ?? null);
    };
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("popstate", sync); window.removeEventListener("hashchange", sync); };
  }, [projects]);
  const openProject = (project: Project) => {
    history.pushState(null, "", projectHash(project.id));
    openedHere.current = true;
    setSelectedProject(project);
  };
  const closeProject = () => {
    if (openedHere.current) { history.back(); return; }
    history.replaceState(null, "", "#work");
    setSelectedProject(null);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };
  return { selectedProject, openProject, closeProject };
}
