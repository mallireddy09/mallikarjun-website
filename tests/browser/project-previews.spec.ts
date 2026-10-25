import { expect, test } from "@playwright/test";

for (const theme of ["dark", "light"]) {
  test(`fixed tab amounts and proportional pie reconcile in ${theme} mode`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("./");
    if (theme === "light") await page.getByRole("button", { name: "Toggle theme" }).click();
    const preview = page.locator('[data-preview="finance"]');
    await preview.scrollIntoViewIfNeeded();
    await expect(preview).toHaveAttribute("data-running", "true");
    await page.clock.install();
    await page.clock.pauseAt(new Date(Date.now() + 100));
    const snapshot = () => preview.evaluate(node => {
      const number = (text: string | null | undefined) => Number(text?.replace(/[^0-9]/g, ""));
      const text = (selector: string) => node.querySelector(selector)?.textContent;
      const pie = node.querySelector(".spending-pie")!;
      return {
        tab: node.querySelector(".phone-demo-screen")!.getAttribute("data-screen"),
        selected: node.querySelector(".phone-bottom-nav")!.getAttribute("data-active-tab"),
        balance: number(text(".metric-balance")), phone: number(text(".phone-balance")),
        income: number(text(".metric-income")), spent: number(text(".metric-spent")),
        saved: number(text(".phone-saved")), bill: number(text(".phone-bill-total")),
        rows: [...node.querySelectorAll(".phone-row-amount")].map(amount => number(amount.textContent)),
        mix: pie.getAttribute("data-mix")!.split(",").map(Number),
        startAngle: Number(node.querySelector(".spending-slice")!.getAttribute("data-start")),
        angles: [...node.querySelectorAll(".spending-slice")].map(slice => Number(slice.getAttribute("data-end")) - Number(slice.getAttribute("data-start"))),
      };
    });
    const reconciled = async () => {
      const state = await snapshot();
      expect(state.selected).toBe(state.tab);
      expect(state.phone).toBe(state.balance);
      expect(state.balance).toBe(state.spent);
      expect(state.saved).toBe(state.income - state.spent);
      expect(state.bill).toBe(state.spent);
      expect(state.rows.reduce((sum, amount) => sum + amount, 0)).toBe(state.spent);
      expect(state.mix.reduce((sum, amount) => sum + amount, 0)).toBe(state.spent);
      expect(state.rows).toEqual(state.mix);
      state.angles.forEach((angle, i) => expect(angle / (Math.PI * 2)).toBeCloseTo(state.mix[i] / state.spent, 8));
      return state;
    };
    const before = await reconciled();
    await page.clock.fastForward(1500);
    const updated = await reconciled();
    expect(updated).toEqual(before);
    expect(updated.startAngle).toBe(before.startAngle);
    expect(updated.angles).toEqual(before.angles);
    await expect(preview.locator(".phone-bottom-nav text")).toHaveText(["Friends", "Groups", "Activity", "Search"]);
    await expect(preview.locator(".phone-profile-photo")).toHaveAttribute("href", /arjun_image/);
    await expect(preview.locator(".phone-search-icon circle")).toHaveCount(1);
    await expect(preview.locator(".phone-add-expense")).toHaveText("Add expense");
    expect(await preview.textContent()).not.toContain("₹");
    for (const [tab, names] of [
      ["Groups", ["House Rent", "Groceries", "Vacation bill"]],
      ["Activity", ["Rent payment", "Groceries split", "Vacation bill"]],
      ["Friends", ["Mallikarjun", "Chinmayi", "Kiran", "Surya"]],
    ] as const) {
      const previous = await snapshot();
      await page.clock.fastForward(4200);
      await expect(preview.locator(".phone-row-name")).toHaveText([...names]);
      const current = await reconciled();
      expect(current.tab).toBe(tab);
      if (tab === "Activity") { expect(current.rows).toEqual([880, 230, 415]); expect(current.phone).toBe(1525); }
      expect(current.mix).not.toEqual(previous.mix);
      expect(current.angles).not.toEqual(previous.angles);
      await page.clock.fastForward(500);
      expect(await snapshot()).toEqual(current);
      const offset = ["Friends", "Groups", "Activity"].indexOf(tab) * 48.3;
      await expect.poll(() => preview.locator(".phone-nav-selection").evaluate(element => new DOMMatrix(getComputedStyle(element).transform).m41)).toBeCloseTo(offset, 1);
    }
    for (let frame = 0; frame < 6; frame++) {
      await reconciled();
      // The orange top face must remain visible as the category proportions change.
      const visibleSlice = await preview.evaluate(node => {
        const slice = node.querySelectorAll<SVGGElement>(".pie-tops > g")[2];
        const path = slice.querySelector(".spending-slice")!;
        const angle = (Number(path.getAttribute("data-start")) + Number(path.getAttribute("data-end"))) / 2;
        const point = new DOMPoint(Math.cos(angle) * 60, Math.sin(angle) * 60).matrixTransform(slice.getScreenCTM()!);
        return { expected: slice.getAttribute("data-category"), actual: document.elementsFromPoint(point.x, point.y).map(element => element.closest("[data-category]")?.getAttribute("data-category")).find(Boolean) };
      });
      expect(visibleSlice.actual).toBe(visibleSlice.expected);
      await page.clock.fastForward(4200);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(preview).toHaveAttribute("data-running", "false");
    const paused = await snapshot();
    await page.clock.fastForward(3200);
    expect(await snapshot()).toEqual(paused);
    await preview.scrollIntoViewIfNeeded();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(preview).toHaveAttribute("data-running", "false");
    await expect(preview.locator(".phone-balance")).toHaveText("$1,440");
    const reduced = await reconciled();
    await page.clock.fastForward(3200);
    expect(await snapshot()).toEqual(reduced);
    const box = (await preview.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
    expect(errors).toEqual([]);
  });
}

test("rocket launches, returns and lands while its background stays fixed", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  const preview = page.locator('[data-preview="rocket"]');
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toHaveAttribute("data-running", "true");
  await expect(preview.locator(".flight-backdrop")).toHaveCSS("transform", "none");
  const rig = preview.locator(".rocket-rig");
  await page.clock.install();
  const snapshot = () => preview.evaluate(node => {
    const rig = node.querySelector<HTMLElement>(".rocket-rig")!;
    const offset = -new DOMMatrix(getComputedStyle(rig).transform).m42 / rig.getBoundingClientRect().height;
    return {
      offset,
      altitude: Number(node.querySelector(".flight-altitude")!.textContent!.replace(/[^0-9]/g, "")),
      speed: Number(node.querySelector(".flight-speed")!.textContent!.replace("m/s", "").trim()),
    };
  });
  const synchronized = async () => {
    const state = await snapshot();
    expect(state.offset).toBeCloseTo(state.altitude / 1280 * 1.35, 2);
    return state;
  };
  await page.clock.fastForward(3000);
  await expect(preview.locator(".flight-phase")).toHaveText("Liftoff");
  const ascent = await synchronized();
  expect(ascent.speed).toBeGreaterThan(0);
  await page.clock.fastForward(1000);
  const higher = await synchronized();
  expect(higher.altitude).toBeGreaterThan(ascent.altitude);
  expect(higher.offset).toBeGreaterThan(ascent.offset);
  await page.clock.fastForward(2000);
  await expect(preview.locator(".flight-phase")).toHaveText("Coasting");
  expect(await synchronized()).toMatchObject({ altitude: 1280, speed: 0 });
  await page.clock.fastForward(3500);
  await expect(preview.locator(".flight-phase")).toHaveText("Returning to pad");
  const descent = await synchronized();
  expect(descent.speed).toBeLessThan(0);
  await page.clock.fastForward(1000);
  const lower = await synchronized();
  expect(lower.altitude).toBeLessThan(descent.altitude);
  expect(lower.offset).toBeLessThan(descent.offset);
  // Both pose and telemetry stop together when the preview leaves the viewport.
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(preview).toHaveAttribute("data-running", "false");
  const paused = await snapshot();
  await page.clock.fastForward(4000);
  expect(await snapshot()).toEqual(paused);
  await preview.scrollIntoViewIfNeeded();
  await expect(preview).toHaveAttribute("data-running", "true");
  await page.clock.fastForward(3500);
  await expect(preview.locator(".flight-phase")).toHaveText("Touchdown");
  const landed = await synchronized();
  expect(landed).toMatchObject({ altitude: 0, speed: 0 });
  expect(landed.offset).toBeCloseTo(0, 5);
  await expect(preview.locator(".rocket-flame")).toHaveCSS("opacity", "0");
  await expect(preview.locator(".flight-backdrop")).toHaveCSS("transform", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(preview).toHaveAttribute("data-running", "false");
  await expect(rig).toHaveCSS("animation-name", "none");
  await expect(preview.locator(".rocket-flame")).toHaveCSS("opacity", "0");
  await expect(preview.locator(".flight-phase")).toHaveText("Ready for launch");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
