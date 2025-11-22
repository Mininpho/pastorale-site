// app/(public)/contact/page.tsx
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  const filePath = path.join(process.cwd(), "lib", "contact.json");
  const contact = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // ---- COMPONENTS ----------------------------------------------------------

  // Generic card container
  const Card = ({ title, children }: any) => (
    <section className="bg-[#fdfbf7] border border-marial/20 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-marial/80">
          {/* tiny minimalistic cross icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path d="M12 3v18M5 12h14" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
        <h2 className="text-xl font-semibold text-nuit">{title}</h2>
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );

  // Single line with icon
  const Line = ({ icon, label, value }: any) =>
    value ? (
      <p className="text-[15px] text-nuit flex items-center gap-2">
        <span className="w-5 h-5 text-marial">{icon}</span>
        <strong className="mr-1">{label} :</strong> {value}
      </p>
    ) : null;

  // ---- ICONS --------------------------------------------------------------

  const IconMail = (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor">
      <path d="M4 6h16v12H4z" strokeWidth="1.4" />
      <path d="M4 6l8 6 8-6" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );

  const IconPhone = (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor">
      <path
        d="M6 3l4 2-2 3s1.5 3 4 5 5 4 5 4l3-2 2 4s-3 3-6 3-12-9-12-12 3-7 3-7z"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );

  const IconHome = (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor">
      <path d="M3 11l9-7 9 7v9H3z" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 20v-5h4v5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );

  // ---- PAGE ---------------------------------------------------------------

  return (
    <div className="min-h-screen bg-marialLight/70 py-14">
      <div className="max-w-5xl mx-auto px-4 space-y-12">

        {/* HEADER */}
        <header className="text-center mb-8">
          <p className="text-[11px] tracking-[0.3em] uppercase text-marial mb-2">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-nuit mb-4">
            Nous contacter & permanences
          </h1>
          <p className="text-[15px] text-gray-700 max-w-xl mx-auto leading-relaxed">
            Retrouvez ici toutes les coordonnées officielles de l’unité pastorale,
            mises à jour directement par l’équipe.
          </p>
        </header>

        {/* CONTACT GENERAL */}
        <Card title="Contact général">
          <Line icon={IconMail} label="Email" value={contact.general.email} />
          <Line icon={IconHome} label="Adresse" value={contact.general.adresse} />
          <Line icon={IconPhone} label="Tél" value={contact.general.telephone} />

          <p className="text-[15px] text-nuit mt-3">
            <strong className="text-nuit/90">Responsable :</strong>{" "}
            {contact.general.responsable}
          </p>
        </Card>

        {/* PRÊTRES */}
        <Card title="Prêtres de l’unité pastorale">
          <div className="space-y-4 text-[15px] text-nuit">
            {contact.pretres.map((p: any, i: number) => (
              <div
                key={i}
                className="p-4 bg-white/70 rounded-xl border border-marial/20 shadow-sm hover:shadow-md transition-all"
              >
                <p className="font-semibold text-nuit mb-1">{p.nom}</p>
                <Line icon={IconPhone} label="GSM" value={p.telephone} />
                <Line icon={IconMail} label="Email" value={p.email} />
                <Line icon={IconHome} label="Adresse" value={p.adresse} />
              </div>
            ))}
          </div>
        </Card>

        {/* ANIMATRICE */}
        <Card title="Animatrice en pastorale">
          <p className="text-[15px] font-semibold text-nuit">
            {contact.animatrice.nom}
          </p>
          <Line icon={IconPhone} label="GSM" value={contact.animatrice.telephone} />
          <Line icon={IconMail} label="Email" value={contact.animatrice.email} />
        </Card>

        {/* SECRETARIAT */}
        <Card title="Permanences & secrétariat">
          <Line icon={IconHome} label="Adresse" value={contact.secretariat.adresse} />
          <Line icon={IconPhone} label="Tél" value={contact.secretariat.telephone} />
          <Line icon={IconMail} label="Email" value={contact.secretariat.email} />

          <div className="mt-5">
            <p className="text-[15px] font-semibold text-nuit mb-2">Permanences :</p>
            {contact.secretariat.horaires.map((h: string, index: number) => (
              <p key={index} className="text-sm text-gray-700">
                • {h}
              </p>
            ))}
          </div>
        </Card>

        {/* FUNÉRAILLES */}
        <Card title="Contact funérailles">
          <Line icon={IconPhone} label="GSM" value={contact.funerailles.telephone} />
        </Card>

      </div>
    </div>
  );
}
