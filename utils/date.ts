export function getDayRange(date: string) {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 50, 50, 999);

  return { startOfDay, endOfDay };
}
