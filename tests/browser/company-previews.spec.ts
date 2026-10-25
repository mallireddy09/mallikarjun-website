import { expect, test } from "@playwright/test";

const companies = [
  { name: "NVIDIA", scene: "gpu" },
  { name: "Microsoft", scene: "cloud" },
  { name: "The Home Depot", scene: "home" },
  { name: "Uber", scene: "ride" },
];

for (const theme of ["dark", "light"]) {
  test(`company scenes work within the viewport in ${theme} mode`, async ({ page, isMobile }) => {
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    for (const company of companies) {
      const trigger = page.getByRole("button", { name: `Preview ${company.name}`, exact: true });
      if (isMobile) await trigger.tap(); else await trigger.hover();
      const preview = page.getByRole("tooltip").filter({ has: page.locator(`[data-company="${company.name}"]`) });
      await expect(preview).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(preview.locator(`svg[data-scene="${company.scene}"]`)).toBeVisible();
      const bounds = (await preview.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.y).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(page.viewportSize()!.height);
      if (isMobile) await trigger.tap(); else await page.mouse.move(0, 0);
      await expect(preview).toBeHidden();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("Uber car moves and company animations respect reduced motion", async ({ page, isMobile }) => {
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "Preview Uber", exact: true });
  if (isMobile) await trigger.tap(); else await trigger.hover();
  const car = page.getByRole("tooltip").locator(".uber-car");
  await expect(car).toBeVisible();
  const position = await car.evaluate(element => getComputedStyle(element).offsetDistance);
  await expect.poll(() => car.evaluate(element => getComputedStyle(element).offsetDistance)).not.toBe(position);
  const wheel = page.getByRole("tooltip").locator(".wheel-spokes").first();
  const rotation = await wheel.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => wheel.evaluate(element => getComputedStyle(element).transform)).not.toBe(rotation);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => car.evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  const preview = page.getByRole("tooltip");
  await expect(preview).toBeVisible();
  await expect.poll(() => preview.locator("svg *").evaluateAll(elements => elements.length > 0 && elements.every(node => getComputedStyle(node).animationName === "none"))).toBe(true);
});

test("keyboard users can preview companies and dismiss with Escape", async ({ page, isMobile }) => {
  test.skip(isMobile);
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "Preview NVIDIA", exact: true });
  await trigger.focus();
  const preview = page.getByRole("tooltip").filter({ has: page.locator('[data-company="NVIDIA"]') });
  await expect(preview).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(preview).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "false");
});

 test("company preview closes when tapping outside without console errors", async ({ page, isMobile }) => {
  const errors: string[] = [];
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "Preview Uber", exact: true });
  if (isMobile) await trigger.tap(); else await trigger.hover();
  await expect(page.getByRole("tooltip")).toBeVisible();
  if (isMobile) {
    await trigger.dispatchEvent("mouseout", { relatedTarget: null });
    await page.waitForTimeout(200);
    await expect(page.getByRole("tooltip")).toBeVisible();
  }
  await page.getByText("ENGINEERING IMPACT AT:", { exact: true }).click();
  await expect(page.getByRole("tooltip")).toBeHidden();
  expect(errors).toEqual([]);
});

test("NVIDIA fans and workload indicators animate and stop for reduced motion", async ({ page, isMobile }) => {
  await page.goto("./");
  const trigger = page.getByRole("button", { name: "Preview NVIDIA", exact: true });
  if (isMobile) await trigger.tap(); else await trigger.hover();
  const preview = page.getByRole("tooltip");
  const fans = preview.locator(".gpu-fan-rotor");
  await expect(fans).toHaveCount(3);
  const fan = fans.first();
  const rotation = await fan.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => fan.evaluate(element => getComputedStyle(element).transform)).not.toBe(rotation);
  const flow = preview.locator(".processing-flow");
  const offset = await flow.evaluate(element => getComputedStyle(element).strokeDashoffset);
  await expect.poll(() => flow.evaluate(element => getComputedStyle(element).strokeDashoffset)).not.toBe(offset);
  await expect(preview.locator(".compute-bar")).toHaveCount(12);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(preview).toBeVisible();
  await expect.poll(() => preview.locator(".scene-motion").evaluateAll(elements => elements.length > 0 && elements.every(node => getComputedStyle(node).animationName === "none"))).toBe(true);
});

for (const company of [
  { name: "Microsoft", detail: ".server-rack", count: 3, moving: ".cloud-data-flow", property: "strokeDashoffset" },
  { name: "The Home Depot", detail: ".depot-store, .delivery-home", count: 2, moving: ".delivery-van", property: "transform" },
  { name: "Uber", detail: ".uber-map .map-route, .uber-map .destination", count: 2, moving: ".map-progress", property: "strokeDashoffset" },
]) {
  test(`${company.name} detailed scene animates and respects reduced motion`, async ({ page, isMobile }) => {
    await page.goto("./");
    const trigger = page.getByRole("button", { name: `Preview ${company.name}`, exact: true });
    if (isMobile) await trigger.tap(); else await trigger.hover();
    const preview = page.getByRole("tooltip");
    await expect(preview.locator(company.detail)).toHaveCount(company.count);
    const moving = preview.locator(company.moving);
    const value = await moving.evaluate((node, property) => getComputedStyle(node).getPropertyValue(property), company.property === "transform" ? "transform" : "stroke-dashoffset");
    await expect.poll(() => moving.evaluate((node, property) => getComputedStyle(node).getPropertyValue(property), company.property === "transform" ? "transform" : "stroke-dashoffset")).not.toBe(value);
    if (company.name === "Uber") {
      await expect(preview.locator(".uber-car")).toBeVisible();
      await expect(preview.locator(".wheel-spokes")).toHaveCount(2);
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(preview).toBeVisible();
    await expect.poll(() => preview.locator(".scene-motion").evaluateAll(elements => elements.length > 0 && elements.every(node => getComputedStyle(node).animationName === "none"))).toBe(true);
  });
}
