export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    // 1️⃣ Lecture JSON envoyé par le client
    const body = await req.json();
    const { titre, extrait, contenu, categorie, image } = body;

    if (!titre || !extrait || !contenu) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    // 2️⃣ Création de l’actualité
    const newActu = {
      id: Date.now().toString(),
      titre,
      extrait,
      contenu,
      categorie: categorie || "annonce",  // ⭐ AJOUT FONDAMENTAL
      date: new Date().toISOString(),
      image: image || null,
    };

    // 3️⃣ Lecture ou création du fichier JSON
    const jsonPath = path.join(process.cwd(), "lib", "actualites.json");

    const data = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf8"))
      : [];

    // 4️⃣ Insertion en haut de liste
    data.unshift(newActu);

    // 5️⃣ Sauvegarde
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Erreur API actualités :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
