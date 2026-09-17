"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import SegmentedControl from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/button";
import {
  buildPageItems,
  getRangeLabel,
  PAGE_SIZE_OPTIONS,
} from "@/lib/pagination";
import { cn } from "@/lib/utils";

/**
 * Shared pager. Page numbers only render when there is more than one page;
 * the range summary (and the optional rows-per-page control) always shows.
 */
export default function Pagination({
  page,
  pageCount,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  className,
}: {
  page: number;
  pageCount: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  className?: string;
}) {
  const pageItems = buildPageItems(page, pageCount);

  const arrowClassName =
    "text-zinc-400 hover:bg-zinc-800 hover:text-brand disabled:opacity-40";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-zinc-800 p-4 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-4">
        <p className="text-xs font-semibold tabular-nums text-zinc-500">
          {getRangeLabel(page, pageSize, totalItems)}
        </p>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">Rows</span>

            <SegmentedControl
              size="sm"
              value={String(pageSize)}
              onChange={(value) => onPageSizeChange(Number(value))}
              options={pageSizeOptions.map((option) => ({
                value: String(option),
                label: String(option),
              }))}
            />
          </div>
        )}
      </div>

      {pageCount > 1 && (
        <nav
          aria-label="Reservations pagination"
          className="flex items-center gap-1"
        >
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className={arrowClassName}
          >
            <ChevronLeft className="size-4" />
          </Button>

          {pageItems.map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="px-1 text-xs text-zinc-600"
              >
                …
              </span>
            ) : (
              <Button
                key={item}
                variant="ghost"
                size="icon-sm"
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={cn(
                  "tabular-nums text-zinc-400 hover:bg-zinc-800 hover:text-brand",
                  item === page &&
                    "bg-brand text-black hover:bg-brand hover:text-black",
                )}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Next page"
            disabled={page >= pageCount}
            onClick={() => onPageChange(page + 1)}
            className={arrowClassName}
          >
            <ChevronRight className="size-4" />
          </Button>
        </nav>
      )}
    </div>
  );
}