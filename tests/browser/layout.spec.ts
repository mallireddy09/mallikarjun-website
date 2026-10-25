import { expect, test } from "@playwright/test";

const sections = ["home", "about", "experience", "projects", "skills", "certifications", "education", "blogs", "contact"];

for (const width of [320, 390, 400, 401, 480, 481, 650, 651, 768, 800, 801, 900, 1024, 1200, 1201, 1440, 1920]) {
  test(`section order and layout at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".portfolio-section")).toHaveCount(sections.length);
    expect(await page.locator(".portfolio-section").evaluateAll(nodes => nodes.map(node => node.id))).toEqual(sections);
    expect(await page.locator("#site-sidebar .nav-items a").evaluateAll(nodes => nodes.map(node => node.getAttribute("href")?.slice(1)))).toEqual(sections);
    for (const section of sections) {
      await page.locator(`#${section}`).scrollIntoViewIfNeeded();
      await expect(page.locator(`#${section}`).getByRole("heading").first()).toBeVisible();
    }
    const geometry = await page.evaluate(() => {
      const sections = [...document.querySelectorAll<HTMLElement>(".portfolio-section")].map(element => {
        const rect = element.getBoundingClientRect();
        return { id: element.id, top: rect.top + scrollY, bottom: rect.bottom + scrollY, width: rect.width };
      });
      const overflow = [...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main p, main button, main summary, main .grid-item, main .gallery-item, main .stage-tabs, main .contact-banner")].filter(element => {
        if (!element.checkVisibility() || element.closest('[aria-hidden="true"]') || element.classList.contains("copy-status")) return false;
        const rect = element.getBoundingClientRect();
        // Section titles intentionally draw a decorative underline wider than the text.
        const contentOverflow = element.tagName !== "H2" && element.scrollWidth > element.clientWidth + 2;
        return rect.left < -1 || rect.right > innerWidth + 1 || contentOverflow;
      }).map(element => ({ tag: element.tagName, class: element.className, text: element.textContent?.slice(0, 70), width: element.clientWidth, scrollWidth: element.scrollWidth }));
      const overlappingLabels = [...document.querySelectorAll(".stage-tabs button")].flatMap(button => {
        const label = button.querySelector(".stage-name")!;
        const range = document.createRange();
        range.selectNodeContents(label);
        const text = range.getBoundingClientRect();
        const arrow = button.querySelector(".stage-arrow")!.getBoundingClientRect();
        return text.right > arrow.left + 1 && text.bottom > arrow.top && text.top < arrow.bottom
          ? [{ label: label.textContent, overlapPixels: text.right - arrow.left }] : [];
      });
      const clippedDiagramLabels = [...document.querySelectorAll<SVGGElement>(".pipeline-node")].flatMap(node => {
        const label = node.querySelector("text")!;
        const bounds = label.getBBox();
        const cardWidth = Number(node.querySelector(".node-face")!.getAttribute("width"));
        return bounds.x + bounds.width > cardWidth - 8 ? [label.textContent] : [];
      });
      return { sections, overflow, overlappingLabels, clippedDiagramLabels, documentWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth };
    });
    await testInfo.attach("layout-measurements", { body: JSON.stringify(geometry, null, 2), contentType: "application/json" });
    await page.screenshot({ path: testInfo.outputPath(`layout-${width}.png`), fullPage: true, animations: "disabled", scale: "css" });
    expect.soft(geometry.documentWidth).toBeLessThanOrEqual(width);
    expect.soft(geometry.overflow).toEqual([]);
    expect.soft(geometry.overlappingLabels).toEqual([]);
    expect.soft(geometry.clippedDiagramLabels).toEqual([]);
    for (let index = 0; index < geometry.sections.length; index++) {
      expect.soft(geometry.sections[index].width).toBeGreaterThan(0);
      if (index) expect.soft(geometry.sections[index].top).toBeGreaterThanOrEqual(geometry.sections[index - 1].bottom - 1);
    }
  });
}

test("all navigation links, drawer keyboard behavior, and theme switching", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  for (const id of sections) {
    // Reveal the floating menu before opening it after navigating down the page.
    if (await page.locator(".site-controls").evaluate(element => element.classList.contains("is-hidden"))) {
      await page.evaluate(() => window.scrollBy(0, -96));
      await expect(page.locator(".ham-burger-menu")).toHaveCSS("opacity", "1");
    }
    const open = page.getByRole("button", { name: "Open menu", exact: true });
    if (await open.isVisible()) await open.click();
    await page.locator(`#site-sidebar .nav-items a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
  }
  await page.evaluate(() => window.scrollBy(0, -96));
  await expect(page.locator(".theme-toggle-btn")).toHaveCSS("opacity", "1");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass("light-theme");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(248, 249, 252)");
  await page.getByRole("button", { name: "Toggle theme" }).click();
  await expect(page.locator("html")).toHaveClass("dark-theme");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(10, 10, 15)");
  const open = page.getByRole("button", { name: "Open menu", exact: true });
  if (await open.isVisible()) await open.click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-sidebar")).toHaveAttribute("inert", "");
  await expect(page.getByRole("button", { name: "Open menu", exact: true })).toBeFocused();
});

test("short portrait and landscape screens keep lower menu links reachable", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [{ width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    await page.goto("./");
    await page.getByRole("button", { name: "Open menu", exact: true }).click();
    const contactLink = page.locator('#site-sidebar .nav-items a[href="#contact"]');
    await contactLink.scrollIntoViewIfNeeded();
    await expect(contactLink).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath(`menu-${viewport.width}-${viewport.height}.png`), scale: "css" });
    await contactLink.click();
    await expect(page.locator("#contact")).toBeInViewport();
    await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width);
  }
});

test("project filters, pipeline keyboard tabs, skill expansion, and copy email", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const filters = page.locator("#projects button[aria-pressed]");
  const allCount = await page.locator("#projects .grid-item").count();
  for (const filter of await filters.all()) {
    await filter.click();
    await expect(filter).toHaveAttribute("aria-pressed", "true");
    expect(await page.locator("#projects .grid-item").count()).toBeGreaterThan(0);
  }
  await page.getByRole("button", { name: "All", exact: true }).click();
  await expect(page.locator("#projects .grid-item")).toHaveCount(allCount);
  const tabs = page.getByRole("tab");
  for (let index = 0; index < 4; index++) {
    await tabs.nth(index).click();
    await expect(tabs.nth(index)).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", `stage-${index}`);
  }
  await page.keyboard.press("Home");
  await expect(tabs.first()).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(tabs.last()).toBeFocused();
  for (const detail of await page.locator("#skills details").all()) {
    await detail.locator("summary").click();
    await expect(detail).toHaveAttribute("open", "");
    await expect(detail.locator(".skill-links a").first()).toBeVisible();
    await detail.locator("summary").click();
    await expect(detail).not.toHaveAttribute("open", "");
  }
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.getByRole("button", { name: "Email copied" })).toBeVisible();
  const address = await page.locator('a[href^="mailto:"]').getAttribute("href");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(address?.slice(7));
});

test("layout survives desktop-to-phone resize and back", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "false");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "true");
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("body")).toHaveClass("nav-open");
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator("body")).not.toHaveClass("nav-open");
  await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "false");
});
