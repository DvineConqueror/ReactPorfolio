export interface ContributionDay { date: string; count: number; level: number }
export interface ContributionCalendar { days: ContributionDay[]; fetchedAt: string; username: string }
const DAY = 86_400_000;
export function dateKey(date: Date) { return date.toISOString().slice(0, 10); }

export function contributionStats(days: ContributionDay[], today: string) {
  const past = days.filter(day => day.date <= today);
  const cutoff = dateKey(new Date(Date.parse(today) - 29 * DAY));
  const recent = past.filter(day => day.date >= cutoff);
  let longest = 0, run = 0;
  for (const day of past) { run = day.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }
  // A day in progress does not break yesterday's streak.
  let index = past.length - 1;
  if (past[index]?.date === today && past[index]?.count === 0) index--;
  const yesterday = dateKey(new Date(Date.parse(today) - DAY));
  let current = 0;
  if ((past[index]?.date ?? "") >= yesterday) {
    while (index >= 0 && (past[index]?.count ?? 0) > 0) { current++; index--; }
  }
  return { total: past.reduce((sum, day) => sum + day.count, 0), recentTotal: recent.reduce((sum, day) => sum + day.count, 0), current, longest, recent, activeDays: past.filter(day => day.count > 0).length };
}

export function calendarWeeks(days: ContributionDay[]) {
  const offset = days[0] ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  const cells: (ContributionDay | null)[] = [...Array<null>(offset).fill(null), ...days];
  return Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) => cells.slice(index * 7, index * 7 + 7));
}
