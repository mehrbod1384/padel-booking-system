"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/Spinner";
import { formatPrice } from "@/features/booking/utils/helper";

import type {
  Court,
  CreateCourtPayload,
  UpdateCourtPayload,
} from "@/features/court/types";

const fieldClassName =
  "h-11 rounded-xl border-zinc-700 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:border-brand focus-visible:ring-brand/30";

const emptyCourt: CreateCourtPayload = { name: "", price: 0, isActive: true };

export default function CourtForm({
  court,
  isOpen,
  onClose,
  isPending,
  onSubmit,
}: {
  court?: Court;
  isOpen: boolean;
  onClose: () => void;
  isPending: boolean;
  onSubmit: (data: CreateCourtPayload | UpdateCourtPayload) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateCourtPayload>({ defaultValues: emptyCourt });

  // `defaultValue` alone kept stale values when switching between courts.
  useEffect(() => {
    if (!isOpen) return;

    reset(
      court
        ? { name: court.name, price: court.price, isActive: court.isActive }
        : emptyCourt,
    );
  }, [court, isOpen, reset]);

  const price = Number(watch("price")) || 0;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="border border-zinc-800 bg-zinc-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {court ? "Edit court" : "Create court"}
          </DialogTitle>

          <DialogDescription>
            {court
              ? "Update the name, hourly price and availability."
              : "Add a new court to your venue. New courts start as active."}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="court-name"
              className="ml-1 text-sm font-semibold text-zinc-400"
            >
              Name
            </label>

            <Input
              id="court-name"
              placeholder="Court 1"
              className={fieldClassName}
              {...register("name", { required: "Name is required" })}
            />

            {errors.name && (
              <p className="ml-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="court-price"
              className="ml-1 text-sm font-semibold text-zinc-400"
            >
              Price per hour
            </label>

            <Input
              id="court-price"
              type="number"
              min={1}
              placeholder="500000"
              className={fieldClassName}
              {...register("price", {
                required: "Price is required",
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
                min: { value: 1, message: "Price must be greater than 0" },
              })}
            />

            {errors.price ? (
              <p className="ml-1 text-sm text-red-500">{errors.price.message}</p>
            ) : (
              price > 0 && (
                <p className="ml-1 text-xs text-zinc-500">
                  ${formatPrice(price)} per hour
                </p>
              )
            )}
          </div>

          {court && (
            <label
              htmlFor="court-active"
              className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5"
            >
              <span>
                <span className="block text-sm font-semibold text-zinc-300">
                  Active
                </span>

                <span className="block text-xs text-zinc-500">
                  Inactive courts are hidden from players
                </span>
              </span>

              <input
                id="court-active"
                type="checkbox"
                className="size-4 accent-brand"
                {...register("isActive")}
              />
            </label>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" variant="brand" disabled={isPending}>
              {isPending ? (
                <Spinner size={14} />
              ) : court ? (
                "Save changes"
              ) : (
                "Create court"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
