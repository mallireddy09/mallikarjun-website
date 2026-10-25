import { act, renderHook } from "@testing-library/react";
import { useLayoutEffect } from "react";
import { vi } from "vitest";
import useProjectPlayback from "./useProjectPlayback";

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

test("pausing stops ticks before layout observers can advance the clock", () => {
  vi.useFakeTimers();
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  let visibility!: IntersectionObserverCallback;
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) { visibility = callback; }
    observe() {} disconnect() {}
  });
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
  let wasRunning = false;
  const { result } = renderHook(() => {
    const playback = useProjectPlayback();
    useLayoutEffect(() => {
      // Simulate queued work occurring after the paused DOM commits but before passive effects run.
      if (wasRunning && !playback.running) vi.advanceTimersByTime(5000);
      wasRunning = playback.running;
    }, [playback.running]);
    return playback;
  });
  const visible = (isIntersecting: boolean) => act(() => visibility([{ isIntersecting } as IntersectionObserverEntry], {} as IntersectionObserver));
  visible(true);
  act(() => vi.advanceTimersByTime(4200));
  expect(result.current.time).toBe(4200);
  visible(false);
  expect(result.current.running).toBe(false);
  expect(result.current.time).toBe(4200);
  visible(true);
  act(() => vi.advanceTimersByTime(100));
  expect(result.current.time).toBe(4300);
});
