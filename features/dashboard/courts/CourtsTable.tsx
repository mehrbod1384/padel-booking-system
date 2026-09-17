"use client";

import { useMemo, useState } from "react";

import { LayoutGrid } from "lucide-react";

import {
  DataTableCard,
  DataTableToolbar,
  TableSearchInput,
} from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCourt } from "@/features/court/hooks/useCourt";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";

import CourtRow from "./CourtRow";

export default function CourtsTable() {
  const { courts, isLoading, error } = useCourt();

  const [search, setSearch] = useState("");

  const filteredCourts = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return courts ?? [];

    return (courts ?? []).filter((court) =>
      court.name.toLowerCase().includes(term),
    );
  }, [courts, search]);

  return (
    <DataTableCard
      toolbar={
        <DataTableToolbar title="Courts" count={filteredCourts.length}>
          <TableSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search courts..."
          />
        </DataTableToolbar>
      }
      isLoading={isLoading}
      skeletonRows={4}
      skeletonColumns={4}
      error={error ? getErrorMessage(error, "Could not load courts") : undefined}
      isEmpty={!filteredCourts.length}
      empty={
        <EmptyState
          size="sm"
          icon={<LayoutGrid size={20} />}
          title={search ? "No courts match your search" : "No courts yet"}
          description={
            search
              ? "Try a different name."
              : "Create your first court to start accepting bookings."
          }
        />
      }
    >
      <Table className="[&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wide [&_th]:text-zinc-500">
        <TableHeader>
          <TableRow className="border-zinc-800">
            <TableHead>Name</TableHead>
            <TableHead>Price / hour</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCourts.map((court) => (
            <CourtRow key={court._id} court={court} />
          ))}
        </TableBody>
      </Table>
    </DataTableCard>
  );
}
