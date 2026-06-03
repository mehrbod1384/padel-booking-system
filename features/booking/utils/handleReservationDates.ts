export function handleReservationDates(date: string, slot: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const requestedDate = new Date(date);
  requestedDate.setHours(0, 0, 0, 0);

  const [hours, minutes] = slot.split(":");
  const slotDateTime = new Date(date);
  slotDateTime.setHours(Number(hours), Number(minutes), 0, 0);

  const maxDate = new Date();
  maxDate.setHours(0, 0, 0, 0);
  maxDate.setDate(maxDate.getDate() + 14);

  const now = new Date();

  return { today, requestedDate, slotDateTime, maxDate, now };
}
