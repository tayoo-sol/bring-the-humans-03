import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  process.stderr.write("error: MAKEFUN_OUTPUT_DIR is not set\n");
  process.exit(1);
}
const videoPath = join(here, "VIDEO.json");
let video;
try {
  video = JSON.parse(readFileSync(videoPath, "utf8"));
} catch {
  process.stderr.write("error: VIDEO.json is not valid JSON\n");
  process.exit(1);
}
if (
  typeof video !== "object" ||
  video === null ||
  typeof video.url !== "string" ||
  video.url.length === 0
) {
  process.stderr.write("error: VIDEO.json url must be a non-empty string\n");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });
copyFileSync(videoPath, join(outDir, "VIDEO.json"));
