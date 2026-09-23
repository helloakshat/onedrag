/**
 * Build-time guard on the chip sequence (CLAUDE.md §5).
 *
 * Chip numbers are page order, spent by each page in render order. A section
 * that is conditionally dropped — Related work, when no case study matches —
 * must not spend a number, or the sequence gains a hole; and two sections must
 * never share one. Neither failure is visible to the type system, so the built
 * HTML is checked instead: this reads every prerendered page and fails the
 * build on a duplicate, a gap, or a sequence that does not start at 01.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const APP_DIR = path.join(process.cwd(), ".next/server/app");

async function pages(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await pages(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const files = await pages(APP_DIR);
const failures = [];

for (const file of files) {
  const html = await readFile(file, "utf8");
  const route = "/" + path
    .relative(APP_DIR, file)
    .replace(/\.html$/, "")
    .replace(/^index$/, "");

  const chips = [...html.matchAll(/data-chip-number="(\d+)"[^>]*data-chip-label="([^"]*)"/g)]
    .map((m) => ({ number: Number(m[1]), label: m[2] }));
  if (chips.length === 0) continue;

  const seen = new Map();
  for (const { number, label } of chips) {
    if (seen.has(number)) {
      failures.push(`${route}: ${String(number).padStart(2, "0")} used twice — "${seen.get(number)}" and "${label}"`);
    }
    seen.set(number, label);
  }

  if (chips[0].number !== 1) {
    failures.push(`${route}: sequence starts at ${chips[0].number}, expected 01`);
  }
  for (let i = 1; i < chips.length; i++) {
    const step = chips[i].number - chips[i - 1].number;
    if (step > 1) {
      failures.push(
        `${route}: gap before "${chips[i].label}" — ${String(chips[i - 1].number).padStart(2, "0")} jumps to ${String(chips[i].number).padStart(2, "0")}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error("\nChip sequence check failed:\n");
  for (const f of failures) console.error(`  ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`Chip sequence OK across ${files.length} prerendered pages.`);
