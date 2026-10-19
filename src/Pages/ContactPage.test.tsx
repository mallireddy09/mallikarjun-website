import { vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";
import { PROFILE } from "../data/profile";

afterEach(() => vi.restoreAllMocks());

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
