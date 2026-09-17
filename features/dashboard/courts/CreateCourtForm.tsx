import toast from "react-hot-toast";

import { useCreateCourt } from "@/features/court/hooks/useCreateCourt";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

import CourtForm from "./CourtForm";

import type { CreateCourtPayload } from "@/features/court/types";

export default function CreateCourtForm({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { createCourtMutation, isCreating } = useCreateCourt();

  function onSubmit(data: CreateCourtPayload) {
    createCourtMutation(data, {
      onSuccess: (court) => {
        toast.success(`"${court.name}" created`);
        onClose();
      },
      onError: (error) =>
        toast.error(getErrorMessage(error, "Could not create court")),
    });
  }

  return (
    <CourtForm
      isOpen={isOpen}
      onClose={onClose}
      isPending={isCreating}
      onSubmit={onSubmit}
    />
  );
}
