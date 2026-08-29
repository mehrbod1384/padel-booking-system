import { z } from "zod";

export const sendOtpSchema = z.object({
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number"),
  code: z.string().length(6, "Code must be 6 digits"),
});

export const createReservationSchema = z.object({
  courtId: z.string().min(1, "courtId is required"),
  date: z.string().min(1, "date is required"),
  slot: z.string().min(1, "slot is required"),
});

export const createCourtSchema = z.object({
  name: z.string().min(1, "name is required"),
  price: z.coerce.number().positive("price must be positive"),
});

export const updateCourtSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.coerce.number().positive().optional(),
  isActive: z.boolean().optional(),
});

export const createPaymentSchema = z.object({
  reservationId: z.string().min(1, "reservationId is required"),
});
