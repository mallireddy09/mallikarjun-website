import { vi } from "vitest";
import { scrollToSection } from "./navigation";

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
  window.history.replaceState(null, "", "/");
});

test("reduced motion overrides smooth scrolling without changing navigation", () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));
  document.body.innerHTML = '<section id="contact"></section>';
  const target = document.getElementById("contact")!;
  target.scrollIntoView = vi.fn();
  expect(scrollToSection("contact", { behavior: "smooth" })).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  expect(window.location.hash).toBe("#contact");
});

test("section navigation keeps the repository path and query string", () => {
  window.history.replaceState(null, "", "/mallireddy09/?ref=shared#home");
  document.body.innerHTML = '<section id="about"></section>';
  const target = document.getElementById("about")!;
  target.scrollIntoView = vi.fn();
  expect(scrollToSection("about")).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  expect(window.location.pathname + window.location.search + window.location.hash)
    .toBe("/mallireddy09/?ref=shared#about");
});

test.each(["missing", "//evil.example", "javascript:alert(1)", "__proto__", "about%3Cscript%3E"])("unrecognized section %s leaves the current URL intact", (id) => {
  window.history.replaceState(null, "", "/mallireddy09/#home");
  expect(scrollToSection(id)).toBe(false);
  expect(window.location.pathname + window.location.hash).toBe("/mallireddy09/#home");
});

test("route-driven scrolling can leave URL updates to React Router", () => {
  window.history.replaceState(null, "", "/mallireddy09/about");
  document.body.innerHTML = '<section id="about"></section>';
  const target = document.getElementById("about")!;
  target.scrollIntoView = vi.fn();
  expect(scrollToSection("about", { updateHash: false })).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(window.location.pathname + window.location.hash).toBe("/mallireddy09/about");
});

test("old certification anchors scroll to the plural section and preserve the repository URL", () => {
  window.history.replaceState(null, "", "/mallireddy09/?ref=shared#home");
  document.body.innerHTML = '<section id="certifications"></section>';
  const target = document.getElementById("certifications")!;
  target.scrollIntoView = vi.fn();
  expect(scrollToSection("certification")).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  expect(window.location.pathname + window.location.search + window.location.hash)
    .toBe("/mallireddy09/?ref=shared#certifications");
});

test("sidebar navigation can jump instantly to a distant section", () => {
  document.body.innerHTML = '<section id="certifications"></section>';
  const target = document.getElementById("certifications")!;
  target.scrollIntoView = vi.fn();
  expect(scrollToSection("certifications", { behavior: "instant" })).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  expect(window.location.hash).toBe("#certifications");
});
