
window.addEventListener('DOMContentLoaded', event => {
    

    // Fonction pour réduire la barre de navigation
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Réduire la barre de navigation 
    navbarShrink();

    // Réduire la barre de navigation lorsque la page est défilée
    document.addEventListener('scroll', navbarShrink);

    // Activer le scrollspy Bootstrap sur l'élément de navigation principale
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Réduire la barre de navigation responsive lorsque le bouton de bascule est visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
window.addEventListener('DOMContentLoaded', event => {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('#mainNav');
        if (window.scrollY > 0) {
            navbar.classList.add('hide-on-scroll');
        } else {
            navbar.classList.remove('hide-on-scroll');
        }
    });

    // Reste de votre code...
});
