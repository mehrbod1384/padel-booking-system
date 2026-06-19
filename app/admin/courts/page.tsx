"use client";

import { Button } from "@/components/ui/button";
import CourtsTable from "../../../features/dashboard/courts/CourtsTable";
import CreateCourtForm from "@/features/dashboard/courts/CreateCourtForm";
import { useState } from "react";

export default function CourtsPage() {
  const [toCreate, setToCreate] = useState(false);

  return (
    <>
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between mb-20">
          <h1 className="text-3xl font-bold">Courts Management</h1>

          <Button
            className={"bg-blue-500 hover:bg-blue-600"}
            onClick={() => setToCreate(true)}
          >
            Add Court
          </Button>
        </div>

        <CourtsTable />
      </div>

      <CreateCourtForm isOpen={toCreate} onClose={() => setToCreate(false)} />
    </>
  );
}
