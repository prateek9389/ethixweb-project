import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, signToken } from "@/lib/auth";
import { authAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const { email, password, firebaseIdToken } = await req.json();

    // 1. If Firebase ID Token was supplied, verify via Firebase Admin
    if (firebaseIdToken && authAdmin) {
      try {
        const decodedToken = await authAdmin.verifyIdToken(firebaseIdToken);
        const adminUser = {
          id: decodedToken.uid,
          email: decodedToken.email || email,
          name: "Ethixweb Firebase Admin",
          role: "superadmin" as const,
        };

        const token = signToken(adminUser);
        const response = NextResponse.json({
          success: true,
          message: "Firebase authentication verified",
          user: adminUser,
          token,
        });

        response.cookies.set("ethix_admin_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60,
          path: "/",
        });

        return response;
      } catch (err) {
        console.warn("Firebase ID token verification error, falling back to credentials:", err);
      }
    }

    // 2. Standard Admin credentials validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    const admin = authenticateAdmin(email, password);

    if (!admin) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Use demo: admin@ethixweb.com / EthixAdmin2026" },
        { status: 401 }
      );
    }

    const token = signToken(admin);

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: admin,
      token,
    });

    // Set HTTP-only secure cookie
    response.cookies.set("ethix_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during login." },
      { status: 500 }
    );
  }
}
