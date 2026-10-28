import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const privatePdf = await readFile("worker/private/resume.bin");
function assertPrivate(files) {
  for (const { name, bytes } of files) {
    assert(!/Alicoben-Resume.*\.pdf$/i.test(name), `Public résumé URL in build: ${name}`);
    assert(!bytes.equals(privatePdf), `Private PDF bytes in frontend build: ${name}`);
  }
}
// Positive controls prove the absence check rejects both renamed bytes and legacy URLs.
assert.throws(() => assertPrivate([{ name: "renamed.bin", bytes: privatePdf }]), /Private PDF bytes/);
assert.throws(() => assertPrivate([{ name: "Alicoben-Resume-hash.pdf", bytes: Buffer.from("other") }]), /Public résumé URL/);
async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(name));
    else files.push({ name, bytes: await readFile(name) });
  }
  return files;
}
const files = await collect("dist");
assert(files.some(({ name }) => name.endsWith(".html")), "Build is missing; run npm run build first.");
assertPrivate(files);
assert(files.some(({ name }) => /zuitt.*\.pdf$/i.test(name)), "Public certificate original missing.");
console.log(`Private résumé build verification passed (${files.length} frontend files checked).`);
