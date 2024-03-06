import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { glob } from "glob";
import { extname, relative } from "path";
import { fileURLToPath } from "url";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
    },
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync("src/**/*.{js,ts,tsx}", {
            ignore: ["src/**/*.{stories,test}.{ts,tsx}"],
          })
          .map((file) => [
            // This remove `src/` as well as the file extension from each
            // file, so e.g. src/nested/foo.js becomes nested/foo
            relative("src", file.slice(0, file.length - extname(file).length)),
            // This expands the relative paths to absolute paths, so e.g.
            // src/nested/foo becomes /project/src/nested/foo.js
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
      external: [
        "react/jsx-runtime",
        ...Object.keys(packageJson.peerDependencies),
      ],
    },
  },
});
