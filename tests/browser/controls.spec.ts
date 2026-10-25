import { expect, test } from "@playwright/test";

test("light-theme controls hide after switching themes and scrolling", async ({ page }, testInfo) => {
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  const theme = page.getByRole("button", { name: "Toggle theme" });
  const menu = page.locator(".ham-burger-menu");
  await theme.click();
  await expect(page.locator("html")).toHaveClass("light-theme");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(248, 249, 252)");
  await page.locator("#certifications").evaluate(element => {
    window.scrollTo({ top: element.getBoundingClientRect().top + scrollY + 120, behavior: "instant" });
  });
  await expect(theme).toHaveCSS("opacity", "0");
  await expect(menu).toHaveCSS("opacity", "0");
  await expect(theme).not.toBeInViewport();
  await page.screenshot({ path: testInfo.outputPath("light-theme-controls-hidden.png"), scale: "css" });
  await page.evaluate(() => window.scrollBy(0, -96));
  await expect(theme).toHaveCSS("opacity", "1");
  await expect(menu).toHaveCSS("opacity", "1");
  await theme.evaluate(element => element.focus({ preventScroll: true }));
  await page.keyboard.press("Tab");
  await expect(menu.locator("button")).toBeFocused();
  await page.evaluate(() => window.scrollBy(0, 160));
  await expect(menu).toHaveCSS("opacity", "1");
  await expect(menu).toBeInViewport();
});

test("floating controls clear scrolled content and return on upward scroll or keyboard focus", async ({ page }) => {
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  const theme = page.getByRole("button", { name: "Toggle theme" });
  const menu = page.locator(".ham-burger-menu");
  await expect(theme).toBeInViewport();
  await page.locator("#certifications").evaluate(element => {
    window.scrollTo({ top: element.getBoundingClientRect().top + scrollY + 120, behavior: "instant" });
  });
  await expect(theme).toHaveCSS("opacity", "0");
  await expect(menu).toHaveCSS("opacity", "0");
  await expect(theme).not.toBeInViewport();
  await expect(menu).not.toBeInViewport();

  // Off-screen controls remain reachable through the keyboard focus order.
  await theme.evaluate(element => element.focus({ preventScroll: true }));
  await expect(theme).toHaveCSS("opacity", "1");
  await expect(theme).toBeInViewport();
  await page.keyboard.press("Tab");
  await expect(menu.locator("button")).toBeFocused();
  await expect(menu).toBeInViewport();
  await menu.locator("button").evaluate(element => element.blur());
  await expect(theme).toHaveCSS("opacity", "0");

  await page.evaluate(() => window.scrollBy(0, -96));
  await expect(theme).toHaveCSS("opacity", "1");
  await expect(menu).toHaveCSS("opacity", "1");
  await expect(theme).toBeInViewport();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect(theme).toBeInViewport();
});

test("an open drawer keeps its close control available", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("./");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: "instant" }));
  const close = page.getByRole("button", { name: "Close menu", exact: true });
  await expect(close).toBeInViewport();
  await expect(page.locator(".ham-burger-menu")).toHaveCSS("opacity", "1");
  await close.click();
  await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
});
