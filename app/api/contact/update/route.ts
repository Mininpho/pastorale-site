import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "lib", "contact.json");
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error("Erreur API contact:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
