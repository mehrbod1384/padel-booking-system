"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import { Button } from "@/components/ui/button";
import CourtsTable from "@/features/dashboard/courts/CourtsTable";
import CreateCourtForm from "@/features/dashboard/courts/CreateCourtForm";

export default function CourtsPage() {
  const [toCreate, setToCreate] = useState(false);

  return (
    <div className="space-y-5">
      <div className="-mx-4 -mt-5 sm:-mx-6 lg:-mx-8">
        <PageHero
          height="sm"
          image="/lasse-moller-tvXGDRjFb9g-unsplash.jpg"
          eyebrow="ADMIN PANEL"
          titleLead="Manage"
          titleAccent="courts"
          description="Add courts, update pricing and availability"
          actions={
            <div className="absolute bottom-6 right-6 z-10">
              <Button
                variant="brand"
                onClick={() => setToCreate(true)}
                className="gap-2 px-3 py-2"
              >
                <Plus className="size-4" />
                Add court
              </Button>
            </div>
          }
        />
      </div>

      <div className="relative -mt-10">
        <CourtsTable />
      </div>

      <CreateCourtForm isOpen={toCreate} onClose={() => setToCreate(false)} />
    </div>
  );
}
