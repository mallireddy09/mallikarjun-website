import { scrollToSection } from "./navigation";

afterEach(() => {
  document.body.innerHTML = "";
  window.history.replaceState(null, "", "/");
});

test("section navigation keeps the repository path and query string", () => {
  window.history.replaceState(null, "", "/mallireddy09/?ref=shared#home");
  document.body.innerHTML = '<section id="about"></section>';
  const target = document.getElementById("about");
  target.scrollIntoView = jest.fn();
  expect(scrollToSection("about")).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  expect(window.location.pathname + window.location.search + window.location.hash)
    .toBe("/mallireddy09/?ref=shared#about");
});

test("a missing section leaves the current URL intact", () => {
  window.history.replaceState(null, "", "/mallireddy09/#home");
  expect(scrollToSection("missing")).toBe(false);
  expect(window.location.pathname + window.location.hash).toBe("/mallireddy09/#home");
});

test("route-driven scrolling can leave URL updates to React Router", () => {
  window.history.replaceState(null, "", "/mallireddy09/about");
  document.body.innerHTML = '<section id="about"></section>';
  const target = document.getElementById("about");
  target.scrollIntoView = jest.fn();
  expect(scrollToSection("about", { updateHash: false })).toBe(true);
  expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
  expect(window.location.pathname + window.location.hash).toBe("/mallireddy09/about");
});
