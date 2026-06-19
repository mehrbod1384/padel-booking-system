export function generateBookingDates() {
  const dates = [];

  for (let i = 1; i <= 14; i++) {
    const date = new Date();

    date.setDate(date.getDate() + i);

    dates.push({
      fullDate: date.toISOString().split("T")[0], // 2026-06-18
      day: date.getDate(),
      weekDay: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
    });
  }

  return dates;
}
