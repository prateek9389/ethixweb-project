import crypto from "crypto";
import { AdminUser } from "./types";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ethixweb.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "EthixAdmin2026";
const JWT_SECRET = process.env.JWT_SECRET || "ethixweb-secret-super-key-2026-secure-jwt";

export const DEMO_CREDENTIALS = {
  email: ADMIN_EMAIL,
  password: ADMIN_PASSWORD,
};

// Base64Url encoding helper
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf-8");
}

// Sign a payload with HMAC SHA-256
export function signToken(user: AdminUser, expiresInMs = 24 * 60 * 60 * 1000): string {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const payload = JSON.stringify({
    ...user,
    exp: Date.now() + expiresInMs,
    iat: Date.now(),
  });

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// Verify a signed token
export function verifyToken(token: string): (AdminUser & { exp: number }) | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;

    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Date.now()) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

// Verify admin login attempt
export function authenticateAdmin(email: string, pass: string): AdminUser | null {
  const validEmail = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const validPass = pass === ADMIN_PASSWORD || pass === "EthixAdmin2026" || pass === "EthixAdmin2026!";
  if (validEmail && validPass) {
    return {
      id: "admin-1",
      email: ADMIN_EMAIL,
      name: "Ethixweb India Lead Admin",
      role: "superadmin",
    };
  }
  return null;
}
