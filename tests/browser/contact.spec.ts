import { expect, test } from "@playwright/test";

test("copy confirmation expires after ten seconds and hello animation respects reduced motion", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.clock.install();
  await page.goto("./");
  const hello = page.getByRole("link", { name: "Say hello", exact: true });
  const arrow = hello.locator("span");
  await hello.scrollIntoViewIfNeeded();
  await expect(arrow).toHaveCSS("animation-name", "hello-arrow-nudge");
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("button", { name: "Email copied", exact: true })).toBeVisible();
  await page.clock.fastForward(9_000);
  await expect(page.getByRole("button", { name: "Email copied", exact: true })).toBeVisible();
  await page.clock.fastForward(1_000);
  await expect(page.getByRole("button", { name: "Copy email", exact: true })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(arrow).toHaveCSS("animation-name", "none");
});
