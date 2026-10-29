import { describe, expect, it } from "vitest";
import { advancePortraitPose, PORTRAIT_CENTER, portraitTarget } from "./portrait";

const frame = { left: 100, top: 100, width: 160, height: 200 };
describe("continuous portrait target", () => {
  it.each([
    [0, -140], [140, -140], [140, 0], [140, 140],
    [0, 140], [-140, 140], [-140, 0], [-140, -140],
  ])("aims head toward cursor offset %s, %s", (dx, dy) => {
    const pose = portraitTarget(180 + dx, 200 + dy, frame);
    expect(Math.sign(pose.column - PORTRAIT_CENTER)).toBe(Math.sign(dx));
    expect(Math.sign(pose.row - PORTRAIT_CENTER)).toBe(Math.sign(dy));
  });
  it("returns neutral at center and outside nearby radius", () => {
    expect(portraitTarget(180, 200, frame)).toEqual({ column: 2.5, row: 2.5 });
    expect(portraitTarget(600, 200, frame)).toEqual({ column: 2.5, row: 2.5 });
  });
  it("provides intermediate angles rather than eight fixed directions", () => {
    const near = portraitTarget(230, 200, frame);
    const far = portraitTarget(310, 200, frame);
    expect(near.column).toBeGreaterThan(2.5);
    expect(near.column).toBeLessThan(far.column);
    expect(Number.isInteger(near.column)).toBe(false);
    expect(portraitTarget(40, 120, { ...frame, top: 20 }).row).toBe(2.5);
  });
});
describe("head-following damping", () => {
  it("turns through intermediate poses and retargets without jumping", () => {
    const start = { column: 0, row: 2.5 };
    const right = { column: 5, row: 2.5 };
    const next = advancePortraitPose(start, right, 16);
    expect(next.column).toBeGreaterThan(0);
    expect(next.column).toBeLessThan(1);
    const reverse = advancePortraitPose(next, start, 16);
    expect(reverse.column).toBeGreaterThan(0);
    expect(reverse.column).toBeLessThan(next.column);
  });
  it("keeps response consistent across frame rates", () => {
    const target = { column: 5, row: 0 };
    let fast = { column: 2.5, row: 2.5 };
    let slow = { ...fast };
    for (let i = 0; i < 10; i++) fast = advancePortraitPose(fast, target, 16);
    for (let i = 0; i < 5; i++) slow = advancePortraitPose(slow, target, 32);
    expect(fast.column).toBeCloseTo(slow.column, 8);
    expect(fast.row).toBeCloseTo(slow.row, 8);
  });
  it("settles on target and avoids teleporting after a stalled frame", () => {
    const target = { column: 5, row: 0 };
    let pose = { column: 0, row: 5 };
    expect(advancePortraitPose(pose, target, 1000).column).toBeLessThan(1.5);
    for (let i = 0; i < 80; i++) pose = advancePortraitPose(pose, target, 16);
    expect(pose).toEqual(target);
    expect(advancePortraitPose(target, target, 16)).toEqual(target);
  });
});
