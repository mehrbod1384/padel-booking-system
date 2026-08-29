import { describe, it, expect } from "vitest";
import { generateOtp } from "@/features/auth/utils/generateOtp";

describe("generateOtp", () => {
  it("returns a 6-digit numeric string", () => {
    const otp = generateOtp();
    expect(otp).toMatch(/^\d{6}$/);
  });

  it("returns different values across calls", () => {
    const a = generateOtp();
    const b = generateOtp();
    expect(a).not.toBe(b);
  });
});
