"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";
import { getDashboardStats } from "../api/dashboardApi";

export function useDashboard() {
  const {
    data: stats,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: getDashboardStats,
  });

  return { stats, isLoading, error, refetch, isFetching };
}