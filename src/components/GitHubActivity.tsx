import { ArrowUpRight, Github } from "lucide-react";
import { calendarWeeks, contributionStats, dateKey, type ContributionCalendar } from "../domain/contributions";
import { loadContributions, useContributions } from "../hooks/useContributions";
import "./GitHubActivity.css";

const PROFILE = "https://github.com/DvineConqueror";
const number = (value: number) => value.toLocaleString("en-US");
const monthLabel = (week: ReturnType<typeof calendarWeeks>[number], first: string) => {
  const day = week.find(day => day?.date.endsWith("-01")) ?? week.find(day => day?.date === first);
  return day ? new Date(`${day.date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }) : "";
};
const shortDate = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

function ActivityGraphs({ calendar }: { calendar: ContributionCalendar }) {
  const today = dateKey(new Date());
  const stats = contributionStats(calendar.days, today);
  const weeks = calendarWeeks(calendar.days);
  const peak = Math.max(1, ...stats.recent.map(day => day.count));
  const last = calendar.days.at(-1)!;
  return <>
    <dl className="github-stats">{[[number(stats.total), "Contributions in shown period"], [`${stats.current} days`, "Current streak"], [`${stats.longest} days`, "Longest streak in shown period"], [number(stats.recentTotal), "Contributions · last 30 days"]].map(([value, label]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <div className="github-calendar-header"><h3>A year of building</h3><span>{shortDate(calendar.days[0]!.date)}, {calendar.days[0]!.date.slice(0, 4)} — {shortDate(last.date)}, {last.date.slice(0, 4)}</span></div>
    <div className="github-calendar-scroll" tabIndex={0} role="region" aria-label="Daily GitHub contributions. Scroll horizontally to explore the calendar.">
      <div className="github-calendar" role="img" aria-label={`${number(stats.total)} contributions across ${calendar.days.length} days. ${stats.activeDays} active days. Detailed daily counts follow below.`}>{weeks.map((week, i) => <div className="github-week" key={i}><span className="github-month">{monthLabel(week, calendar.days[0]!.date)}</span>{week.map((day, j) => <span key={day?.date ?? j} className="github-day" data-level={day?.level} title={day ? `${day.date}: ${number(day.count)} contributions` : undefined} />)}</div>)}</div>
    </div>
    <div className="github-calendar-footer"><span>{stats.activeDays} active days <span aria-hidden="true">·</span> every square is a day</span><span className="github-legend">Less {[0, 1, 2, 3, 4].map(level => <span key={level} className="github-day" data-level={level} />)} More</span></div>
    <div className="github-recent"><div><h3>The last 30 days</h3><p>{number(stats.recentTotal)} contributions, one day at a time.</p></div><svg className="github-bars" viewBox="0 0 600 100" role="img" aria-label={`Daily contributions for the last 30 days. Peak: ${peak}. Detailed daily counts follow below.`}>{stats.recent.map((day, i) => <rect key={day.date} x={i * 20 + 2} y={94 - day.count / peak * 86} width="13" height={Math.max(2, day.count / peak * 86)} rx="1" data-level={day.level}><title>{day.date}: {day.count} contributions</title></rect>)}</svg><div className="github-chart-dates"><span>{shortDate(stats.recent[0]?.date ?? today)}</span><span>{shortDate(last.date)}</span></div></div>
    <details className="github-data"><summary>Explore daily counts &amp; how streaks work</summary><p>GitHub’s public calendar, using UTC dates. Current streak includes yesterday while today is still in progress. Longest streak and totals cover only the period shown, not lifetime activity. Counts follow GitHub’s contribution rules and may include anonymized private activity if enabled on your profile.</p><div className="github-table-scroll" tabIndex={0} role="region" aria-label="Daily contribution counts"><table><caption>Daily contributions, most recent first</caption><thead><tr><th scope="col">Date (UTC)</th><th scope="col">Contributions</th></tr></thead><tbody>{[...calendar.days].reverse().map(day => <tr key={day.date}><th scope="row">{day.date}</th><td>{number(day.count)}</td></tr>)}</tbody></table></div></details>
    <p className="github-source">From GitHub’s public profile · updated <time dateTime={calendar.fetchedAt}>{new Date(calendar.fetchedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" })} UTC</time></p>
  </>;
}

export function GitHubActivity() {
  const state = useContributions();
  return <section id="activity" className="section-block github-section" aria-labelledby="activity-title"><div className="section-heading"><h2 id="activity-title"><span className="section-number">05 — </span>on GitHub</h2><p>The work between the releases. A look at what I’ve been building, day by day.</p></div><div className="github-panel"><header className="github-profile"><div><Github aria-hidden="true" /><span>@DvineConqueror</span></div><a className="text-link" href={PROFILE} target="_blank" rel="noreferrer">View profile <ArrowUpRight /></a></header>{state.status === "ready" ? <ActivityGraphs calendar={state.calendar} /> : state.status === "loading" ? <div className="github-loading" role="status"><span>Loading activity from GitHub…</span><div /></div> : <div className="github-error" role="status"><h3>Activity is taking a break.</h3><p>GitHub’s contribution calendar is temporarily unavailable. You can still explore my work on GitHub.</p><button className="text-link" type="button" onClick={() => void loadContributions()}>Try again <ArrowUpRight /></button></div>}</div></section>;
}
