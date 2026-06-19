"use client";

import { useQuery } from "@tanstack/react-query";
import { getAvalableSlots } from "../api/bookingApi";

export function useAvailablity(courtId?: string, date?: string) {
  const { data: slots, isLoading } = useQuery({
    queryKey: ["avaliability", courtId, date],
    queryFn: () => getAvalableSlots(courtId, date),
    enabled: !!courtId && !!date,
  });

  return { slots, isLoading };
}
