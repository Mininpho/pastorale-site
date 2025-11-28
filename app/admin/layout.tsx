import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Vérification correcte de la session
  const session = cookies().get("admin_auth");

  if (!session || session.value !== "true") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-nuit text-fond flex">
      <aside className="w-56 border-r border-orlit/30 bg-black/30">
        <div className="px-4 py-4 border-b border-orlit/30">
          <div className="text-[10px] uppercase tracking-[0.25em] text-orlit">
            Admin
          </div>
          <div className="text-sm font-semibold">Unité pastorale</div>
        </div>

        <nav className="px-3 py-4 text-sm space-y-1">

          <a href="/admin" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Tableau de bord
          </a>

          <a href="/admin/actualites" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Gérer les actualités
          </a>

          <a href="/admin/actualites/new" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Ajouter une actualité
          </a>

          <a href="/admin/messes" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Mettre à jour les messes
          </a>

          <a href="/admin/sacrements" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Contacts des sacrements
          </a>

          <a href="/admin/documents" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Gerer les documents
          </a>

          <a href="/admin/contact" className="block px-3 py-2 rounded-lg hover:bg-white/10">
            Contacts (page publique)
          </a>

        </nav>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
