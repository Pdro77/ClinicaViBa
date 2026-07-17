// ViBa Clínica del Dolor — shared behavior for index.html and tratamientos.html

document.addEventListener('DOMContentLoaded', () => {
    // Footer copyright year
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('hidden') === false;
            mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
            mobileMenuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        // Escape key closes the mobile menu and returns focus to the toggle
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
                mobileMenuButton.focus();
            }
        });
    }

    // Smooth scroll for in-page anchors (links to other pages pass through untouched).
    // Respects prefers-reduced-motion and moves keyboard focus to the target
    // so Tab continues from the destination instead of the top of the page.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                if (mobileMenuButton) {
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    mobileMenuButton.setAttribute('aria-label', 'Abrir menú');
                }
            }
            target.scrollIntoView({ behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        });
    });

    // Contact form: submit via fetch so we can show inline pending/success/error states
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitButton = document.getElementById('contact-submit-button');
        const submitLabel = submitButton ? submitButton.querySelector('.submit-label') : null;
        const status = document.getElementById('contact-form-status');
        const defaultLabel = submitLabel ? submitLabel.textContent : '';

        const setStatus = (message, kind) => {
            if (!status) return;
            status.textContent = message;
            status.classList.remove('is-success', 'is-error');
            if (kind) {
                status.classList.add(kind === 'success' ? 'is-success' : 'is-error');
                status.classList.add('is-visible');
            } else {
                status.classList.remove('is-visible');
            }
        };

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.classList.add('is-loading');
            }
            if (submitLabel) submitLabel.textContent = 'Enviando...';
            setStatus('', null);

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { Accept: 'application/json' },
                });

                if (response.ok) {
                    setStatus('Recibimos tu mensaje. Te contactaremos dentro de las próximas 24 horas.', 'success');
                    contactForm.reset();
                } else {
                    setStatus('No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp al (502) 4013-5131.', 'error');
                }
            } catch (err) {
                setStatus('No pudimos enviar tu mensaje. Revisa tu conexión o escríbenos por WhatsApp al (502) 4013-5131.', 'error');
            } finally {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.classList.remove('is-loading');
                }
                if (submitLabel) submitLabel.textContent = defaultLabel;
            }
        });
    }

    // Header shadow once the page scrolls past the top
    const header = document.getElementById('header');
    if (header) {
        const updateHeaderState = () => {
            header.classList.toggle('is-scrolled', window.scrollY > 8);
        };
        updateHeaderState();
        window.addEventListener('scroll', updateHeaderState, { passive: true });
    }

    // Scroll-reveal: animate .reveal elements in as they enter the viewport.
    // Elements already inside the viewport on load are revealed immediately so
    // above-the-fold content never depends on the observer firing.
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
            revealTargets.forEach((el) => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('is-visible');
                } else {
                    observer.observe(el);
                }
            });
        } else {
            revealTargets.forEach((el) => el.classList.add('is-visible'));
        }
    }
});
