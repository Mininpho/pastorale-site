import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { eglises } from "@/lib/schema.messes";

export async function GET() {
  try {
    const data = [
      {
        id: "1",
        nom: "Notre-Dame de Grâce",
        lieu: "Gilly - Chapelle des Auduins",
        image: "/images/eglises/nd_grace.png",
        map: "https://maps.app.goo.gl/ks7Fvadj5X1mp9MJ8",
      },
      {
        id: "2",
        nom: "Notre-Dame de Lourdes",
        lieu: "Gilly - Sart-Culpart",
        image: "/images/eglises/nd_lourdes.png",
        map: "https://maps.google.com/?q=50.432350,4.488745",
      },
      {
        id: "3",
        nom: "Sacré-Cœur",
        lieu: "Gilly - Sart-Allet",
        image: "/images/eglises/sacre_coeur.png",
        map: "https://maps.google.com/?q=50.429291,4.502114",
      },
      {
        id: "4",
        nom: "Saint-Remy",
        lieu: "Gilly - Église du village",
        image: "/images/eglises/st_remy.png",
        map: "https://maps.google.com/?q=Rue+du+Coquelet+4-16,+6060+Charleroi",
      },
      {
        id: "5",
        nom: "Sainte-Barbe",
        lieu: "Gilly - Haies",
        image: "/images/eglises/ste_barbe.png",
        map: "https://maps.google.com/?q=50.427193,4.471497",
      },
      {
        id: "6",
        nom: "Saint-Lambert",
        lieu: "Jumet - Château Mondron",
        image: "/images/eglises/st_lambert.png",
        map: "https://maps.google.com/?q=Chaussée+du+Château+Mondron+159,+6040+Charleroi",
      },
      {
        id: "7",
        nom: "Saint-Martin",
        lieu: "Ransart - Chapelle des Raspes",
        image: "/images/eglises/st_martin.png",
        map: "https://maps.google.com/?q=Rue+Jean+Volders+21,+6043+Charleroi",
      },
      {
        id: "8",
        nom: "Saint-Pierre",
        lieu: "Ransart - Bois",
        image: "/images/eglises/st_pierre.png",
        map: "https://maps.google.com/?q=Place+François+Goffe,+6043+Charleroi",
      },
    ];

    // On vide la table pour éviter les doublons si jamais
    await db.delete(eglises);

    // On insère tout
    await db.insert(eglises).values(data);

    return NextResponse.json({ ok: true, message: "Églises insérées avec succès." });

  } catch (error) {
    console.error("Erreur seed églises :", error);
    return NextResponse.json({ error: "Erreur seed" }, { status: 500 });
  }
}
