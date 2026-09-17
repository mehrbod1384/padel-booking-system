"use client";

import { useState } from "react";

import AdminSidebar, {
  AdminBottomNav,
  AdminMobileNav,
  AdminTopBar,
} from "@/components/layout/AdminSidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-page">
      <AdminSidebar />

      <AdminMobileNav open={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar onMenuClick={() => setIsNavOpen(true)} />

        <main className="flex-1 px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <AdminBottomNav />
    </div>
  );
}
