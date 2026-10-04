import React, { act } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("./Pages/PortfolioPage", () => () => null);

const originalMatchMedia = window.matchMedia;
let media;
let onMediaChange;

beforeEach(() => {
  media = {
    matches: false,
    addEventListener: jest.fn((event, listener) => { onMediaChange = listener; }),
    removeEventListener: jest.fn(),
  };
  window.matchMedia = jest.fn(() => media);
});

afterEach(() => {
  window.matchMedia = originalMatchMedia;
  window.history.replaceState(null, "", "/");
});

test("sidebar starts closed and cycles keyboard focus while open", () => {
  const { container } = render(<MemoryRouter><App /></MemoryRouter>);
  const sidebar = container.querySelector("#site-sidebar");
  const menuButton = screen.getByRole("button", { name: "Open menu" });
  expect(sidebar).toHaveAttribute("aria-hidden", "true");
  expect(sidebar).toHaveAttribute("inert");
  expect(menuButton).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(menuButton);
  expect(sidebar).toHaveAttribute("aria-hidden", "false");
  expect(sidebar).not.toHaveAttribute("inert");
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  const links = sidebar.querySelectorAll("a[href]");
  expect(links[0]).toHaveFocus();
  links[links.length - 1].focus();
  fireEvent.keyDown(window, { key: "Tab" });
  expect(menuButton).toHaveFocus();
  fireEvent.keyDown(window, { key: "Tab" });
  expect(links[0]).toHaveFocus();
  fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
  expect(menuButton).toHaveFocus();

  fireEvent.keyDown(window, { key: "Escape" });
  expect(sidebar).toHaveAttribute("aria-hidden", "true");
  expect(sidebar).toHaveAttribute("inert");
  expect(menuButton).toHaveFocus();
  expect(document.body).not.toHaveClass("nav-open");
});

test("overlay and section links close the sidebar and restore menu focus", () => {
  const { container } = render(
    <MemoryRouter><App /><div id="about" /></MemoryRouter>
  );
  const target = container.querySelector("#about");
  target.scrollIntoView = jest.fn();
  const menuButton = screen.getByRole("button", { name: "Open menu" });
  fireEvent.click(menuButton);
  expect(document.body).toHaveClass("nav-open");
  fireEvent.click(screen.getByRole("button", { name: "Close navigation" }));
  expect(document.body).not.toHaveClass("nav-open");
  expect(menuButton).toHaveFocus();

  fireEvent.click(menuButton);
  fireEvent.click(container.querySelector('#site-sidebar a[href="#about"]'));
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  expect(window.location.hash).toBe("#about");
  expect(container.querySelector('#site-sidebar a[href="#about"]')).toHaveAttribute("aria-current", "location");
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
  expect(menuButton).toHaveFocus();
});

test("desktop sidebar starts open without blocking content and stays open after navigation", () => {
  media.matches = true;
  const { container } = render(
    <MemoryRouter><App /><div id="about" /></MemoryRouter>
  );
  const sidebar = container.querySelector("#site-sidebar");
  const menuButton = screen.getByRole("button", { name: "Close menu" });
  const themeButton = screen.getByRole("button", { name: "Toggle theme" });
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  expect(sidebar).not.toHaveAttribute("inert");
  expect(screen.queryByRole("button", { name: "Close navigation" })).not.toBeInTheDocument();
  expect(document.body).not.toHaveClass("nav-open");
  expect(sidebar.querySelector('a[href="#home"]')).not.toHaveFocus();
  themeButton.focus();
  const tab = new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true });
  themeButton.dispatchEvent(tab);
  expect(tab.defaultPrevented).toBe(false);

  container.querySelector("#about").scrollIntoView = jest.fn();
  fireEvent.click(sidebar.querySelector('a[href="#about"]'));
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  fireEvent.click(menuButton);
  expect(sidebar).toHaveAttribute("inert");
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute("aria-expanded", "true");
  expect(document.body).not.toHaveClass("nav-open");
});

test("crossing the desktop breakpoint resets the menu to the device default", () => {
  media.matches = true;
  const { container, unmount } = render(<MemoryRouter><App /></MemoryRouter>);
  const sidebar = container.querySelector("#site-sidebar");
  act(() => onMediaChange({ matches: false }));
  expect(sidebar).toHaveAttribute("inert");
  fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
  expect(document.body).toHaveClass("nav-open");
  act(() => onMediaChange({ matches: true }));
  expect(sidebar).not.toHaveAttribute("inert");
  expect(document.body).not.toHaveClass("nav-open");
  expect(screen.queryByRole("button", { name: "Close navigation" })).not.toBeInTheDocument();
  unmount();
  expect(media.removeEventListener).toHaveBeenCalledWith("change", onMediaChange);
});
