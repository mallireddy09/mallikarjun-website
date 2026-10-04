import { fireEvent, render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";
import { PROFILE } from "../data/profile";

afterEach(() => jest.restoreAllMocks());

test("shared contact fields retain their independent values and encode the email draft", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => {});
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
  const url = new URL(open.mock.calls[0][0]);
  expect(url.protocol + url.pathname).toBe(`mailto:${PROFILE.email}`);
  expect(url.searchParams.get("subject")).toBe("Data & AI inquiry?");
  expect(url.searchParams.get("body")).toBe(
    "Hello,\n\nI am Alex & Sam.\nHello!\nLet's discuss GCP & AWS.\n\nFrom: Alex & Sam (alex+portfolio@example.com)"
  );
});

test("an empty subject keeps the existing default email subject", () => {
  const open = jest.spyOn(window, "open").mockImplementation(() => {});
  render(<ContactPage />);
  fireEvent.click(screen.getByRole("button", { name: "Send Email" }));
  expect(new URL(open.mock.calls[0][0]).searchParams.get("subject")).toBe("Regarding your inquiry");
});
