"use client";

import { useState, useEffect } from "react";

export default function AdminSacrementsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // Charger données depuis /api/sacrements/get
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/sacrements/get", { cache: "no-store" });
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Erreur chargement sacrements admin:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setStatus("saving");

    const res = await fetch("/api/sacrements/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("done");
      setTimeout(() => setStatus(""), 2000);
    } else {
      setStatus("error");
    }
  }

  if (loading) {
    return <div className="p-10 text-gray-300">Chargement…</div>;
  }

  if (!data) {
    return <div className="p-10 text-red-400">Erreur de chargement.</div>;
  }

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-6">Contacts des sacrements</h1>

      <div className="space-y-8">
        {Object.keys(data).map((key) => (
          <div
            key={key}
            className="bg-black/20 p-6 rounded-xl border border-orlit/20"
          >
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {key.replace("-", " ")}
            </h2>

            {/* PERSONNE */}
            <label className="text-sm text-gray-300">Personne</label>
            <input
              className="w-full bg-black/40 border border-orlit/30 rounded-lg p-2 text-fond mb-4"
              value={data[key].personne || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [key]: { ...data[key], personne: e.target.value },
                })
              }
            />

            {/* TELEPHONE */}
            <label className="text-sm text-gray-300">Téléphone</label>
            <input
              className="w-full bg-black/40 border border-orlit/30 rounded-lg p-2 text-fond mb-4"
              value={data[key].telephone || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [key]: { ...data[key], telephone: e.target.value },
                })
              }
            />

            {/* EMAIL */}
            <label className="text-sm text-gray-300">Email</label>
            <input
              className="w-full bg-black/40 border border-orlit/30 rounded-lg p-2 text-fond"
              value={data[key].email || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  [key]: { ...data[key], email: e.target.value },
                })
              }
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-8 bg-orlit text-nuit px-5 py-2 rounded-lg font-semibold shadow hover:bg-orlit/80 transition"
      >
        Sauvegarder
      </button>

      {status === "saving" && <p className="mt-3 text-blue-400">Sauvegarde…</p>}
      {status === "done" && <p className="mt-3 text-green-400">Enregistré !</p>}
      {status === "error" && (
        <p className="mt-3 text-red-400">Erreur lors de l’enregistrement</p>
      )}
    </div>
  );
}
