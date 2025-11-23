import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { actualites } from "@/lib/schema.actualites";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json(
        { error: "ID manquant" },
        { status: 400 }
      );
    }

    // Suppression dans PostgreSQL
    await db.delete(actualites).where(eq(actualites.id, id));

    // Redirection vers l'admin
    return NextResponse.redirect(new URL("/admin/actualites", req.url));

  } catch (error) {
    console.error("Erreur suppression actualité :", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
