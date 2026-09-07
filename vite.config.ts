import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import nodeCrypto, { webcrypto } from "node:crypto";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcss from "@tailwindcss/vite";

// Vite 5 uses node:crypto.getRandomValues while resolving its config.
// Older Node and some Bun compatibility layers expose this API only through Web Crypto.
if (typeof nodeCrypto.getRandomValues !== "function") {
  Object.defineProperty(nodeCrypto, "getRandomValues", {
    value: webcrypto.getRandomValues.bind(webcrypto),
    configurable: true,
  });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [tailwindcss(), react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
