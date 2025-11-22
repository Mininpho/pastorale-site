import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fileUrl = searchParams.get("url");
    const filename = searchParams.get("filename") || "document.pdf";

    if (!fileUrl) {
      return NextResponse.json({ error: "URL manquante" }, { status: 400 });
    }

    // Télécharger le fichier depuis Cloudinary
    const fileRes = await fetch(fileUrl);

    if (!fileRes.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer le fichier" },
        { status: 500 }
      );
    }

    const buffer = Buffer.from(await fileRes.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
