import { queryKeys } from "@/lib/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourtApi } from "../api/courtApi";

export function useEditCourt() {
  const queryClient = useQueryClient();

  const { mutate: editCourtMutation, isPending: isEditing } = useMutation({
    mutationFn: updateCourtApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.courts });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return { editCourtMutation, isEditing };
}
