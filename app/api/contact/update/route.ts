// app/api/contact/update/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  contactGeneral,
  pretres,
  animatrice,
  secretariat,
  secretariatHoraires,
  funerailles,
} from "@/lib/schema.contact";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // CONTACT GENERAL
    await db
      .update(contactGeneral)
      .set({
        responsable: data.general.responsable,
        adresse: data.general.adresse,
        telephone: data.general.telephone,
        email: data.general.email,
      })
      .where(eq(contactGeneral.id, "general"));

    // PRETRES
    await db.delete(pretres); // reset total
    for (const p of data.pretres) {
      await db.insert(pretres).values({
        id: p.id,
        nom: p.nom,
        telephone: p.telephone,
        email: p.email,
        adresse: p.adresse,
      });
    }

    // ANIMATRICE
    await db
      .update(animatrice)
      .set({
        nom: data.animatrice.nom,
        telephone: data.animatrice.telephone,
        email: data.animatrice.email,
      })
      .where(eq(animatrice.id, "unique"));

    // SECRETARIAT
    await db
      .update(secretariat)
      .set({
        adresse: data.secretariat.adresse,
        telephone: data.secretariat.telephone,
        email: data.secretariat.email,
      })
      .where(eq(secretariat.id, "unique"));

    // SECRETARIAT HORAIRES
    await db.delete(secretariatHoraires);
    for (const h of data.secretariat.horaires) {
      await db.insert(secretariatHoraires).values({
        id: crypto.randomUUID(),
        ligne: h.ligne ? h.ligne : h, // gère string OU {ligne: "..."}
      });
    }

    // FUNERAILLES
    await db
      .update(funerailles)
      .set({ telephone: data.funerailles.telephone })
      .where(eq(funerailles.id, "unique"));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erreur update contact:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
