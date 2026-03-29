// script.js - Version corrigée et optimisée
document.addEventListener('DOMContentLoaded', function() {
    // ================= MENU HAMBURGER =================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        const toggleMenu = function(e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
            // Changer l'icône
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        };
        // Écouteurs pour click et touch (meilleure compatibilité mobile)
        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('touchstart', toggleMenu);
    }

    // Fermer le menu quand on clique sur un lien
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        const closeMenu = function() {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        };
        item.addEventListener('click', closeMenu);
        item.addEventListener('touchstart', closeMenu);
    });

    // ================= VALIDATION FORMULAIRE =================
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.querySelector('#contact input[name="name"]');
            const email = document.querySelector('#contact input[name="email"]');
            const message = document.querySelector('#contact textarea[name="message"]');
            let isValid = true;

            [name, email, message].forEach(field => {
                if (field) field.style.borderColor = '#ddd';
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

    // ================= ANIMATION AU SCROLL =================
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
    animateOnScroll();

    // ================= LIGHTBOX =================
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox) {
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

        const closeLightbox = () => {
            lightbox.classList.remove('show');
            document.body.style.overflow = '';
        };
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('show')) closeLightbox();
        });
    }
});

// ================= NOTIFICATIONS =================
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

// ================= STYLES DYNAMIQUES =================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
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

// Recherche locale
let searchIndex = [];

// Charger l'index
fetch('/search-index.json')
    .then(response => response.json())
    .then(data => {
        searchIndex = data;
    })
    .catch(err => console.error('Erreur chargement index recherche:', err));

// Éléments DOM
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results');

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.trim().toLowerCase();
        if (term === '') {
            resultsContainer.style.display = 'none';
            resultsContainer.innerHTML = '';
            return;
        }

        // Filtrer les pages
        const results = searchIndex.filter(page =>
            page.title.toLowerCase().includes(term) ||
            page.description.toLowerCase().includes(term) ||
            page.keywords.toLowerCase().includes(term)
        );

        // Afficher les résultats
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result-item">Aucun résultat</div>';
        } else {
            resultsContainer.innerHTML = results.map(page => `
                <div class="search-result-item">
                    <a href="${page.url}">${page.title}</a>
                    <small>${page.description.substring(0, 80)}...</small>
                </div>
            `).join('');
        }
        resultsContainer.style.display = 'block';
    });

    // Cacher les résultats en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
}
