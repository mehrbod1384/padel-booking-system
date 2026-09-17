"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { bookReservation } from "../api/bookingApi";
import { axiosInstance } from "@/lib/axiosInstance";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

import type { CreatePaymentResponse } from "@/features/payment/types";

export function useBookReservation() {
  const { mutate: bookReservationMutation, isPending: isBooking } = useMutation(
    {
      mutationFn: bookReservation,
      onSuccess: async (data) => {
        const res = await axiosInstance.post<CreatePaymentResponse>(
          "/payments",
          {
            reservationId: data._id,
          },
        );

        window.location.href = res.data.paymentUrl;
      },
      onError: (error) =>
        toast.error(getErrorMessage(error, "Could not start your booking")),
    },
  );

  return { bookReservationMutation, isBooking };
}
