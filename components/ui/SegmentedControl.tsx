"use client";

import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
};

export default function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  size = "md",
  fullWidth = false,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
  size?: "sm" | "md";
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        "flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-800/50 p-1.5",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-xl font-bold text-zinc-400 transition-colors hover:bg-brand hover:text-black",
              fullWidth && "w-full",
              size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm",
              isActive && "bg-brand text-black hover:bg-brand",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
