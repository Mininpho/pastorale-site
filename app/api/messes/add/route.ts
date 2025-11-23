import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messes } from "@/lib/schema.messes";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const egliseId = formData.get("egliseId") as string;
    const jour = formData.get("jour") as string;
    const heure = formData.get("heure") as string;
    const categorie = formData.get("categorie") as string;
    const remarque = (formData.get("remarque") as string) || null;

    if (!egliseId || !jour || !heure || !categorie) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    await db.insert(messes).values({
      id: Date.now().toString(),
      egliseId,
      jour,
      heure,
      categorie,
      remarque,
    });

    return NextResponse.redirect(new URL("/admin/messes", req.url));
  } catch (error) {
    console.error("Erreur ajout messe :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
