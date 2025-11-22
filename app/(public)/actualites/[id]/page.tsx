import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

interface Props {
  params: { id: string };
}

export default function ActualiteDetailPage({ params }: Props) {
  const filePath = path.join(process.cwd(), "lib", "actualites.json");

  let actualites: any[] = [];

  if (fs.existsSync(filePath)) {
    actualites = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  const actu = actualites.find((a) => a.id === params.id);

  if (!actu) {
    return (
      <div className="min-h-screen py-20 text-center text-nuit">
        <h1 className="text-2xl font-semibold mb-2">Actualité introuvable</h1>
        <p className="text-sm text-gray-600">
          Cette actualité n’existe pas ou a été supprimée.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-marialLight/40">
      <div className="max-w-3xl mx-auto px-4">

        {/* HEADER */}
        <header className="mb-10 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-3">
            Actualité
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-nuit mb-4 leading-tight">
            {actu.titre}
          </h1>

          <p className="text-sm text-nuit/60">
            {new Date(actu.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </header>

        {/* IMAGE HÉRO */}
      {/* IMAGE */}
{actu.image && (
  <div className="mb-8 overflow-hidden rounded-2xl shadow-xl shadow-marial/20">
    <img
      src={actu.image}
      alt={actu.titre}
      className="w-full h-auto object-contain"
    />
  </div>
)}
        {/* CONTENU */}
        <article className="bg-[#fdfbf7] border border-marial/20 rounded-2xl p-8 shadow-lg shadow-marial/10">
          <div className="prose prose-invert prose-sm md:prose-base text-nuit max-w-none whitespace-pre-line leading-relaxed">
            {actu.contenu}
          </div>
        </article>

        {/* RETOUR */}
        <div className="text-center mt-10">
          <a
            href="/actualites"
            className="inline-block text-sm font-semibold text-marialDark hover:text-marial transition-colors"
          >
            ← Retour aux actualités
          </a>
        </div>

      </div>
    </div>
  );
}
