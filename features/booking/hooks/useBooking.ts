"use client";

import { useQuery } from "@tanstack/react-query";
import { getConfirmedReservation } from "../api/bookingApi";
import { queryKeys } from "@/lib/queryKeys";

export function useBooking() {
  const {
    data: reservations,
    isLoading,
    error,
  } = useQuery({
    queryFn: getConfirmedReservation,
    queryKey: queryKeys.reservations,
  });

  return { reservations, isLoading, error };
}
