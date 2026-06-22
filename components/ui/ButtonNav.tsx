"use client";

import Link from "next/link";
import { CalendarDays, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname !== "/" && pathname !== "/my-bookings") return null;

  return (
    <div className=" fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-90 ">
      <div className="flex items-center justify-between text-xs  rounded-xl bg-zinc-800/50 p-3 backdrop-blur-3xl border border-zinc-800">
        <Link
          href="/"
          className={`
            flex flex-col items-center w-1/2 gap-1 hover:text-lime-300 transition border-r border-zinc-600
            ${pathname === "/" ? "text-lime-300" : "text-zinc-500"}
          `}
        >
          <Home size={16} />
          <span>Book</span>
        </Link>

        <Link
          href="/my-bookings"
          className={`
            flex flex-col items-center gap-1 w-1/2 px-2 transition hover:text-lime-300
            ${pathname === "/my-bookings" ? "text-lime-300 " : "text-zinc-500"}
          `}
        >
          <CalendarDays size={16} />
          <span>My Booking</span>
        </Link>
      </div>
    </div>
  );
}
