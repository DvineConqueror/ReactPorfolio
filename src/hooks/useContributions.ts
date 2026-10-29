import { useSyncExternalStore } from "react";
import type { ContributionCalendar } from "../domain/contributions";

type State = { status: "loading" } | { status: "error" } | { status: "ready"; calendar: ContributionCalendar };
let state: State = { status: "loading" };
let pending = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach(listener => listener());

export async function loadContributions() {
  if (pending) return;
  pending = true; state = { status: "loading" }; emit();
  try {
    const response = await fetch("/api/contributions", { signal: AbortSignal.timeout(12_000) });
    if (!response.ok || !response.headers.get("Content-Type")?.includes("application/json")) throw new Error("Unavailable");
    const calendar = await response.json() as ContributionCalendar;
    if (calendar.username !== "DvineConqueror" || !Array.isArray(calendar.days) || !calendar.days.length || !Number.isFinite(Date.parse(calendar.fetchedAt))) throw new Error("Invalid calendar");
    state = { status: "ready", calendar };
  } catch { state = { status: "error" }; }
  finally { pending = false; emit(); }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  if (state.status === "loading" && !pending) void loadContributions();
  return () => { listeners.delete(listener); };
}
// The external store owns one shared request across StrictMode subscriptions and retries.
export function useContributions() { return useSyncExternalStore(subscribe, () => state); }
