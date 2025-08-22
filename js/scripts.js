// Script moderne pour La Petite Berceuse avec Tailwind CSS
document.addEventListener("DOMContentLoaded", function () {
  // Gestion du menu mobile
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });

    // Fermer le menu mobile quand on clique sur un lien
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // Effet de navigation au scroll
  const navbar = document.getElementById("mainNav");
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add("bg-white/98", "shadow-lg");
      navbar.classList.remove("bg-white/95");
    } else {
      navbar.classList.add("bg-white/95");
      navbar.classList.remove("bg-white/98", "shadow-lg");
    }

    // Masquer/Afficher la navbar au scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  }

  // Throttle pour optimiser les performances
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
      setTimeout(() => (ticking = false), 16);
    }
  }

  window.addEventListener("scroll", requestTick);

  // Smooth scroll pour les liens d'ancrage
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // Compensation pour la navbar fixe
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation des éléments au scroll (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les sections pour les animations
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Effet parallax léger pour le header
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        header.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  console.log("🌸 La Petite Berceuse - Site chargé avec succès!");
});
