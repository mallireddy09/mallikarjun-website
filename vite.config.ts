import react from "@vitejs/plugin-react";
import { createHash } from "node:crypto";
import { defineConfig } from "vitest/config";
import packageMetadata from "./package.json";

export default defineConfig({
  plugins: [react(), {
    name: "production-content-security-policy",
    apply: "build",
    transformIndexHtml(html) {
      // Authorize only the static JSON-LD block; never allow arbitrary inline scripts.
      const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
      if (!jsonLd) throw new Error("Expected portfolio JSON-LD block");
      const hash = createHash("sha256").update(jsonLd).digest("base64");
      return [{
        tag: "meta",
        attrs: {
          "http-equiv": "Content-Security-Policy",
          content: [
            "default-src 'self'",
            `script-src 'self' 'sha256-${hash}'`,
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https://leetcard.jacoblin.cool https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud",
            "connect-src 'self'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'none'",
          ].join("; "),
        },
        injectTo: "head-prepend",
      }];
    },
  }, {
    name: "release-metadata",
    apply: "build",
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "version.json",
        source: JSON.stringify({ version: packageMetadata.version, commit: process.env.GITHUB_SHA ?? null }) + "\n",
      });
    },
  }],
  base: process.env.PUBLIC_URL ? `${process.env.PUBLIC_URL.replace(/\/$/, "")}/` : "/",
  build: { outDir: "build" },
  server: { host: "127.0.0.1", port: 3000, strictPort: true },
  preview: { host: "127.0.0.1", port: 4173, strictPort: true },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.ts"],
  },
});
