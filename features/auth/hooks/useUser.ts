"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getUserFromToken } from "@/lib/auth";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getUserFromToken,
  });

  return { user, isLoading, error };
}
