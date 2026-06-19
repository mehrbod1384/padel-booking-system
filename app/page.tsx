"use client";

import { useState } from "react";

import { useBookReservation } from "@/features/booking/hooks/useBookReservation";

import { Card } from "@/components/ui/card";
import CourtInfo from "@/features/booking/components/CourtInfo";
import DateSelector from "@/features/booking/components/DateSelector";
import Slots from "@/features/booking/components/Slots";
import BookingSummary from "@/features/booking/components/BookingSummary";
import HeroSection from "@/features/booking/components/HeroSection";

export default function Home() {
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const { bookReservationMutation, isBooking } = useBookReservation();

  function book() {
    bookReservationMutation(
      {
        courtId: selectedCourt,
        date: selectedDate,
        slot: selectedSlot,
      },
      {
        onSuccess: () => {
          setSelectedCourt("");
          setSelectedDate("");
          setSelectedSlot("");
        },
      },
    );
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <HeroSection />

      <div className="-translate-y-22">
        <CourtInfo
          selectedCourt={selectedCourt}
          setSelectedCourt={setSelectedCourt}
        />

        <Card className="mt-4 mx-auto rounded-xl max-w-95 sm:w-auto p-4 border-zinc-800 bg-zinc-800/50 backdrop-blur-xl">
          <DateSelector
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
  );
}
