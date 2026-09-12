import { useEditCourt } from "@/features/court/hooks/useEditCourt";
import CourtForm from "./CourtForm";

import type { Court, UpdateCourtPayload } from "@/features/court/types";

export default function EditCourtForm({
  court,
  isOpen,
  onClose,
}: {
  court: Court;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { editCourtMutation, isEditing } = useEditCourt();

  const onSubmit = (data: Omit<UpdateCourtPayload, "courtId">) => {
    console.log(data);

    editCourtMutation(
      {
        courtId: court._id,
        ...data,
      },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <CourtForm
      court={court}
      isOpen={isOpen}
      onClose={onClose}
      isPending={isEditing}
      onSubmit={onSubmit}
    />
  );
}
