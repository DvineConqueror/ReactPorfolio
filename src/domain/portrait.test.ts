import { describe, expect, it } from "vitest";
import { portraitDirection } from "./portrait";

const frame = { left: 100, top: 100, width: 160, height: 200 };
describe("portrait direction", () => {
  it.each([
    [40, 60, "up-left"], [180, 60, "up"], [320, 60, "up-right"],
    [40, 200, "left"], [320, 200, "right"],
    [40, 340, "down-left"], [180, 340, "down"], [320, 340, "down-right"],
  ] as const)("looks toward cursor at %s, %s", (x, y, expected) => expect(portraitDirection(x, y, frame)).toBe(expected));
  it("stays neutral at rest, in center dead zone and outside nearby radius", () => {
    expect(portraitDirection(180, 200, frame)).toBe("center");
    expect(portraitDirection(190, 215, frame)).toBe("center");
    expect(portraitDirection(600, 200, frame)).toBe("center");
  });
  it("uses viewport-relative coordinates after scrolling or moving layout", () => {
    expect(portraitDirection(40, 120, { ...frame, top: 20 })).toBe("left");
  });
});
