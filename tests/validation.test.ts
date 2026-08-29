import { describe, it, expect } from "vitest";
import {
  sendOtpSchema,
  verifyOtpSchema,
  createReservationSchema,
  createCourtSchema,
} from "@/lib/validation";

describe("auth & booking validation schemas", () => {
  it("accepts a valid phone", () => {
    expect(sendOtpSchema.safeParse({ phone: "09123456789" }).success).toBe(true);
  });

  it("rejects an invalid phone", () => {
    expect(sendOtpSchema.safeParse({ phone: "abc" }).success).toBe(false);
  });

  it("requires a 6-digit code", () => {
    expect(
      verifyOtpSchema.safeParse({ phone: "09123456789", code: "12345" }).success,
    ).toBe(false);
    expect(
      verifyOtpSchema.safeParse({ phone: "09123456789", code: "123456" }).success,
    ).toBe(true);
  });

  it("validates reservation input", () => {
    expect(
      createReservationSchema.safeParse({
        courtId: "abc",
        date: "2026-01-01",
        slot: "10:00",
      }).success,
    ).toBe(true);
    expect(
      createReservationSchema.safeParse({ courtId: "" }).success,
    ).toBe(false);
  });

  it("coerces numeric price for court creation", () => {
    expect(
      createCourtSchema.safeParse({ name: "Court 1", price: "50000" }).success,
    ).toBe(true);
    expect(
      createCourtSchema.safeParse({ name: "Court 1", price: "-5" }).success,
    ).toBe(false);
  });
});
