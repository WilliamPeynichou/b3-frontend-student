# Réponses — exercices React

1. **Props / clés** : les props transmettent des données d'un parent à un enfant (`BookCard` reçoit `book`). Les clés stables (`book.id`) permettent à React d'identifier chaque élément de la liste quand elle change, au lieu de tout recréer ou de mélanger les éléments.
2. **`useState`** : une variable ordinaire ne déclenche pas de nouveau rendu, donc l'écran ne change pas. On sépare `search` (ce qu'on tape) de `query` (la recherche validée) pour ne lancer l'appel API qu'à la soumission.
3. **`useRef`** : l'état sert à ce qui s'affiche ; la référence donne un accès direct à l'élément du DOM (ici `focus()`) sans provoquer de rendu.
4. **`useEffect`** : un appel `fetch` pendant le rendu serait relancé à chaque rendu et provoquerait des boucles. Avec `search` comme dépendance, une requête partirait à chaque lettre tapée.
5. **`Link`** : un lien HTML recharge toute la page ; `Link` change l'URL et affiche l'autre page sans rechargement, donc sans perdre l'état (ex. les favoris).
6. **Fiche et URL** : l'utilisateur peut ouvrir ou partager l'URL directement ; la fiche doit donc retrouver son livre avec l'`id` de l'URL.
7. **Contexte** : sans contexte, il faudrait passer `favorites` et `toggleFavorite` par les props à travers `App`, `Header` et `Book`. Le provider possède l'état et le partage ; `useContext` le lit dans un composant.

## Lancer

1. Copier `.env.example` en `.env.local` et y mettre la clé fournie en cours.
2. `npm install`, puis `npm run dev`.

## Quand utiliser quel hook

- **`useState`** : une donnée qui change et qui doit mettre l'écran à jour (texte du champ, liste de livres, chargement, erreur).
- **`useEffect`** : une action qui sort du rendu, comme un appel réseau, un abonnement ou la sauvegarde dans `localStorage`. Elle se relance quand ses dépendances changent, et son nettoyage évite les résultats périmés.
- **`useRef`** : garder une valeur ou atteindre un élément du DOM (focus du champ) sans relancer le rendu.
- **`useContext`** : lire une donnée partagée par toute l'application (les favoris) sans la passer par les props.
