"use client";

import { useState, useEffect } from "react";

export default function AdminSacrementsPage() {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/sacrements/get", { cache: "no-store" });
      const json = await res.json();
      setData(json);
    }
    fetchData();
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

  if (!data) {
    return <div className="p-10">Chargement…</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-4">Contacts des sacrements</h1>
      <p className="text-gray-400 mb-6">
        Modifiez ici les contacts affichés sur la page publique "Sacrements".
      </p>

      <div className="space-y-8">
        {Object.keys(data).map((key) => (
          <div key={key} className="bg-black/20 p-6 rounded-xl border border-orlit/20">
            <h2 className="text-xl font-semibold mb-4 capitalize">
              {key.replace("-", " ")}
            </h2>

            <div className="space-y-3">
              
              <div>
                <label className="text-sm text-gray-300">Personne</label>
                <input
                  type="text"
                  className="w-full bg-black/40 border border-orlit/30 rounded-lg p-2 text-fond"
                  value={data[key].personne || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      [key]: { ...data[key], personne: e.target.value },
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Téléphone</label>
                <input
                  type="text"
                  className="w-full bg-black/40 border border-orlit/30 rounded-lg p-2 text-fond"
                  value={data[key].telephone || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      [key]: { ...data[key], telephone: e.target.value },
                    })
                  }
                />
              </div>

              <div>
                <label className="text-sm text-gray-300">Email</label>
                <input
                  type="email"
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
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-8 bg-orlit text-nuit px-5 py-2 rounded-lg font-semibold shadow hover:bg-orlit/80 transition"
      >
        Sauvegarder les modifications
      </button>

      {status === "saving" && (
        <p className="text-blue-400 mt-3">Sauvegarde…</p>
      )}
      {status === "done" && (
        <p className="text-green-400 mt-3">Enregistré !</p>
      )}
      {status === "error" && (
        <p className="text-red-400 mt-3">Erreur lors de l’enregistrement.</p>
      )}
    </div>
  );
}
