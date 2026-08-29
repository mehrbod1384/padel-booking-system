import { describe, it, expect } from "vitest";
import { handleReservationDates } from "@/features/booking/utils/handleReservationDates";

describe("handleReservationDates", () => {
  it("computes max date as 14 days ahead", () => {
    const { maxDate } = handleReservationDates("2026-01-01", "10:00");

    const expected = new Date();
    expected.setHours(0, 0, 0, 0);
    expected.setDate(expected.getDate() + 14);

    expect(maxDate.getDate()).toBe(expected.getDate());
  });

  it("parses slot time into slotDateTime", () => {
    const { slotDateTime } = handleReservationDates("2026-01-01", "14:30");

    expect(slotDateTime.getHours()).toBe(14);
    expect(slotDateTime.getMinutes()).toBe(30);
  });

  it("rejects a malformed slot string gracefully", () => {
    const { slotDateTime } = handleReservationDates("2026-01-01", "invalid");

    expect(slotDateTime.getHours()).toBeNaN();
  });
});
