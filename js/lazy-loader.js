/**
 * Système de lazy loading pour optimiser le chargement des sections
 */

// Configuration des sections à charger de manière différée
const LAZY_SECTIONS = {
  testimonials: "#temoignages",
  pricing: "#pricing",
  faq: "#faq",
  modals: ".modal",
};

// Observer pour détecter quand les sections entrent dans le viewport
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ajouter une classe pour animer l'apparition
        entry.target.classList.add("section-visible");

        // Déclencher le chargement des animations lourdes
        loadSectionAnimations(entry.target);

        // Ne plus observer cette section
        sectionObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "50px",
  }
);

// Fonction pour charger les animations d'une section
function loadSectionAnimations(section) {
  // Animation des cartes avec un délai progressif
  const cards = section.querySelectorAll(".hover\\:-translate-y-2");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Fonction pour optimiser le chargement des images
function optimizeImages() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy-img");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Fonction pour précharger les sections critiques
function preloadCriticalSections() {
  // Précharger les sections visibles immédiatement
  const criticalSections = ["#qui-suis-je", "#about", "#portfolio"];

  criticalSections.forEach((selector) => {
    const section = document.querySelector(selector);
    if (section) {
      section.classList.add("preloaded");
    }
  });
}

// Fonction pour compresser les modals (les charger seulement quand nécessaire)
function setupModalLazyLoading() {
  const modalTriggers = document.querySelectorAll("[data-modal-target]");

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("data-modal-target");
      loadModal(modalId);
    });
  });
}

// Fonction pour charger un modal spécifique
function loadModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal && !modal.classList.contains("loaded")) {
    // Ajouter les animations et fonctionnalités du modal
    modal.classList.add("loaded");

    // Ajouter les event listeners pour fermer
    const closeButtons = modal.querySelectorAll(".modal-close");
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", () => closeModal(modalId));
    });

    // Fermer en cliquant sur l'overlay
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modalId);
      }
    });
  }

  openModal(modalId);
}

// Initialisation du système d'optimisation
document.addEventListener("DOMContentLoaded", function () {
  // Observer toutes les sections pour le lazy loading
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    // Initialiser l'opacité pour l'animation
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    sectionObserver.observe(section);
  });

  // Précharger les sections critiques
  preloadCriticalSections();

  // Optimiser le chargement des images
  optimizeImages();

  // Setup des modals
  setupModalLazyLoading();

  console.log("🚀 Système d'optimisation chargé - Performance améliorée");
});

// CSS pour les transitions
const optimizationStyles = `
  <style>
    .section-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .lazy-img {
      filter: blur(5px);
      transition: filter 0.3s;
    }
    
    .preloaded {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    /* Optimisation pour les animations lourdes */
    .hover\\:-translate-y-2 {
      will-change: transform;
    }
    
    /* Optimisation pour les images */
    img {
      content-visibility: auto;
    }
  </style>
`;

// Injecter les styles d'optimisation
document.head.insertAdjacentHTML("beforeend", optimizationStyles);
