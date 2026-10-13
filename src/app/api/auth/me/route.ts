import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const tokenCookie = req.cookies.get("ethix_admin_token")?.value;
  const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");
  const token = tokenCookie || authHeader;

  if (!token) {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    success: true,
    authenticated: true,
    user: {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    },
  });
}
