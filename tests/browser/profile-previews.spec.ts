import { expect, test } from "@playwright/test";

const profiles = [
  { label: "Resume", handle: "Google Drive", destination: "drive.google.com", href: "https://drive.google.com/file/d/1UppfWTSqy5KcXqWSr9PwjwqOBsqEcQPK/view?usp=sharing" },
  { label: "GitHub", handle: "mallireddy09", destination: "github.com/mallireddy09", href: "https://github.com/mallireddy09" },
  { label: "LinkedIn", handle: "mallireddy09", destination: "www.linkedin.com/in/mallireddy09", href: "https://www.linkedin.com/in/mallireddy09/" },
  { label: "X (Twitter)", handle: "@MalliReddy09", destination: "x.com/mallireddy09", href: "https://x.com/mallireddy09" },
];

for (const theme of ["dark", "light"]) {
  test(`profile icons show their account previews in ${theme} mode`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    const url = page.url();
    for (const profile of profiles) {
      const link = page.locator(".social").getByRole("link", { name: profile.label, exact: true });
      await link.hover();
      const preview = page.getByRole("tooltip").filter({ hasText: profile.destination });
      await expect(preview).toBeVisible();
      await expect(preview).toContainText("Mallikarjun Reddy");
      await expect(preview).toContainText(profile.handle);
      if (profile.label !== "Resume") await preview.locator(".preview-portrait").evaluate((image: HTMLImageElement) => image.decode());
      const distinctContent = { Resume: "PROFESSIONAL EXPERIENCE", GitHub: "he/him", LinkedIn: "500+ connections", "X (Twitter)": "Joined August 2018" };
      await expect(preview).toContainText(distinctContent[profile.label as keyof typeof distinctContent]);
      const bounds = (await preview.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize()!.width);
      const icons = (await page.locator(".social").boundingBox())!;
      const sidebar = (await page.locator("#site-sidebar").boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(sidebar.x + sidebar.width);
      expect(bounds.y + bounds.height <= icons.y - 4 || bounds.y >= icons.y + icons.height + 4).toBe(true);
      await expect(page.getByRole("tooltip")).toHaveCount(1);
      expect(await page.locator(".social a").evaluateAll(links => links.every(link => {
        const box = link.getBoundingClientRect();
        return document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)?.closest("a") === link;
      }))).toBe(true);
      await page.locator('#site-sidebar .nav-items a[href="#about"]').click({ trial: true });
      expect(page.url()).toBe(url);
    }
    await page.mouse.move(0, 0);
    await expect(page.getByRole("tooltip")).toHaveCount(0);
    await page.locator(".social").getByRole("link", { name: "Resume", exact: true }).focus();
    await page.keyboard.press("Tab");
    const github = page.locator(".social").getByRole("link", { name: "GitHub", exact: true });
    await expect(github).toBeFocused();
    const preview = page.getByRole("tooltip").filter({ hasText: "github.com/mallireddy09" });
    await expect(preview).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(preview).toBeHidden();
    await expect(github).toBeFocused();
    await expect(page.locator("#site-sidebar")).toHaveAttribute("aria-hidden", "false");
  });
}

test("profile icons open their configured pages in a new tab", async ({ page, context, isMobile }) => {
  // Stub external page responses so this test verifies navigation without signing in.
  await context.route(url => profiles.some(profile => url.href === profile.href), route => route.fulfill({ contentType: "text/html", body: "<title>Profile destination</title>" }));
  await page.goto("./");
  for (const profile of profiles) {
    const link = page.locator(".social").getByRole("link", { name: profile.label, exact: true });
    await expect(link).toHaveAttribute("href", profile.href);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    if (!isMobile) {
      await page.mouse.move(0, 0);
      await page.locator(".social").getByRole("link", { name: "Resume", exact: true }).hover();
      await expect(page.getByRole("tooltip").filter({ hasText: "drive.google.com" })).toBeVisible();
    }
    const [popup] = await Promise.all([page.waitForEvent("popup"), link.click()]);
    await expect(popup).toHaveURL(profile.href);
    await popup.close();
  }
});
