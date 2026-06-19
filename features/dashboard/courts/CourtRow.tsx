"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import EditCourtForm from "./EditCourtForm";
import { useDeleteCourt } from "@/features/court/hooks/useDeleteCourt";

export default function CourtRow({ court }: any) {
  const [toEdit, setToEdit] = useState<boolean>(false);
  const { deleteCourtMutation, isDeleting } = useDeleteCourt();

  function onDelete() {
    deleteCourtMutation(court._id);
  }

  return (
    <>
      <TableRow>
        <TableCell>{court.name}</TableCell>

        <TableCell>{court.price.toLocaleString()}</TableCell>

        {court.isActive ? (
          <TableCell>
            <Badge className="bg-green-400">Active</Badge>
          </TableCell>
        ) : (
          <TableCell>
            <Badge variant={"destructive"}>Deactive</Badge>
          </TableCell>
        )}

        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setToEdit(true)}>
              Edit
            </Button>

            <Button variant="destructive" onClick={onDelete}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </TableCell>
      </TableRow>

      <EditCourtForm
        court={court}
        isOpen={toEdit}
        onClose={() => setToEdit(false)}
      />
    </>
  );
}
