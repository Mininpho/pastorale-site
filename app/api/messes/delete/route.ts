// app/api/messes/delete/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messes } from "@/lib/schema.messes";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const messeId = formData.get("messeId")?.toString();

    if (!messeId) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await db.delete(messes).where(eq(messes.id, messeId));

    return NextResponse.redirect(new URL("/admin/messes", req.url));
  } catch (err) {
    console.error("ERREUR SUPPRESSION MESSE :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
