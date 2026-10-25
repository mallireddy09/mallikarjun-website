import { expect, test, type Locator } from "@playwright/test";

async function relativeBounds(locator: Locator) {
  return locator.evaluate(element => {
    const box = element.getBoundingClientRect();
    const parent = element.closest('[role="tab"], [role="button"]')!.getBoundingClientRect();
    return { x: box.x - parent.x, y: box.y - parent.y, width: box.width, height: box.height };
  });
}

function expectStable(actual: Awaited<ReturnType<typeof relativeBounds>>, before: Awaited<ReturnType<typeof relativeBounds>>) {
  for (const key of ["x", "y", "width", "height"] as const) expect(actual[key]).toBeCloseTo(before[key], 2);
}

const heroArtwork = [
  { name: "Events", part: ".event-lift", property: "transform" },
  { name: "APIs", part: ".api-pulse", property: "transform" },
  { name: "Databases", part: ".storage-light", property: "opacity" },
  { name: "Ingestion", part: ".ingestion-packet", property: "offset-distance" },
  { name: "Stream + process", part: ".gear-wheel", property: "transform" },
  { name: "Trusted data", part: ".trusted-check", property: "stroke-dashoffset" },
  { name: "Analytics", part: ".scan-glass", property: "transform" },
  { name: "AI / ML", part: ".brain-pulse", property: "transform" },
];

for (const theme of ["dark", "light"]) {
  test(`pipeline artwork moves independently from labels in ${theme} mode`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    await page.evaluate(() => document.fonts.ready);
    for (const artwork of heroArtwork) {
      const node = page.locator(".hero-art").getByRole("button", { name: artwork.name, exact: true });
      const label = node.locator("text");
      const before = await relativeBounds(label);
      const moving = node.locator(artwork.part).first();
      const initial = await moving.evaluate((element, property) => getComputedStyle(element).getPropertyValue(property), artwork.property);
      await expect.poll(() => moving.evaluate((element, property) => getComputedStyle(element).getPropertyValue(property), artwork.property)).not.toBe(initial);
      expectStable(await relativeBounds(label), before);
    }
    const database = page.locator('[data-artwork="database"]').first();
    const trusted = page.locator('[data-artwork="trusted"]');
    await expect(database.locator("image")).toHaveCount(1);
    await expect(trusted.locator("image")).toHaveCount(0);
    await expect(trusted.locator(".trusted-check")).toHaveCount(1);
    for (const selector of [".event-lift", ".api-pulse", ".brain-pulse"]) {
      const amplitude = await page.locator(`.hero-art ${selector}`).evaluate(async element => {
        const animation = element.getAnimations()[0];
        animation.pause();
        const sample = async (time: number) => {
          animation.currentTime = time;
          await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          return new DOMMatrix(getComputedStyle(element).transform);
        };
        const start = await sample(0);
        const middle = await sample(Number(animation.effect!.getTiming().duration) / 2);
        animation.play();
        return Math.hypot(middle.e - start.e, middle.f - start.f);
      });
      expect(amplitude).toBeGreaterThan(5);
    }
    await page.locator("#skills").scrollIntoViewIfNeeded();
    for (const [name, selector, property] of [
      ["Ingest", ".ingestion-packet", "offset-distance"], ["Process", ".gear-wheel", "transform"],
      ["Store", ".storage-light", "opacity"], ["Observe", ".scan-glass", "transform"],
    ]) {
      const tab = page.getByRole("tab", { name, exact: true });
      const label = tab.locator(".stage-name");
      const before = await relativeBounds(label);
      const part = tab.locator(selector).first();
      const initial = await part.evaluate((element, prop) => getComputedStyle(element).getPropertyValue(prop), property);
      await expect.poll(() => part.evaluate((element, prop) => getComputedStyle(element).getPropertyValue(prop), property)).not.toBe(initial);
      expectStable(await relativeBounds(label), before);
    }
    const observe = page.getByRole("tab", { name: "Observe", exact: true });
    const monitor = observe.locator(".monitor-body");
    const monitorBounds = await relativeBounds(monitor);
    const glass = observe.locator(".scan-glass");
    const glassPosition = await glass.evaluate(element => getComputedStyle(element).transform);
    await expect.poll(() => glass.evaluate(element => getComputedStyle(element).transform)).not.toBe(glassPosition);
    expectStable(await relativeBounds(monitor), monitorBounds);
    const process = page.getByRole("tab", { name: "Process", exact: true });
    await expect(process.locator(".gear-wheel")).toHaveCount(2);
    await expect(process.locator(".gear-counter")).toHaveCSS("animation-direction", "reverse");
    await process.click();
    await expect(page.getByRole("tabpanel")).toContainText("Turn data into something useful.");
    await observe.click();
    await expect(page.getByRole("tabpanel")).toContainText("Know how your platform performs.");
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const part of await page.locator(".pipeline-artwork .art-motion").all()) {
      expect(await part.evaluate(element => getComputedStyle(element).animationName)).toBe("none");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}
