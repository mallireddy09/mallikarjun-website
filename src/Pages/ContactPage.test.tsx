import { fireEvent, render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";
import { PROFILE } from "../data/profile";

afterEach(() => jest.restoreAllMocks());

test("shared contact fields retain their independent values and encode the email draft", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  render(<ContactPage />);
  const values = [
    ["Enter your name*", "Alex & Sam"],
    ["Enter your email*", "alex+portfolio@example.com"],
    ["Enter your subject", "Data & AI inquiry?"],
    ["Enter your Message*", "Hello!\nLet's discuss GCP & AWS."],
  ];
  for (const [label, value] of values) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
  for (const [label, value] of values) {
    expect(screen.getByLabelText(label)).toHaveValue(value);
  }
  expect(screen.getByLabelText("Enter your email*")).toHaveAttribute("type", "email");
  expect(screen.getByLabelText("Enter your Message*").tagName).toBe("TEXTAREA");
  fireEvent.click(screen.getByRole("button", { name: "Send Email" }));
  const url = new URL(open.mock.calls[0][0] ?? "");
  expect(url.protocol + url.pathname).toBe(`mailto:${PROFILE.email}`);
  expect(url.searchParams.get("subject")).toBe("Data & AI inquiry?");
  expect(url.searchParams.get("body")).toBe(
    "Hello,\n\nI am Alex & Sam.\nHello!\nLet's discuss GCP & AWS.\n\nFrom: Alex & Sam (alex+portfolio@example.com)"
  );
});

test("an empty subject keeps the existing default email subject", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  render(<ContactPage />);
  fireEvent.change(screen.getByLabelText("Enter your name*"), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText("Enter your email*"), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText("Enter your Message*"), { target: { value: "Hello" } });
  fireEvent.click(screen.getByRole("button", { name: "Send Email" }));
  expect(new URL(open.mock.calls[0][0] ?? "").searchParams.get("subject")).toBe("Regarding your inquiry");
});

test.each([
  ["Enter your name*", ""],
  ["Enter your email*", ""],
  ["Enter your email*", "invalid-email"],
  ["Enter your Message*", ""],
])("invalid %s prevents opening a draft", (label, value) => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  const { container } = render(<ContactPage />);
  fireEvent.change(screen.getByLabelText("Enter your name*"), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText("Enter your email*"), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText("Enter your Message*"), { target: { value: "Hello" } });
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
  fireEvent.click(screen.getByRole("button", { name: "Send Email" }));
  // Programmatic submission must also respect validity.
  fireEvent.submit(container.querySelector("form")!);
  expect(open).not.toHaveBeenCalled();
});

test("a valid form submission opens one draft", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => null);
  const { container } = render(<ContactPage />);
  fireEvent.change(screen.getByLabelText("Enter your name*"), { target: { value: "Alex" } });
  fireEvent.change(screen.getByLabelText("Enter your email*"), { target: { value: "alex@example.com" } });
  fireEvent.change(screen.getByLabelText("Enter your Message*"), { target: { value: "Hello" } });
  expect(screen.getByRole("button", { name: "Send Email" })).toHaveAttribute("type", "submit");
  fireEvent.submit(container.querySelector("form")!);
  expect(open).toHaveBeenCalledTimes(1);
});
