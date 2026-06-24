"use client";

import PastReservations from "@/features/booking/components/myBookings/PastReservations";
import TimeButtons from "@/features/booking/components/myBookings/TimeButtons";
import UpcomingBookings from "@/features/booking/components/myBookings/UpcomingBookings";

import { useState } from "react";

export default function MyBookingPage() {
  const [time, setTime] = useState("upcoming");

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="relative overflow-hidden">
        <img
          src="/padel-racket.png"
          alt="Court"
          className="h-65 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute left-8 top-10 z-10">
          <p className="text-lime-300 text-xs font-medium">PADEL COURTS</p>

          <h1 className="mt-2 text-5xl font-bold leading-none text-white">
            My
            <br />
            <span className="text-lime-300">Bookings</span>
          </h1>

          <p className="mt-4 text-sm text-zinc-400 w-60">
            View and manage your reservations
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-black/50 to-zinc-950" />
      </div>

      <div className="-translate-y-10">
        <TimeButtons time={time} setTime={setTime} />
        {time === "upcoming" ? <UpcomingBookings /> : <PastReservations />}
      </div>
    </div>
  );
}
