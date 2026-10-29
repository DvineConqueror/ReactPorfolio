import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { parseSeason, parseSeasonMotion, snowflakes } from "./season";
import { PortraitSeasonDecoration, SeasonalAtmosphere, SeasonalScene } from "../components/SeasonalArt";

describe("seasonal preferences and bounded artwork", () => {
  it("accepts only manual seasonal values and defaults unknown stored content to Off", () => {
    expect(parseSeason("halloween")).toBe("halloween");
    expect(parseSeason("christmas")).toBe("christmas");
    for (const value of [null, "", "system", "Halloween", "{\"season\":\"christmas\"}", "<script>"]) expect(parseSeason(value)).toBe("off");
  });
  it("keeps decoration motion independent and enabled by default", () => {
    expect(parseSeasonMotion("false")).toBe(false);
    for (const value of [null, "true", "broken"]) expect(parseSeasonMotion(value)).toBe(true);
  });
  it("creates deterministic, bounded flakes with the approved fall durations", () => {
    expect(snowflakes).toHaveLength(96);
    expect(snowflakes.every(f => f.x >= 0 && f.x < 100 && f.duration >= 4 && f.duration <= 8 && f.delay <= 0)).toBe(true);
    expect(new Set(snowflakes.map(f => f.x)).size).toBe(96);
  });
  it("Off mounts no seasonal scenes, lights, webs or snow", () => {
    expect(renderToStaticMarkup(createElement(SeasonalAtmosphere, { season: "off" }))).toBe("");
    expect(renderToStaticMarkup(createElement(SeasonalScene, { season: "off" }))).toBe("");
    expect(renderToStaticMarkup(createElement(PortraitSeasonDecoration, { season: "off" }))).toBe("");
  });
  it("uses one pose-independent portrait decoration for each seasonal world", () => {
    const halloween = renderToStaticMarkup(createElement(PortraitSeasonDecoration, { season: "halloween" }));
    const christmas = renderToStaticMarkup(createElement(PortraitSeasonDecoration, { season: "christmas" }));
    expect(halloween).toContain("portrait-web");
    expect(halloween).toContain("portrait-seasonal-halloween");
    expect(christmas).toContain("portrait-seasonal-christmas");
    for (const markup of [halloween, christmas]) {
      expect(markup).toContain('aria-hidden="true"');
      expect(markup).toContain('focusable="false"');
      expect(markup).not.toContain("<image");
    }
  });
  it("keeps decorative content hidden from assistive technology and snow exclusive to Christmas", () => {
    const christmas = renderToStaticMarkup(createElement(SeasonalAtmosphere, { season: "christmas" }));
    const halloween = renderToStaticMarkup(createElement(SeasonalAtmosphere, { season: "halloween" }));
    expect(christmas.match(/class="season-snowflake /g)).toHaveLength(96);
    expect(christmas).toContain('aria-hidden="true"');
    expect(halloween).toContain("season-web-corner");
    expect(halloween.match(/class="season-edge-spider /g)).toHaveLength(2);
    expect(halloween).toContain("season-lightning-streak");
    expect(halloween).not.toContain("season-snowflake");
  });
  it("includes Christmas characters and top greenery, with aurora exclusive to Christmas atmosphere", () => {
    const scene = renderToStaticMarkup(createElement(SeasonalScene, { season: "christmas" }));
    for (const asset of ["christmas-snowman", "christmas-santa", "christmas-reindeer", "christmas-elf"]) expect(scene).toContain(asset);
    const christmas = renderToStaticMarkup(createElement(SeasonalAtmosphere, { season: "christmas" }));
    expect(christmas).toContain("season-aurora season-animate");
    expect(christmas.match(/class="christmas-mistletoe"/g)).toHaveLength(2);
    expect(renderToStaticMarkup(createElement(SeasonalAtmosphere, { season: "halloween" }))).not.toContain("season-aurora");
  });
});
