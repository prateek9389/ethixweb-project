import { NextRequest, NextResponse } from "next/server";
import { seedDatabase } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const tokenCookie = req.cookies.get("ethix_admin_token")?.value;
    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
    const token = tokenCookie || authHeader;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin authentication required." },
        { status: 401 }
      );
    }

    const result = await seedDatabase();

    return NextResponse.json({
      success: true,
      message: `Database successfully seeded with ${result.leads.length} enterprise Indian leads.`,
      data: {
        totalSeeded: result.leads.length,
        firestoreSynced: result.firestoreCount,
        leads: result.leads,
      },
    });
  } catch (error) {
    console.error("Seed API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed backend database." },
      { status: 500 }
    );
  }
}
