// ViBa Clínica del Dolor — shared behavior for index.html and tratamientos.html

document.addEventListener('DOMContentLoaded', () => {
    // Icons
    if (window.lucide) lucide.createIcons();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll for in-page anchors (links to other pages pass through untouched)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            if (mobileMenu) mobileMenu.classList.add('hidden');
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Header shadow once the page scrolls past the top
    const header = document.getElementById('header');
    if (header) {
        const updateHeaderState = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        updateHeaderState();
        window.addEventListener('scroll', updateHeaderState, { passive: true });
    }

    // Scroll-reveal: animate .reveal elements in as they enter the viewport
    const revealTargets = document.querySelectorAll('.reveal');
    if (revealTargets.length) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
            revealTargets.forEach((el) => observer.observe(el));
        } else {
            revealTargets.forEach((el) => el.classList.add('is-visible'));
        }
    }
});
