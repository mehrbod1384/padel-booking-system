"use client";

import { useEffect } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, ShieldCheck, X } from "lucide-react";

import BottomNav from "@/components/ui/BottomNav";
import LogOutButton from "@/features/auth/components/LogoutButton";
import { useUser } from "@/features/auth/hooks/useUser";
import { cn } from "@/lib/utils";

import {
  adminBottomNavItems,
  adminNavItems,
  isAdminNavItemActive,
} from "./adminNavItems";

function BrandMark() {
  return (
    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-black text-black">
      P
    </span>
  );
}

function AdminNavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/admin/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5"
        >
          <BrandMark />

          <span className="leading-tight">
            <span className="block text-sm font-bold text-white">
              Padel Admin
            </span>

            <span className="block text-[11px] text-zinc-500">
              Control panel
            </span>
          </span>
        </Link>

        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="Close navigation"
            className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition-colors hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <nav className="flex flex-col gap-1">
        {adminNavItems.map((item) => {
          const isActive = isAdminNavItemActive(item.href, pathname);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-brand text-black"
                  : "text-zinc-400 hover:bg-zinc-800/60 hover:text-brand",
              )}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3 border-t border-zinc-800 pt-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-brand"
        >
          <ArrowLeft size={18} />
          Back to booking
        </Link>

        {user && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5">
            <p className="text-xs font-semibold tabular-nums text-zinc-200">
              {user.phone}
            </p>

            <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-brand">
              <ShieldCheck size={12} />
              {user.role}
            </p>
          </div>
        )}

        <LogOutButton
          showLabel
          className="static flex w-full items-center justify-start gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800/60 hover:text-white"
        />
      </div>
    </div>
  );
}

export default function AdminSidebar() {
  return (
    <aside className="hidden w-68 shrink-0 border-r border-zinc-800 bg-zinc-950/50 lg:block">
      <div className="sticky top-0 h-dvh">
        <AdminNavContent />
      </div>
    </aside>
  );
}

export function AdminMobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className="absolute inset-0 size-full bg-black/60 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className="absolute inset-y-0 left-0 w-72 max-w-[85%] border-r border-zinc-800 bg-zinc-950"
      >
        <AdminNavContent onNavigate={onClose} />
      </div>
    </div>
  );
}

export function AdminTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/85 px-4 py-3 backdrop-blur-xl lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-300 transition-colors hover:text-brand"
      >
        <Menu size={18} />
      </button>

      <Link href="/admin/dashboard" className="flex items-center gap-2">
        <BrandMark />

        <span className="text-sm font-bold text-white">Padel Admin</span>
      </Link>

      <LogOutButton className="static border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/60" />
    </header>
  );
}

export function AdminBottomNav() {
  return (
    <div className="lg:hidden">
      <BottomNav items={adminBottomNavItems} />
    </div>
  );
}
