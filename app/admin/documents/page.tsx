"use client";

import { useEffect, useState } from "react";

export default function DocumentsAdminPage() {
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadDocs() {
    const res = await fetch("/api/documents/get");
    const data = await res.json();
    setDocs(data);
    setLoading(false);
  }

  useEffect(() => {
    loadDocs();
  }, []);

  async function deleteDoc(id: string) {
    if (!confirm("Supprimer ce document ?")) return;

    const res = await fetch("/api/documents/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setMessage("Document supprimé !");
      loadDocs();
    } else {
      setMessage("Erreur lors de la suppression");
    }
  }

  return (
    <div className="p-10 max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold mb-4">Gestion des documents</h1>

      <a
        href="/admin/documents/new"
        className="inline-block bg-orlit text-nuit font-semibold px-4 py-2 rounded shadow"
      >
        ➕ Ajouter un document
      </a>

      {message && <p className="text-sm text-orlit">{message}</p>}

      {loading ? (
        <p className="text-gray-400">Chargement…</p>
      ) : docs.length === 0 ? (
        <p className="text-gray-500">Aucun document.</p>
      ) : (
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc.id}
              className="border border-orlit/30 bg-black/10 rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-fond">{doc.titre}</p>
                <p className="text-xs text-gray-400">{doc.description}</p>
                <p className="text-xs mt-1 text-orlit">
                  Catégorie : {doc.categorie}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={doc.url}
                  target="_blank"
                  className="text-sm text-orlit underline"
                >
                  Voir
                </a>

                <button
                  onClick={() => deleteDoc(doc.id)}
                  className="text-sm text-red-400 hover:text-red-500"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
