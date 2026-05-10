# Architecture

Ce projet est une application Next.js rangee par responsabilites.

```txt
mon-app/
├─ app/                     # Routes Next.js uniquement
│  ├─ api/                  # Routes HTTP cote serveur
│  ├─ layout.tsx            # Layout global de l'app
│  └─ page.tsx              # Route d'accueil `/`
├─ src/
│  ├─ features/             # Blocs metier de l'interface
│  │  └─ portfolio/         # Feature portfolio
│  ├─ server/               # Logique serveur reutilisable
│  └─ shared/               # Code partage entre features
│     └─ styles/            # Styles globaux
├─ public/                  # Images et fichiers statiques publics
├─ docs/                    # Documentation du projet
└─ package.json
```

## Regles simples

- `app/` reste minimal : il sert aux routes Next.js, pas aux composants metier.
- `src/features/` contient les vraies pages et interfaces de l'application.
- `src/shared/` contient ce qui est commun a plusieurs features.
- `src/server/` contiendra la logique backend reutilisable.
- `app/api/` contiendra les endpoints HTTP Next.js.

## Ou modifier quoi ?

- Page principale : `app/page.tsx`
- Layout global : `app/layout.tsx`
- Styles globaux : `src/shared/styles/globals.css`
- Portfolio : `src/features/portfolio/PortfolioApp.tsx`
- Menu gauche : `src/features/portfolio/components/IconRail.tsx`
- Theme : `src/features/portfolio/theme.tsx`
- API projets GitHub : `app/api/projects/route.ts`
- Mapping projets/cards : `src/features/portfolio/projects.ts`
- Future logique serveur : `src/server`
- Futures routes API : `app/api`

## Projets GitHub

La section projets appelle `/api/projects`.

- Sans token, seuls les repos publics de `Blazorde` et `YnovToulouseProjectPerso` peuvent etre recuperes.
- Avec `GITHUB_PERSONAL_TOKEN` dans `.env.local`, GitHub peut retourner les repos prives personnels accessibles au token.
- Avec `GITHUB_ORG_TOKEN` dans `.env.local`, GitHub peut retourner les repos prives de l'organisation accessibles au token.
- `GITHUB_TOKEN` reste supporte si tu preferes utiliser un seul token pour les deux.
- Les cards privees ouvrent une demande d'acces par email au lieu d'envoyer directement vers le repo.
