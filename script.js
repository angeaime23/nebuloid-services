// script.js - Vanilla JavaScript pour Nebuloid Services

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile (hamburger)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll pour les liens internes (désactivé car pages séparées)
    // const internalLinks = document.querySelectorAll('a[href^="#"]');

    // internalLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href').substring(1);
    //         const targetElement = document.getElementById(targetId);

    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start'
    //             });
    //         }

    //         // Fermer le menu mobile après clic
    //         if (navLinks.classList.contains('active')) {
    //             navLinks.classList.remove('active');
    //         }
    //     });
    // });

    // Validation du formulaire de contact
    const contactForm = document.querySelector('#contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.querySelector('#contact input[name="name"]').value.trim();
            const email = document.querySelector('#contact input[name="email"]').value.trim();
            const message = document.querySelector('#contact textarea[name="message"]').value.trim();

            // Vérifications
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Erreur : Tous les champs doivent être remplis.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Erreur : Veuillez entrer une adresse email valide.');
                return;
            }

            // Si tout est valide, laisser Formspree gérer la soumission
        });
    }

    // Effet de changement de classe sur le header au scroll
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Animation de compteur (optionnel - si des statistiques sont ajoutées)
    // Exemple : si vous ajoutez <span class="counter" data-target="100">0</span>
    const counters = document.querySelectorAll('.counter');

    if (counters.length > 0) {
        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(counter), 10);
            } else {
                counter.innerText = target;
            }
        };

        // Intersection Observer pour déclencher l'animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // Portfolio animation on scroll
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (portfolioItems.length > 0) {
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    portfolioObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        portfolioItems.forEach(item => {
            portfolioObserver.observe(item);
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
        // Open lightbox on image click
        document.querySelectorAll('.portfolio-item img').forEach(img => {
            img.addEventListener('click', function() {
                const item = this.parentElement;
                const title = item.querySelector('h3').textContent;
                const description = item.querySelector('p').textContent;

                lightboxImage.src = this.src;
                lightboxImage.alt = this.alt;
                lightboxTitle.textContent = title;
                lightboxDescription.textContent = description;

                lightbox.classList.add('show');
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('show');
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) {
                closeLightbox();
            }
        });
    }
});