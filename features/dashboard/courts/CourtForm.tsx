import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";

export default function CourtForm({
  court,
  isOpen,
  onClose,
  isPending,
  onSubmit,
}: {
  court?: any;
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
  onSubmit: (data: any) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
        reset();
      }}
    >
      <DialogContent className={"space-y-3"}>
        <DialogHeader>
          <DialogTitle>{court ? "Edit Court" : "Create Court"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Name</label>

            <Input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              className="w-full rounded border p-2 focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:ring-1"
              defaultValue={court?.name}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label>Price</label>

            <Input
              {...register("price", {
                required: "Price is required",
              })}
              type="number"
              className="w-full rounded border p-2 focus-visible:border-blue-500 focus-visible:ring-blue-500 focus-visible:ring-1"
              defaultValue={court?.price}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="space-x-1">
            <Input
              {...register("isActive")}
              defaultChecked={court?.isActive}
              type="checkbox"
              className="w-4 h-4"
            />
            <label className="text-gray-500 font-semibold">Active</label>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant={"outline"} type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className={"bg-blue-500 hover:bg-blue-600"}
            >
              {court
                ? isPending
                  ? "Editing..."
                  : "Edit"
                : isPending
                  ? "Creating..."
                  : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
