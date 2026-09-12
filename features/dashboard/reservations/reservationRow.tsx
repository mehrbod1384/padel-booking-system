import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date";

import type { AdminReservation } from "@/features/booking/types";

export default function ReservationRow({
  reservation,
}: {
  reservation: AdminReservation;
}) {
  return (
    <TableRow>
      <TableCell>{reservation.user.phone}</TableCell>

      <TableCell>{reservation.court?.name}</TableCell>
      <TableCell>{formatDate(reservation.date)}</TableCell>
      <TableCell>{reservation.slot}</TableCell>
      <TableCell>
        <Badge className="bg-green-400">{reservation.status}</Badge>
      </TableCell>

      <TableCell>{reservation.amount.toLocaleString()}</TableCell>
    </TableRow>
  );
}
