# Fichiers de traduction i18next

Ce dossier contient les chaînes traduites du site, chargées par i18next depuis chaque page HTML.

## Structure

| Dossier | Langue   | Fichier            |
|---------|----------|--------------------|
| `fr/`   | Français | `translation.json` |
| `en/`   | Anglais  | `translation.json` |
| `it/`   | Italien  | `translation.json` |

## Format

- Clés JSON plates (ex. `nav_home`, `hero_subtitle`).
- Certaines valeurs contiennent du HTML autorisé (`<strong>`, `<span>`, classes BEM).
- Le JSON standard n'accepte pas de commentaires : documenter les clés ici ou dans le README principal.

## Ajouter une traduction

1. Ajouter la clé dans les trois fichiers `translation.json`.
2. Marquer l'élément HTML avec `data-i18n="ma_cle"`.
3. Laisser un texte de repli en français dans le HTML (SEO et sans JavaScript).
