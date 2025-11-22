// app/api/messes/delete/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();

  const egliseId = formData.get("egliseId")?.toString() ?? "";
  const messeId = formData.get("messeId")?.toString() ?? "";

  const filePath = path.join(process.cwd(), "lib", "horaires.json");

  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  const egliseIndex = data.findIndex((e: any) => e.id === egliseId);

  if (egliseIndex === -1) {
    return new NextResponse("Église introuvable", { status: 400 });
  }

  const eglise = data[egliseIndex];

  eglise.messes = (eglise.messes || []).filter(
    (m: any) => m.id !== messeId
  );

  data[egliseIndex] = eglise;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.redirect(new URL("/admin/messes", req.url));
}
