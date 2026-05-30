import "@testing-library/jest-dom/vitest";

class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
// @ts-expect-error jsdom has no IntersectionObserver
globalThis.IntersectionObserver = IO;
// @ts-expect-error jsdom has no matchMedia
globalThis.matchMedia ||= (q: string) => ({
  matches: false,
  media: q,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  onchange: null,
  dispatchEvent() {
    return false;
  },
});
