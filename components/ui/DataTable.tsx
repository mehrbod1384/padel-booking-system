"use client";

import type { ReactNode } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Presentational shell shared by every admin table: toolbar, loading skeleton,
 * error message and empty state live here so tables stay pure markup.
 */
export function DataTableCard({
  toolbar,
  children,
  isLoading = false,
  skeletonRows = 5,
  skeletonColumns = 5,
  error,
  isEmpty = false,
  empty,
  footer,
  className,
}: {
  toolbar?: ReactNode;
  children: ReactNode;
  isLoading?: boolean;
  skeletonRows?: number;
  skeletonColumns?: number;
  error?: string;
  isEmpty?: boolean;
  empty?: ReactNode;
  /** Rendered under the body — used for pagination. Hidden while loading/empty. */
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "gap-0 rounded-xl border-zinc-800 bg-zinc-800/50 py-0 backdrop-blur-xl",
        className,
      )}
    >
      {toolbar}

      <CardContent className="p-0">
        {error ? (
          <div
            role="alert"
            className="border-t border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </div>
        ) : isLoading ? (
          <TableSkeleton rows={skeletonRows} columns={skeletonColumns} />
        ) : isEmpty ? (
          <div className="p-4">{empty}</div>
        ) : (
          children
        )}
      </CardContent>

      {!error && !isLoading && !isEmpty && footer}
    </Card>
  );
}

export function DataTableToolbar({
  title,
  count,
  children,
  className,
}: {
  title?: string;
  count?: number;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-zinc-800 p-4 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      {(title || typeof count === "number") && (
        <div className="flex items-center gap-2">
          {title && (
            <h2 className="text-sm font-bold text-white">{title}</h2>
          )}

          {typeof count === "number" && (
            <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-semibold text-zinc-400 tabular-nums">
              {count}
            </span>
          )}
        </div>
      )}

      {children && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {children}
        </div>
      )}
    </div>
  );
}

export function TableSearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative sm:w-64", className)}>
      <Search
        size={14}
        className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <Input
        type="search"
        value={value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 rounded-lg border-zinc-700 bg-zinc-900/60 pl-8 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:border-brand focus-visible:ring-brand/30"
      />
    </div>
  );
}