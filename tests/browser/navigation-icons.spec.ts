import { expect, test } from "@playwright/test";

const icons = [
  { id: "home", animation: "door-open" }, { id: "about", animation: "info-spin" },
  { id: "experience", animation: "bag-open" }, { id: "projects", animation: "project-fan" },
  { id: "skills", animation: "bulb-light" }, { id: "certifications", animation: "award-pop" },
  { id: "education", animation: "page-turn" }, { id: "blogs", animation: "typing" },
  { id: "contact", animation: "envelope-open" },
];

for (const theme of ["dark", "light"]) {
  test(`each navigation icon reacts to activation in ${theme} mode`, async ({ page, isMobile }) => {
    const errors: string[] = [];
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    for (const { id, animation } of icons) {
      if (isMobile) {
        await page.evaluate(() => window.scrollBy(0, -96));
        await page.getByRole("button", { name: "Open menu", exact: true }).click();
      }
      const link = page.locator(`#site-sidebar .nav-items a[href="#${id}"]`);
      await link.click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      const icon = link.locator(".nav-icon");
      await expect(icon).toHaveClass(/is-reacting/);
      const frames = await icon.evaluate(element => {
        const animations = element.getAnimations({ subtree: true });
        animations.forEach(item => { item.pause(); item.currentTime = 350; });
        return animations.map(item => (item as CSSAnimation).animationName);
      });
      expect(frames).toContain(animation);
      if (isMobile) {
        await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "false");
        await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "true");
      }
      await expect(icon).not.toHaveClass(/is-reacting/);
    }
    expect(errors).toEqual([]);
  });
}

test("keyboard activation replays an icon reaction and reduced motion bypasses it", async ({ page, isMobile }) => {
  test.skip(isMobile);
  await page.goto("./");
  const home = page.locator('#site-sidebar .nav-items a[href="#home"]');
  await home.focus();
  for (let run = 0; run < 2; run++) {
    await page.keyboard.press("Enter");
    await expect(home.locator(".nav-icon")).toHaveClass(/is-reacting/);
    await expect(home.locator(".nav-icon")).not.toHaveClass(/is-reacting/);
    await expect(home).toBeFocused();
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.keyboard.press("Enter");
  await expect(home.locator(".nav-icon")).not.toHaveClass(/is-reacting/);
  expect(await home.locator(".nav-icon").evaluate(element => element.getAnimations({ subtree: true }).length)).toBe(0);
});
