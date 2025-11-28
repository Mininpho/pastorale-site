// app/(public)/sacrements/page.tsx
import { db } from "@/lib/db";
import { sacrements } from "@/lib/schema.sacrements";
import SacrementCard from "./SacrementCard";

export const dynamic = "force-dynamic";

export default async function SacrementsPage() {
  // 📌 Lecture SQL complète (titre, description, texte biblique, CEC, contacts)
  const sacrementsDB = await db.select().from(sacrements);

  // 📌 Transformer tableau SQL → { bapteme: {...}, mariage: {...} }
  const sacMap: Record<string, any> = {};
  sacrementsDB.forEach((s) => {
    sacMap[s.id] = s;
  });

  // 📌 Liste statique (UNIQUEMENT images + id)
  const items = [
    { id: "bapteme", image: "/images/sacrements/bapteme.png" },
    { id: "premiere-communion", image: "/images/sacrements/premiere-communion.png" },
    { id: "confirmation", image: "/images/sacrements/confirmation.png" },
    { id: "mariage", image: "/images/sacrements/mariage.png" },
    { id: "reconciliation", image: "/images/sacrements/reconciliation.png" },
    { id: "malades", image: "/images/sacrements/onction-malades.png" },
    { id: "funerailles", image: "/images/sacrements/funerailles.png" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-2">
          Les sacrements
        </p>

        <h1 className="text-2xl md:text-3xl font-semibold text-nuit mb-3">
          Vivre et célébrer la foi
        </h1>

        <p className="text-sm text-nuit/70 max-w-2xl mx-auto">
          Retrouvez ici les informations essentielles concernant les sept sacrements
          et les personnes à contacter pour toute demande ou préparation.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const data = sacMap[item.id]; // 🔥 Données SQL dynamiques

          return (
            <SacrementCard
              key={item.id}
              item={{
                id: item.id,
                image: item.image,

                // 🔥 Les champs dynamiques viennent de la DB !
                titre: data?.titre || "",
                description: data?.description || "",
                texteBiblique: data?.texteBiblique || "",
                referenceCEC: data?.referenceCEC || "",
              }}
              contact={data}
            />
          );
        })}
      </section>
    </div>
  );
}
