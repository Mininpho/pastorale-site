"use client";

import { useState } from "react";
import Image from "next/image";

export default function SacrementCard({ item, contact }: any) {
  const [open, setOpen] = useState(false);

  const titre = item.titre || "Titre non renseigné";
  const description = item.description || "Description non renseignée.";
  const texteBiblique = item.texteBiblique || "";
  const referenceCEC = item.referenceCEC || "";

  return (
    <article
      className="
        bg-[#fdfbf7] rounded-2xl border border-marial/20
        shadow-lg shadow-marial/10 p-5 flex flex-col
        transition-all duration-200 hover:shadow-xl hover:scale-[1.01]
      "
    >
      {/* IMAGE */}
      <div className="rounded-2xl overflow-hidden mb-4 h-36 relative bg-white shadow-sm">
        <Image
          src={item.image}
          alt={titre}
          fill
          className="object-contain p-3"
        />
      </div>

      {/* TITRE */}
      <h2 className="text-lg font-semibold text-nuit mb-1">
        {titre}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-nuit/70 mb-3">
        {description}
      </p>

      {/* BOUTON ACCORDÉON */}
      {texteBiblique && (
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={`content-${item.id}`}
          className="
            text-xs text-marial font-semibold flex items-center gap-1
            hover:text-marial/70 transition mb-2 select-none
          "
        >
          <span>{open ? "Fermer" : "En savoir plus"}</span>
          <span
            className={`transform transition-transform ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      )}

      {/* CONTENU EXTENSIBLE */}
      <div
        id={`content-${item.id}`}
        className={`
          overflow-hidden transition-all duration-300
          ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <div className="text-sm text-nuit/70 border-t border-marial/20 pt-3">
          <p className="mb-2 whitespace-pre-line">{texteBiblique}</p>

          {referenceCEC && (
            <p className="mt-3 text-xs text-marial/80 italic">
              Référence : {referenceCEC}
            </p>
          )}
        </div>
      </div>

      {/* CONTACT */}
      <div className="mt-auto text-sm space-y-1 pt-3">
        {contact ? (
          <>
            {contact.personne && (
              <p className="text-nuit/80">
                <strong>Contact :</strong> {contact.personne}
              </p>
            )}
            {contact.telephone && (
              <p className="text-nuit/80">{contact.telephone}</p>
            )}
            {contact.email && (
              <p className="text-nuit/80">{contact.email}</p>
            )}
          </>
        ) : (
          <p className="text-nuit/60 text-sm">Aucun contact renseigné.</p>
        )}
      </div>
    </article>
  );
}
