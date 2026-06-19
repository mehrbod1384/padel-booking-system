import { useEditCourt } from "@/features/court/hooks/useEditCourt";
import CourtForm from "./CourtForm";

export default function EditCourtForm({
  court,
  isOpen,
  onClose,
}: {
  court: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { editCourtMutation, isEditing } = useEditCourt();

  const onSubmit = (data: any) => {
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
