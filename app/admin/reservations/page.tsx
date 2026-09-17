"use client";

import PageHero from "@/components/layout/PageHero";
import ReservationsTable from "@/features/dashboard/reservations/reservationsTable";

export default function ReservationPage() {
  return (
    <div className="space-y-5">
      <div className="-mx-4 -mt-5 sm:-mx-6 lg:-mx-8">
        <PageHero
          height="sm"
          image="/premium_photo-1663039984787-b11d7240f592.avif"
          eyebrow="ADMIN PANEL"
          titleLead="All"
          titleAccent="reservations"
          description="Search, filter and audit every booking"
        />
      </div>

      <div className="relative -mt-10">
        <ReservationsTable />
      </div>
    </div>
  );
}
