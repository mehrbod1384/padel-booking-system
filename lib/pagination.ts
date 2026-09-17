export type PageItem = number | "ellipsis";

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [10, 20, 50];

/** Always at least 1 page, even for an empty list. */
export function getPageCount(totalItems: number, pageSize: number) {
  if (pageSize <= 0) return 1;

  return Math.max(1, Math.ceil(totalItems / pageSize));
}

/** Keeps a page number inside `1..pageCount` (filtering can shrink the list). */
export function clampPage(page: number, pageCount: number) {
  return Math.min(Math.max(page, 1), pageCount);
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;

  return items.slice(start, start + pageSize);
}

export function getRangeLabel(
  page: number,
  pageSize: number,
  totalItems: number,
) {
  if (totalItems <= 0) return "No results";

  const first = (page - 1) * pageSize + 1;
  const last = Math.min(page * pageSize, totalItems);

  return `Showing ${first}–${last} of ${totalItems}`;
}

/**
 * Page numbers with ellipsis, e.g. [1, "ellipsis", 9, 10, 11, "ellipsis", 20].
 * The window is pushed back inside the bounds so the first/last pages never
 * leave a gap right next to them.
 */
export function buildPageItems(
  currentPage: number,
  pageCount: number,
  siblingCount = 1,
): PageItem[] {
  // first + last + current + 2 siblings + 2 ellipsis
  const maxVisible = siblingCount * 2 + 5;

  if (pageCount <= maxVisible) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  let start = currentPage - siblingCount;
  let end = currentPage + siblingCount;

  if (start < 2) {
    end = Math.min(end + (2 - start), pageCount - 1);
    start = 2;
  }

  if (end > pageCount - 1) {
    start = Math.max(start - (end - (pageCount - 1)), 2);
    end = pageCount - 1;
  }

  const items: PageItem[] = [1];

  if (start > 2) items.push("ellipsis");

  for (let page = start; page <= end; page += 1) items.push(page);

  if (end < pageCount - 1) items.push("ellipsis");

  items.push(pageCount);

  return items;
}
