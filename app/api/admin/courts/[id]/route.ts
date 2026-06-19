import {
  deleteCourt,
  updateCourt,
} from "@/features/court/services/courtServices";
import { connectDB } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const body = await req.json();
    const { id } = await params;

    const court = await updateCourt(id, body);

    return Response.json({
      success: true,
      court,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        err,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();

    const { id } = await params;

    await deleteCourt(id);

    return Response.json({
      success: true,
    });
  } catch (err) {
    return Response.json({ success: false, err }, { status: 500 });
  }
}
