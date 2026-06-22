"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getPayment } from "../api/paymentApi";

export function usePayment(paymentId: string) {
  const {
    data: payment,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getPayment(paymentId),
    queryKey: queryKeys.payment,
    enabled: !!paymentId,
  });

  return { payment, isLoading, error };
}
