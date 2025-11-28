// app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-nuit text-fond py-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">

        {/* Logo / Nom du site */}
        <Link href="/" className="text-lg font-semibold">
          UP Gilly – Ransart – Hamendes
        </Link>

        {/* Menu */}
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-orlit">Accueil</Link>
          <Link href="/horaires" className="hover:text-orlit">Horaires</Link>
          <Link href="/actualites" className="hover:text-orlit">Actualités</Link>
          <Link href="/sacrements" className="hover:text-orlit">Sacrements</Link>
          <Link href="/contact" className="hover:text-orlit">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
