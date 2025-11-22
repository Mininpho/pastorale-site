"use client";

import { useState, useEffect } from "react";

export default function AdminContactPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Charger les données
  useEffect(() => {
    async function load() {
      const res = await fetch("/api/contact/get", { cache: "no-store" });
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    load();
  }, []);

  // Handler générique pour modifier un champ
  function handleChange(path: string[], value: any) {
    setData((prev: any) => {
      const copy = { ...prev };
      let obj = copy;
      for (let i = 0; i < path.length - 1; i++) {
        obj = obj[path[i]];
      }
      obj[path[path.length - 1]] = value;
      return copy;
    });
  }

  // Handler pour prêtres (liste)
  function handlePretreChange(index: number, field: string, value: string) {
    setData((prev: any) => {
      const newData = { ...prev };
      newData.pretres[index][field] = value;
      return newData;
    });
  }

  async function save() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/contact/update", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setSaving(false);

    if (res.ok) {
      setMessage("Modifications enregistrées !");
    } else {
      setMessage("Erreur lors de l’enregistrement…");
    }

    setTimeout(() => setMessage(""), 3000);
  }

  if (loading) {
    return <div className="p-10 text-gray-300">Chargement…</div>;
  }

  const input =
    "w-full p-2 rounded bg-black/20 border border-orlit/30 text-fond placeholder-gray-400";

  const sectionBox =
    "bg-black/20 p-5 rounded-xl border border-orlit/20 mb-6 shadow";

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Contacts – Administration</h1>

      {/* CONTACT GÉNÉRAL */}
      <div className={sectionBox}>
        <h2 className="text-lg font-semibold mb-3">Contact général</h2>

        <label className="block text-sm mb-1">Responsable</label>
        <input
          className={input}
          value={data.general.responsable}
          onChange={(e) =>
            handleChange(["general", "responsable"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Adresse</label>
        <input
          className={input}
          value={data.general.adresse}
          onChange={(e) =>
            handleChange(["general", "adresse"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Téléphone</label>
        <input
          className={input}
          value={data.general.telephone}
          onChange={(e) =>
            handleChange(["general", "telephone"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Email</label>
        <input
          className={input}
          value={data.general.email}
          onChange={(e) =>
            handleChange(["general", "email"], e.target.value)
          }
        />
      </div>

      {/* PRÊTRES */}
      <div className={sectionBox}>
        <h2 className="text-lg font-semibold mb-3">Prêtres de l’unité</h2>

        {data.pretres.map((p: any, i: number) => (
          <div key={i} className="mb-5 p-3 rounded bg-black/10 border border-orlit/10">
            <h3 className="font-semibold text-orlit mb-2">{p.nom}</h3>

            <label className="block text-sm mb-1">Nom</label>
            <input
              className={input}
              value={p.nom}
              onChange={(e) =>
                handlePretreChange(i, "nom", e.target.value)
              }
            />

            <label className="block text-sm mt-3 mb-1">Téléphone</label>
            <input
              className={input}
              value={p.telephone}
              onChange={(e) =>
                handlePretreChange(i, "telephone", e.target.value)
              }
            />

            <label className="block text-sm mt-3 mb-1">Email</label>
            <input
              className={input}
              value={p.email}
              onChange={(e) =>
                handlePretreChange(i, "email", e.target.value)
              }
            />

            <label className="block text-sm mt-3 mb-1">Adresse</label>
            <input
              className={input}
              value={p.adresse}
              onChange={(e) =>
                handlePretreChange(i, "adresse", e.target.value)
              }
            />
          </div>
        ))}
      </div>

      {/* ANIMATRICE */}
      <div className={sectionBox}>
        <h2 className="text-lg font-semibold mb-3">Animatrice en pastorale</h2>

        <label className="block text-sm mb-1">Nom</label>
        <input
          className={input}
          value={data.animatrice.nom}
          onChange={(e) =>
            handleChange(["animatrice", "nom"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Téléphone</label>
        <input
          className={input}
          value={data.animatrice.telephone}
          onChange={(e) =>
            handleChange(["animatrice", "telephone"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Email</label>
        <input
          className={input}
          value={data.animatrice.email}
          onChange={(e) =>
            handleChange(["animatrice", "email"], e.target.value)
          }
        />
      </div>

      {/* SECRETARIAT */}
      <div className={sectionBox}>
        <h2 className="text-lg font-semibold mb-3">Permanences & secrétariat</h2>

        <label className="block text-sm mb-1">Adresse</label>
        <input
          className={input}
          value={data.secretariat.adresse}
          onChange={(e) =>
            handleChange(["secretariat", "adresse"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Téléphone</label>
        <input
          className={input}
          value={data.secretariat.telephone}
          onChange={(e) =>
            handleChange(["secretariat", "telephone"], e.target.value)
          }
        />

        <label className="block text-sm mt-3 mb-1">Email</label>
        <input
          className={input}
          value={data.secretariat.email}
          onChange={(e) =>
            handleChange(["secretariat", "email"], e.target.value)
          }
        />

        <label className="block text-sm mt-4 mb-1">
          Horaires (un par ligne)
        </label>
        <textarea
          className={input}
          rows={3}
          value={data.secretariat.horaires.join("\n")}
          onChange={(e) =>
            handleChange(
              ["secretariat", "horaires"],
              e.target.value.split("\n")
            )
          }
        />
      </div>

      {/* CONTACT FUNERAILLES */}
      <div className={sectionBox}>
        <h2 className="text-lg font-semibold mb-3">Contact funérailles</h2>

        <label className="block text-sm mb-1">Téléphone</label>
        <input
          className={input}
          value={data.funerailles.telephone}
          onChange={(e) =>
            handleChange(["funerailles", "telephone"], e.target.value)
          }
        />
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="bg-orlit text-nuit font-semibold px-6 py-3 rounded shadow hover:bg-orlit/80 transition"
      >
        {saving ? "Enregistrement…" : "Enregistrer les modifications"}
      </button>

      {message && (
        <p className="mt-3 text-orlit font-medium">{message}</p>
      )}
    </div>
  );
}
