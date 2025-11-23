import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sacrements } from "@/lib/schema.sacrements";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    // body est de type Record<string, any>

    const entries = Object.entries(body);

    for (const [id, rawInfo] of entries) {
      // 💡 Cast explicite pour TypeScript
      const info = rawInfo as {
        personne?: string;
        telephone?: string;
        email?: string;
      };

      await db
        .update(sacrements)
        .set({
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
