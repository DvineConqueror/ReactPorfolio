import { dateKey, type ContributionCalendar, type ContributionDay } from "../src/domain/contributions";

const USERNAME = "DvineConqueror";
const SOURCE = `https://github.com/users/${USERNAME}/contributions`;
const TTL = 60 * 60 * 1000;
let cached: ContributionCalendar | undefined;

// Only extract dates, numeric levels and counts. Never forward upstream HTML to the browser.
export function parseContributionHtml(html: string, today: string): ContributionDay[] {
  const counts = new Map<string, number>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = /\bfor="([^"]+)"/.exec(match[1] ?? "")?.[1];
    const text = (match[2] ?? "").replace(/<[^>]*>/g, "").trim();
    const count = /^(No|[\d,]+) contributions? on\b/.exec(text)?.[1];
    if (id && count) counts.set(id, count === "No" ? 0 : Number(count.replaceAll(",", "")));
  }
  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const attributes = match[1] ?? "";
    const date = /\bdata-date="(\d{4}-\d{2}-\d{2})"/.exec(attributes)?.[1];
    if (!date || date > today) continue;
    const id = /\bid="([^"]+)"/.exec(attributes)?.[1];
    const level = Number(/\bdata-level="([0-4])"/.exec(attributes)?.[1]);
    const count = id ? counts.get(id) : undefined;
    if (!Number.isFinite(level) || count === undefined || !Number.isSafeInteger(count) || count < 0 || dateKey(new Date(date)) !== date) throw new Error("Invalid calendar");
    days.push({ date, level, count });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));
  if (days.length < 300 || days.length > 372 || days.at(-1)?.date !== today) throw new Error("Incomplete calendar");
  for (let i = 1; i < days.length; i++) {
    if (Date.parse(days[i]!.date) - Date.parse(days[i - 1]!.date) !== 86_400_000) throw new Error("Non-contiguous calendar");
  }
  return days;
}

export async function serveContributions(request: Request): Promise<Response> {
  const headers = { "X-Content-Type-Options": "nosniff" };
  if (request.method !== "GET") return Response.json({ message: "Method not allowed" }, { status: 405, headers: { ...headers, Allow: "GET" } });
  const now = new Date(), today = dateKey(now);
  if (cached && cached.days.at(-1)?.date === today && now.getTime() - Date.parse(cached.fetchedAt) < TTL) {
    return Response.json(cached, { headers: { ...headers, "Cache-Control": "public, max-age=300" } });
  }
  try {
    const options: RequestInit & { cf: { cacheTtl: number; cacheEverything: boolean } } = { headers: { Accept: "text/html", "User-Agent": "Henry-Alicoben-Portfolio" }, signal: AbortSignal.timeout(8000), cf: { cacheTtl: 3600, cacheEverything: true } };
    const upstream = await fetch(SOURCE, options);
    if (!upstream.ok) throw new Error("GitHub unavailable");
    cached = { username: USERNAME, days: parseContributionHtml(await upstream.text(), today), fetchedAt: now.toISOString() };
    return Response.json(cached, { headers: { ...headers, "Cache-Control": "public, max-age=300" } });
  } catch {
    return Response.json({ message: "GitHub activity is temporarily unavailable." }, { status: 503, headers: { ...headers, "Cache-Control": "no-store", "Retry-After": "60" } });
  }
}
