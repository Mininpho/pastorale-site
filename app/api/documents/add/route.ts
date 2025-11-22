import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { titre, description, categorie, url } = body;

    if (!titre || !categorie || !url) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const newDoc = {
      id: Date.now().toString(),
      titre,
      description: description || "",
      categorie,
      url,
      date: new Date().toISOString(),
    };

    const jsonPath = path.join(process.cwd(), "lib", "documents.json");

    const data = fs.existsSync(jsonPath)
      ? JSON.parse(fs.readFileSync(jsonPath, "utf8"))
      : [];

    data.unshift(newDoc);

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("ERREUR ADD DOCUMENT :", err);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
