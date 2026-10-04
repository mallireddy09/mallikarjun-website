import { act } from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import PortfolioPage from "./PortfolioPage";

jest.mock("./HomePage", () => () => <div>Home</div>);
jest.mock("./AboutPage", () => () => <div>About</div>);
jest.mock("./Skills", () => () => <div>Skills</div>);
jest.mock("./ExperiencePage", () => () => <div>Experience</div>);
jest.mock("./EducationPage", () => () => <div>Education</div>);
jest.mock("./ProjectsPage", () => () => <div>Projects</div>);
jest.mock("./BlogsPage", () => () => <div>Blogs</div>);
jest.mock("./CertificationPage", () => () => <div>Certifications</div>);
jest.mock("./ContactPage", () => () => <div>Contact</div>);

const originalScroll = HTMLElement.prototype.scrollIntoView;
const scroll = jest.fn();
const originalFonts = Object.getOwnPropertyDescriptor(document, "fonts");

beforeEach(() => {
  jest.useFakeTimers();
  scroll.mockClear();
  HTMLElement.prototype.scrollIntoView = scroll;
});

afterEach(() => {
  jest.useRealTimers();
  HTMLElement.prototype.scrollIntoView = originalScroll;
  if (originalFonts) Object.defineProperty(document, "fonts", originalFonts);
  else Reflect.deleteProperty(document, "fonts");
  window.history.replaceState(null, "", "/");
});

async function settleScroll() {
  await act(async () => {
    jest.advanceTimersByTime(16);
    await Promise.resolve();
    jest.advanceTimersByTime(16);
  });
}

function CurrentLocation() {
  const { pathname, search, hash } = useLocation();
  return <output aria-label="Current location">{pathname + search + hash}</output>;
}

test.each([
  ["/certification?ref=shared", "certifications"],
  ["/?ref=shared#certification", "certifications"],
  ["/certifications?ref=shared", "certifications"],
  ["/about?ref=shared", "about"],
])("normalizes %s while preserving its query string", async (url, section) => {
  const { container } = render(
    <MemoryRouter initialEntries={[url]}>
      <PortfolioPage theme="dark-theme" />
      <CurrentLocation />
    </MemoryRouter>
  );
  await settleScroll();
  expect(screen.getByLabelText("Current location")).toHaveTextContent(`/?ref=shared#${section}`);
  expect(scroll).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  expect(scroll.mock.instances[0]).toBe(container.querySelector(`#${section}`));
});

test("an unknown anchor keeps its URL and does not scroll", async () => {
  render(
    <MemoryRouter initialEntries={["/?ref=shared#missing"]}>
      <PortfolioPage theme="dark-theme" />
      <CurrentLocation />
    </MemoryRouter>
  );
  await settleScroll();
  expect(screen.getByLabelText("Current location")).toHaveTextContent("/?ref=shared#missing");
  expect(scroll).not.toHaveBeenCalled();
});

test("deep-link alignment waits for fonts to finish loading", async () => {
  let finishFonts!: () => void;
  Object.defineProperty(document, "fonts", { configurable: true, value: {
    ready: new Promise<void>((resolve) => { finishFonts = resolve; }),
  } });
  render(<MemoryRouter initialEntries={["/#education"]}><PortfolioPage theme="dark-theme" /></MemoryRouter>);
  await settleScroll();
  expect(scroll).not.toHaveBeenCalled();
  await act(async () => { finishFonts(); await Promise.resolve(); jest.advanceTimersByTime(16); });
  expect(scroll.mock.instances[0]).toBe(document.getElementById("education"));
});

test("pending font alignment is cancelled on unmount", async () => {
  let finishFonts!: () => void;
  Object.defineProperty(document, "fonts", { configurable: true, value: {
    ready: new Promise<void>((resolve) => { finishFonts = resolve; }),
  } });
  const { unmount } = render(<MemoryRouter initialEntries={["/#education"]}><PortfolioPage theme="dark-theme" /></MemoryRouter>);
  await settleScroll();
  unmount();
  await act(async () => { finishFonts(); await Promise.resolve(); jest.advanceTimersByTime(16); });
  expect(scroll).not.toHaveBeenCalled();
});

test("pending alignment does not override a newer sidebar anchor", async () => {
  let finishFonts!: () => void;
  Object.defineProperty(document, "fonts", { configurable: true, value: {
    ready: new Promise<void>((resolve) => { finishFonts = resolve; }),
  } });
  render(<MemoryRouter initialEntries={["/#education"]}><PortfolioPage theme="dark-theme" /></MemoryRouter>);
  await settleScroll();
  window.history.replaceState(null, "", "#projects");
  await act(async () => { finishFonts(); await Promise.resolve(); jest.advanceTimersByTime(16); });
  expect(scroll).not.toHaveBeenCalled();
});
