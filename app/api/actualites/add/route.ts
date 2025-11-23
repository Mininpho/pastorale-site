export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { actualites } from "@/lib/schema.actualites";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titre, extrait, contenu, categorie, image } = body;

    if (!titre || !extrait || !contenu) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const newActu = {
      id: Date.now().toString(),
      titre,
      extrait,
      contenu,
      categorie: categorie || "annonce",
      date: new Date(), // Drizzle gère l'ISO automatiquement
      image: image || null,
    };

    await db.insert(actualites).values(newActu);

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Erreur API actualités (DB) :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
