import { render } from "@testing-library/react";
import { vi } from "vitest";
import * as demo from "../data/projectDemo";
import ProjectPreview from "./ProjectPreview";

const playback = vi.hoisted(() => ({ time: 0 }));
vi.mock("../hooks/useProjectPlayback", () => ({
  default: () => ({ ref: { current: null }, running: true, time: playback.time }),
}));

test("finance avoids rebuilding fixed bills between tab boundaries", () => {
  playback.time = 0;
  const calculate = vi.spyOn(demo, "moneyFrame");
  const { container, rerender } = render(<ProjectPreview kind="finance" image="" />);
  expect(calculate).toHaveBeenCalledTimes(1);
  for (const time of [100, 1000, 4199]) {
    playback.time = time;
    rerender(<ProjectPreview kind="finance" image="" />);
  }
  expect(calculate).toHaveBeenCalledTimes(1);
  playback.time = 4200;
  rerender(<ProjectPreview kind="finance" image="" />);
  expect(calculate).toHaveBeenCalledTimes(2);
  expect(container.querySelector(".phone-demo-screen")).toHaveAttribute("data-screen", "Groups");
  playback.time = 5000;
  rerender(<ProjectPreview kind="finance" image="" />);
  expect(calculate).toHaveBeenCalledTimes(2);
  playback.time = 8400;
  rerender(<ProjectPreview kind="finance" image="" />);
  expect(calculate).toHaveBeenCalledTimes(3);
  expect(container.querySelector(".phone-demo-screen")).toHaveAttribute("data-screen", "Activity");
  expect(container.querySelector(".phone-balance")).toHaveTextContent("$1,525");
  calculate.mockRestore();
});
