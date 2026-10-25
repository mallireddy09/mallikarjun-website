import { expect, test } from "@playwright/test";

test("particle background renders after initialization and theme changes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  const canvas = page.locator("#tsparticles canvas");
  for (const theme of ["dark-theme", "light-theme", "dark-theme"]) {
    if (!(await page.locator("html").getAttribute("class"))?.includes(theme)) {
      await page.getByRole("button", { name: "Toggle theme" }).click();
    }
    await expect(canvas).toHaveCount(1);
    await expect.poll(() => canvas.evaluate((element: HTMLCanvasElement) => {
      // v4 can transfer its canvas to OffscreenCanvas; sample a copy of the image.
      const copy = document.createElement("canvas");
      copy.width = element.width;
      copy.height = element.height;
      const context = copy.getContext("2d")!;
      context.drawImage(element, 0, 0);
      const pixels = context.getImageData(0, 0, copy.width, copy.height).data;
      return pixels.some((value, index) => index % 4 === 3 && value > 0);
    })).toBe(true);
  }
  expect(errors).toEqual([]);
});
