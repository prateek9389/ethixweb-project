import { NextRequest, NextResponse } from "next/server";
import { updateLead, deleteLead } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tokenCookie = req.cookies.get("ethix_admin_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const token = tokenCookie || authHeader;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const updated = await updateLead(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tokenCookie = req.cookies.get("ethix_admin_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const token = tokenCookie || authHeader;

    if (!token || !verifyToken(token)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await deleteLead(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: "Lead not found or could not be removed" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead removed successfully" });
  } catch (error) {
    console.error("Delete lead error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
