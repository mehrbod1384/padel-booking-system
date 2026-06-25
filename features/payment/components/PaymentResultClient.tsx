"use client";

import { Check } from "lucide-react";
import BackButton from "./BackButton";
import RefIdCard from "./RefIdCard";
import ReservationDetailsCard from "./ReservationDetailsCard";
import { FadeLoader } from "react-spinners";
import { usePayment } from "../hooks/usePayment";
import { useReservation } from "../hooks/useReservation";

export default function PaymentResultClient({
  paymentId,
}: {
  paymentId: string;
}) {
  const { payment, isLoading } = usePayment(paymentId);
  const { reservation, isLoading: isLoading1 } = useReservation(
    payment?.reservation,
  );

  if (isLoading || isLoading1)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FadeLoader color="#bbf451" />
      </div>
    );

  return (
    <div className="container mx-auto max-w-110">
      <div className="relative overflow-hidden">
        <img
          src="/padel-racket.png"
          alt="Court"
          className="h-80 w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute left-8 top-20 z-10">
          <div className="p-1.5 rounded-full bg-lime-950 w-fit mb-4">
            <div className="p-1 rounded-full bg- w-fit border border-lime-700">
              <Check
                size={44}
                className="text-lime-300 bg-black p-1 rounded-full border border-lime-300"
              />
            </div>
          </div>

          <p className="text-lime-300 text-sm font-medium">
            Payment Successfull!
          </p>

          <h1 className="mt-2 text-4xl font-bold leading-none text-white">
            Your booking is
            <br />
            <span className="text-lime-300">confirmed</span>
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent via-black/50 to-zinc-950" />
      </div>

      <RefIdCard refId={payment.refId} />

      <ReservationDetailsCard reservation={reservation} />

      <BackButton />
    </div>
  );
}
