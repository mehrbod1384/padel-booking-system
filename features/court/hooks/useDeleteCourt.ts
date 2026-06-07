import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourtApi } from "../api/courtApi";

export function useCreateCourt() {
  const queryClient = useQueryClient();

  const { mutate: deleteCourtMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteCourtApi,
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.courts);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { deleteCourtMutation, isDeleting };
}
