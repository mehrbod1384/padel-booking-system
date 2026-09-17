import { format } from "date-fns";

export function getDayRange(date: string) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
}

export function formatDate(date: string | Date) {
  if (!date) return;

  return format(new Date(date), "MMM dd, yyyy");
}

export function toDayKey(date: string | Date) {
  const value = new Date(date);

  const month = `${value.getMonth() + 1}`.padStart(2, "0");
  const day = `${value.getDate()}`.padStart(2, "0");

  return `${value.getFullYear()}-${month}-${day}`;
}
