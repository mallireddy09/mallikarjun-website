import { vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";
import { PROFILE } from "../data/profile";

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers(); });

test("contact provides a direct email link without an expandable form", () => {
  const { container } = render(<ContactPage />);
  expect(screen.getByRole("link", { name: "Say hello" })).toHaveAttribute("href", `mailto:${PROFILE.email}`);
  expect(container.querySelector("details")).toBeNull();
  expect(container.querySelector("form")).toBeNull();
});

test("copy email reports success", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<ContactPage />);
  fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
  expect(writeText).toHaveBeenCalledWith(PROFILE.email);
  expect(await screen.findByRole("button", { name: "Email copied" })).toBeInTheDocument();
});

test("clipboard failure shows a usable email address", async () => {
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error("denied")) } });
  render(<ContactPage />);
  fireEvent.click(screen.getByRole("button", { name: "Copy email" }));
  expect(await screen.findByText(`You can email me at ${PROFILE.email}`)).toBeInTheDocument();
});

test("copy confirmation resets after ten seconds", async () => {
  vi.useFakeTimers();
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
  render(<ContactPage />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy email" })));
  act(() => vi.advanceTimersByTime(9_999));
  expect(screen.getByRole("button", { name: "Email copied" })).toBeInTheDocument();
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByRole("button", { name: "Copy email" })).toBeInTheDocument();
  expect(screen.getByRole("status", { hidden: true })).toBeEmptyDOMElement();
});

test("copying again restarts the ten-second confirmation", async () => {
  vi.useFakeTimers();
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<ContactPage />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy email" })));
  act(() => vi.advanceTimersByTime(6_000));
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "Email copied" })));
  act(() => vi.advanceTimersByTime(9_999));
  expect(screen.getByRole("button", { name: "Email copied" })).toBeInTheDocument();
  expect(writeText).toHaveBeenCalledTimes(2);
  act(() => vi.advanceTimersByTime(1));
  expect(screen.getByRole("button", { name: "Copy email" })).toBeInTheDocument();
});

test("unmount cancels the copy confirmation timer", async () => {
  vi.useFakeTimers();
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: vi.fn().mockResolvedValue(undefined) } });
  const { unmount } = render(<ContactPage />);
  await act(async () => fireEvent.click(screen.getByRole("button", { name: "Copy email" })));
  expect(vi.getTimerCount()).toBe(1);
  unmount();
  expect(vi.getTimerCount()).toBe(0);
});
