// lib/actualites.ts

import fs from "fs";
import path from "path";

export interface Actualite {
  id: string;
  titre: string;
  extrait: string;
  contenu: string;
  date: string;
  image?: string;
}

// Chemin vers le fichier JSON
const filePath = path.join(process.cwd(), "lib", "actualites.json");

// Fonction pour lire toutes les actualités
export function getActualites(): Actualite[] {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

// Fonction pour ajouter une actualité
export function addActualite(newActu: Actualite) {
  const actualites = getActualites();
  actualites.unshift(newActu); // Ajout en haut de la liste (plus récent en premier)
  fs.writeFileSync(filePath, JSON.stringify(actualites, null, 2), "utf8");
}
