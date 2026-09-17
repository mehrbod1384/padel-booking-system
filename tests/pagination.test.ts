import { describe, expect, it } from "vitest";

import {
  buildPageItems,
  clampPage,
  getPageCount,
  getRangeLabel,
  paginate,
} from "@/lib/pagination";

describe("getPageCount", () => {
  it("returns 1 page for an empty list", () => {
    expect(getPageCount(0, 10)).toBe(1);
  });

  it("rounds partial pages up", () => {
    expect(getPageCount(42, 10)).toBe(5);
    expect(getPageCount(20, 10)).toBe(2);
  });

  it("falls back to 1 page for an invalid page size", () => {
    expect(getPageCount(42, 0)).toBe(1);
  });
});

describe("clampPage", () => {
  it("keeps a valid page untouched", () => {
    expect(clampPage(3, 5)).toBe(3);
  });

  it("clamps below 1 and above the last page", () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(9, 5)).toBe(5);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 42 }, (_, index) => index + 1);

  it("slices the requested window", () => {
    expect(paginate(items, 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(paginate(items, 2, 10)[0]).toBe(11);
  });

  it("returns the short last page", () => {
    expect(paginate(items, 5, 10)).toEqual([41, 42]);
  });

  it("returns an empty array past the end", () => {
    expect(paginate(items, 6, 10)).toEqual([]);
  });
});

describe("getRangeLabel", () => {
  it("describes an empty result", () => {
    expect(getRangeLabel(1, 10, 0)).toBe("No results");
  });

  it("describes full and partial pages", () => {
    expect(getRangeLabel(1, 10, 42)).toBe("Showing 1–10 of 42");
    expect(getRangeLabel(5, 10, 42)).toBe("Showing 41–42 of 42");
  });
});

describe("buildPageItems", () => {
  it("lists every page when they all fit", () => {
    expect(buildPageItems(1, 1)).toEqual([1]);
    expect(buildPageItems(3, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("fills the window at the start", () => {
    expect(buildPageItems(1, 20)).toEqual([1, 2, 3, 4, "ellipsis", 20]);
  });

  it("centres the window in the middle", () => {
    expect(buildPageItems(10, 20)).toEqual([
      1,
      "ellipsis",
      9,
      10,
      11,
      "ellipsis",
      20,
    ]);
  });

  it("fills the window at the end", () => {
    expect(buildPageItems(20, 20)).toEqual([
      1,
      "ellipsis",
      17,
      18,
      19,
      20,
    ]);
  });

  it("never repeats a page number", () => {
    for (let page = 1; page <= 20; page += 1) {
      const numbers = buildPageItems(page, 20).filter(
        (item): item is number => item !== "ellipsis",
      );

      expect(new Set(numbers).size).toBe(numbers.length);
      expect(numbers).toContain(page);
      expect(numbers[0]).toBe(1);
      expect(numbers[numbers.length - 1]).toBe(20);
    }
  });
});