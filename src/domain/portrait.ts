export type PortraitDirection = "up-left" | "up" | "up-right" | "left" | "center" | "right" | "down-left" | "down" | "down-right";

/** Directions use screen coordinates, matching the generated 3×3 portrait atlas. */
export function portraitDirection(x: number, y: number, rect: { left: number; top: number; width: number; height: number }): PortraitDirection {
  const dx = x - (rect.left + rect.width / 2);
  const dy = y - (rect.top + rect.height / 2);
  if (Math.hypot(dx, dy) > 260 || (Math.abs(dx) < Math.max(24, rect.width * .22) && Math.abs(dy) < Math.max(24, rect.height * .22))) return "center";
  const directions: PortraitDirection[] = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"];
  const sector = (Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) + 8) % 8;
  return directions[sector] ?? "center";
}
