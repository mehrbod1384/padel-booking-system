"use client";

import Link from "next/link";
import { CalendarDays, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <div
      className="
      fixed
      bottom-4
      left-1/2
      z-50
      -translate-x-1/2
      "
    >
      <div className="flex items-center gap-3 rounded-xl bg-zinc-800/50 p-3 backdrop-blur-3xl border border-zinc-800">
        <Link
          href="/"
          className={`
            flex flex-col text-xs items-center gap-2 pr-6 transition border-r border-zinc-600
            ${pathname === "/" ? "text-lime-300" : "text-zinc-500"}
          `}
        >
          <Home size={18} />
          <span>Book</span>
        </Link>

        <Link
          href="/my-bookings"
          className={`
            flex flex-col text-xs items-center gap-2 px-2 transition hover:text-lime-300
            ${pathname === "/my-bookings" ? "text-lime-300 " : "text-zinc-500"}
          `}
        >
          <CalendarDays size={18} />
          <span>My Booking</span>
        </Link>
      </div>
    </div>
  );
}
