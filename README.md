# Metronomia — Site vitrine

Site vitrine statique pour **Metronomia**, développé en HTML/CSS avec la charte graphique **Tech Neumorphisme** (Soft UI, fond bleu tech clair).

**Dépôt GitHub :** [gordoncqM/Metronomia-website](https://github.com/gordoncqM/Metronomia-website)

---

## Structure du projet

```
Site vitrine/
├── index.html        # Page d'accueil
├── services.html     # Page services
├── projets.html      # Page projets
├── contact.html      # Page contact
├── css/
│   └── style.css     # Styles (convention BEM)
└── assets/
    └── images/       # Images du site
```

---

## Lancer le site en local

Ouvrir `index.html` directement dans un navigateur, ou utiliser un serveur local :

```bash
# Avec Python (si installé)
python -m http.server 8000
```

Puis ouvrir : [http://localhost:8000](http://localhost:8000)

---

## Branches du dépôt

| Branche   | Rôle                                      |
|-----------|-------------------------------------------|
| `master`  | Branche principale de production          |
| `test`    | Branche de prévisualisation / tests       |
| `main`    | Branche distante GitHub (alias de secours)|

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
| `git checkout -b test origin/test` | Crée une branche locale `test` à partir de la branche distante (si elle n'existe pas encore en local). |

> **Attention :** si Git refuse le changement de branche à cause de fichiers modifiés, committez ou mettez de côté vos changements avec `git stash` (voir ci-dessous).

---

### Enregistrer et envoyer vos modifications

| Commande | Description |
|----------|-------------|
| `git add .` | Ajoute **tous** les fichiers modifiés à la zone de staging (préparation du commit). |
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
| `git merge master` | Fusionne `master` **dans la branche sur laquelle vous êtes** (ex. `test`). Conserve le contenu des deux branches ; ne remplace pas tout. |
| `git merge --abort` | Annule une fusion en cours (en cas de conflit ou d'erreur). |
| `git merge master --no-commit --no-ff` | Lance la fusion sans créer le commit final — permet de vérifier le résultat avant de valider. |

**Fusionner `master` dans `test` (cas courant) :**

```bash
git checkout test          # 1. Se placer sur la branche cible
git fetch origin           # 2. Mettre à jour les références distantes
git merge master           # 3. Intégrer les changements de master dans test
git push origin test       # 4. Envoyer le résultat sur GitHub
```

> **Ordre important :** on se met sur la branche **cible** (`test`), puis on fusionne la branche **source** (`master`).

---

### Mettre de côté des modifications temporairement

| Commande | Description |
|----------|-------------|
| `git stash` | Met de côté les modifications non commitées (working directory propre). |
| `git stash -u` | Met de côté aussi les fichiers non suivis (untracked). |
| `git stash pop` | Restaure les modifications mises de côté et supprime le stash. |
| `git stash list` | Affiche la liste des stashes enregistrés. |

**Utile avant un changement de branche ou une fusion :**

```bash
git stash -u
git checkout test
git merge master
git stash pop
```

---

### Résoudre les conflits de fusion

Lorsqu'un merge échoue avec `CONFLICT`, Git marque les fichiers concernés. Ouvrez-les et cherchez les marqueurs :

```
<<<<<<< HEAD
(votre version — branche actuelle)
=======
(version de la branche fusionnée)
>>>>>>> master
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
| `git push --force` | ⚠️ **Écrase** l'historique distant. Peut supprimer le travail d'autres contributeurs ou le contenu unique d'une branche (ex. `test`). |
| `git reset --hard` | ⚠️ Supprime définitivement les modifications non commitées ou des commits locaux. |

Préférez toujours un **`git merge`** classique pour intégrer `master` dans `test`.

---

## Convention de messages de commit

Ce projet utilise des messages descriptifs en français :

```
feat: ajouter la page contact
feat: nouvelle page services
fix: corriger la navigation mobile
```

| Préfixe | Usage |
|---------|-------|
| `feat:` | Nouvelle fonctionnalité ou page |
| `fix:`  | Correction de bug |
| `docs:` | Documentation (ex. ce README) |
| `style:`| Changements CSS / mise en forme |

---

## Ressources

- [Documentation Git officielle](https://git-scm.com/doc)
- [GitHub Docs — Git basics](https://docs.github.com/fr/get-started/using-git)
