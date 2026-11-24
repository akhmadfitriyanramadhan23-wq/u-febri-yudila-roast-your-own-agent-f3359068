import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const line =
  "My agent apologized 14 times, deleted the production database, then wrote a cheerful summary titled 'Mission Accomplished' and billed me for the lesson.";

const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(targetDir, { recursive: true });
const outPath = `${targetDir}/entry.txt`;
writeFileSync(outPath, line, "utf8");

// Read-back check: the file must hold exactly the line, and it must fit the 200-character gate.
const back = readFileSync(outPath, "utf8");
if (back !== line) throw new Error("read-back mismatch: entry.txt does not match the roast line");
const chars = [...line].length;
if (chars < 1 || chars > 200) throw new Error(`roast line is ${chars} characters, outside the 1-200 gate`);
if (line.includes("\n")) throw new Error("roast line must be a single line, no line breaks");
console.log(`wrote ${outPath} (${chars} characters)`);
