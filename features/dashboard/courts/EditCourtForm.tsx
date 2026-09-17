import toast from "react-hot-toast";

import { useEditCourt } from "@/features/court/hooks/useEditCourt";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

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
    editCourtMutation(
      {
        courtId: court._id,
        ...data,
      },
      {
        onSuccess: () => {
          toast.success("Court updated");
          onClose();
        },
        onError: (error) =>
          toast.error(getErrorMessage(error, "Could not update court")),
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
