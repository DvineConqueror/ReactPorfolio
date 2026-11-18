import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const [auditStatus] = process.argv.slice(2);
const audit = JSON.parse(readFileSync(0, "utf8"));
assert(!audit.error && audit.auditReportVersion === 2, "npm audit did not return a report");

const { vulnerabilities, metadata } = audit;
const highFindings = Object.values(vulnerabilities).filter(
  ({ severity }) => severity === "high" || severity === "critical",
);
assert.equal(highFindings.length, metadata.vulnerabilities.high + metadata.vulnerabilities.critical);
assert.equal(auditStatus, highFindings.length ? "1" : "0", "Unexpected npm audit exit status");

const lockfile = JSON.parse(readFileSync("package-lock.json", "utf8"));
// shortcut: temporary dev-only exception, remove when a patched picomatch release ships.
const acceptedAdvisory = "https://github.com/advisories/GHSA-fc5q-39xc-vjpf";

function isAccepted(vulnerability, ancestors = []) {
  if (vulnerability?.severity !== "high" || !vulnerability.via?.length || ancestors.includes(vulnerability.name)) {
    return false;
  }

  return vulnerability.via.every((cause) => {
    if (typeof cause === "string") {
      return isAccepted(vulnerabilities[cause], [...ancestors, vulnerability.name]);
    }

    return vulnerability.name === "picomatch" && cause.name === "picomatch" && cause.severity === "high" &&
      cause.url === acceptedAdvisory && vulnerability.nodes.length > 0 &&
      vulnerability.nodes.every((path) => {
        const pkg = lockfile.packages[path];
        return pkg?.dev === true && pkg.version === "4.0.7";
      });
  });
}

const blocked = highFindings.filter((finding) => !isAccepted(finding));
if (blocked.length < highFindings.length) {
  console.warn(`Temporary exception for dev-only picomatch 4.0.7: ${acceptedAdvisory}`);
}
if (blocked.length) {
  console.error("Blocking npm audit findings:", JSON.stringify(blocked, null, 2));
  process.exitCode = 1;
}
