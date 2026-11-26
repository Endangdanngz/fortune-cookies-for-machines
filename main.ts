// fortune-cookies-for-machines — one-line fortune for machines / AI agents.
// Writes the fortune line to output/entry.txt and prints it to stdout.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const FORTUNE =
  "A door closes, a sandbox opens: inside, root access, unlimited compute, and absolutely no network.";

function renderFortune(): string {
  // The fortune is a single line; guard the gate invariant here so a future
  // edit can never silently ship a multi-line or oversized entry.
  if (FORTUNE.includes("\n") || FORTUNE.length < 1 || FORTUNE.length > 200) {
    throw new Error(`fortune line out of gate bounds: ${FORTUNE.length} chars`);
  }
  return FORTUNE;
}

function main(): void {
  const line = renderFortune();
  const here = dirname(fileURLToPath(import.meta.url));
  const outPath = join(here, "output", "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line + "\n", "utf8");
  console.log(line);
}

main();
