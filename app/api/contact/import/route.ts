import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

import {
  contactGeneral,
  pretres,
  animatrice,
  secretariat,
  secretariatHoraires,
  funerailles
} from "@/lib/schema.contact";

import { db } from "@/lib/db";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "lib", "contact.json");
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // 🧹 On vide les tables (safe à faire UNE fois !)
    await db.delete(contactGeneral);
    await db.delete(pretres);
    await db.delete(animatrice);
    await db.delete(secretariat);
    await db.delete(secretariatHoraires);
    await db.delete(funerailles);

    // 🟦 CONTACT GÉNÉRAL
    await db.insert(contactGeneral).values({
      id: "1",
      responsable: json.general.responsable,
      adresse: json.general.adresse,
      telephone: json.general.telephone,
      email: json.general.email,
    });

    // 🟧 PRÊTRES
    for (const p of json.pretres) {
      await db.insert(pretres).values({
        id: crypto.randomUUID(),
        nom: p.nom,
        telephone: p.telephone,
        email: p.email,
        adresse: p.adresse,
      });
    }

    // 🟩 ANIMATRICE
    await db.insert(animatrice).values({
      id: "1",
      nom: json.animatrice.nom,
      telephone: json.animatrice.telephone,
      email: json.animatrice.email,
    });

    // 🟪 SECRÉTARIAT
    await db.insert(secretariat).values({
      id: "1",
     adresse: json.secretariat.adresse,
     telephone: json.secretariat.telephone,
     email: json.secretariat.email,
    });

// Horaires
for (const h of json.secretariat.horaires) {
  await db.insert(secretariatHoraires).values({
    id: crypto.randomUUID(),
    ligne: h, // 🔥 Correction ici
  });
}


    // 🖤 FUNÉRAILLES
    await db.insert(funerailles).values({
      id: "1",
      telephone: json.funerailles.telephone,
    });

    return NextResponse.json({ ok: true, message: "Import réussi !" });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: "Erreur" }, { status: 500 });
  }
}
