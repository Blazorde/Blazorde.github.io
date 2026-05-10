# Mon App

Portfolio developpe avec Next.js, React, TypeScript et Tailwind CSS.

## Lancer le projet

```bash
npm run dev
```

Puis ouvre :

```txt
http://localhost:3000
```

## Scripts utiles

```bash
npm run dev      # serveur de dev
npm run lint     # verification ESLint
npm run build    # build de production
npm run start    # lance le build de production
```

## Arborescence

```txt
mon-app/
├─ app/                  # Routes Next.js
├─ src/
│  ├─ features/          # Fonctionnalites de l'app
│  ├─ server/            # Logique serveur reutilisable
│  └─ shared/            # Code partage
├─ public/               # Assets publics
└─ docs/                 # Documentation
```

Le detail complet est dans `docs/ARCHITECTURE.md`.

## Repos GitHub prives

La page Projets recupere automatiquement les repos via `app/api/projects`.

Pour afficher aussi tes repos prives, cree un fichier `.env.local` a partir de `.env.example` :

```bash
GITHUB_PERSONAL_TOKEN=token_lecture_repos_perso
GITHUB_ORG_TOKEN=token_lecture_repos_organisation
```

Tu peux aussi utiliser un seul `GITHUB_TOKEN` si le meme token a acces aux deux espaces.

Sans token, seuls les repos publics peuvent etre affiches. Pour donner acces a une personne a un repo prive, il faut l'inviter dans GitHub comme collaborateur ou via une team avec le role `Read`.
