import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getReportsCollection } from "@/lib/mongodb";

export async function DELETE(request) {
  try {
    const session = await getSession();

    if (!session?.login) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing report ID" },
        { status: 400 }
      );
    }

    const reportsCollection = await getReportsCollection();
    const result = await reportsCollection.deleteOne({
      login: session.login,
      _id: id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Report not found or access denied" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting report:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete report" },
      { status: 500 }
    );
  }
}