// app/api/messes/add/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const egliseId = formData.get("egliseId")?.toString() ?? "";
  const jour = formData.get("jour")?.toString() ?? "";
  const heure = formData.get("heure")?.toString() ?? "";
  const categorie = formData.get("categorie")?.toString() ?? "";
  const remarque = formData.get("remarque")?.toString() ?? "";

  const filePath = path.join(process.cwd(), "lib", "horaires.json");
  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  // trouver l’église
  const eglise = data.find((e: any) => e.id === egliseId);
  if (!eglise) {
    return new NextResponse("Not found", { status: 404 });
  }

  // ajouter la messe
  eglise.messes = eglise.messes || [];
  eglise.messes.push({
    id: Date.now().toString(),
    jour,
    heure,
    categorie,
    remarque,
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

   return NextResponse.redirect(new URL("/admin/messes", req.url));
}
