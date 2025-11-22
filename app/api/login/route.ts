// app/api/login/route.ts
import { NextResponse } from "next/server";
import { authenticate } from "../../../lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (authenticate(email, password)) {
    // On crée une session simplifiée
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: "admin-session",
      value: "connecte",
      httpOnly: true,
      path: "/",
    });

    return response;
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
