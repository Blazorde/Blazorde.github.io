# Server

Ce dossier est reserve a la logique serveur reutilisable du portfolio.

Pour ajouter une API avec Next.js :

1. Cree une route dans `app/api/nom-de-la-route/route.ts`.
2. Place la logique metier reutilisable ici, dans `src/server`.
3. Importe cette logique depuis la route API.

Exemple futur :

```txt
src/server/contact/
├─ sendContactMessage.ts
└─ contactSchema.ts

app/api/contact/route.ts
```
