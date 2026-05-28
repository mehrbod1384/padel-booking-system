import { slots } from "@/features/booking/utils/slots";

export async function GET() {
  return Response.json({
    success: true,
    slots,
  });
}
