import { vi } from "vitest";
import { publicAsset } from "./publicAsset";

afterEach(() => vi.unstubAllEnvs());

test.each(["/", "/mallireddy09/"])("public assets honor the %s deployment base", base => {
  vi.stubEnv("BASE_URL", base);
  expect(publicAsset("/images/example.svg")).toBe(`${base}images/example.svg`);
  expect(publicAsset("images/example.svg")).toBe(`${base}images/example.svg`);
});
