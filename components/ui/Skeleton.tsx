// components/ui/Skeleton.tsx

import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-800", className)}
      {...props}
    />
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 5,
}: {
  rows?: number;
  columns?: number;
}) {
  return (
    <div data-slot="table-skeleton" className="w-full space-y-3 p-4">
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex items-center gap-4">
          {Array.from({ length: columns }).map((_, column) => (
            <Skeleton
              key={column}
              className={cn("h-5 flex-1", column === 0 && "max-w-40")}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-zinc-800 bg-zinc-800/50 p-4"
        >
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-3 h-7 w-20" />
          <Skeleton className="mt-2 h-3 w-28" />
        </div>
      ))}
    </div>
  );
}
