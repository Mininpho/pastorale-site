// app/api/messes/add/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messes } from "@/lib/schema.messes";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const egliseId = formData.get("egliseId")?.toString() ?? "";
    const jour = formData.get("jour")?.toString() ?? "";
    const heure = formData.get("heure")?.toString() ?? "";
    const categorie = formData.get("categorie")?.toString() ?? "";
    const remarque = formData.get("remarque")?.toString() ?? "";

    if (!egliseId || !jour || !heure || !categorie) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const id = Date.now().toString();

    // INSERT SQL
    await db.insert(messes).values({
      id,
      egliseId,
      jour,
      heure,
      categorie,
      remarque: remarque || null,
    });

    // Redirection vers le panel admin
    return NextResponse.redirect(new URL("/admin/messes", req.url));

  } catch (err) {
    console.error("ERREUR INSERT MESSE :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
