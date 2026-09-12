import type { User } from "@/features/auth/types";
import type { Court } from "@/features/court/types";

export type ReservationStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "EXPIRED";

export interface Reservation {
  _id: string;
  user: string | User;
  court: string | Court;
  amount: number;
  date: string;
  slot: string;
  status: ReservationStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminReservation {
  _id: string;
  user: Pick<User, "phone">;
  court: Pick<Court, "name" | "price" | "isActive"> | null;
  amount: number;
  date: string;
  slot: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface ReservationDetail {
  _id: string;
  user: string | User;
  court: Court;
  amount: number;
  date: string;
  slot: string;
  status: ReservationStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyBookingReservation extends Omit<Reservation, "court"> {
  court: Court;
}

export interface MyBookingsResponse {
  upcomingReservations: MyBookingReservation[];
  pastReservations: MyBookingReservation[];
}

export interface CreateReservationPayload {
  courtId: string;
  date: string;
  slot: string;
}

export interface BookingDate {
  fullDate: string;
  day: number;
  weekDay: string;
}

export type Slot = string;

export type BookingPeriod = "upcoming" | "past";