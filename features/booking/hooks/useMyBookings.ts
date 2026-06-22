"use client";

import { useQuery } from "@tanstack/react-query";
import { getMyBookings } from "../api/bookingApi";
import { queryKeys } from "@/lib/queryKeys";

export function useMyBookings() {
  const { data, isLoading, error } = useQuery({
    queryFn: getMyBookings,
    queryKey: queryKeys.reservations,
  });

  return { data, isLoading, error };
}
