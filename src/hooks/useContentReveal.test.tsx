import { useRef } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import useContentReveal from "./useContentReveal";

let intersect: IntersectionObserverCallback;
let motionChanged: () => void;
let reduced: boolean;
let observer: IntersectionObserver;
let animation: { cancel: ReturnType<typeof vi.fn>; onfinish: (() => void) | null };
const animate = vi.fn();
const originalAnimate = Object.getOwnPropertyDescriptor(Element.prototype, "animate");

class MockObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  constructor(callback: IntersectionObserverCallback) {
    intersect = callback;
    observer = this as unknown as IntersectionObserver;
  }
}

function Harness({ extra = false }: { extra?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useContentReveal(ref);
  return <div ref={ref}>
    <div className="grid-item" data-testid="card"><button>Project</button></div>
    {extra && <div className="grid-item" data-testid="new-card">New project</div>}
  </div>;
}

function enter(element: Element) {
  act(() => intersect([{ target: element, isIntersecting: true } as IntersectionObserverEntry], observer));
}

beforeEach(() => {
  reduced = false;
  animation = { cancel: vi.fn(), onfinish: null };
  animate.mockReset().mockReturnValue(animation);
  Object.defineProperty(Element.prototype, "animate", { configurable: true, value: animate });
  vi.stubGlobal("IntersectionObserver", MockObserver);
  vi.stubGlobal("matchMedia", () => ({
    get matches() { return reduced; },
    addEventListener: (_event: string, listener: () => void) => { motionChanged = listener; },
    removeEventListener: vi.fn(),
  }));
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  if (originalAnimate) Object.defineProperty(Element.prototype, "animate", originalAnimate);
  else Reflect.deleteProperty(Element.prototype, "animate");
});

test("an offscreen card reveals on entry and stays visible after the animation", () => {
  const { unmount } = render(<Harness />);
  const card = screen.getByTestId("card");
  expect(card).toHaveClass("scroll-reveal-pending");
  enter(card);
  expect(card).not.toHaveClass("scroll-reveal-pending");
  expect(card).toHaveAttribute("data-scroll-revealed", "true");
  expect(animate).toHaveBeenCalledTimes(1);
  expect(observer.unobserve).toHaveBeenCalledWith(card);
  act(() => animation.onfinish?.());
  expect(card).not.toHaveClass("scroll-reveal-pending");
  unmount();
  expect(animation.cancel).not.toHaveBeenCalled();
  expect(observer.disconnect).toHaveBeenCalled();
});

test("keyboard focus reveals the containing card without animation", () => {
  render(<Harness />);
  fireEvent.focusIn(screen.getByRole("button", { name: "Project" }));
  expect(screen.getByTestId("card")).not.toHaveClass("scroll-reveal-pending");
  expect(animate).not.toHaveBeenCalled();
});

test("reduced motion shows cards immediately", () => {
  reduced = true;
  render(<Harness />);
  expect(screen.getByTestId("card")).not.toHaveClass("scroll-reveal-pending");
  expect(observer.observe).not.toHaveBeenCalled();
  expect(animate).not.toHaveBeenCalled();
});

test("enabling reduced motion cancels active animation and reveals pending cards", () => {
  render(<Harness extra />);
  enter(screen.getByTestId("card"));
  reduced = true;
  act(() => motionChanged());
  expect(animation.cancel).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId("new-card")).not.toHaveClass("scroll-reveal-pending");
  expect(animate).toHaveBeenCalledTimes(1);
});

test("new filtered cards are observed and active animation is cancelled on unmount", async () => {
  const { rerender, unmount } = render(<Harness />);
  rerender(<Harness extra />);
  const card = screen.getByTestId("new-card");
  await waitFor(() => expect(observer.observe).toHaveBeenCalledWith(card));
  expect(card).toHaveClass("scroll-reveal-pending");
  enter(card);
  unmount();
  expect(animation.cancel).toHaveBeenCalledTimes(1);
  expect(observer.disconnect).toHaveBeenCalled();
});

test("content stays readable when animation support is unavailable", () => {
  Reflect.deleteProperty(Element.prototype, "animate");
  render(<Harness />);
  expect(screen.getByTestId("card")).not.toHaveClass("scroll-reveal-pending");
});
