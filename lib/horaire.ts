// lib/horaires.ts

export type MesseCategorie = "Dominicale" | "Semaine";

export interface Messe {
  id: string;
  jour: string;       // ex : "Dimanche"
  heure: string;      // ex : "10h30"
  categorie: MesseCategorie;
  remarque?: string;  // ex : "Messe des familles"
}

export interface Eglise {
  id: string;
  nom: string;
  lieu?: string;      // quartier / village si tu veux
  messes: Messe[];
}

export const eglises: Eglise[] = [
  {
    id: "ste-barbe",
    nom: "Sainte-Barbe",
    lieu: "…",
    messes: [
      {
        id: "sb-dim-10h30",
        jour: "Dimanche",
        heure: "10h30",
        categorie: "Dominicale",
        remarque: "Messe principale",
      },
      {
        id: "sb-mer-18h",
        jour: "Mercredi",
        heure: "18h00",
        categorie: "Semaine",
      },
    ],
  },
  {
    id: "st-martin",
    nom: "Saint-Martin",
    lieu: "…",
    messes: [
      {
        id: "sm-sam-18h",
        jour: "Samedi",
        heure: "18h00",
        categorie: "Dominicale",
        remarque: "Messe anticipée",
      },
      {
        id: "sm-jeu-9h",
        jour: "Jeudi",
        heure: "09h00",
        categorie: "Semaine",
      },
    ],
  },
  {
    id: "st-joseph",
    nom: "Saint-Joseph",
    lieu: "…",
    messes: [
      {
        id: "sj-dim-9h",
        jour: "Dimanche",
        heure: "09h00",
        categorie: "Dominicale",
      },
    ],
  },
  {
    id: "nd",
    nom: "Notre-Dame",
    lieu: "…",
    messes: [
      {
        id: "nd-dim-11h45",
        jour: "Dimanche",
        heure: "11h45",
        categorie: "Dominicale",
      },
    ],
  },
  {
    id: "christ-roi",
    nom: "Christ-Roi",
    lieu: "…",
    messes: [
      {
        id: "cr-sam-17h",
        jour: "Samedi",
        heure: "17h00",
        categorie: "Dominicale",
      },
    ],
  },
  {
    id: "sacre-coeur",
    nom: "Sacré-Cœur",
    lieu: "…",
    messes: [
      {
        id: "sc-dim-8h",
        jour: "Dimanche",
        heure: "08h00",
        categorie: "Dominicale",
      },
    ],
  },
  {
    id: "st-pierre",
    nom: "Saint-Pierre",
    lieu: "…",
    messes: [
      {
        id: "sp-ven-18h30",
        jour: "Vendredi",
        heure: "18h30",
        categorie: "Semaine",
      },
    ],
  },
  {
    id: "st-antoine",
    nom: "Saint-Antoine",
    lieu: "…",
    messes: [
      {
        id: "sa-mardi-18h",
        jour: "Mardi",
        heure: "18h00",
        categorie: "Semaine",
      },
    ],
  },
];
