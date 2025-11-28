// app/api/login/route.ts
import { NextResponse } from "next/server";
import { authenticate } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Vérification via ton auth.ts
  if (authenticate(email, password)) {
    const response = NextResponse.json({ ok: true });

    // Nouveau cookie cohérent avec admin/layout.tsx
    response.cookies.set("admin_auth", "true", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "strict",
    });

    return response;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
