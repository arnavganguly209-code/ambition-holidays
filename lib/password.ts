import { compare, hash } from "bcryptjs";

/** Cost factor for AdminUser.passwordHash. Do not store plaintext passwords. */
const BCRYPT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  if (!plain || plain.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  return hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(
  plain: string,
  passwordHash: string,
): Promise<boolean> {
  if (!plain || !passwordHash) return false;
  try {
    return await compare(plain, passwordHash);
  } catch {
    return false;
  }
}
