"use client";

import Link from "next/link";
import { HiOutlineFolder, HiOutlineHome } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/admin/dashboard", icon: HiOutlineHome },
  { name: "Reservatios", href: "/admin/reservations", icon: HiOutlineFolder },
  { name: "Courts", href: "/admin/courts", icon: IoSettingsOutline },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 shrink-0 border-r border-gray-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 p-4">
      <h2 className="text-xl font-bold mb-8 px-2">Dashboard</h2>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 dark:bg-blue-950 text-blue-500"
                  : "text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-slate-300",
              )}
            >
              <Icon
                className={clsx(
                  "size-5 transition-colors duration-200",
                  isActive
                    ? "text-blue-500"
                    : "text-gray-400 group-hover:text-blue-500",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
