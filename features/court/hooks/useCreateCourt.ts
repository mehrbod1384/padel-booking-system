import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourtApi } from "../api/courtApi";

export function useCreateCourt() {
  const queryClient = useQueryClient();

  const { mutate: createCourtMutation, isPending: isCreating } = useMutation({
    mutationFn: createCourtApi,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.courts);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { createCourtMutation, isCreating };
}
