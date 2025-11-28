import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Unité pastorale Gilly - Ransart - Hamendes",
  description:
    "Horaires des messes, actualités, sacrements et informations de l'unité pastorale.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-fond text-nuit">
        {children}
      </body>
    </html>
  );
}
