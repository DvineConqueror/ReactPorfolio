const outline = [
  [-1, -3], [1, -3], [1, -2], [2, -2], [2, -1],
  [3, -1], [3, 1], [2, 1], [2, 2], [1, 2],
  [1, 3], [-1, 3], [-1, 2], [-2, 2], [-2, 1],
  [-3, 1], [-3, -1], [-2, -1], [-2, -2], [-1, -2],
] as const;

export function themeRevealFrames(x: number, y: number, width: number, height: number) {
  // Fit the three stepped rectangles tightly so the viewport keeps revealing through the full motion.
  const reach = Math.max(...[[0, 0], [width, 0], [0, height], [width, height]].map(([cx, cy]) => {
    const dx = Math.abs(cx! - x), dy = Math.abs(cy! - y);
    return Math.min(Math.max(dx, dy / 3), Math.max(dx / 2, dy / 2), Math.max(dx / 3, dy));
  })) + 1;
  const polygon = (scale: number) => `polygon(${outline.map(([dx, dy]) => `${x + dx * scale}px ${y + dy * scale}px`).join(", ")})`;
  return [polygon(0), polygon(reach)];
}
