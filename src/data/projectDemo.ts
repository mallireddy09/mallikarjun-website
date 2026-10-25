// Illustrative demo values only; these previews do not fetch account or flight data.
export const MONEY_FRAMES = [
  { income: 3200, expenses: [900, 260, 85, 195] },
  { income: 3350, expenses: [920, 315, 120, 165] },
  { income: 3280, expenses: [880, 230, 175, 240] },
];
export const PHONE_DEMO_TABS = ["Friends", "Groups", "Activity"] as const;
export const PHONE_SCREEN_DURATION = 4200;
export function phoneDemoTab(time: number) {
  return Math.floor(time / PHONE_SCREEN_DURATION) % PHONE_DEMO_TABS.length;
}
export const EXPENSE_CATEGORIES = [
  { name: "Rent", color: "#397ef6", depth: "#2053ad" },
  { name: "Food", color: "#9d7bf4", depth: "#6241ae" },
  { name: "Travel", color: "#ffba5a", depth: "#bd731e" },
  { name: "Other", color: "#32beb3", depth: "#17877f" },
];
const ease = (value: number) => (1 - Math.cos(Math.PI * value)) / 2;

const EXPENSE_RECORDS = [
  { friend: "Mallikarjun", group: "House Rent", activity: "Rent payment" },
  { friend: "Chinmayi", group: "Groceries", activity: "Groceries split" },
  { friend: "Kiran", group: "Vacation bill", activity: "Vacation bill" },
  { friend: "Surya", group: "Vacation bill", activity: "Vacation bill" },
];
export function moneyFrame(time: number) {
  // Each tab owns a fixed demo snapshot; all displayed totals change with it.
  const { income, expenses } = MONEY_FRAMES[phoneDemoTab(time)];
  const records = EXPENSE_RECORDS.map((record, i) => ({ ...record, amount: expenses[i] }));
  const spent = records.reduce((total, record) => total + record.amount, 0);
  const balance = spent;
  const saved = income - spent;
  const friends = records.map(record => ({ name: record.friend, detail: record.group, amount: record.amount }));
  const grouped = [...new Set(records.map(record => record.group))].map(name => {
    const entries = records.filter(record => record.group === name);
    return {
      name,
      amount: entries.reduce((total, record) => total + record.amount, 0),
      contributors: entries.map(record => record.friend),
      activity: entries[0].activity,
    };
  });
  const groups = grouped.map(group => ({ name: group.name, detail: `${group.contributors.length} contributor${group.contributors.length === 1 ? "" : "s"}`, amount: group.amount }));
  const activity = grouped.map(group => ({ name: group.activity, detail: group.contributors.join(" + "), amount: group.amount }));
  // Largest remainders keep rounded legend percentages at exactly 100%.
  const screens = [friends, groups, activity];
  const selectedRows = screens[phoneDemoTab(time)];
  const exact = selectedRows.map(row => row.amount / spent * 100);
  const percentages = exact.map(Math.floor);
  const order = exact.map((value, i) => ({ i, remainder: value - percentages[i] })).sort((a, b) => b.remainder - a.remainder);
  const remaining = 100 - percentages.reduce((sum, value) => sum + value, 0);
  for (let i = 0; i < remaining; i++) percentages[order[i].i]++;
  const pie = selectedRows.map((row, i) => ({ ...EXPENSE_CATEGORIES[i], name: row.name, amount: row.amount, percentage: percentages[i] }));
  return { balance, income, spent, expenses, percentages, saved, screens, pie };
}

export const FLIGHT_DURATION = 16000;
export const FLIGHT_PEAK_ALTITUDE = 1280;

export function flightFrame(time: number) {
  const progress = time % FLIGHT_DURATION / FLIGHT_DURATION;
  let phase = "Ready for launch", height = 0, speed = 0, engine = 0;
  if (progress >= .12 && progress < .35) {
    const ascent = (progress - .12) / .23;
    phase = "Liftoff";
    height = ease(ascent);
    // Derivative of the same altitude curve, in metres per second.
    speed = FLIGHT_PEAK_ALTITUDE * Math.PI / (2 * .23 * FLIGHT_DURATION / 1000) * Math.sin(ascent * Math.PI);
    engine = 1;
  } else if (progress >= .35 && progress < .48) {
    phase = "Coasting";
    height = 1;
  } else if (progress >= .48 && progress < .85) {
    const descent = (progress - .48) / .37;
    phase = descent > .8 ? "Landing burn" : "Returning to pad";
    height = 1 - ease(descent);
    speed = -FLIGHT_PEAK_ALTITUDE * Math.PI / (2 * .37 * FLIGHT_DURATION / 1000) * Math.sin(descent * Math.PI);
    engine = descent > .8 ? 1 : .35;
  } else if (progress >= .85) {
    phase = "Touchdown";
  }
  return {
    phase, progress, height,
    altitude: Math.ceil(height * FLIGHT_PEAK_ALTITUDE),
    speed: Math.round(speed),
    engine,
    smoke: engine ? Math.max(0, 1 - height / .18) * .8 : 0,
  };
}
