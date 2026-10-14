import { expect, test } from "@playwright/test";

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
