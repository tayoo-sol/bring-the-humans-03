import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) process.exit(1);
mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "VIDEO.json"), join(outDir, "VIDEO.json"));
