"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AjouterActualitePage() {
  const router = useRouter();

  const [titre, setTitre] = useState("");
  const [extrait, setExtrait] = useState("");
  const [contenu, setContenu] = useState("");
  const [categorie, setCategorie] = useState("annonce"); // 🌟 Nouveau
  const [image, setImage] = useState<File | null>(null);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // 1️⃣ Upload image → Cloudinary
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadJson = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadJson.error || "Erreur upload image");
        }

        imageUrl = uploadJson.url;
      }

      // 2️⃣ Envoi final vers API JSON
      const saveRes = await fetch("/api/actualites/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre,
          extrait,
          contenu,
          categorie, // 🌟 Ajout ici
          image: imageUrl,
        }),
      });

      if (!saveRes.ok) {
        throw new Error("Erreur lors de l’enregistrement");
      }

      router.push("/admin/actualites");

    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle =
    "w-full p-2 border border-orlit/30 rounded bg-black/20 text-fond placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orlit/50";

  return (
    <div className="p-10 space-y-6 max-w-xl">
      <h1 className="text-2xl font-semibold">Ajouter une actualité</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITRE */}
        <div>
          <label className="block text-sm mb-1">Titre</label>
          <input
            className={inputStyle}
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>

        {/* EXTRAIT */}
        <div>
          <label className="block text-sm mb-1">Extrait</label>
          <textarea
            className={inputStyle}
            rows={2}
            value={extrait}
            onChange={(e) => setExtrait(e.target.value)}
            required
          />
        </div>

        {/* CONTENU */}
        <div>
          <label className="block text-sm mb-1">Contenu complet</label>
          <textarea
            className={inputStyle}
            rows={6}
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            required
          />
        </div>

        {/* 🌟 CATEGORIE */}
        <div>
          <label className="block text-sm mb-1">Catégorie</label>

          <select
            className={inputStyle}
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="annonce">Annonce</option>
            <option value="evenement">Événement</option>
            <option value="liturgie">Liturgie</option>
          </select>
        </div>

        {/* IMAGE */}
        <div>
          <label className="block text-sm mb-1">Image de l’actualité</label>
          <input
            type="file"
            accept="image/*"
            className={inputStyle}
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orlit px-4 py-2 text-nuit font-semibold rounded"
        >
          {loading ? "Publication..." : "Enregistrer"}
        </button>
      </form>

      {message && <p className="text-sm text-orlit">{message}</p>}
    </div>
  );
}
