import { execSync } from "node:child_process";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

// The Forgejo deploy lives under /tmp/dvp/; GitHub Pages sets VITE_BASE to
// /DV2026-GrizzlyBears/ at build time.
const base = process.env.VITE_BASE || "/tmp/dvp/";

/** Short HEAD hash, also available to Nix/CI builds via VITE_COMMIT. */
function gitCommit() {
  if (process.env.VITE_COMMIT) return process.env.VITE_COMMIT.trim();

  try {
    return execSync("git rev-parse --short HEAD", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "dev";
  }
}

export default defineConfig({
  base,
  define: {
    __COMMIT__: JSON.stringify(gitCommit()),
    __REPO__: JSON.stringify(
      process.env.VITE_REPO_URL || "https://g.rcastellotti.dev/rc/dvp",
    ),
  },
  plugins: [preact(), tailwindcss()],
});
