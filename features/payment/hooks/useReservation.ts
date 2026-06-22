import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getReservationDetails } from "../api/paymentApi";

export function useReservation(reservationId: string) {
  const {
    data: reservation,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getReservationDetails(reservationId),
    queryKey: queryKeys.reservations,
    enabled: !!reservationId,
  });

  return { reservation, isLoading, error };
}
