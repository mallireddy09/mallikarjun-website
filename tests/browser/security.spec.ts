import { expect, test } from "@playwright/test";

test("hero typing follows reduced-motion preference changes", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const role = page.locator(".hero-intro .typing");
  await expect(role).toHaveText("A Data Engineer");
  await expect(page.locator(".hero-intro .typed-cursor")).toHaveCount(0);
  await page.waitForTimeout(1600);
  await expect(role).toHaveText("A Data Engineer");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".hero-intro .typed-cursor")).toHaveCount(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(role).toHaveText("A Data Engineer");
  await expect(page.locator(".hero-intro .typed-cursor")).toHaveCount(0);
});

test("HTML, SVG, and CSS images load under the deployment base", async ({ page }) => {
  await page.goto("./");
  const results = await page.evaluate(async () => {
    const urls = new Set<string>();
    document.querySelectorAll<HTMLImageElement>("img").forEach(image => urls.add(image.src));
    document.querySelectorAll<SVGImageElement>("svg image").forEach(image => urls.add(new URL(image.href.baseVal, location.href).href));
    document.querySelectorAll(".nav-icon").forEach(element => {
      const url = getComputedStyle(element).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/)?.[1];
      if (url) urls.add(new URL(url, location.href).href);
    });
    return Promise.all([...urls].map(async url => {
      const image = new Image();
      image.src = url;
      try { await image.decode(); return { url, loaded: true }; }
      catch { return { url, loaded: false }; }
    }));
  });
  expect(results.length).toBeGreaterThan(20);
  expect(results.filter(result => !result.loaded)).toEqual([]);
  const origin = new URL(page.url()).origin;
  expect(results.filter(({ url }) => url.startsWith(origin) && !new URL(url).pathname.startsWith("/mallireddy09/"))).toEqual([]);
});

test("production bundle renders and preserves navigation under CSP", async ({ page }) => {
  const errors: string[] = [];
  const violations: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.exposeFunction("recordCspViolation", (directive: string) => violations.push(directive));
  await page.addInitScript(() => {
    document.addEventListener("securitypolicyviolation", event => {
      // This binding belongs only to the test page.
      (window as unknown as { recordCspViolation: (directive: string) => void })
        .recordCspViolation(event.effectiveDirective);
    });
  });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Mallikarjun Reddy");
  await expect(page.locator(".portfolio-section")).toHaveCount(9);
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass("light-theme");
  const openMenu = page.getByRole("button", { name: "Open menu", exact: true });
  if (await openMenu.isVisible()) await openMenu.click();
  await page.locator('#site-sidebar a[href="#about"]').click();
  await expect(page).toHaveURL(/\/mallireddy09\/#about$/);
  await page.goto("./certification?ref=security");
  await expect(page).toHaveURL(/\/mallireddy09\/\?ref=security#certifications$/);
  expect(errors).toEqual([]);
  expect(violations).toEqual([]);
});

test("production CSP blocks an injected inline script", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const result = await page.evaluate(() => new Promise<{ directive: string; executed: boolean }>(resolve => {
    document.addEventListener("securitypolicyviolation", event => {
      resolve({
        directive: event.effectiveDirective,
        executed: Boolean((window as unknown as { injectedScriptExecuted?: boolean }).injectedScriptExecuted),
      });
    }, { once: true });
    const script = document.createElement("script");
    script.textContent = "window.injectedScriptExecuted = true";
    document.head.appendChild(script);
  }));
  expect(result).toEqual({ directive: "script-src-elem", executed: false });
});
