#!/usr/bin/env python3
"""
Script d'optimisation pour réduire la taille du fichier HTML
sans perdre en fonctionnalité
"""

import re
import os
from pathlib import Path

def optimize_html(content):
    """Optimise le contenu HTML"""
    
    # Supprimer les commentaires HTML (sauf ceux nécessaires)
    content = re.sub(r'<!--(?!.*?(DOCTYPE|conditional)).*?-->', '', content, flags=re.DOTALL)
    
    # Réduire les espaces multiples
    content = re.sub(r'\s+', ' ', content)
    
    # Supprimer les espaces autour des balises
    content = re.sub(r'>\s+<', '><', content)
    
    # Optimiser les classes Tailwind répétitives communes
    common_patterns = {
        # Cards répétitives
        'bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2': 'card-hover',
        'font-display text-4xl lg:text-5xl font-bold text-secondary-700 mb-6': 'heading-section',
        'font-display text-2xl font-bold text-secondary-700 mb-4': 'heading-card',
        'text-gray-600 leading-relaxed': 'text-description',
        'w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6': 'icon-base',
        'bg-gradient-to-br from-primary-100 to-primary-200': 'bg-primary-gradient',
        'bg-gradient-to-br from-accent-100 to-accent-200': 'bg-accent-gradient',
        'bg-gradient-to-br from-secondary-100 to-secondary-200': 'bg-secondary-gradient',
    }
    
    # Créer les classes CSS personnalisées
    custom_css = """
    <style>
    .card-hover{@apply bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2;}
    .heading-section{@apply font-display text-4xl lg:text-5xl font-bold text-secondary-700 mb-6;}
    .heading-card{@apply font-display text-2xl font-bold text-secondary-700 mb-4;}
    .text-description{@apply text-gray-600 leading-relaxed;}
    .icon-base{@apply w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6;}
    .bg-primary-gradient{@apply bg-gradient-to-br from-primary-100 to-primary-200;}
    .bg-accent-gradient{@apply bg-gradient-to-br from-accent-100 to-accent-200;}
    .bg-secondary-gradient{@apply bg-gradient-to-br from-secondary-100 to-secondary-200;}
    </style>
    """
    
    # Remplacer les patterns répétitifs
    for pattern, replacement in common_patterns.items():
        content = content.replace(f'class="{pattern}"', f'class="{replacement}"')
    
    # Injecter les styles personnalisés avant la fermeture de head
    content = content.replace('</head>', f'{custom_css}</head>')
    
    return content

def optimize_images_references(content):
    """Optimise les références aux images pour le lazy loading"""
    
    # Convertir les images non-critiques en lazy loading
    img_pattern = r'<img\s+src="(assets/img/[^"]+)"\s+alt="([^"]+)"\s+class="([^"]+)"'
    
    def replace_img(match):
        src = match.group(1)
        alt = match.group(2)
        classes = match.group(3)
        
        # Les images critiques (hero, logo) restent en chargement normal
        critical_images = ['logo', 'IMG_1810.jpg', 'femme enceinte 2.jpeg']
        
        if any(critical in src for critical in critical_images):
            return match.group(0)  # Garder tel quel
        else:
            # Convertir en lazy loading
            return f'<img data-src="{src}" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3C/svg%3E" alt="{alt}" class="{classes} lazy-img"'
    
    content = re.sub(img_pattern, replace_img, content)
    return content

def create_optimized_version():
    """Crée une version optimisée du fichier HTML"""
    
    original_file = Path('index.html')
    optimized_file = Path('index.optimized.html')
    backup_file = Path('index.backup.html')
    
    if not original_file.exists():
        print("❌ Fichier index.html non trouvé")
        return
    
    # Lire le contenu original
    with open(original_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_size = len(content)
    print(f"📊 Taille originale: {original_size:,} caractères")
    
    # Créer une sauvegarde
    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"💾 Sauvegarde créée: {backup_file}")
    
    # Optimiser le contenu
    print("🔧 Optimisation en cours...")
    optimized_content = optimize_html(content)
    optimized_content = optimize_images_references(optimized_content)
    
    # Ajouter le script d'optimisation
    lazy_loader_script = '<script src="js/lazy-loader.js" defer></script>'
    optimized_content = optimized_content.replace('</body>', f'{lazy_loader_script}</body>')
    
    optimized_size = len(optimized_content)
    reduction = ((original_size - optimized_size) / original_size) * 100
    
    print(f"📊 Taille optimisée: {optimized_size:,} caractères")
    print(f"🎯 Réduction: {reduction:.1f}%")
    
    # Sauvegarder la version optimisée
    with open(optimized_file, 'w', encoding='utf-8') as f:
        f.write(optimized_content)
    
    print(f"✅ Version optimisée créée: {optimized_file}")
    print("\n🚀 Pour utiliser la version optimisée:")
    print(f"   mv {original_file} index.original.html")
    print(f"   mv {optimized_file} {original_file}")

if __name__ == "__main__":
    create_optimized_version()
