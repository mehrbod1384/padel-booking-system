"use client";

import LogOutButton from "@/features/auth/components/LogoutButton";
import PageHero from "@/components/layout/PageHero";
import PastReservations from "@/features/booking/components/myBookings/PastReservations";
import TimeButtons from "@/features/booking/components/myBookings/TimeButtons";
import UpcomingBookings from "@/features/booking/components/myBookings/UpcomingBookings";
import ButtonNav from "@/components/ui/ButtonNav";

import { useState } from "react";

import type { BookingPeriod } from "@/features/booking/types";

export default function MyBookingPage() {
  const [time, setTime] = useState<BookingPeriod>("upcoming");

  return (
    <div>
      <div className="container mx-auto max-w-110">
        <PageHero
          height="sm"
          image="/padel-racket.png"
          imageAlt="Padel court"
          eyebrow="PADEL COURTS"
          titleLead="My"
          titleAccent="Bookings"
          titleSize="lg"
          description="View and manage your reservations"
          descriptionClassName="w-60"
          actions={<LogOutButton />}
        />

        <div className="-translate-y-10">
          <TimeButtons time={time} setTime={setTime} />
          {time === "upcoming" ? <UpcomingBookings /> : <PastReservations />}
        </div>
      </div>

      <ButtonNav />
    </div>
  );
}
