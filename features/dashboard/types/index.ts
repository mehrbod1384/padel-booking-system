export interface DashboardTodayData {
  _id: null;
  todayRevenue: number;
  todayReservation: number;
}

export interface DashboardStats {
  totalReservation: number;
  confirmedReservation: number;
  todayData: DashboardTodayData[];
}