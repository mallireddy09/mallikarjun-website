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

beforeEach(() => {
  jest.useFakeTimers();
  scroll.mockClear();
  HTMLElement.prototype.scrollIntoView = scroll;
});

afterEach(() => {
  jest.useRealTimers();
  HTMLElement.prototype.scrollIntoView = originalScroll;
});

function CurrentLocation() {
  const { pathname, search, hash } = useLocation();
  return <output aria-label="Current location">{pathname + search + hash}</output>;
}

test.each([
  ["/certification?ref=shared", "certifications"],
  ["/?ref=shared#certification", "certifications"],
  ["/certifications?ref=shared", "certifications"],
  ["/about?ref=shared", "about"],
])("normalizes %s while preserving its query string", (url, section) => {
  const { container } = render(
    <MemoryRouter initialEntries={[url]}>
      <PortfolioPage theme="dark-theme" />
      <CurrentLocation />
    </MemoryRouter>
  );
  act(() => jest.advanceTimersByTime(50));
  expect(screen.getByLabelText("Current location")).toHaveTextContent(`/?ref=shared#${section}`);
  expect(scroll).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  expect(scroll.mock.instances[0]).toBe(container.querySelector(`#${section}`));
});

test("an unknown anchor keeps its URL and does not scroll", () => {
  render(
    <MemoryRouter initialEntries={["/?ref=shared#missing"]}>
      <PortfolioPage theme="dark-theme" />
      <CurrentLocation />
    </MemoryRouter>
  );
  act(() => jest.advanceTimersByTime(50));
  expect(screen.getByLabelText("Current location")).toHaveTextContent("/?ref=shared#missing");
  expect(scroll).not.toHaveBeenCalled();
});
