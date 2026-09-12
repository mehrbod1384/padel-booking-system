import { useCreateCourt } from "@/features/court/hooks/useCreateCourt";
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
      onSuccess: () => onClose(),
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
