# Kebab 37 — Site web

Site vitrine multipage pour un restaurant kebab artisanal (inspiré de kebab37.com).
HTML / CSS / JavaScript vanilla. Aucune dépendance, aucun build : ouvrez `index.html`
ou servez le dossier avec n'importe quel serveur statique.

## Pages

- `index.html` — Accueil (hero, atouts, aperçu de la carte, histoire, avis, CTA)
- `menu.html` — Carte complète avec filtres par catégorie
- `about.html` — Histoire, valeurs, frise chronologique, galerie
- `contact.html` — Modes de commande, infos, plan, formulaire

## Structure

```
kebab-site/
├─ index.html
├─ menu.html
├─ about.html
├─ contact.html
└─ assets/
   ├─ css/
   │  └─ styles.css
   └─ js/
      └─ main.js
```

## Lancer en local

```bash
# Avec Python
python3 -m http.server 8080

# Ou avec Node (npx)
npx serve .
```

Puis ouvrez http://localhost:8080.

## Personnalisation rapide

- **Couleurs / typographie** : variables CSS au début de `assets/css/styles.css` (`:root`).
- **Plats / prix** : éditez les sections `.menu-section` dans `menu.html`.
- **Coordonnées** : adresse, téléphone, email et horaires sont en clair dans le footer
  de chaque page et dans `contact.html`.
- **Photos réelles** : remplacez les `div.dish-img[data-img="..."]` par des `<img>` ou
  ajoutez des `background-image: url(...)` dans `styles.css` sur les sélecteurs
  `.dish-img[data-img="durum"]`, etc.
- **Carte** : l'iframe OpenStreetMap dans `contact.html` peut être remplacée par
  Google Maps embed pour pointer la vraie adresse.

## Accessibilité

- Hiérarchie des titres respectée
- Liens et boutons étiquetés
- Skip link, navigation clavier, contrastes conformes
- `prefers-reduced-motion` respecté
