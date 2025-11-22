// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErreur("");

    // Appelle l’API de login
    const res = await fetch("/api/login", {
  method: "POST",
  cache: "no-store",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});

    if (res.ok) {
      router.push("/admin");
    } else {
      setErreur("Identifiants incorrects");
    }
  }

  return (
    <div className="max-w-sm mx-auto py-20 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Connexion équipe pastorale
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg p-2"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border rounded-lg p-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        {erreur && <p className="text-red-600 text-sm">{erreur}</p>}

        <button
          type="submit"
          className="w-full bg-orlit text-nuit py-2 rounded-lg font-semibold"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
