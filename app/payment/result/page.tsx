import PaymentResultClient from "@/features/payment/components/PaymentResultClient";
import { AppError } from "@/lib/errors/AppError";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{
    paymentId?: string;
  }>;
}) {
  const { paymentId } = await searchParams;
  if (!paymentId) throw new AppError("paymentId required", 400);

  return <PaymentResultClient paymentId={paymentId} />;
}
