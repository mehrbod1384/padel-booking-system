import { connectDB } from "@/lib/db";
import { Court } from "@/models/Court";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const body = await req.json();

    const court = await Court.findByIdAndUpdate(params.id, body, { new: true });

    return Response.json({
      success: true,
      court,
    });
  } catch (err) {
    return Response.json({ success: false }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    await Court.findByIdAndDelete(params.id);

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json({ success: false }, { status: 500 });
  }
}
