import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  className,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-800 bg-zinc-800/50 text-center",
        size === "sm" ? "px-4 py-10" : "px-6 py-16",
        className,
      )}
    >
      {icon && (
        <span className="flex size-12 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-brand">
          {icon}
        </span>
      )}

      <p className="text-base font-bold text-white">{title}</p>

      {description && (
        <p className="max-w-70 text-xs leading-5 text-zinc-400">
          {description}
        </p>
      )}

      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
