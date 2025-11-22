import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id");

  const filePath = path.join(process.cwd(), "lib", "actualites.json");

  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];

  const newData = data.filter((a: any) => a.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

  return NextResponse.redirect(new URL("/admin/actualites", req.url));
}
