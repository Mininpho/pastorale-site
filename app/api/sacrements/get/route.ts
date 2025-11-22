import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "lib", "sacrements-contacts.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  return NextResponse.json(data);
}
