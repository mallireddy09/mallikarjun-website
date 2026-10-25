# Live project previews

The financial metrics and flight telemetry are simulated demo data. Finance uses smaller USD values. The phone cycles through Friends (Mallikarjun, Chinmayi, Kiran, Surya), Groups (House Rent, Groceries, Vacation bill), and Activity every 4.2 seconds, with a matching selected tab. No financial or flight service is contacted. One ledger supplies all friend rows, group totals, activities, and chart proportions. The phone headline and monthly snapshot headline show the sum of the selected tab’s bills. Saved amount separately equals income minus bills. Pie labels and slices match the visible rows (four Friends, three Groups or Activity). Each tab has a fixed demo ledger snapshot for its full 4.2-second display. On tab changes, the bill rows, total, income, balance, saved amount, and pie proportions switch together. Every tab shows a live Total bill. The pie keeps a fixed orientation and resizes each slice to that category’s share of current total bills; rounded legend percentages sum to 100%. Vacation bill combines Kiran and Surya; contributor labels come from those same records. Rocket position, altitude, vertical speed, exhaust, and landing smoke use one animation-frame clock. Speed is the derivative of the altitude curve, with both altitude and speed zero at touchdown. Updates pause off screen, when the browser tab is hidden, and for reduced motion.

## Artwork

Created with the built-in imagegen tool. The original portfolio artwork was used as the edit target and remains unchanged.

- Background: `public/images/3d/spacex-pad-live.jpg` — generated as a PNG, then JPEG-encoded at quality 85 for web delivery.
- Rocket: `public/images/3d/spacex-rocket-live.png` — transparent cutout, original alpha preserved.
- Original reference: `public/images/3d/spacex-3d.webp`.
- Finance: rendered SVG interface and chart, with no rasterized text or baked-in numbers.

## Final prompts

### Background plate — precise-object-edit

Use case: precise-object-edit. Edit target: the attached existing portfolio image of a white-and-black rocket landing on an ocean platform. Produce a clean background plate for animation. Remove the entire rocket, all its landing legs, engine flame, smoke plume and rocket shadow/reflection. Reconstruct the empty landing platform naturally, including the unobstructed white landing circle and pad center. Preserve the photographic blue daytime sky, clouds, ocean waves, platform geometry, original camera angle, horizon level and 3:2 landscape composition. No rocket, no vehicle, no smoke, no flame, no text, no added objects. Photorealistic high-quality background, not an illustration.

### Rocket cutout — background-extraction

Use case: background-extraction. Edit target: the rocket in the attached existing portfolio image. Extract just this same photorealistic white-and-black rocket and its complete deployed landing legs into a clean isolated cutout. Preserve its vertical front-facing pose, white nose, dark panels, silver details, realistic materials and lighting. Remove ALL sky, ocean, platform, ground, background, exhaust, flames, smoke and cast ground shadows. The empty background must be genuinely transparent with an alpha channel. Tall portrait composition tightly framing the complete rocket from nose tip to landing feet with a small clear margin; minimal empty padding. Rocket only, no text or extra objects. This is a sprite that will be composited on the unchanged landing pad.
