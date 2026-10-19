import { act } from "react";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import StageTypedText from "./StageTypedText";
let reduced = false;
beforeEach(() => {
  reduced = false;
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

test("text types once and remains complete", () => {
  const text = "Transform raw events into trusted datasets.";
  const { container } = render(<StageTypedText text={text} animate duration={1000} />);
  const visible = () => container.querySelector(".type-visible")!;
  act(() => { vi.advanceTimersByTime(100); });
  expect(visible().textContent!.length).toBeGreaterThan(0);
  expect(visible().textContent!.length).toBeLessThan(text.length);
  act(() => { vi.advanceTimersByTime(1500); });
  expect(visible().textContent).toBe(text);
  act(() => { vi.advanceTimersByTime(5000); });
  expect(visible().textContent).toBe(text);
});
test("switching stages cancels delayed typing from the old stage", () => {
  const { container, rerender } = render(<StageTypedText text="Previous stage" animate delay={500} />);
  act(() => { vi.advanceTimersByTime(100); });
  rerender(<StageTypedText text="New stage" animate />);
  act(() => { vi.advanceTimersByTime(1500); });
  expect(container.querySelector(".type-visible")?.textContent).toBe("New stage");
});
test("skill labels wait for their box before typing", () => {
  const { container } = render(<StageTypedText text="Spark" animate duration={300} delay={200} />);
  act(() => { vi.advanceTimersByTime(150); });
  expect(container.querySelector(".type-visible")?.textContent).toBe("");
  act(() => { vi.advanceTimersByTime(150); });
  expect(container.querySelector(".type-visible")!.textContent!.length).toBeGreaterThan(0);
  expect(container.querySelector(".type-visible")!.textContent!.length).toBeLessThan(5);
  act(() => { vi.advanceTimersByTime(600); });
  expect(container.querySelector(".type-visible")?.textContent).toBe("Spark");
});
test("reduced motion shows all text immediately", () => {
  reduced = true;
  const { container } = render(<StageTypedText text="Complete description" animate delay={500} />);
  expect(container.querySelector(".type-visible")?.textContent).toBe("Complete description");
  expect(container.querySelector(".type-visible")).toHaveAttribute("data-typing", "false");
});
