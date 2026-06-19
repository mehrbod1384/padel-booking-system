"use client";

import { useMutation } from "@tanstack/react-query";
import { bookReservation } from "../api/bookingApi";
import { axiosInstance } from "@/lib/axiosInstance";

export function useBookReservation() {
  const { mutate: bookReservationMutation, isPending: isBooking } = useMutation(
    {
      mutationFn: bookReservation,
      onSuccess: async (data) => {
        const res = await axiosInstance.post("/payments", {
          reservationId: data._id,
        });

        window.location.href = res.data.paymentUrl;
      },
      onError: (error) => console.error(error),
    },
  );

  return { bookReservationMutation, isBooking };
}
