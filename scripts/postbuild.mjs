// Runs after `next build` (see package.json "build").
// When the Portfolio page is disabled in src/config/site.ts, remove its
// exported folder so the live server answers /portfolio/ with a real 404.
import { existsSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const config = readFileSync(join(root, "src/config/site.ts"), "utf8");
const enabled = /portfolioEnabled:\s*true/.test(config);
const dir = join(root, "out", "portfolio");

if (!enabled && existsSync(dir)) {
  rmSync(dir, { recursive: true, force: true });
  console.log("postbuild: portfolio disabled — removed out/portfolio (served as 404).");
} else {
  console.log(`postbuild: portfolio ${enabled ? "enabled" : "already absent"}.`);
}
