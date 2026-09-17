import { ReservationStatusBadge } from "@/components/ui/StatusBadge";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatPrice } from "@/features/booking/utils/helper";
import { formatDate } from "@/utils/date";

import type { AdminReservation } from "@/features/booking/types";

export default function ReservationRow({
  reservation,
}: {
  reservation: AdminReservation;
}) {
  return (
    <TableRow className="border-zinc-800 hover:bg-zinc-800/40">
      <TableCell className="font-semibold tabular-nums text-zinc-200">
        {reservation.user?.phone ?? "Unknown user"}
      </TableCell>

      <TableCell className="text-zinc-400">
        {reservation.court?.name ?? "Deleted court"}
      </TableCell>

      <TableCell className="text-zinc-400">
        {formatDate(reservation.date)}
      </TableCell>

      <TableCell className="tabular-nums text-zinc-400">
        {reservation.slot}
      </TableCell>

      <TableCell>
        <ReservationStatusBadge status={reservation.status} />
      </TableCell>

      <TableCell className="text-right font-bold tabular-nums text-brand">
        ${formatPrice(reservation.amount)}
      </TableCell>
    </TableRow>
  );
}

export function ReservationMobileCard({
  reservation,
}: {
  reservation: AdminReservation;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold tabular-nums text-white">
            {reservation.user?.phone ?? "Unknown user"}
          </p>

          <p className="truncate text-xs text-zinc-500">
            {reservation.court?.name ?? "Deleted court"}
          </p>
        </div>

        <ReservationStatusBadge status={reservation.status} />
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-zinc-800 pt-3 text-xs text-zinc-400">
        <span>
          {formatDate(reservation.date)} · {reservation.slot}
        </span>

        <span className="font-bold tabular-nums text-brand">
          ${formatPrice(reservation.amount)}
        </span>
      </div>
    </div>
  );
}
