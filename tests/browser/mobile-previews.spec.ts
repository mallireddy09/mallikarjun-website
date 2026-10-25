import { expect, test } from "@playwright/test";

const labels = ["LinkedIn", "GitHub", "X (Twitter)", "Resume"];

for (const theme of ["dark", "light"]) {
  test(`profile previews support touch and narrow mouse screens in ${theme} mode`, async ({ page, isMobile }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
      await page.setViewportSize(viewport);
      await page.goto("./");
      if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
      for (const label of labels) {
        const trigger = page.locator(".social").getByRole("link", { name: label, exact: true });
        if (isMobile) await trigger.tap(); else await trigger.hover();
        const preview = isMobile ? page.getByRole("dialog", { name: `${label} preview` }) : page.getByRole("tooltip");
        await expect(preview).toBeVisible();
        await expect(preview).toContainText("Mallikarjun Reddy");
        const box = (await preview.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.y).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
        expect(box.y + box.height).toBeLessThanOrEqual(viewport.height);
        if (isMobile) {
          const destination = preview.getByRole("link", { name: `Open ${label} ↗`, exact: true });
          await destination.scrollIntoViewIfNeeded();
          await expect(destination).toBeInViewport();
          await preview.getByRole("button", { name: "Close preview" }).tap();
        } else await page.mouse.move(0, 0);
        await expect(preview).toBeHidden();
      }
      for (const name of ["NVIDIA", "Microsoft", "The Home Depot", "Uber"]) {
        const trigger = page.getByRole("button", { name: `Preview ${name}`, exact: true });
        if (isMobile) await trigger.tap(); else await trigger.hover();
        await expect(page.getByRole("tooltip")).toBeVisible();
        if (isMobile) await trigger.tap(); else await page.mouse.move(0, 0);
        await expect(page.getByRole("tooltip")).toBeHidden();
      }
    }
  });
}
