"use client";

import { useState } from "react";

import { useBookReservation } from "@/features/booking/hooks/useBookReservation";

import type { Court } from "@/features/court/types";

import { Card } from "@/components/ui/card";
import CourtInfo from "@/features/booking/components/CourtInfo";
import DateSelector from "@/features/booking/components/DateSelector";
import Slots from "@/features/booking/components/Slots";
import BookingSummary from "@/features/booking/components/BookingSummary";
import HeroSection from "@/features/booking/components/HeroSection";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import ButtonNav from "@/components/ui/ButtonNav";

export default function Home() {
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const { bookReservationMutation, isBooking } = useBookReservation();

  function book() {
    if (!selectedCourt || !selectedDate || !selectedSlot) return;

    bookReservationMutation(
      {
        courtId: selectedCourt._id,
        date: selectedDate,
        slot: selectedSlot,
      },
      {
        onSuccess: () => {
          setSelectedCourt(null);
          setSelectedDate("");
          setSelectedSlot("");
        },
      },
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-110 ">
        <HeroSection />

        <div className="-translate-y-22">
          <CourtInfo
            selectedCourt={selectedCourt}
            setSelectedCourt={(court) => {
              setSelectedCourt(court);
              setSelectedSlot("");
            }}
          />

          <Card className="mt-4 mx-auto rounded-xl max-w-90 sm:w-auto p-4 border-zinc-800 bg-zinc-800/50 backdrop-blur-xl">
            <DateSelector
              selectedDate={selectedDate}
              setSelectedDate={(date: string) => {
                setSelectedDate(date);
                setSelectedSlot("");
              }}
            />

            <Slots
              selectedCourt={selectedCourt}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
            />
          </Card>

          <BookingSummary
            selectedCourt={selectedCourt}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            isBooking={isBooking}
            onBook={book}
          />
        </div>
      </div>

      <ButtonNav />
    </ProtectedRoute>
  );
}
