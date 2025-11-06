// Back to top button
document.addEventListener("DOMContentLoaded", () => {
  const backToTopButton = document.createElement("button");
  backToTopButton.setAttribute("type", "button");
  backToTopButton.setAttribute(
    "class",
    "fixed bottom-6 right-6 z-40 w-12 h-12 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 transition-all duration-300 opacity-0 pointer-events-none"
  );
  backToTopButton.setAttribute("aria-label", "Retour en haut");
  backToTopButton.innerHTML =
    '<i class="fas fa-arrow-up text-base sm:text-lg"></i>';

  document.body.appendChild(backToTopButton);

  const toggleBackToTop = () => {
    const scrollPosition =
      window.pageYOffset || document.documentElement.scrollTop || 0;

    if (scrollPosition > 220) {
      backToTopButton.classList.remove(
        "opacity-0",
        "pointer-events-none"
      );
      backToTopButton.classList.add("opacity-100", "pointer-events-auto");
    } else {
      backToTopButton.classList.add("opacity-0", "pointer-events-none");
      backToTopButton.classList.remove(
        "opacity-100",
        "pointer-events-auto"
      );
    }
  };

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(toggleBackToTop);
  });

  window.addEventListener("resize", () => {
    window.requestAnimationFrame(toggleBackToTop);
  });

  toggleBackToTop();
});

// Mobile menu toggle
function toggleMobileMenu(forceClose = false) {
  const menu = document.getElementById("mobileMenu");
  const toggleButton = document.getElementById("mobileMenuToggle");
  const toggleIcon = document.getElementById("mobileMenuIcon");

  if (!menu) {
    return;
  }

  const shouldClose = forceClose || !menu.classList.contains("hidden");
  const shouldOpen = !shouldClose;

  if (shouldOpen) {
    menu.classList.remove("hidden");
    menu.classList.add("animate-fadeUp");
    document.body.classList.add("overflow-hidden");
  } else {
    menu.classList.add("hidden");
    menu.classList.remove("animate-fadeUp");
    document.body.classList.remove("overflow-hidden");
  }

  const isOpen = !menu.classList.contains("hidden");

  if (toggleButton) {
    toggleButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (toggleIcon) {
    toggleIcon.classList.toggle("fa-bars", !isOpen);
    toggleIcon.classList.toggle("fa-times", isOpen);
  }

  menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

// FAQ toggle
function toggleFAQ(id) {
  const answer = document.getElementById("answer" + id);
  const icon = document.getElementById("icon" + id);
  const indicator = document.getElementById("indicator" + id);
  const card = document.querySelector(`[data-faq-card="${id}"]`);

  if (!answer || !icon) {
    return;
  }

  const isOpening = answer.classList.contains("hidden");

  if (isOpening) {
    answer.classList.remove("hidden");
    answer.classList.add("animate-fadeUp");
    answer.addEventListener(
      "animationend",
      () => answer.classList.remove("animate-fadeUp"),
      { once: true }
    );
  } else {
    answer.classList.add("hidden");
  }

  icon.classList.toggle("rotate-180", isOpening);

  if (indicator) {
    if (isOpening) {
      indicator.classList.remove(
        "bg-white",
        "border-secondary-200",
        "text-secondary-500",
        "shadow-sm"
      );
      indicator.classList.add(
        "bg-secondary-500",
        "border-secondary-500",
        "text-white",
        "shadow-md"
      );
    } else {
      indicator.classList.add(
        "bg-white",
        "border-secondary-200",
        "text-secondary-500",
        "shadow-sm"
      );
      indicator.classList.remove(
        "bg-secondary-500",
        "border-secondary-500",
        "text-white",
        "shadow-md"
      );
    }
  }

  if (card) {
    if (isOpening) {
      card.classList.remove("bg-gray-50", "border-gray-100", "shadow-sm");
      card.classList.add("bg-white", "border-secondary-200", "shadow-lg");
    } else {
      card.classList.add("bg-gray-50", "border-gray-100", "shadow-sm");
      card.classList.remove(
        "bg-white",
        "border-secondary-200",
        "shadow-lg"
      );
    }
  }
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
  document.body.style.overflow = "auto";
}

// Ferme les modales lors d'un clic sur la zone d'arrière-plan
document.querySelectorAll("[id^='modal']").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal.id);
    }
  });
});

// Ferme les modales avec la touche Échap
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll("[id^='modal']").forEach((modal) => {
      if (!modal.classList.contains("hidden")) {
        closeModal(modal.id);
      }
    });
  }
});

// Smooth scrolling for navigation links
const header = document.querySelector("header");

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (!href) {
      return;
    }

    if (href === "#") {
      e.preventDefault();
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    e.preventDefault();

    if (this.closest("#mobileMenu")) {
      toggleMobileMenu(true);
    }

    const headerHeight = header ? header.offsetHeight : 0;
    const additionalOffset = window.innerWidth < 768 ? 16 : 24;
    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY;
    const finalPosition = Math.max(
      0,
      targetPosition - headerHeight - additionalOffset
    );

    window.scrollTo({
      top: finalPosition,
      behavior: "smooth",
    });
  });
});

// Close mobile menu when clicking on a link
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", function () {
    toggleMobileMenu(true);
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    toggleMobileMenu(true);
  }
});

// Hero parallax effect
const heroImage = document.querySelector("[data-hero-bg]");
if (heroImage) {
  const updateParallax = () => {
    const offset = window.pageYOffset || 0;
    heroImage.style.transform = `translateY(${
      offset * 0.15
    }px) scale(1.08)`;
  };

  updateParallax();

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateParallax);
  });
}

// Testimonial slider
const testimonialSlider = document.querySelector(
  "[data-testimonial-slider]"
);

if (testimonialSlider) {
  const track = testimonialSlider.querySelector("[data-slider-track]");
  const slides = Array.from(track.querySelectorAll("[data-slide]"));
  const prevButton =
    testimonialSlider.querySelector("[data-slider-prev]");
  const nextButton =
    testimonialSlider.querySelector("[data-slider-next]");
  const dotsContainer =
    testimonialSlider.querySelector("[data-slider-dots]");
  let currentIndex = 0;
  let autoplayTimer;

  const createDots = () => {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className =
        "w-2.5 h-2.5 rounded-full bg-accent-200 transition-all duration-300";
      dot.setAttribute("aria-label", `Aller au témoignage ${index + 1}`);
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  };

  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll("button");
    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("bg-primary-500", isActive);
      dot.classList.toggle("bg-accent-200", !isActive);
      dot.classList.toggle("w-6", isActive);
    });
  };

  const goToSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const goToNext = () => {
    goToSlide(currentIndex + 1);
  };

  const goToPrev = () => {
    goToSlide(currentIndex - 1);
  };

  const startAutoplay = () => {
    autoplayTimer = window.setInterval(goToNext, 7000);
  };

  const stopAutoplay = () => {
    window.clearInterval(autoplayTimer);
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      goToPrev();
      resetAutoplay();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      goToNext();
      resetAutoplay();
    });
  }

  testimonialSlider.addEventListener("mouseenter", stopAutoplay);
  testimonialSlider.addEventListener("mouseleave", resetAutoplay);

  createDots();
  goToSlide(0);
  startAutoplay();
}

// Animated sections on scroll
const animatedSections = document.querySelectorAll("[data-animate]");
if (animatedSections.length) {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;

  if (isMobile) {
    animatedSections.forEach((section) => {
      section.classList.remove("opacity-0", "animate-fadeUp");
    });
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeUp");
            entry.target.addEventListener(
              "animationend",
              () => {
                entry.target.classList.remove(
                  "animate-fadeUp",
                  "opacity-0"
                );
              },
              { once: true }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    animatedSections.forEach((section) => {
      section.classList.add("opacity-0");
      observer.observe(section);
    });
  } else {
    animatedSections.forEach((section) => {
      section.classList.remove("opacity-0", "animate-fadeUp");
    });
  }
}

