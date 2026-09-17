"use client";

import { useMemo, useState } from "react";

import { ArrowDown, ArrowUp, CalendarX2 } from "lucide-react";

import {
  DataTableCard,
  DataTableToolbar,
  TableSearchInput,
} from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import SegmentedControl from "@/components/ui/SegmentedControl";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBooking } from "@/features/booking/hooks/useBooking";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";
import {
  clampPage,
  DEFAULT_PAGE_SIZE,
  getPageCount,
  paginate,
} from "@/lib/pagination";

import ReservationRow, { ReservationMobileCard } from "./reservationRow";

import type { SegmentedOption } from "@/components/ui/SegmentedControl";
import type { ReservationStatus } from "@/features/booking/types";

type StatusFilter = "ALL" | ReservationStatus;
type SortKey = "date" | "amount";

const statusOptions: SegmentedOption<StatusFilter>[] = [
  { value: "ALL", label: "All" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PENDING", label: "Pending" },
  { value: "EXPIRED", label: "Expired" },
  { value: "CANCELLED", label: "Cancelled" },
];

const sortOptions: SegmentedOption<SortKey>[] = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
];

export default function ReservationsTable() {
  const { reservations, isLoading, error } = useBooking();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDesc, setSortDesc] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const isFiltered = Boolean(search.trim()) || status !== "ALL";

  /**
   * Changing how the list is filtered/sorted invalidates the current offset.
   * Resetting the page inside the same event keeps it to one render and avoids
   * a setState-in-effect cascade.
   */
  function changeFilter(apply: () => void) {
    apply();
    setPage(1);
  }

  const filteredReservations = useMemo(() => {
    const term = search.trim().toLowerCase();

    const list = (reservations ?? []).filter((reservation) => {
      if (status !== "ALL" && reservation.status !== status) return false;
      if (!term) return true;

      return [
        reservation.user?.phone,
        reservation.court?.name,
        reservation.slot,
      ].some((value) => value?.toLowerCase().includes(term));
    });

    return list.sort((a, b) => {
      const diff =
        sortKey === "amount"
          ? a.amount - b.amount
          : new Date(a.date).getTime() - new Date(b.date).getTime();

      return sortDesc ? -diff : diff;
    });
  }, [reservations, search, status, sortKey, sortDesc]);

  const pageCount = getPageCount(filteredReservations.length, pageSize);
  // Clamped so a page that no longer exists falls back to the last one.
  const currentPage = clampPage(page, pageCount);
  const pagedReservations = paginate(
    filteredReservations,
    currentPage,
    pageSize,
  );

  return (
    <DataTableCard
      toolbar={
        <DataTableToolbar
          title="All reservations"
          count={filteredReservations.length}
        >
          <TableSearchInput
            value={search}
            onChange={(value) => changeFilter(() => setSearch(value))}
            placeholder="Search phone, court or slot..."
          />

          <SegmentedControl
            value={status}
            onChange={(value) => changeFilter(() => setStatus(value))}
            options={statusOptions}
            size="sm"
          />

          <div className="flex items-center gap-1">
            <SegmentedControl
              value={sortKey}
              onChange={(value) => changeFilter(() => setSortKey(value))}
              options={sortOptions}
              size="sm"
            />

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() =>
                changeFilter(() => setSortDesc((previous) => !previous))
              }
              aria-label={sortDesc ? "Sort descending" : "Sort ascending"}
              className="border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800"
            >
              {sortDesc ? (
                <ArrowDown className="size-3.5" />
              ) : (
                <ArrowUp className="size-3.5" />
              )}
            </Button>
          </div>
        </DataTableToolbar>
      }
      isLoading={isLoading}
      skeletonColumns={6}
      error={
        error ? getErrorMessage(error, "Could not load reservations") : undefined
      }
      isEmpty={!filteredReservations.length}
      empty={
        <EmptyState
          size="sm"
          icon={<CalendarX2 size={20} />}
          title={
            isFiltered
              ? "No reservations match your filters"
              : "No reservations yet"
          }
          description={
            isFiltered
              ? "Try clearing the search or the status filter."
              : "New bookings will show up here as players reserve courts."
          }
        />
      }
      footer={
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          pageSize={pageSize}
          totalItems={filteredReservations.length}
          onPageChange={setPage}
          onPageSizeChange={(size) => changeFilter(() => setPageSize(size))}
        />
      }
    >
      <div className="hidden md:block">
        <Table className="[&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wide [&_th]:text-zinc-500">
          <TableHeader>
            <TableRow className="border-zinc-800">
              <TableHead>User</TableHead>
              <TableHead>Court</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pagedReservations.map((reservation) => (
              <ReservationRow
                key={reservation._id}
                reservation={reservation}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2 p-3 md:hidden">
        {pagedReservations.map((reservation) => (
          <ReservationMobileCard
            key={reservation._id}
            reservation={reservation}
          />
        ))}
      </div>
    </DataTableCard>
  );
}
