import { createHash, randomBytes } from "crypto";

/**
 * Helpers for AdminSession.tokenHash.
 * The browser cookie may hold the raw token; the database stores only the hash.
 */

export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashSessionToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}
