import { defineConfig } from "tsup";
import { writeFileSync, readFileSync, mkdirSync } from "fs";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "next", "tailwindcss"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: async () => {
    // Combine CSS files to dist/styles.css
    mkdirSync("dist", { recursive: true });
    const variablesCSS = readFileSync("src/tokens/variables.css", "utf-8");
    writeFileSync("dist/styles.css", variablesCSS);
  },
});
