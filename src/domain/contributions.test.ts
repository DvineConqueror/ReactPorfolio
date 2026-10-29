import { afterEach, describe, expect, it, vi } from "vitest";
import { calendarWeeks, contributionStats, dateKey, type ContributionDay } from "./contributions";
import { parseContributionHtml, serveContributions } from "../../worker/contributions";

const days = (counts: number[], start = "2026-10-25"): ContributionDay[] => counts.map((count, i) => ({ date: dateKey(new Date(Date.parse(start) + i * 86_400_000)), count, level: count ? 2 : 0 }));
function fixture(today: string) {
  const start = dateKey(new Date(Date.parse(today) - 364 * 86_400_000));
  return days(Array.from({ length: 365 }, (_, i) => i % 3), start).map((day, i) => `<td data-date="${day.date}" id="day-${i}" data-level="${day.level}"></td><tool-tip for="day-${i}">${day.count || "No"} contributions on October 1st.</tool-tip>`).join("");
}
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("contribution statistics", () => {
  it("allows today to be in progress, but breaks a streak on a missed yesterday", () => {
    expect(contributionStats(days([2, 1, 1, 0]), "2026-10-28").current).toBe(3);
    expect(contributionStats(days([2, 1, 0, 0]), "2026-10-28").current).toBe(0);
    expect(contributionStats(days([2, 1, 0, 4]), "2026-10-28").current).toBe(1);
    expect(contributionStats(days([2, 1]), "2026-10-29").current).toBe(0);
  });
  it("uses an inclusive 30 day window and excludes future cells", () => {
    const stats = contributionStats(days(Array<number>(40).fill(1), "2026-09-25"), "2026-10-29");
    expect(stats.recent).toHaveLength(30); expect(stats.recentTotal).toBe(30);
    expect(stats.total).toBe(35); expect(stats.longest).toBe(35);
  });
  it("aligns weeks to UTC Sunday, including across month boundaries", () => {
    const weeks = calendarWeeks(days([1, 2, 0, 1], "2026-10-30"));
    expect(weeks[0]?.slice(0, 5)).toEqual(Array(5).fill(null));
    expect(weeks[1]?.[0]?.date).toBe("2026-11-01");
    expect(calendarWeeks([])).toEqual([]);
  });
});

describe("public GitHub calendar boundary", () => {
  it("parses real HTML shape and numeric counts, without passing through HTML", () => {
    const html = fixture("2026-10-29");
    const parsed = parseContributionHtml(html, "2026-10-29");
    expect(parsed).toHaveLength(365);
    expect(parsed[0]).toEqual({ date: "2025-10-30", count: 0, level: 0 });
    expect(parsed.at(-1)?.date).toBe("2026-10-29");
    expect(parseContributionHtml(html.replace('>1 contributions', '>1,001 contributions'), "2026-10-29")[1]?.count).toBe(1001);
  });
  it("rejects changed markup, missing tooltip counts, duplicate/gapped dates and stale periods", () => {
    const html = fixture("2026-10-29");
    expect(() => parseContributionHtml("<html>Temporarily unavailable</html>", "2026-10-29")).toThrow();
    expect(() => parseContributionHtml(html.replace('for="day-0"', 'for="missing"'), "2026-10-29")).toThrow();
    expect(() => parseContributionHtml(html.replace('data-date="2025-10-31"', 'data-date="2025-10-30"'), "2026-10-29")).toThrow();
    expect(() => parseContributionHtml(html, "2026-10-30")).toThrow();
  });
  it("rejects writes and upstream errors without invented zero counts", async () => {
    expect((await serveContributions(new Request("https://site.test/api/contributions", { method: "POST" }))).status).toBe(405);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("Unavailable", { status: 429 })));
    const response = await serveContributions(new Request("https://site.test/api/contributions"));
    expect(response.status).toBe(503); expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(await response.json()).not.toHaveProperty("days");
  });
  it("uses only the fixed profile upstream and caches validated calendar data", async () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-29T05:00:00Z"));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(fixture("2026-10-29"))));
    const request = new Request("https://site.test/api/contributions?username=attacker");
    const response = await serveContributions(request);
    expect(response.status).toBe(200);
    const body: unknown = await response.json();
    expect(body).toHaveProperty("username", "DvineConqueror");
    expect(vi.mocked(fetch).mock.calls[0]?.[0]).toBe("https://github.com/users/DvineConqueror/contributions");
    expect((await serveContributions(request)).status).toBe(200);
    expect(fetch).toHaveBeenCalledOnce();
  });
});
