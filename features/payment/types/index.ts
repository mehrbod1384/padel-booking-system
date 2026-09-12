export type PaymentStatus = "INITIATED" | "SUCCESS" | "FAILED" | "EXPIRED";

export interface Payment {
  _id: string;
  reservation: string;
  amount: number;
  authority: string;
  refId: string | null;
  status: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentResponse {
  paymentId: string;
  paymentUrl: string;
}