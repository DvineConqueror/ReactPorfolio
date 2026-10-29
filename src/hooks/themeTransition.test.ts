import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cancelThemeTransition, revealTheme } from "./themeTransition";
import { themeRevealFrames } from "../domain/themeReveal";

describe("pixel theme reveal", () => {
  let root: { dataset: Record<string, string>; animate: ReturnType<typeof vi.fn> };
  let start: ReturnType<typeof vi.fn>;
  let cancelAnimation: ReturnType<typeof vi.fn>;
  let callbacks: (() => void)[];
  let finish: (() => void)[];
  let transitions: { ready: Promise<void>; finished: Promise<void>; skipTransition: ReturnType<typeof vi.fn> }[];

  beforeEach(() => {
    callbacks = []; finish = []; transitions = [];
    cancelAnimation = vi.fn();
    root = { dataset: { theme: "light" }, animate: vi.fn(() => ({ cancel: cancelAnimation })) };
    start = vi.fn((callback: () => void) => {
      callbacks.push(callback);
      const transition = { ready: Promise.resolve(), finished: new Promise<void>((resolve) => finish.push(resolve)), skipTransition: vi.fn() };
      transitions.push(transition);
      return transition;
    });
    vi.stubGlobal("document", { documentElement: root, hidden: false, startViewTransition: start });
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    vi.stubGlobal("innerWidth", 1440); vi.stubGlobal("innerHeight", 900);
  });
  afterEach(() => { cancelThemeTransition(); vi.unstubAllGlobals(); });

  it("starts from one point and covers every corner at desktop, phone and off-center origins", () => {
    for (const [x, y, width, height] of [[30, 700, 1440, 900], [360, 40, 390, 844], [384, 512, 768, 1024]]) {
      const [first, last] = themeRevealFrames(x!, y!, width!, height!);
      expect(first!.split(", ").length).toBe(20);
      expect(first!.match(/-?\d+(?:\.\d+)?px/g)?.every((n, i) => Number(n.slice(0, -2)) === (i % 2 ? y : x))).toBe(true);
      const numbers = last!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      const points = Array.from({ length: 20 }, (_, i) => [numbers[i * 2]!, numbers[i * 2 + 1]!] as const);
      const contains = (px: number, py: number) => {
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
          const [ax, ay] = points[i]!, [bx, by] = points[j]!;
          if ((ay > py) !== (by > py) && px < (bx - ax) * (py - ay) / (by - ay) + ax) inside = !inside;
        }
        return inside;
      };
      for (const [px, py] of [[.1, .1], [width! - .1, .1], [.1, height! - .1], [width! - .1, height! - .1]]) expect(contains(px!, py!)).toBe(true);
    }
  });

  it("skips snapshot work when the effective palette is unchanged", () => {
    revealTheme("light");
    expect(start).not.toHaveBeenCalled();
  });

  it("honors reduced motion and unsupported browsers", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    revealTheme("dark");
    expect(root.dataset.theme).toBe("dark");
    expect(start).not.toHaveBeenCalled();
    document.startViewTransition = undefined!;
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    revealTheme("light");
    expect(root.dataset.theme).toBe("light");
  });

  it("animates a pixel polygon on the new root snapshot and removes temporary state", async () => {
    revealTheme("dark"); callbacks[0]!();
    await Promise.resolve();
    expect(root.dataset.theme).toBe("dark");
    expect(root.animate).toHaveBeenCalledWith({ clipPath: themeRevealFrames(720, 450, 1440, 900) }, expect.objectContaining({ duration: 580, pseudoElement: "::view-transition-new(root)" }));
    finish[0]!(); await Promise.resolve();
    expect(root.dataset.themeReveal).toBeUndefined();
    expect(cancelAnimation).toHaveBeenCalled();
  });

  it("ignores stale callbacks and cleanup after a rapid reversal", async () => {
    revealTheme("dark"); callbacks[0]!();
    revealTheme("light");
    expect(transitions[0]!.skipTransition).toHaveBeenCalled();
    callbacks[1]!(); callbacks[0]!();
    finish[0]!(); await Promise.resolve();
    expect(root.dataset.theme).toBe("light");
    expect(root.dataset.themeReveal).toBe("pixel");
    finish[1]!(); await Promise.resolve();
    expect(root.dataset.themeReveal).toBeUndefined();
  });

  it("keeps theme selection working when the snapshot API throws", () => {
    start.mockImplementation(() => { throw new Error("snapshot unavailable"); });
    revealTheme("dark");
    expect(root.dataset.theme).toBe("dark");
    expect(root.dataset.themeReveal).toBeUndefined();
  });
});
