import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID manquant" },
        { status: 400 }
      );
    }

    const jsonPath = path.join(process.cwd(), "lib", "documents.json");

    const docs = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf8"))
      : [];

    const newDocs = docs.filter((d: any) => d.id !== id);

    fs.writeFileSync(jsonPath, JSON.stringify(newDocs, null, 2));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ERREUR DELETE DOCUMENT :", err);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
