import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sacrements } from "@/lib/schema.sacrements";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await db.select().from(sacrements);

    // Renvoi sous forme d’objet :
    // { id: { titre, description, texteBiblique, referenceCEC, personne, telephone, email } }
    const map: Record<string, any> = {};
    data.forEach((item) => {
      map[item.id] = {
        titre: item.titre,
        description: item.description,
        texteBiblique: item.texteBiblique,
        referenceCEC: item.referenceCEC,
        personne: item.personne,
        telephone: item.telephone,
        email: item.email,
      };
    });

    return NextResponse.json(map);
  } catch (err) {
    console.error("Erreur GET sacrements:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
