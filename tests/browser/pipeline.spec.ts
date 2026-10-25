import { expect, test } from "@playwright/test";

const stages = [
  { name: "Events", example: '"event": "cart.item_added"' },
  { name: "APIs", example: "/api/weather?city=Austin" },
  { name: "Databases", example: "Mallikarjun" },
  { name: "Ingestion", example: "Raw landing zone" },
  { name: "Stream + process", example: "Convert text to a number" },
  { name: "Trusted data", example: "Quality checks" },
  { name: "Analytics", example: "Sales dashboard" },
  { name: "AI / ML", example: "Estimated delivery: 2 days" },
];

test("phone-sized screens keep every example inside the viewport", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (testInfo.project.name === "desktop") {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("./");
    await page.locator(".hero-art").getByRole("button", { name: "Databases", exact: true }).hover();
    await expect(page.getByRole("dialog", { name: "Databases", exact: true })).toBeVisible();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 740 });
    await page.goto("./");
    const database = page.locator(".hero-art").getByRole("button", { name: "Databases", exact: true });
    await database.hover();
    // A mouse used to emulate a phone must not open a desktop hover preview.
    expect(await page.getByRole("dialog").count()).toBe(0);
    for (const stage of stages) {
      const node = page.locator(".hero-art").getByRole("button", { name: stage.name, exact: true });
      await node.click();
      const dialog = page.getByRole("dialog", { name: stage.name, exact: true });
      await expect(dialog).toBeVisible();
      const bounds = (await dialog.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(8);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width - 8);
      expect(bounds.y).toBeGreaterThanOrEqual(8);
      expect(bounds.y + bounds.height).toBeLessThanOrEqual(732);
      await expect(page.getByRole("button", { name: "Close example" })).toBeInViewport({ ratio: 1 });
      await page.getByRole("button", { name: "Close example" }).click();
      await expect(dialog).toBeHidden();
      await expect(node).toHaveCSS("outline-style", "none");
    }
  }
});

for (const theme of ["dark", "light"]) {
  test(`pipeline examples appear on hover in ${theme} mode`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    for (const stage of stages) {
      const node = page.locator(".hero-art").getByRole("button", { name: stage.name, exact: true });
      await node.hover();
      const preview = page.getByRole("dialog", { name: stage.name, exact: true });
      await expect(preview).toBeVisible();
      await expect(preview.locator("[data-example-kind]")).toContainText(stage.example);
      if (stage.name === "Analytics") await expect(preview.getByRole("img", { name: /Orders by day/ })).toBeVisible();
      if (stage.name === "Databases") await expect(preview.getByRole("table")).toBeVisible();
      await expect(node.locator(".node-visual")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, -5)");
      await expect(page.locator(".MuiDialog-root")).toHaveCount(0);
      const bounds = await preview.boundingBox();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      const diagram = (await page.locator(".hero-art").boundingBox())!;
      expect(bounds!.x + bounds!.width <= diagram.x || bounds!.x >= diagram.x + diagram.width).toBe(true);
      const icons = (await page.locator(".social").boundingBox())!;
      const sidebar = (await page.locator("#site-sidebar").boundingBox())!;
      expect(bounds!.x).toBeGreaterThanOrEqual(sidebar.x + sidebar.width);
      expect(bounds!.y + bounds!.height <= icons.y - 4 || bounds!.y >= icons.y + icons.height + 4).toBe(true);
      expect(await page.locator(".social a").evaluateAll(links => links.every(link => {
        const box = link.getBoundingClientRect();
        return document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.closest("a") === link;
      }))).toBe(true);
    }
    const preview = page.getByRole("dialog", { name: "AI / ML", exact: true });
    await preview.hover();
    await page.waitForTimeout(300);
    await expect(preview).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(preview).toBeHidden();
    await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "false");
    await page.mouse.move(0, 0);
    const events = page.locator(".hero-art").getByRole("button", { name: "Events", exact: true });
    await events.hover();
    await expect(page.getByRole("dialog", { name: "Events", exact: true })).toBeVisible();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(events.locator(".node-visual")).toHaveCSS("transform", "none");
    await page.mouse.move(0, 0);
    await expect(page.getByRole("dialog")).toBeHidden();
  });

  test(`pipeline definitions and examples work in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    for (const stage of stages) {
      const node = page.locator(".hero-art").getByRole("button", { name: stage.name, exact: true });
      await node.click();
      const dialog = page.getByRole("dialog", { name: stage.name, exact: true });
      await expect(dialog).toBeVisible();
      await expect(dialog.locator(".example-definition")).not.toBeEmpty();
      await expect(dialog.locator("[data-example-kind]")).toContainText(stage.example);
      if (stage.name === "Analytics") await expect(dialog.getByRole("img", { name: /Orders by day/ })).toBeVisible();
      if (stage.name === "AI / ML") {
        await expect(dialog.getByRole("region", { name: "AI assistant example" })).toBeVisible();
        await expect(dialog.getByRole("region", { name: "Machine learning prediction example" })).toBeVisible();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width);
      await page.getByRole("button", { name: "Close example" }).click();
      await expect(dialog).toBeHidden();
      await expect(node).toBeFocused();
      await expect(node).toHaveCSS("outline-style", "none");
    }
    const events = page.locator(".hero-art").getByRole("button", { name: "Events", exact: true });
    await events.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Events", exact: true })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(events).toBeFocused();
    await expect(events).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Space");
    await expect(page.getByRole("dialog", { name: "Events", exact: true })).toBeVisible();
  });
}

for (const theme of ["dark", "light"]) {
  test(`pointer-opened examples leave no focus box after Escape or backdrop close in ${theme} mode`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    for (const [name, method] of [["Events", "escape"], ["AI / ML", "backdrop"]]) {
      const node = page.locator(".hero-art").getByRole("button", { name, exact: true });
      await node.click();
      const dialog = page.getByRole("dialog", { name, exact: true });
      await expect(dialog).toBeVisible();
      if (method === "escape") await page.keyboard.press("Escape");
      else await page.locator(".MuiDialog-root .MuiDialog-container").click({ position: { x: 5, y: 5 } });
      await expect(dialog).toBeHidden();
      await expect(node).toBeFocused();
      await expect(node).toHaveCSS("outline-style", "none");
    }
    const events = page.locator(".hero-art").getByRole("button", { name: "Events", exact: true });
    await events.focus();
    await page.keyboard.press("Tab");
    const api = page.locator(".hero-art").getByRole("button", { name: "APIs", exact: true });
    await expect(api).toBeFocused();
    await expect(api).toHaveCSS("outline-style", "solid");
  });
}
