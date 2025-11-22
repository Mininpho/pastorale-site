// lib/auth.ts

export const ADMIN_EMAIL = "admin@up.local";  
export const ADMIN_PASSWORD = "motdepasse"; // tu changeras ça plus tard

export function authenticate(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
