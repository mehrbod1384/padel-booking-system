"use client";

import { Check } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
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

  if (!payment || !reservation) return null;

  return (
    <div className="container mx-auto max-w-110">
      <PageHero
        image="/padel-racket.png"
        imageAlt="Padel court"
        eyebrow="Payment successful"
        titleLead="Your booking is"
        titleAccent="confirmed"
        contentClassName="top-20"
        statusIcon={
          <div className="mb-4 w-fit rounded-full bg-lime-950 p-1.5">
            <div className="w-fit rounded-full border border-lime-700 p-1">
              <Check
                size={44}
                className="rounded-full border border-lime-300 bg-black p-1 text-brand"
              />
            </div>
          </div>
        }
      />

      <RefIdCard refId={payment.refId} />

      <ReservationDetailsCard reservation={reservation} />

      <BackButton />
    </div>
  );
}
