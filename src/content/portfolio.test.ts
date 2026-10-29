import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { portfolio, type Project } from "./portfolio";
import { ProjectShowcase } from "../components/ProjectShowcase";

const projects: Project[] = portfolio.projects;

describe("project publishing contract", () => {
  it("keeps the curated order and unique identities across both groups", () => {
    expect(projects.filter((p) => p.group === "featured").map((p) => p.title)).toEqual(["BayanTrack", "AnchorWatch", "AIO Converter", "GPOS"]);
    expect(projects.filter((p) => p.group === "other").map((p) => p.title)).toEqual(["Lurk", "RaceConnect", "SmartDTR", "Typeroo"]);
    expect(new Set(projects.map((p) => p.id)).size).toBe(8);
  });

  it("publishes complete previews and repository links without fabricated metadata", () => {
    for (const project of projects) {
      expect(project.gallery.length).toBeGreaterThan(0);
      expect(project.gallery.some((image) => image.src === project.image)).toBe(true);
      expect(project.gallery.every((image) => image.src && image.alt)).toBe(true);
      expect(project.role).toBe("Developer");
      if (!["bayantrack", "anchorwatch"].includes(project.id)) {
        expect(project.period).toBeUndefined();
        expect(project.organization).toBeUndefined();
        expect(project.location).toBeUndefined();
        expect(new URL(project.repository!).pathname).toMatch(/^\/DvineConqueror\/[^/]+$/);
      }
    }
  });

  it("keeps detailed facts out of compact cards and omits missing metadata", () => {
    const project = projects.find((p) => p.id === "smartdtr")!;
    const html = renderToStaticMarkup(createElement(ProjectShowcase, { project, index: 6, onOpen: () => {} }));
    expect(html).toContain("Explore SmartDTR project");
    expect(html).not.toContain("project-stack");
    expect(html).not.toContain("undefined");
    expect(html).not.toContain("Details on request");
    expect(html).not.toContain("<details");
  });
});
