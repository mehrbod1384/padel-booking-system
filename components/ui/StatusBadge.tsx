"use client";

import { Badge } from "@/components/ui/badge";

import type { ReservationStatus } from "@/features/booking/types";
import type { PaymentStatus } from "@/features/payment/types";

type StatusVariant = "brand" | "success" | "warning" | "danger" | "muted";

const reservationStatusMap: Record<
  ReservationStatus,
  { label: string; variant: StatusVariant }
> = {
  PENDING: { label: "Pending", variant: "warning" },
  CONFIRMED: { label: "Confirmed", variant: "brand" },
  CANCELLED: { label: "Cancelled", variant: "muted" },
  EXPIRED: { label: "Expired", variant: "danger" },
};

const paymentStatusMap: Record<
  PaymentStatus,
  { label: string; variant: StatusVariant }
> = {
  INITIATED: { label: "Initiated", variant: "warning" },
  SUCCESS: { label: "Successful", variant: "brand" },
  FAILED: { label: "Failed", variant: "danger" },
  EXPIRED: { label: "Expired", variant: "muted" },
};

export function ReservationStatusBadge({
  status,
}: {
  status: ReservationStatus;
}) {
  const config = reservationStatusMap[status] ?? {
    label: status,
    variant: "muted" as StatusVariant,
  };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config = paymentStatusMap[status] ?? {
    label: status,
    variant: "muted" as StatusVariant,
  };

  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function CourtStatusBadge({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <Badge variant="success">Active</Badge>
  ) : (
    <Badge variant="muted">Inactive</Badge>
  );
}
