# MIJOTÉ — Application de recettes de cuisine

Application web responsive de consultation de recettes et de gestion de liste de courses réalisée en **React 19**, **TypeScript** (mode strict) et **Vite**, sans aucun framework CSS ni bibliothèque UI tierce (style écrit à la main). Les données proviennent de l'API REST publique **DummyJSON**.

> Rendu du TP « Application de recettes en React et TypeScript », EFREI 2026, module Développement d’interfaces avec un framework JavaScript.

---

## 1. Présentation du projet

| Route | Écran | Description |
|---|---|---|
| `/` | **Écran A & G** | **Catalogue** : recherche par nom avec debounce (400 ms), filtre par type de repas (insensible à la casse), tri dynamique et affichage du nombre de résultats. |
| `/recettes/:id` | **Écran B** | **Fiche recette** : affichage détaillé (note, temps, portions, difficulté, liste d'ingrédients `<ul>` et instructions `<ol>`) + ajout à la liste de courses. |
| `/courses` | **Écran C** | **Ma liste de courses** : gestion par recette, coche/décoche des ingrédients (texte barré), suppression par recette et vidage complet. |
| `/connexion` | **Écran D** | **Connexion** : formulaire contrôlé d'authentification avec compte de test (`emilys` / `emilyspass`) et gestion des erreurs. |
| `/proposer` | **Écran E** | **Proposer une recette** : route protégée (`ProtectedRoute`), formulaire contrôlé avec validation pure `validate()` avant envoi. |
| `*` | **Écran F** | **Page 404** : page de repli pour les routes inconnues ou identifiants de recettes inexistants (404). |

---

## 2. Prérequis & Installation

### Prérequis
- **Node.js** v24+ (ou v18 minimum)
- Gestionnaire de paquets : **npm**

### Commandes de démarrage
```bash
# 1. Cloner le dépôt et accéder au dossier
git clone <URL_DU_DEPOT>
cd mijote

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement local
npm run dev

# Validation du typage TypeScript strict et création du build de production
npm run build

# Prévisualisation du build de production
npm run preview

VITE_API_BASE_URL=[https://dummyjson.com](https://dummyjson.com)

mijote/
├── docs/                      # Captures d'écran des écrans A à G (Mobile + Bureau)
├── src/
│   ├── components/            # Layout, Header, RecipeCard, ProtectedRoute, StateView (Loader, ErrorMessage, EmptyState)
│   ├── context/               # ShoppingListContext (découplé) et AuthContext
│   ├── hooks/                 # useFetch, useDebounce, useLocalStorage
│   ├── pages/                 # CatalogPage, RecipePage, ShoppingListPage, LoginPage, NewRecipePage, NotFoundPage
│   ├── services/              # Service API centralisé (api.ts)
│   ├── types/                 # Interfaces et types TypeScript du domaine (index.ts)
│   ├── utils/                 # Fonction pure de validation validate()
│   ├── App.tsx                # Déclaration des routes (React Router)
│   ├── index.css              # Style responsive sur-mesure (sans framework CSS)
│   └── main.tsx               # Point d'entrée avec BrowserRouter
├── .env                       # Variables d'environnement versionnées
├── package.json
└── README.md

5. Choix techniques, Performance & Robustesse
Stockage de l'authentification :
Le jeton JWT et l'utilisateur sont conservés dans le localStorage (mijote_auth_user). Ce choix permet de maintenir la session de l'utilisateur active s'il rafraîchit la page tout en cuisinant.

Découplage du ShoppingListContext (Optimisation Profiler) :
Pour éviter que le Header ne subisse des re-rendus inutiles lorsqu'un utilisateur coche un ingrédient dans la page /courses, le contexte a été découpé :

useShoppingListState : consommé par la page des courses.

useShoppingListActions : gère les fonctions d'action (toggleItem, removeRecipe, etc.).

useShoppingListCount : consommé par le Header (lit uniquement la taille du tableau de recettes).

Mémoïsation :
Le composant RecipeCard est mémoïsé via React.memo pour optimiser le rendu lors du filtrage en mémoire dans la page catalogue.

6. Limites connues
Simulation de création : L'endpoint POST /recipes/add de DummyJSON simule la création en retournant un identifiant (ex: 51), mais n'enregistre pas réellement la recette sur les serveurs de l'API.

Langue du contenu : L'interface utilisateur est entièrement rédigée en français, tandis que le contenu des recettes (titres, ingrédients, étapes) reste en anglais comme transmis par DummyJSON.

7. Utilisation de l'IA Générative
L'utilisation d'assistants IA (Gemini / Claude) a été effectuée dans une démarche de transparence et d'apprentissage :

Fournisseur et modèles : Google Gemini / Anthropic Claude 3.5.

Motifs de l'utilisation :

Atteindre la meilleure version architecturale : Structuration propre de l'arborescence TypeScript et mise en place du découplage fin des contextes React (ShoppingListContext) pour éviter les re-rendus inutiles du Header.

Pallier aux bugs rencontrés :

Résolution des erreurs de parsing lors de la configuration du fichier main.tsx avec les extensions React/TypeScript.

Correction d'un bug de filtrage par type de repas (TypeError: cannot read property of undefined) en sécurisant les accès aux propriétés du tableau mealType (Array.isArray() et chaînage optionnel ?.).

Prompts soumis :

"Comment découper mon ShoppingListContext pour que le Header ne se re-rende pas quand je coche un ingrédient ?"

"Propose la correction d'une erreur de filtre JavaScript .some() sur les données de DummyJSON."

Adaptations apportées : Le code généré a été revu, testé, nettoyé de toute dépendance inutile dans package.json et ajusté pour respecter scrupuleusement les consignes et wireframes du sujet.
