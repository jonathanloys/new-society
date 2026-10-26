# NEW SOCIETY — Site Vitrine Officiel

> **« Le monde change. À nous de choisir la suite. »**  
> Site web vitrine pour **NEW SOCIETY**, mouvement citoyen indépendant à vocation européenne (lancement en Belgique).

---

## 🏛️ Direction artistique et choix de conception

* **Esthétique :** Minimalisme éditorial haut de gamme, institution européenne contemporaine, respirations généreuses et grande lisibilité.
* **Palette chromatique :**
  * Bleu nuit profond (`#0A1128` / `#050A18`) : autorité, sérénité et profondeur.
  * Blanc cassé / Ivoire (`#F9F9F7`) : lecture confortable et douce.
  * Gris pierre (`#475569` / `#1E293B`) : textes et hiérarchies secondaires.
  * Cuivre doux (`#C88A58`) : touches subtiles d'accentuation, puces et interactions.
* **Typographie :**
  * Titres et citations manifestes : *Newsreader* (Serif éditorial prestigieux).
  * Textes courants, navigation et formulaires : *Plus Jakarta Sans* (Sans contemporain net et accessible).
* **Architecture technique :**
  * HTML5 sémantique avec balisage Open Graph pour Facebook.
  * CSS3 moderne (Variables CSS, Flexbox, Grid, zéro dépendance externe lourde).
  * JavaScript Vanilla modulaire et accessible (dialogues natifs `<dialog>`, stockage local pour la phase de test).

---

## 📂 Structure du projet

```
NewSociety/
├── index.html                   # Structure sémantique complète et contenu éditorial
├── styles.css                   # Feuilles de style et tokens graphiques
├── app.js                       # Logique d'interaction, modales et formulaire
├── assets/
│   ├── favicon.svg              # Logo géométrique de convergence (Favicon)
│   ├── hero.jpg                 # Architecture civique européenne contemporaine
│   ├── pillar-democracy.jpg     # Pilier 01 : Démocratie & Nouvel ordre mondial
│   ├── pillar-technology.jpg    # Pilier 02 : Technologie & Avenir humain
│   └── pillar-ecology.jpg       # Pilier 03 : Écologie & Prospérité durable
├── KIT-COMMUNICATION-NEW-SOCIETY.md  # Kit complet pour Facebook et réseaux sociaux
└── README.md                    # Documentation d'installation et d'intégration
```

---

## 🚀 Lancement local

Le site ne nécessite aucun outil de compilation complexe. Vous pouvez le visualiser directement :

### Option 1 : Serveur Python (recommandé)
```bash
python3 -m http.server 3000
```
Puis ouvrez votre navigateur à l'adresse : **[http://localhost:3000](http://localhost:3000)**.

### Option 2 : Double-clic direct
Ouvrez simplement le fichier `index.html` dans n'importe quel navigateur moderne (Chrome, Safari, Firefox, Edge).

---

## 📬 Connexion du formulaire de participation à un service réel

En phase de test, le formulaire enregistre les manifestations d'intérêt dans le `localStorage` de votre navigateur (sans simuler d'envoi réseau erroné). Un bouton d'exportation permet de récupérer la liste au format JSON.

Pour connecter un service d'envoi en production :

### Solution A : Formspree / Brevo / Mailjet (Sans code backend)
1. Créez un formulaire sur [Formspree](https://formspree.io/) ou [Brevo](https://www.brevo.com/).
2. Dans `index.html`, remplacez `<form id="join-form">` par :
   ```html
   <form id="join-form" action="https://formspree.io/f/VOTRE_ID_FORMSPREE" method="POST">
   ```

### Solution B : Firebase / Supabase (Base de données en temps réel)
1. Créez une table `participants` avec les colonnes : `firstname`, `email`, `participation_type`, `created_at`.
2. Insérez la requête dans la fonction `initFormHandling()` de `app.js`.

---

## 📄 Licence et mentions

Initiative citoyenne indépendante — Belgique, ambition européenne.  
Textes rédigés pour NEW SOCIETY sous licence de libre partage avec citation de la source.
