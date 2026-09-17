"use client";

import { useState } from "react";

import { Pencil, Power, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { CourtStatusBadge } from "@/components/ui/StatusBadge";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/features/booking/utils/helper";
import { useDeleteCourt } from "@/features/court/hooks/useDeleteCourt";
import { useEditCourt } from "@/features/court/hooks/useEditCourt";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

import EditCourtForm from "./EditCourtForm";

import type { Court } from "@/features/court/types";

const actionButtonClassName =
  "text-zinc-400 hover:bg-zinc-800 hover:text-brand disabled:opacity-50";

export default function CourtRow({ court }: { court: Court }) {
  const [toEdit, setToEdit] = useState(false);
  const [toDelete, setToDelete] = useState(false);

  const { deleteCourtMutation, isDeleting } = useDeleteCourt();
  const { editCourtMutation, isEditing } = useEditCourt();

  function onDelete() {
    deleteCourtMutation(court._id, {
      onSuccess: () => {
        toast.success(`"${court.name}" deleted`);
        setToDelete(false);
      },
      onError: (error) =>
        toast.error(getErrorMessage(error, "Could not delete court")),
    });
  }

  function onToggleActive() {
    editCourtMutation(
      {
        courtId: court._id,
        name: court.name,
        price: court.price,
        isActive: !court.isActive,
      },
      {
        onSuccess: () =>
          toast.success(
            court.isActive
              ? `"${court.name}" deactivated`
              : `"${court.name}" activated`,
          ),
        onError: (error) =>
          toast.error(getErrorMessage(error, "Could not update court")),
      },
    );
  }

  return (
    <>
      <TableRow className="border-zinc-800 hover:bg-zinc-800/40">
        <TableCell className="font-semibold text-zinc-200">
          {court.name}
        </TableCell>

        <TableCell className="font-bold tabular-nums text-brand">
          ${formatPrice(court.price)}
        </TableCell>

        <TableCell>
          <CourtStatusBadge isActive={court.isActive} />
        </TableCell>

        <TableCell className="text-right">
          <div className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setToEdit(true)}
              aria-label={`Edit ${court.name}`}
              title="Edit court"
              className={actionButtonClassName}
            >
              <Pencil className="size-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isEditing}
              onClick={onToggleActive}
              aria-label={
                court.isActive
                  ? `Deactivate ${court.name}`
                  : `Activate ${court.name}`
              }
              title={court.isActive ? "Deactivate court" : "Activate court"}
              className={actionButtonClassName}
            >
              {isEditing ? <Spinner size={14} /> : <Power className="size-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setToDelete(true)}
              aria-label={`Delete ${court.name}`}
              title="Delete court"
              className="text-zinc-400 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <EditCourtForm
        court={court}
        isOpen={toEdit}
        onClose={() => setToEdit(false)}
      />

      <ConfirmDialog
        open={toDelete}
        onOpenChange={setToDelete}
        destructive
        title="Delete court"
        description={`"${court.name}" will be removed permanently. Past reservations keep a reference to the deleted court.`}
        confirmLabel="Delete court"
        isPending={isDeleting}
        onConfirm={onDelete}
      />
    </>
  );
}
