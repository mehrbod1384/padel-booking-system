"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getProfile } from "../api/authApi";

export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: queryKeys.auth,
    queryFn: getProfile,
  });

  return { user, isLoading, error };
}
