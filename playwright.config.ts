import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL: "http://127.0.0.1:4174/mallireddy09/", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run preview -- --base=/mallireddy09/ --port=4174",
    url: "http://127.0.0.1:4174/mallireddy09/",
    reuseExistingServer: false,
  },
});
