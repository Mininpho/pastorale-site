import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema.documents";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Lecture SQL triée par date DESC (plus récent en premier)
    const data = await db
      .select()
      .from(documents)
      .orderBy(desc(documents.date));

    return NextResponse.json(data);
  } catch (err) {
    console.error("ERREUR GET DOCUMENTS:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
