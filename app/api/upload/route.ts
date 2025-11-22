import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
    }

    // Convert File en buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload vers Cloudinary
    const upload = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "up-gilly/actualites",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json(upload);
  } catch (err) {
    console.error("UPLOAD ERROR :", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
