import { format } from "date-fns";

export function getDayRange(date: string) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 50, 50, 999);

  return { startOfDay, endOfDay };
}

export function formatDate(date: string | Date) {
  if (!date) return;

  return format(new Date(date), "MMM dd, yyyy");
}
