import { vi } from "vitest";
import type { PropsWithChildren } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Skills from "./Skills";

vi.mock("../helper/sphere", () => ({ initSkillSphere: vi.fn(() => () => {}) }));

vi.mock("./AnimatedSection", () => ({ default: ({ children }: PropsWithChildren) => children }));

test("pipeline tabs change content and support keyboard navigation", () => {
  render(<Skills theme="dark-theme" />);
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Start with the right signal.");
  fireEvent.click(screen.getByRole("tab", { name: "Process" }));
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Turn data into something useful.");
  fireEvent.keyDown(screen.getByRole("tab", { name: "Process" }), { key: "ArrowRight" });
  expect(screen.getByRole("tab", { name: "Store" })).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveTextContent("Give every dataset a home.");
  fireEvent.keyDown(screen.getByRole("tab", { name: "Store" }), { key: "End" });
  expect(screen.getByRole("tab", { name: "Observe" })).toHaveAttribute("aria-selected", "true");
});
