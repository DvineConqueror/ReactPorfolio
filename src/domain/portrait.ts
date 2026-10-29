export const PORTRAIT_GRID_SIZE = 6;
export const PORTRAIT_CENTER = (PORTRAIT_GRID_SIZE - 1) / 2;
export type PortraitPose = { column: number; row: number };

/** Continuous target coordinates in the generated head-pose atlas. */
export function portraitTarget(x: number, y: number, rect: { left: number; top: number; width: number; height: number }): PortraitPose {
  const dx = x - (rect.left + rect.width / 2);
  const dy = y - (rect.top + rect.height / 2);
  if (Math.hypot(dx, dy) > 260) return { column: PORTRAIT_CENTER, row: PORTRAIT_CENTER };
  const extent = Math.max(120, Math.min(180, Math.max(rect.width, rect.height)));
  const axis = (distance: number) => PORTRAIT_CENTER * (1 + Math.max(-1, Math.min(1, distance / extent)));
  return { column: axis(dx), row: axis(dy) };
}

/** Time-based damping turns through intermediate angles and can retarget at any frame. */
export function advancePortraitPose(current: PortraitPose, target: PortraitPose, elapsedMs: number): PortraitPose {
  const amount = 1 - Math.exp(-Math.max(0, Math.min(elapsedMs, 32)) / 110);
  const axis = (value: number, goal: number) => {
    const next = value + (goal - value) * amount;
    return Math.abs(next - goal) < .005 ? goal : next;
  };
  return { column: axis(current.column, target.column), row: axis(current.row, target.row) };
}
