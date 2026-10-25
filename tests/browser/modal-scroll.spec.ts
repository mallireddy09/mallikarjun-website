import { expect, test, type Page } from "@playwright/test";

async function scrollAt(page: Page, touch: boolean, x: number, y: number, distance = 240) {
  if (touch) {
    const session = await page.context().newCDPSession(page);
    // Dispatch an actual swipe: synthesized scroll gestures can be ignored by Linux headless Chromium.
    await session.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
    const end = Math.max(12, y - distance);
    for (let step = 1; step <= 10; step++) {
      await session.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x, y: y + (end - y) * step / 10 }] });
      await page.waitForTimeout(16);
    }
    await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await session.detach();
  } else {
    await page.mouse.move(x, y);
    await page.mouse.wheel(0, distance);
  }
  // Wheel and touch scrolling settle asynchronously after input dispatch.
  await page.waitForTimeout(120);
}

const stages = ["Events", "APIs", "Databases", "Ingestion", "Stream + process", "Trusted data", "Analytics", "AI / ML"];

for (const theme of ["dark", "light"]) {
  test(`every example modal locks background scrolling in ${theme} mode`, async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    for (const name of stages) {
      const node = page.locator(".hero-art").getByRole("button", { name, exact: true });
      await node.scrollIntoViewIfNeeded();
      const before = await page.evaluate(() => scrollY);
      await node.click();
      const dialog = page.getByRole("dialog", { name, exact: true });
      await expect(dialog).toBeVisible();
      expect(await page.evaluate(() => scrollY)).toBe(before);
      const viewport = page.viewportSize()!;
      await scrollAt(page, isMobile, viewport.width - 6, viewport.height - 25);
      expect(await page.evaluate(() => scrollY)).toBe(before);
      await page.getByRole("button", { name: "Close example", exact: true }).click();
      await expect(dialog).toBeHidden();
      await expect(page.locator(".MuiDialog-root")).toBeHidden();
      expect(await page.evaluate(() => scrollY)).toBe(before);
      await expect(node).toBeFocused();
    }
    const before = await page.evaluate(() => scrollY);
    const viewport = page.viewportSize()!;
    await scrollAt(page, isMobile, viewport.width - 6, viewport.height - 25);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  });

  test(`long modal content scrolls without moving the background in ${theme} mode`, async ({ page, isMobile }) => {
    await page.setViewportSize({ width: isMobile ? 390 : 1280, height: 400 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    await page.locator(".hero-art").getByRole("button", { name: "AI / ML", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "AI / ML", exact: true });
    await expect(dialog).toBeVisible();
    const before = await page.evaluate(() => scrollY);
    const content = dialog.locator(".MuiDialogContent-root");
    expect(await content.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
    const box = (await content.boundingBox())!;
    await scrollAt(page, isMobile, box.x + box.width / 2, box.y + box.height / 2, 150);
    await expect.poll(() => content.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
    expect(await page.evaluate(() => scrollY)).toBe(before);
    await content.evaluate(element => { element.scrollTop = element.scrollHeight; });
    await scrollAt(page, isMobile, box.x + box.width / 2, box.y + box.height / 2, 240);
    expect(await page.evaluate(() => scrollY)).toBe(before);
    await expect(page.getByRole("button", { name: "Close example", exact: true })).toBeInViewport({ ratio: 1 });
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest(".MuiDialog-root")))).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.locator(".MuiDialog-root")).toBeHidden();
    expect(await page.evaluate(() => scrollY)).toBe(before);
    await scrollAt(page, isMobile, page.viewportSize()!.width - 6, 350);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  });
}

test("hover previews allow normal page scrolling", async ({ page, isMobile }) => {
  test.skip(isMobile);
  await page.goto("./");
  await page.locator(".hero-art").getByRole("button", { name: "Events", exact: true }).hover();
  await expect(page.getByRole("dialog", { name: "Events", exact: true })).toBeVisible();
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 240);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
});
