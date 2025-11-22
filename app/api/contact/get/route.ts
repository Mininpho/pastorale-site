import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  const filePath = path.join(process.cwd(), "lib", "contact.json");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Fichier contact introuvable" }, { status: 404 });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return NextResponse.json(data);
}
