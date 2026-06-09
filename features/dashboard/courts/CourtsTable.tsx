import { useCourt } from "@/features/court/hooks/useCourt";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CourtRow from "./CourtRow";

export default function CourtsTable() {
  const { courts, isLoading, error } = useCourt();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <div>Something went wrong.</div>;

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courts?.map((court: any) => (
              <CourtRow key={court._id} court={court} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
