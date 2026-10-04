import { initSkillSphere } from "./sphere";

interface MockMediaQueryList extends MediaQueryList {
  matches: boolean;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
}

const originalMotion = window.matchMedia;
const originalObserver = Object.getOwnPropertyDescriptor(window, "IntersectionObserver");
const originalPath = Object.getOwnPropertyDescriptor(window, "Path2D");
const originalHidden = Object.getOwnPropertyDescriptor(document, "hidden");
let motion: MockMediaQueryList;
let motionChanged: () => void;
let intersect: (visible: boolean) => void;
let observer: IntersectionObserver;
let canvas: HTMLCanvasElement;
let cleanup: (() => void) | undefined;
let frames: Map<number, FrameRequestCallback>;
let context: { [key: string]: jest.Mock };

class MockObserver implements IntersectionObserver {
  root = null;
  rootMargin = "0px";
  thresholds = [0];
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
  takeRecords = () => [];
  constructor(callback: IntersectionObserverCallback) {
    observer = this;
    intersect = (visible) => callback([{ isIntersecting: visible } as IntersectionObserverEntry], this);
  }
}

function move(x: number, y: number) {
  const event = new MouseEvent("mousemove");
  Object.defineProperties(event, { offsetX: { value: x }, offsetY: { value: y } });
  canvas.dispatchEvent(event);
}

function setHidden(hidden: boolean) {
  Object.defineProperty(document, "hidden", { configurable: true, value: hidden });
  document.dispatchEvent(new Event("visibilitychange"));
}

beforeEach(() => {
  jest.useFakeTimers();
  document.body.innerHTML = '<canvas id="myCanvas"></canvas><div id="svg-container"><svg><path fill="#fff" d="M0 0h1v1z" /></svg><svg><path fill="#fff" d="M0 0h1v1z" /></svg></div>';
  canvas = document.querySelector("canvas")!;
  Object.defineProperties(canvas, { clientWidth: { value: 800 }, clientHeight: { value: 500 } });
  jest.spyOn(canvas, "getBoundingClientRect").mockReturnValue({ x: 0, y: 0, top: 0, bottom: 500, left: 0, right: 800, width: 800, height: 500, toJSON: () => ({}) });
  context = Object.fromEntries(["setTransform", "clearRect", "save", "beginPath", "translate", "scale", "fill", "restore"].map(name => [name, jest.fn()]));
  jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(context as unknown as CanvasRenderingContext2D);
  Object.defineProperty(window, "Path2D", { configurable: true, value: class {} });
  Object.defineProperty(window, "IntersectionObserver", { configurable: true, value: MockObserver });
  motion = {
    matches: false, media: "(prefers-reduced-motion: reduce)", onchange: null,
    addListener: jest.fn(), removeListener: jest.fn(), dispatchEvent: jest.fn(),
    addEventListener: jest.fn((_event: string, callback: () => void) => { motionChanged = callback; }),
    removeEventListener: jest.fn(),
  };
  window.matchMedia = jest.fn(() => motion);
  Object.defineProperty(document, "hidden", { configurable: true, value: false });
  frames = new Map();
  let frameId = 0;
  jest.spyOn(window, "requestAnimationFrame").mockImplementation(callback => { frames.set(++frameId, callback); return frameId; });
  jest.spyOn(window, "cancelAnimationFrame").mockImplementation(id => { frames.delete(id); });
});

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
  jest.restoreAllMocks();
  jest.useRealTimers();
  window.matchMedia = originalMotion;
  for (const [target, key, descriptor] of [
    [window, "IntersectionObserver", originalObserver],
    [window, "Path2D", originalPath],
    [document, "hidden", originalHidden],
  ] as const) {
    if (descriptor) Object.defineProperty(target, key, descriptor);
    else Reflect.deleteProperty(target, key);
  }
  document.body.innerHTML = "";
});

test.each([[300, 150], [500, 350], [400, 250], [400, 450]])(
  "slowdown at (%s, %s) finishes without leaving timers", (x, y) => {
    cleanup = initSkillSphere();
    move(x, y);
    canvas.dispatchEvent(new MouseEvent("mouseout"));
    jest.advanceTimersByTime(20000);
    expect(jest.getTimerCount()).toBe(0);
    expect(frames.size).toBe(1);
  }
);

test("repeated mouseout keeps one timer and re-entry cancels it", () => {
  cleanup = initSkillSphere();
  move(300, 150);
  canvas.dispatchEvent(new MouseEvent("mouseout"));
  expect(jest.getTimerCount()).toBe(1);
  canvas.dispatchEvent(new MouseEvent("mouseout"));
  expect(jest.getTimerCount()).toBe(1);
  move(300, 150);
  expect(jest.getTimerCount()).toBe(0);
});

test("animation pauses off-screen and in hidden tabs, then resumes once", () => {
  cleanup = initSkillSphere();
  move(300, 150);
  canvas.dispatchEvent(new MouseEvent("mouseout"));
  intersect(false);
  expect(frames.size).toBe(0);
  expect(jest.getTimerCount()).toBe(0);
  const pausedDraws = context.clearRect.mock.calls.length;
  jest.advanceTimersByTime(2000);
  expect(context.clearRect).toHaveBeenCalledTimes(pausedDraws);
  intersect(true);
  expect(frames.size).toBe(1);
  setHidden(true);
  expect(frames.size).toBe(0);
  setHidden(false);
  expect(frames.size).toBe(1);
  intersect(true);
  expect(frames.size).toBe(1);
});

test("an initially off-screen sphere does not start an animation loop", () => {
  jest.mocked(canvas.getBoundingClientRect).mockReturnValue({ x: 0, y: 2000, top: 2000, bottom: 2500, left: 0, right: 800, width: 800, height: 500, toJSON: () => ({}) });
  cleanup = initSkillSphere();
  expect(context.clearRect).toHaveBeenCalled();
  expect(frames.size).toBe(0);
  intersect(true);
  expect(frames.size).toBe(1);
});

test("reduced motion draws a static sphere and responds to preference changes", () => {
  motion.matches = true;
  cleanup = initSkillSphere();
  expect(context.fill).toHaveBeenCalled();
  expect(frames.size).toBe(0);
  move(300, 150);
  canvas.dispatchEvent(new MouseEvent("mouseout"));
  expect(jest.getTimerCount()).toBe(0);
  motion.matches = false;
  motionChanged();
  expect(frames.size).toBe(1);
  motion.matches = true;
  motionChanged();
  expect(frames.size).toBe(0);
  const staticDraws = context.clearRect.mock.calls.length;
  jest.advanceTimersByTime(2000);
  expect(context.clearRect).toHaveBeenCalledTimes(staticDraws);
  window.dispatchEvent(new Event("resize"));
  expect(context.clearRect).toHaveBeenCalledTimes(staticDraws + 1);
  expect(frames.size).toBe(0);
});

test("unmount cancels callbacks and removes observation and listeners", () => {
  cleanup = initSkillSphere();
  const pendingFrame = [...frames.values()][0];
  move(300, 150);
  canvas.dispatchEvent(new MouseEvent("mouseout"));
  cleanup();
  cleanup = undefined;
  expect(frames.size).toBe(0);
  expect(jest.getTimerCount()).toBe(0);
  expect(observer.disconnect).toHaveBeenCalled();
  expect(motion.removeEventListener).toHaveBeenCalledWith("change", motionChanged);
  const draws = context.clearRect.mock.calls.length;
  pendingFrame(0);
  intersect(true);
  motionChanged();
  window.dispatchEvent(new Event("resize"));
  document.dispatchEvent(new Event("visibilitychange"));
  expect(context.clearRect).toHaveBeenCalledTimes(draws);
});
