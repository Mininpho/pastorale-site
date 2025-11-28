// lib/auth.ts

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";

export function authenticate(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
