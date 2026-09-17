"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import type { ComponentType } from "react";

export type BottomNavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number | string; className?: string }>;
  match?: (pathname: string) => boolean;
};

/**
 * Shared mobile bottom navigation. Used by the player routes and the admin
 * routes so both surfaces share one navigation pattern.
 */
export default function BottomNav({
  items,
  className,
}: {
  items: BottomNavItem[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 z-50 w-90 -translate-x-1/2",
        className,
      )}
    >
      <nav className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/50 p-3 text-xs backdrop-blur-3xl">
        {items.map((item, index) => {
          const isActive = item.match
            ? item.match(pathname)
            : pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 px-2 text-center transition-colors hover:text-brand",
                index < items.length - 1 && "border-r border-zinc-600",
                isActive ? "text-brand" : "text-zinc-500",
              )}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
