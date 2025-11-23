// app/api/documents/add/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema.documents";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titre, description, categorie, url } = body;

    if (!titre || !categorie || !url) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    await db.insert(documents).values({
      id: crypto.randomUUID(),
      titre,
      description: description ?? "",
      categorie,
      url,
      date: new Date()
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ERREUR ADD DOCUMENT :", err);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
