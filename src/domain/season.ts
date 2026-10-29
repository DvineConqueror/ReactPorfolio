export type Season = "off" | "halloween" | "christmas";
export const seasonNames: Record<Season, string> = { off: "Off", halloween: "Halloween", christmas: "Christmas" };
export function parseSeason(value: string | null): Season {
  return value === "halloween" || value === "christmas" ? value : "off";
}
export function parseSeasonMotion(value: string | null) { return value !== "false"; }

export const snowflakes = Array.from({ length: 96 }, (_, i) => ({
  x: (i * 37 + 7) % 100,
  drift: (i * 11 % 31) - 15,
  size: 2 + i % 3,
  duration: 4 + i * 7 % 5,
  delay: -(i * 13 % 80) / 10,
}));
