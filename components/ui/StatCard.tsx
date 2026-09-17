import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export default function StatCard({
  label,
  value,
  hint,
  icon,
  accent = false,
  className,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon: ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-800 bg-zinc-800/50 p-4 backdrop-blur-xl",
        accent && "border-brand/30",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-zinc-400">{label}</p>

        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900",
            accent ? "text-brand" : "text-zinc-400",
          )}
        >
          {icon}
        </span>
      </div>

      <p
        className={cn(
          "mt-3 text-2xl font-bold tabular-nums",
          accent ? "text-brand" : "text-white",
        )}
      >
        {value}
      </p>

      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
