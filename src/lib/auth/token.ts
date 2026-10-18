import { jwtVerify, SignJWT } from "jose";

export const SESSION_COOKIE = "vpfa_admin";
export const SESSION_DURATION_S = 60 * 60 * 8;

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET manquant ou trop court (32 caractères minimum)");
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = { adminId: number };

export async function signSession(payload: SessionPayload) {
  return new SignJWT({ adminId: payload.adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_S}s`)
    .sign(secretKey());
}

export async function readSession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    return typeof payload.adminId === "number" ? { adminId: payload.adminId } : null;
  } catch {
    return null;
  }
}
