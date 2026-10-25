import { act, render } from "@testing-library/react";
import { vi } from "vitest";
import HomePage from "./HomePage";
import { HERO_ROLES } from "../data/profile";

let reduced = false;
let preferenceChanged: () => void;
const removeListener = vi.fn();

beforeEach(() => {
  reduced = false;
  removeListener.mockClear();
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", (query: string) => ({
    get matches() { return query.includes("prefers-reduced-motion") && reduced; },
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (_event: string, listener: () => void) => { preferenceChanged = listener; },
    removeEventListener: removeListener,
  }));
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

test("reduced motion renders a complete role without a blinking cursor", () => {
  reduced = true;
  const { container } = render(<HomePage />);
  expect(container.querySelector(".typing")).toHaveTextContent(HERO_ROLES[0]);
  expect(container.querySelector(".typed-cursor")).toBeNull();
  act(() => { vi.advanceTimersByTime(10000); });
  expect(container.querySelector(".typing")).toHaveTextContent(HERO_ROLES[0]);
});

test("typing stops and restarts when the motion preference changes", () => {
  const { container, unmount } = render(<HomePage />);
  act(() => { vi.advanceTimersByTime(400); });
  expect(container.querySelector(".typed-cursor")).not.toBeNull();
  reduced = true;
  act(() => preferenceChanged());
  expect(container.querySelector(".typing")).toHaveTextContent(HERO_ROLES[0]);
  expect(container.querySelector(".typed-cursor")).toBeNull();
  act(() => { vi.advanceTimersByTime(10000); });
  expect(container.querySelector(".typing")).toHaveTextContent(HERO_ROLES[0]);
  reduced = false;
  act(() => preferenceChanged());
  act(() => { vi.advanceTimersByTime(400); });
  expect(container.querySelector(".typed-cursor")).not.toBeNull();
  unmount();
  expect(removeListener).toHaveBeenCalledWith("change", preferenceChanged);
});
