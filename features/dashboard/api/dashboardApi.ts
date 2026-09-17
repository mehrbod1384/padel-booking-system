import { axiosInstance } from "@/lib/axiosInstance";

import type { DashboardStats } from "../types";

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await axiosInstance.get("/admin/dashboard");

  const data = res.data.data as {
    totalReservation: number;
    confirmedReservation: number;
    todayData: { _id: null; todayRevenue: number; todayReservation: number }[];
  };

  return {
    totalReservation: data.totalReservation ?? 0,
    confirmedReservation: data.confirmedReservation ?? 0,
    // The aggregation returns [] when nothing was booked today.
    todayData: data.todayData?.[0] ?? {
      _id: null,
      todayRevenue: 0,
      todayReservation: 0,
    },
  };
}