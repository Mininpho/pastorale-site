// app/api/documents/delete/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema.documents";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await db.delete(documents).where(eq(documents.id, id));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ERREUR DELETE DOCUMENT :", err);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
