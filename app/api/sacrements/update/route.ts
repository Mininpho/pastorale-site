import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sacrements } from "@/lib/schema.sacrements";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    // body : Record<string, any> → { bapteme: {...}, mariage: {...}, ... }

    const entries = Object.entries(body);

    for (const [id, rawInfo] of entries) {
      const info = rawInfo as {
        titre?: string;
        description?: string;
        texteBiblique?: string;
        referenceCEC?: string;
        personne?: string;
        telephone?: string;
        email?: string;
      };

      await db
        .update(sacrements)
        .set({
          titre: info.titre ?? "",
          description: info.description ?? "",
          texteBiblique: info.texteBiblique ?? "",
          referenceCEC: info.referenceCEC ?? "",
          personne: info.personne ?? "",
          telephone: info.telephone ?? "",
          email: info.email ?? "",
        })
        .where(eq(sacrements.id, id));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur UPDATE sacrements:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
