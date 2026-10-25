import { expect, test } from "@playwright/test";

for (const theme of ["dark", "light"]) {
  test(`portrait animates and replays on activation in ${theme} mode`, async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    const portrait = page.locator("#site-sidebar .portrait-link");
    for (let run = 0; run < 2; run++) {
      if (isMobile) await page.getByRole("button", { name: "Open menu", exact: true }).click();
      await portrait.locator("img").evaluate((image: HTMLImageElement) => image.decode());
      await expect(page.locator("#site-sidebar")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
      const motion = portrait.locator(".portrait-motion");
      const frame = portrait.locator(".portrait-frame");
      const before = (await frame.boundingBox())!;
      await portrait.click();
      await expect(page).toHaveURL(/#home$/);
      await expect(portrait).toHaveClass(/is-reacting/);
      await expect(motion).toHaveCSS("animation-name", "portrait-emerge");
      await motion.evaluate(async node => {
        node.getAnimations().forEach(animation => { animation.pause(); animation.currentTime = 330; });
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      const during = (await frame.boundingBox())!;
      expect(during.x).toBeCloseTo(before.x, 1);
      expect(during.y).toBeCloseTo(before.y, 1);
      expect(during.width).toBeCloseTo(before.width, 1);
      expect(during.height).toBeCloseTo(before.height, 1);
      await expect.poll(async () => (await portrait.locator("img").boundingBox())!.y, { timeout: 600, intervals: [16, 32, 64] }).toBeLessThan(during.y - 5);
      await expect(portrait).not.toHaveClass(/is-reacting/);
      await expect(motion).toHaveCSS("transform", "none");
      await expect(portrait.locator(".portrait-window")).toHaveCSS("clip-path", "circle(50% at 50% 50%)");
      const restingFrame = (await frame.boundingBox())!;
      const restingImage = (await portrait.locator("img").boundingBox())!;
      expect(restingImage.x).toBeGreaterThanOrEqual(restingFrame.x);
      expect(restingImage.y).toBeGreaterThanOrEqual(restingFrame.y);
      expect(restingImage.x + restingImage.width).toBeLessThanOrEqual(restingFrame.x + restingFrame.width);
      expect(restingImage.y + restingImage.height).toBeLessThanOrEqual(restingFrame.y + restingFrame.height);
      if (isMobile) {
        await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "true");
        await expect(motion).toHaveCSS("animation-name", "none");
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    if (isMobile) await page.getByRole("button", { name: "Open menu", exact: true }).click();
    await portrait.click();
    await expect(portrait).not.toHaveClass(/is-reacting/);
    await expect(portrait.locator(".portrait-motion")).toHaveCSS("animation-name", "none");
    await expect(portrait.locator(".portrait-tilt")).toHaveCSS("transform", "none");
  });
}

test("portrait emerges on hover, returns inside, and supports keyboard activation", async ({ page, isMobile }) => {
  test.skip(isMobile);
  await page.goto("./");
  const portrait = page.locator("#site-sidebar .portrait-link");
  const frame = portrait.locator(".portrait-frame");
  const before = await frame.boundingBox();
  await portrait.hover();
  await expect(portrait).toHaveClass(/is-reacting/);
  await expect(portrait).not.toHaveClass(/is-reacting/);
  await expect(portrait.locator(".portrait-window")).toHaveCSS("clip-path", "circle(50% at 50% 50%)");
  expect(await frame.boundingBox()).toEqual(before);
  await portrait.focus();
  await expect(portrait).not.toHaveClass(/is-reacting/);
  await page.keyboard.press("Enter");
  await expect(portrait).toHaveClass(/is-reacting/);
  await expect(portrait).toBeFocused();
  await expect(page).toHaveURL(/#home$/);
});
