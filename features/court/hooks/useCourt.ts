import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getAllCourtsApi } from "../api/courtApi";

export function useCourt() {
  const {
    data: courts,
    isLoading,
    error,
  } = useQuery({
    queryFn: getAllCourtsApi,
    queryKey: queryKeys.courts,
  });

  return { courts, isLoading, error };
}
