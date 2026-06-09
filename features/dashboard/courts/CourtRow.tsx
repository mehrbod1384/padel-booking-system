import Link from "next/link";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CourtRow({ court }: any) {
  return (
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
          <Button variant="outline">
            <Link href={`/admin/courts/${court._id}/edit`}>Edit</Link>
          </Button>

          <Button variant="destructive">Delete</Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
