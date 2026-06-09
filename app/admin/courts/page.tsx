"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import CourtsTable from "../../../features/dashboard/courts/CourtsTable";

export default function CourtsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courts Management</h1>

        <Button>
          <Link href="/admin/courts/create">Add Court</Link>
        </Button>
      </div>

      <CourtsTable />
    </div>
  );
}
