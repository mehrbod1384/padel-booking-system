import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ReservationRow from "./reservationRow";
import { useBooking } from "@/features/booking/hooks/useBooking";

export default function ReservationsTable() {
  const { reservations, isLoading, error } = useBooking();

  if (isLoading) return <p>isLoading....</p>;

  console.log(reservations);

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Court</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reservations?.map((reservation: any) => (
              <ReservationRow key={reservation._id} reservation={reservation} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
