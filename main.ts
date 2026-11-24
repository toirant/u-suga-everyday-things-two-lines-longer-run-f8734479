// Everyday Things, Two Lines, Longer Run — make.fun entry.
// Writes a two-line explanation of a queue to /output/entry.txt.
// Line 1 explains a queue to a 10-year-old in a single vivid sentence
// built on one analogy. Line 2 says why that analogy works: what it
// maps and what it leaves out. Total must stay within 1-400 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE_1 =
  "A queue is a human train that forgot its engine, so everyone shuffles forward one sleepy step at a time, held together only by the promise of what's at the front.";
const LINE_2 =
  "The train picture works because it maps the single-file order and the slow shared pace, but it leaves out the choosing, since nobody picked a seat and anyone can step out of line and walk away.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// Validate the entry the way the gate does: UTF-8 text, 1-400
// characters, not only whitespace, exactly two non-empty lines, and
// exactly one sentence per line.
const body = entry.trim();
if (body.length < 1 || body.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${body.length}`);
}
const lines = body.split("\n");
if (lines.length !== 2 || lines.some((line) => line.trim().length === 0)) {
  throw new Error(`entry must be exactly two non-empty lines, got ${lines.length}`);
}
for (const line of lines) {
  const sentences = line.split(".").filter((part) => part.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`each line must be a single sentence: ${line}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", entry, "utf8");

// Read-back round-trip: confirm what landed on disk is byte for byte
// what we validated above.
const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== entry) {
  throw new Error("read-back mismatch: /output/entry.txt differs from validated entry");
}
console.log(`wrote /output/entry.txt (${body.length} chars, 2 lines, round-trip OK)`);
