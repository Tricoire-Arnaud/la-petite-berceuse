# La Petite Berceuse - Site Web

Site web d'accompagnement périnatal pour Cassandra, infirmière spécialisée en maternité.

## Structure du Projet

```
/var/www/html/la-petite-berceuse/
├── index.html              # Page d'accueil (3292 lignes → allégé!)
├── apropos.html            # Page À propos (523 lignes)
├── formations.html         # Page Formations
├── css/
│   └── tailwind-config.js  # Configuration Tailwind personnalisée
├── js/
│   └── main.js             # Tout le JavaScript (modales, menu, slider, etc.)
└── assets/
    └── img/
        └── la petite berceuse/  # Images du site
```

## Technologies Utilisées

- **Tailwind CSS** (via CDN)
- **Font Awesome** pour les icônes
- **Vanilla JavaScript** pour les interactions
- **Google Fonts** (Inter, Georgia)

## Charte Graphique

### Couleurs
- **Rose (Primary)** : `#FF9CA0` - Pour les accents féminins
- **Vert (Secondary)** : `#8BB883` - Pour la douceur et la nature
- **Gris (Accent)** : `#545454` - Pour les textes

### Typographies
- **Titres** : Georgia (serif)
- **Texte** : Inter (sans-serif)

## Fonctionnalités JavaScript

Le fichier `js/main.js` gère :
- ✅ Bouton "Retour en haut"
- ✅ Menu mobile responsive
- ✅ FAQ accordéon
- ✅ Modales des services (5 soins différents)
- ✅ Slider de témoignages avec autoplay
- ✅ Effet parallaxe sur le hero
- ✅ Smooth scrolling entre les sections
- ✅ Animations au scroll (IntersectionObserver)

## Développement

### Lancer le serveur de test

```bash
cd /var/www/html/la-petite-berceuse
python3 -m http.server 8000
```

Puis accédez à `http://localhost:8000`

### Modifier les couleurs

Éditez le fichier `css/tailwind-config.js` pour changer :
- Les palettes de couleurs (primary, secondary, accent)
- Les animations personnalisées
- Les polices

### Ajouter du JavaScript

Éditez le fichier `js/main.js` - tout le code est organisé par fonctionnalité avec des commentaires clairs.

## Maintenance

### Structure Maintenable ✅

Avant la restructuration : **3759 lignes** dans un seul fichier HTML
Après : **3292 lignes** HTML + **467 lignes** JS séparé = code organisé et maintenable !

### Avantages de cette Structure

1. **Séparation des responsabilités** : HTML, CSS, JS dans des fichiers séparés
2. **Réutilisabilité** : Le même JS et CSS sont utilisés sur toutes les pages
3. **Maintenance facile** : Modifications centralisées
4. **Performance** : Les fichiers JS/CSS sont mis en cache par le navigateur
5. **Lisibilité** : Code organisé et commenté

## Contact

**Cassandra - La Petite Berceuse**
- 📞 Téléphone : 06.67.80.98.94
- 📧 Email : lapetiteberceuse@outlook.fr
- 📍 Adresse : 30 route de Bagnols, 30210 Remoulins

---

*Dernière mise à jour : Novembre 2025*

