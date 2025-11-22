"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterDocumentPage() {
  const router = useRouter();

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("informations");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let url = "";

      // 1️⃣ Upload vers Cloudinary
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const upload = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploaded = await upload.json();

        if (!upload.ok) throw new Error(uploaded.error);

        url = uploaded.url;
      }

      // 2️⃣ Enregistrer dans le JSON
      const save = await fetch("/api/documents/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre,
          description,
          categorie,
          url,
        }),
      });

      if (!save.ok) throw new Error("Erreur enregistrement JSON");

      router.push("/admin/documents");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  const input = "w-full p-2 bg-black/20 text-fond border border-orlit/30 rounded";

  return (
    <div className="p-10 max-w-xl space-y-6">
      <h1 className="text-2xl font-semibold">Ajouter un document</h1>

      {message && <p className="text-sm text-orlit">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-sm">Titre</label>
          <input className={input} value={titre} onChange={(e) => setTitre(e.target.value)} required />
        </div>

        <div>
          <label className="text-sm">Description</label>
          <input className={input} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label className="text-sm">Catégorie</label>
          <select className={input} value={categorie} onChange={(e) => setCategorie(e.target.value)}>
            <option value="informations">Informations générales</option>
            <option value="horaires">Horaires & célébrations</option>
            <option value="sacrements">Sacrements</option>
            <option value="jeunesse">Jeunesse / Catéchèse</option>
            <option value="administratif">Documents administratifs</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Fichier PDF</label>
          <input
            type="file"
            accept="application/pdf"
            className={input}
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orlit text-nuit px-4 py-2 font-semibold rounded"
        >
          {loading ? "Envoi…" : "Enregistrer"}
        </button>

      </form>
    </div>
  );
}
