import { connectDB } from "@/lib/db";
import { Payment } from "@/models/Payment";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const payment = await Payment.findById(id);

    return Response.json({
      success: true,
      data: payment,
    });
  } catch (err) {
    return Response.json({ success: false, err }, { status: 500 });
  }
}
