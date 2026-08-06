# Metronomia — Site vitrine

Site vitrine statique pour **Metronomia**, développé en HTML/CSS avec la charte graphique **Tech Neumorphisme** (Soft UI, fond bleu tech clair).

**Dépôt GitHub :** [gordoncqM/Metronomia-website](https://github.com/gordoncqM/Metronomia-website)

---

## Aperçu

| Élément | Détail |
|---------|--------|
| **Stack** | HTML5, CSS3 — aucun JavaScript |
| **Styles** | Fichier unique `css/style.css`, convention **BEM** |
| **Polices** | [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (Google Fonts) |
| **Responsive** | Breakpoint mobile à 768 px, menu burger en CSS pur (checkbox) |
| **Contact** | `contact@metronomia.tech` (formulaire `mailto:` sur la page Contact) |

---

## Pages du site

| Fichier | Contenu principal |
|---------|-------------------|
| `index.html` | Accueil — hero, domaines d'expertise, aperçu « À propos » |
| `services.html` | Prestations (sites vitrines, SEO, charte graphique, maintenance…) et démarche client |
| `projets.html` | Portfolio par catégories : sites vitrines, identité visuelle, SEO & performance, maintenance |
| `apropos.html` | Histoire, équipe, valeurs, témoignages |
| `contact.html` | Formulaire de contact |

---

## Structure du projet

```
Site vitrine/
├── index.html          # Page d'accueil
├── services.html       # Page services
├── projets.html        # Page projets / réalisations
├── apropos.html        # Page à propos
├── contact.html        # Page contact
├── css/
│   └── style.css       # Styles globaux (design tokens, BEM, responsive)
├── assets/
│   └── images/         # Images du site (à compléter)
└── README.md           # Documentation du projet
```

---

## Charte graphique & conventions

- **Neumorphisme** : ombres doubles (`raised` / `pressed`) via variables CSS (`--shadow-neu-*`)
- **BEM** : `bloc__élément--modificateur` (ex. `hero__title--brand`, `nav__link--active`)
- **Design tokens** : couleurs, espacements et rayons définis dans `:root` au début de `style.css`
- **Navigation mobile** : panneau déroulant avec overlay, sans JavaScript
- **Accessibilité** : attributs ARIA sur la nav, labels de formulaire, `lang="fr"`

---

## Lancer le site en local

Ouvrir `index.html` directement dans un navigateur (double-clic ou glisser-déposer du fichier). Aucune installation ni serveur n'est nécessaire : le site est entièrement statique (HTML/CSS).

Pour tester le responsive : outils de développement du navigateur (F12 → mode appareil mobile).

---

## Branches du dépôt

| Branche | Rôle |
|---------|------|
| `master` | Branche principale de production |
| `test` | Branche de prévisualisation / tests |

---

## Guide des commandes Git & GitHub

### Configuration (première utilisation)

| Commande | Description |
|----------|-------------|
| `git config user.name "Votre Nom"` | Définit le nom affiché dans vos commits. |
| `git config user.email "email@exemple.com"` | Définit l'adresse e-mail associée à vos commits. |
| `git config user.email` | Affiche l'e-mail configuré (vérification). |

---

### Consulter l'état du dépôt

| Commande | Description |
|----------|-------------|
| `git status` | Affiche les fichiers modifiés, ajoutés ou non suivis. |
| `git branch` | Liste les branches locales ; l'astérisque `*` indique la branche active. |
| `git branch -a` | Liste toutes les branches (locales + distantes). |
| `git log --oneline` | Affiche l'historique des commits de façon compacte. |
| `git remote -v` | Affiche l'URL du dépôt distant (origin). |
| `git diff` | Montre les modifications non encore commitées. |

---

### Récupérer le code depuis GitHub

| Commande | Description |
|----------|-------------|
| `git clone https://github.com/gordoncqM/Metronomia-website.git` | Clone le dépôt sur votre machine (première fois). |
| `git fetch origin` | Télécharge les dernières modifications depuis GitHub **sans** les fusionner. |
| `git pull origin master` | Récupère **et** fusionne les commits de `master` distante dans votre branche locale. |

---

### Changer de branche

| Commande | Description |
|----------|-------------|
| `git checkout master` | Bascule sur la branche `master`. |
| `git checkout test` | Bascule sur la branche `test`. |
| `git switch master` | Alternative moderne à `checkout` pour changer de branche. |
| `git checkout -b test origin/test` | Crée une branche locale `test` à partir de la branche distante. |

> **Attention :** si Git refuse le changement de branche à cause de fichiers modifiés, committez ou mettez de côté vos changements avec `git stash` (voir ci-dessous).

---

### Enregistrer et envoyer vos modifications

| Commande | Description |
|----------|-------------|
| `git add .` | Ajoute **tous** les fichiers modifiés à la zone de staging. |
| `git add fichier.html` | Ajoute un fichier spécifique au staging. |
| `git commit -m "feat: description du changement"` | Crée un commit avec un message descriptif. |
| `git push` | Envoie vos commits locaux vers la branche distante correspondante. |
| `git push origin master` | Pousse explicitement la branche `master` vers GitHub. |
| `git push origin test` | Pousse la branche `test` vers GitHub. |

**Exemple de workflow quotidien :**

```bash
git add .
git commit -m "feat: ajouter la page contact"
git push
```

---

### Fusionner des branches

| Commande | Description |
|----------|-------------|
| `git merge <branche>` | Fusionne `<branche>` **dans la branche sur laquelle vous vous trouvez**. |
| `git merge --abort` | Annule une fusion en cours (en cas de conflit ou d'erreur). |
| `git merge --no-commit --no-ff` | Lance la fusion sans créer le commit final — permet de vérifier le résultat. |

> **Ordre important :** se placer sur la branche **cible**, puis fusionner la branche **source**.

**Intégrer `master` dans `test` (mise à jour de la branche de test) :**

```bash
git checkout test
git fetch origin
git merge master
git push origin test
```

**Intégrer `test` dans `master` (passage en production) :**

```bash
git checkout master
git pull origin master
git merge test
git push origin master
```

**Vérifier les différences avant fusion :**

```bash
git log master..test --oneline   # commits dans test, pas encore dans master
git log test..master --oneline   # commits dans master, pas encore dans test
```

---

### Mettre de côté des modifications temporairement

| Commande | Description |
|----------|-------------|
| `git stash` | Met de côté les modifications non commitées. |
| `git stash -u` | Met de côté aussi les fichiers non suivis (untracked). |
| `git stash pop` | Restaure les modifications mises de côté et supprime le stash. |
| `git stash list` | Affiche la liste des stashes enregistrés. |

---

### Résoudre les conflits de fusion

Lorsqu'un merge échoue avec `CONFLICT`, Git marque les fichiers concernés. Ouvrez-les et cherchez les marqueurs :

```
(votre version — branche actuelle)
```

| Commande | Description |
|----------|-------------|
| `git status` | Liste les fichiers en conflit. |
| `git add fichier.html` | Marque un conflit comme résolu après édition manuelle. |
| `git commit` | Finalise la fusion une fois tous les conflits résolus. |

---

### Annuler ou récupérer des changements

| Commande | Description |
|----------|-------------|
| `git restore fichier.html` | Annule les modifications locales d'un fichier (non commité). |
| `git reset --soft HEAD~1` | Annule le dernier commit **en gardant** les modifications dans le staging. |
| `git reset --hard HEAD~1` | ⚠️ Annule le dernier commit **et supprime** les modifications (irréversible). |
| `git reflog` | Affiche l'historique de toutes les actions Git — utile pour retrouver un commit « perdu ». |
| `git checkout -b branche-recup abc1234` | Crée une branche de récupération à partir d'un ancien commit. |

---

### Commandes à éviter sans précaution

| Commande | Risque |
|----------|--------|
| `git push --force` | ⚠️ **Écrase** l'historique distant. Peut supprimer le travail d'autres contributeurs. |
| `git reset --hard` | ⚠️ Supprime définitivement les modifications non commitées ou des commits locaux. |

Préférez toujours un **`git merge`** classique pour intégrer une branche dans une autre.

---

## Convention de messages de commit

Ce projet utilise des messages descriptifs en français :

```
feat: ajouter la page contact
fix: corriger la navigation mobile
style: améliorer le menu burger en responsive
docs: mettre à jour le README
```

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité ou page |
| `fix:` | Correction de bug |
| `docs:` | Documentation (ex. ce README) |
| `style:` | Changements CSS / mise en forme |

---

## Ressources & documentation utile

### Git & GitHub

| Ressource | Lien |
|-----------|------|
| Documentation Git officielle | [git-scm.com/doc](https://git-scm.com/doc) |
| GitHub Docs — Bases de Git (FR) | [docs.github.com/fr/get-started/using-git](https://docs.github.com/fr/get-started/using-git/about-git) |
| GitHub Docs — Gestion des branches | [docs.github.com/fr/pull-requests/collaborating-with-pull-requests](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches) |
| GitHub Docs — Résolution de conflits | [docs.github.com/fr/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts](https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts) |
| Pro Git (livre gratuit, EN) | [git-scm.com/book/fr/v2](https://git-scm.com/book/fr/v2) |

### HTML & CSS

| Ressource | Lien |
|-----------|------|
| MDN — HTML | [developer.mozilla.org/fr/docs/Web/HTML](https://developer.mozilla.org/fr/docs/Web/HTML) |
| MDN — CSS | [developer.mozilla.org/fr/docs/Web/CSS](https://developer.mozilla.org/fr/docs/Web/CSS) |
| MDN — Responsive design | [developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Responsive_Design](https://developer.mozilla.org/fr/docs/Learn/CSS/CSS_layout/Responsive_Design) |
| MDN — Variables CSS | [developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties) |
| Can I use — compatibilité navigateurs | [caniuse.com](https://caniuse.com/) |

### Méthodologie & bonnes pratiques front

| Ressource | Lien |
|-----------|------|
| BEM — Block Element Modifier | [en.bem.info/methodology](https://en.bem.info/methodology/) |
| Google Fonts — Inter | [fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter) |
| Google Fonts — JetBrains Mono | [fonts.google.com/specimen/JetBrains+Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| WCAG 2 — accessibilité web | [w3.org/WAI/standards-guidelines/wcag](https://www.w3.org/WAI/standards-guidelines/wcag/) |
| MDN — Accessibilité | [developer.mozilla.org/fr/docs/Web/Accessibility](https://developer.mozilla.org/fr/docs/Web/Accessibility) |

### SEO & performance

| Ressource | Lien |
|-----------|------|
| Google Search Central — SEO starter guide | [developers.google.com/search/docs/fundamentals/seo-starter-guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) |
| Google Search Console | [search.google.com/search-console](https://search.google.com/search-console) |
| PageSpeed Insights | [pagespeed.web.dev](https://pagespeed.web.dev/) |
| Schema.org — données structurées | [schema.org](https://schema.org/) |
| Rich Results Test (Google) | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) |

### Déploiement (site statique)

| Ressource | Lien |
|-----------|------|
| GitHub Pages — documentation | [docs.github.com/fr/pages](https://docs.github.com/fr/pages/getting-started-with-github-pages/about-github-pages) |
| Netlify — docs (hébergement statique) | [docs.netlify.com](https://docs.netlify.com/) |

### Outils de développement navigateur

| Ressource | Lien |
|-----------|------|
| Chrome DevTools — responsive | [developer.chrome.com/docs/devtools/device-mode](https://developer.chrome.com/docs/devtools/device-mode) |
| Firefox — mode responsive | [firefox-source-docs.mozilla.org/devtools-user](https://firefox-source-docs.mozilla.org/devtools-user/index.html) |
| W3C Markup Validation Service | [validator.w3.org](https://validator.w3.org/) |
| W3C CSS Validation Service | [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/) |
