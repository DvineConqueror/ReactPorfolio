import { spawnSync } from "node:child_process";
import { mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, expect, it } from "vitest";

const script = fileURLToPath(new URL("./check-npm-audit.mjs", import.meta.url));
const advisory = {
  name: "picomatch",
  severity: "high",
  url: "https://github.com/advisories/GHSA-fc5q-39xc-vjpf",
};
const picomatch = { name: "picomatch", severity: "high", via: [advisory], nodes: ["node_modules/picomatch"] };
const tinyglobby = { name: "tinyglobby", severity: "high", via: ["picomatch"] };
const cwd = mkdtempSync(join(tmpdir(), "portfolio-audit-"));
const lockPath = join(cwd, "package-lock.json");
afterAll(() => {
  unlinkSync(lockPath);
  rmdirSync(cwd);
});

function runAudit(vulnerabilities, npmStatus, { dev = true, error } = {}) {
  writeFileSync(lockPath, JSON.stringify({ packages: { "node_modules/picomatch": { dev, version: "4.0.7" } } }));
  const findings = Object.values(vulnerabilities);
  return spawnSync(process.execPath, [script, npmStatus], {
    cwd,
    input: JSON.stringify({
      auditReportVersion: 2,
      error,
      vulnerabilities,
      metadata: {
        vulnerabilities: {
          high: findings.filter(({ severity }) => severity === "high").length,
          critical: findings.filter(({ severity }) => severity === "critical").length,
        },
      },
    }),
    encoding: "utf8",
  });
}

it("accepts a clean audit and the known dev-only finding through dependents", () => {
  expect(runAudit({}, "0").status).toBe(0);
  const result = runAudit({ picomatch, tinyglobby }, "1");
  expect(result.status).toBe(0);
  expect(result.stderr).toContain("Temporary exception");
});

it("blocks another advisory even when it affects the same package", () => {
  const additionalAdvisory = { ...advisory, url: "https://github.com/advisories/GHSA-xxxx-xxxx-xxxx" };
  const result = runAudit({ picomatch: { ...picomatch, via: [advisory, additionalAdvisory] }, tinyglobby }, "1");
  expect(result.status).toBe(1);
  expect(result.stderr).toContain(additionalAdvisory.url);
});

it("blocks a production dependency, a critical finding, and a failed audit", () => {
  expect(runAudit({ picomatch }, "1", { dev: false }).status).toBe(1);
  expect(runAudit({ picomatch, tinyglobby: { ...tinyglobby, severity: "critical" } }, "1").status).toBe(1);
  expect(runAudit({}, "1", { error: { code: "ENETUNREACH" } }).status).toBe(1);
});
