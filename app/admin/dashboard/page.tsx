"use client";

import {
  CalendarCheck,
  CalendarDays,
  CircleDollarSign,
  Clock,
  ListChecks,
  RefreshCw,
} from "lucide-react";

import PageHero from "@/components/layout/PageHero";
import { DataTableCard, DataTableToolbar } from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import { StatCardSkeleton } from "@/components/ui/Skeleton";
import StatCard from "@/components/ui/StatCard";
import { ReservationStatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/features/booking/hooks/useBooking";
import { formatPrice } from "@/features/booking/utils/helper";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { getErrorMessage } from "@/lib/errors/getErrorMessage";
import { cn } from "@/lib/utils";
import { formatDate, toDayKey } from "@/utils/date";

export default function DashboardPage() {
  const { stats, isLoading, error, refetch, isFetching } = useDashboard();
  const { reservations, isLoading: isLoadingReservations } = useBooking();

  const todayKey = toDayKey(new Date());

  const todayReservations = (reservations ?? []).filter(
    (reservation) =>
      reservation.status === "CONFIRMED" &&
      toDayKey(reservation.date) === todayKey,
  );

  return (
    <div className="space-y-5">
      <div className="-mx-4 -mt-5 sm:-mx-6 lg:-mx-8">
        <PageHero
          height="sm"
          image="/rodrigo-kugnharski-DnaofMNz0HM-unsplash.jpg"
          eyebrow="ADMIN PANEL"
          titleLead="Today at a"
          titleAccent="glance"
          description="Revenue, bookings and the day's schedule"
        />
      </div>

      <div className="relative -mt-10 space-y-5">
        {isLoading ? (
          <StatCardSkeleton />
        ) : error ? (
          <div
            role="alert"
            className="rounded-xl border border-red-400/30 bg-red-400/5 p-4 text-sm text-red-400"
          >
            {getErrorMessage(error, "Could not load dashboard stats")}
          </div>
        ) : stats ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total reservations"
              value={stats.totalReservation}
              hint="All time"
              icon={<ListChecks size={16} />}
            />

            <StatCard
              label="Confirmed"
              value={stats.confirmedReservation}
              hint="Paid bookings"
              icon={<CalendarCheck size={16} />}
              accent
            />

            <StatCard
              label="Today's bookings"
              value={stats.todayData.todayReservation}
              hint={formatDate(new Date())}
              icon={<CalendarDays size={16} />}
            />

            <StatCard
              label="Today's revenue"
              value={`$${formatPrice(stats.todayData.todayRevenue)}`}
              hint="Confirmed reservations only"
              icon={<CircleDollarSign size={16} />}
            />
          </div>
        ) : null}

        <DataTableCard
          toolbar={
            <DataTableToolbar
              title="Today's schedule"
              count={todayReservations.length}
            >
              <Button
                variant="outline"
                size="sm"
                disabled={isFetching}
                onClick={() => refetch()}
                className="gap-2 border-zinc-700 bg-zinc-900/60 text-zinc-300 hover:bg-zinc-800"
              >
                <RefreshCw
                  className={cn("size-3.5", isFetching && "animate-spin")}
                />
                Refresh
              </Button>
            </DataTableToolbar>
          }
          isLoading={isLoadingReservations}
          skeletonRows={4}
          skeletonColumns={4}
          isEmpty={!todayReservations.length}
          empty={
            <EmptyState
              size="sm"
              icon={<Clock size={20} />}
              title="No bookings today"
              description="Confirmed reservations for today will appear here."
            />
          }
        >
          <ul className="divide-y divide-zinc-800">
            {todayReservations.map((reservation) => (
              <li
                key={reservation._id}
                className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-zinc-800/40"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold tabular-nums text-white">
                    {reservation.user?.phone ?? "Unknown user"}
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    {reservation.court?.name ?? "Deleted court"}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs font-semibold tabular-nums text-zinc-400">
                    {reservation.slot}
                  </span>

                  <ReservationStatusBadge status={reservation.status} />

                  <span className="text-sm font-bold tabular-nums text-brand">
                    ${formatPrice(reservation.amount)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </DataTableCard>
      </div>
    </div>
  );
}
