"use client";

import { CalendarDays, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import BottomNav from "./BottomNav";

import type { BottomNavItem } from "./BottomNav";

const playerNavItems: BottomNavItem[] = [
  { href: "/", label: "Book", icon: Home },
  { href: "/my-bookings", label: "My Booking", icon: CalendarDays },
];

export default function ButtonNav() {
  const pathname = usePathname();

  if (pathname !== "/" && pathname !== "/my-bookings") return null;

  return <BottomNav items={playerNavItems} />;
}
