import { FLIGHT_PEAK_ALTITUDE, flightFrame, MONEY_FRAMES, PHONE_SCREEN_DURATION, moneyFrame } from "./projectDemo";

test("vertical speed follows the derivative of the displayed rocket altitude curve", () => {
  for (const time of [2100, 3000, 4200, 5400, 7900, 9500, 12000, 13500]) {
    const frame = flightFrame(time);
    const altitudeChange = (flightFrame(time + 1).height - flightFrame(time - 1).height) * FLIGHT_PEAK_ALTITUDE;
    expect(frame.speed).toBeCloseTo(Math.round(altitudeChange / .002), 0);
    expect(frame.altitude).toBe(Math.ceil(frame.height * FLIGHT_PEAK_ALTITUDE));
  }
});

test("rocket position and telemetry share launch, apex, touchdown and replay boundaries", () => {
  for (const time of [0, 1900, 13600, 15999, 16000]) {
    expect(flightFrame(time)).toMatchObject({ height: 0, altitude: 0, speed: 0, engine: 0, smoke: 0 });
  }
  expect(flightFrame(6000)).toMatchObject({ height: 1, altitude: 1280, speed: 0, engine: 0 });
  expect(flightFrame(13599).altitude).toBeGreaterThan(0);
  expect(flightFrame(13599).speed).toBeLessThanOrEqual(0);
  expect(flightFrame(3000).speed).toBeGreaterThan(0);
  expect(flightFrame(11000).speed).toBeLessThan(0);
  expect(flightFrame(19000)).toEqual(flightFrame(3000));
});


test("every finance tab reconciles to the same ledger and balance", () => {
  for (let index = 0; index < MONEY_FRAMES.length; index++) {
    const start = index * PHONE_SCREEN_DURATION;
    const frame = moneyFrame(start);
    expect(frame.balance).toBe(frame.spent);
    expect(frame.saved).toBe(frame.income - frame.spent);
    expect(frame.expenses.reduce((sum, value) => sum + value, 0)).toBe(frame.spent);
    for (const screen of frame.screens) expect(screen.reduce((sum, row) => sum + row.amount, 0)).toBe(frame.spent);
    expect(frame.screens[1].map(row => row.amount)).toEqual([frame.expenses[0], frame.expenses[1], frame.expenses[2] + frame.expenses[3]]);
    expect(frame.screens[2].map(row => row.amount)).toEqual(frame.screens[1].map(row => row.amount));
    expect(frame.screens[0][3].detail).toBe("Vacation bill");
    expect(frame.percentages.reduce((sum, value) => sum + value, 0)).toBe(100);
    for (const offset of [300, 1500, 3000, 4199]) {
      const updated = moneyFrame(start + offset);
      expect(updated).toEqual(frame);
      expect(updated.balance).toBe(updated.spent);
      expect(updated.percentages.reduce((sum, value) => sum + value, 0)).toBe(100);
      for (const screen of updated.screens) expect(screen.reduce((sum, row) => sum + row.amount, 0)).toBe(updated.spent);
      expect(updated.screens[2].map(row => row.amount)).toEqual(updated.screens[1].map(row => row.amount));
    }
    expect(moneyFrame(start + 1500)).toEqual(frame);
    expect(moneyFrame(start + PHONE_SCREEN_DURATION)).not.toEqual(frame);
  }
});

test("Activity headline and pie match the visible $880 + $230 + $415 bills", () => {
  const frame = moneyFrame(8400);
  expect(frame.screens[2].map(row => row.amount)).toEqual([880, 230, 415]);
  expect(frame.balance).toBe(1525);
  expect(frame.pie.map(slice => slice.amount)).toEqual([880, 230, 415]);
  expect(frame.pie.map(slice => slice.percentage)).toEqual([58, 15, 27]);
  expect(frame.saved).toBe(1755);
});
