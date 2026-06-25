"use client";

import ReservationsTable from "@/features/dashboard/reservations/reservationsTable";

export default function ReservationPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="font-bold text-3xl">Reservation</h1>
      <ReservationsTable />
    </div>
  );
}
