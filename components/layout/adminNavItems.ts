import {
  LayoutDashboard,
  LayoutGrid,
  ListChecks,
} from "lucide-react";

import type { BottomNavItem } from "@/components/ui/BottomNav";
import type { LucideIcon } from "lucide-react";

export type AdminNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

/** Single source of truth for the admin navigation (sidebar + mobile nav). */
export const adminNavItems: AdminNavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Reservations", href: "/admin/reservations", icon: ListChecks },
  { name: "Courts", href: "/admin/courts", icon: LayoutGrid },
];

export function isAdminNavItemActive(href: string, pathname: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const adminBottomNavItems: BottomNavItem[] = adminNavItems.map(
  (item) => ({
    href: item.href,
    label: item.name,
    icon: item.icon,
    match: (pathname: string) => isAdminNavItemActive(item.href, pathname),
  }),
);
