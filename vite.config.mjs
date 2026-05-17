import { createRequire } from "node:module";
import { fileURLToPath, URL } from "node:url";

import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");
const VERSION = pkg.version;

export default defineConfig(({ mode }) => ({
  build: {
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(new URL("./src/index.js", import.meta.url)),
      name: "Table",
      fileName: "table",
    },
  },
  define: {
    NODE_ENV: JSON.stringify(mode),
    VERSION: JSON.stringify(VERSION),
  },
  server: {
    open: true,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    cssInjectedByJsPlugin({ useStrictCSP: true }),
    dts({
      tsconfigPath: "./tsconfig.json",
      entryRoot: "src",
    }),
  ],
}));
