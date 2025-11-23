// app/api/contact/get/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  contactGeneral,
  pretres,
  animatrice,
  secretariat,
  secretariatHoraires,
  funerailles,
} from "@/lib/schema.contact";

export const dynamic = "force-dynamic";

export async function GET() {
  const general = (await db.select().from(contactGeneral))[0];
  const listPretres = await db.select().from(pretres);
  const anim = (await db.select().from(animatrice))[0];
  const sec = (await db.select().from(secretariat))[0];
  const horaires = await db.select().from(secretariatHoraires);
  const fune = (await db.select().from(funerailles))[0];

  return NextResponse.json({
    general,
    pretres: listPretres,
    animatrice: anim,
    secretariat: {
      ...sec,
      horaires,
    },
    funerailles: fune,
  });
}
