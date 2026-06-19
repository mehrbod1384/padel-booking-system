import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";

export default function ReservationRow({ reservation }: any) {
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
