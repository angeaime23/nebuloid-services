// script.js - Version améliorée
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile (hamburger) - CORRECTION
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Changer l'icône du menu
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
    alert('JavaScript chargé !');  // test
    // reste du code...
});
    const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
    console.log('Bouton trouvé');
    menuToggle.addEventListener('click', function() {
        alert('Clic détecté !');
        // le reste
    });
} else {
    console.log('Bouton non trouvé');
}
    

    // Fermer le menu mobile lors du clic sur un lien
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Smooth scroll pour les ancres (si présentes sur la même page)
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Validation du formulaire de contact avec feedback visuel
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.querySelector('#contact input[name="name"]');
            const email = document.querySelector('#contact input[name="email"]');
            const message = document.querySelector('#contact textarea[name="message"]');
            let isValid = true;

            // Réinitialiser les styles d'erreur
            [name, email, message].forEach(field => {
                field.style.borderColor = '#ddd';
            });

            if (!name.value.trim()) {
                name.style.borderColor = '#dc3545';
                isValid = false;
            }

            if (!email.value.trim()) {
                email.style.borderColor = '#dc3545';
                isValid = false;
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value.trim())) {
                    email.style.borderColor = '#dc3545';
                    isValid = false;
                }
            }

            if (!message.value.trim()) {
                message.style.borderColor = '#dc3545';
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
                showNotification('Veuillez remplir tous les champs correctement.', 'error');
            }
        });
    }

    // // Effet de changement de classe sur le header au scroll
    // const header = document.querySelector('header');
    // if (header) {
    //     window.addEventListener('scroll', function() {
    //         if (window.scrollY > 100) {
    //             header.classList.add('scrolled');
    //         } else {
    //             header.classList.remove('scrolled');
    //         }
    //     });
    // }

    // Animation des éléments au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-item, .portfolio-item');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter au chargement

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
                const item = this.closest('.portfolio-item');
                const title = item.querySelector('h3')?.textContent || '';
                const description = item.querySelector('p')?.textContent || '';

                lightboxImage.src = this.src;
                lightboxImage.alt = this.alt;
                lightboxTitle.textContent = title;
                lightboxDescription.textContent = description;

                lightbox.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
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

// Fonction utilitaire pour les notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 24px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    .service-item, .portfolio-item {
        transition: opacity 0.6s ease, transform 0.6s ease;
        opacity: 0;
        transform: translateY(30px);
    }
    .service-item.visible, .portfolio-item.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
