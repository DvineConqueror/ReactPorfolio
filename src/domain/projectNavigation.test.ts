import { describe, expect, it } from "vitest";
import { projectHash, projectIdFromHash } from "./projectNavigation";

describe("shareable project routes", () => {
  it("round trips project IDs and leaves section navigation alone", () => {
    for (const id of ["bayantrack", "aio-converter", "name with spaces"]) expect(projectIdFromHash(projectHash(id))).toBe(id);
    for (const hash of ["", "#work", "#project-", "#project-%bad"]) expect(projectIdFromHash(hash)).toBeNull();
  });
});
