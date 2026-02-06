/* ==========================================================================
   NOME CATERING - Main JavaScript
   Vanilla JS for all interactive functionality
   ========================================================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initLucideIcons();
    initScrollReveal();
    initMobileMenu();
    initStickyNav();
    initGalleryFilter();
    initTestimonialSlider();
    initFaqAccordion();
    initLightbox();
    initMultiStepForm();
    initSmoothScroll();
});

/* --------------------------------------------------------------------------
   Initialize Lucide Icons
   -------------------------------------------------------------------------- */
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/* --------------------------------------------------------------------------
   Scroll Reveal Animation (Intersection Observer)
   -------------------------------------------------------------------------- */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --------------------------------------------------------------------------
   Mobile Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const closeButton = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!menuButton || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add('open');
        if (menuOverlay) menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuButton.addEventListener('click', openMenu);
    if (closeButton) closeButton.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
}

/* --------------------------------------------------------------------------
   Sticky Navigation
   -------------------------------------------------------------------------- */
function initStickyNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove background on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show nav on scroll direction (optional)
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

/* --------------------------------------------------------------------------
   Gallery Filtering
   -------------------------------------------------------------------------- */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const itemCategory = item.dataset.category;

                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// Legacy function for inline onclick (backwards compatibility)
function filterGallery(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(category) || btn.dataset.filter === category) {
            btn.classList.add('active', 'bg-nero', 'text-white', 'border-nero');
            btn.classList.remove('border-transparent');
        } else {
            btn.classList.remove('active', 'bg-nero', 'text-white', 'border-nero');
            btn.classList.add('border-transparent');
        }
    });

    galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.remove('hidden');
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
                item.classList.add('hidden');
            }, 300);
        }
    });
}

/* --------------------------------------------------------------------------
   Testimonial Slider
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
    const container = document.getElementById('testimonial-container');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (!container) return;

    // Testimonials data (can be overridden by page-specific data)
    const testimonials = window.testimonialData || [
        {
            text: "Un servizio impeccabile! Hanno curato il catering per il battesimo di mio figlio con professionalit\u00e0 e gusto raffinato. Tutti gli invitati erano entusiasti.",
            author: "Giulia M.",
            event: "Battesimo",
            location: "Roma Nord"
        },
        {
            text: "Fantastici per la festa di compleanno dei miei bambini. Pizzette buonissime, tutto fresco e presentato in modo splendido. Consigliatissimi!",
            author: "Marco R.",
            event: "Festa Bambini",
            location: "Cassia"
        },
        {
            text: "Professionali e creativi. Il buffet per i 18 anni di mia figlia era elegante e delizioso. Il servizio a domicilio puntualissimo.",
            author: "Elena B.",
            event: "18esimo",
            location: "Fleming"
        }
    ];

    let currentIndex = 0;
    let autoSlideInterval;

    function renderTestimonial() {
        const t = testimonials[currentIndex];
        container.innerHTML = `
            <div class="flex flex-col items-center text-center transition-all duration-500">
                <svg class="w-10 h-10 text-rosa mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"/>
                </svg>
                <p class="text-xl md:text-2xl font-heading text-testo mb-6 italic leading-relaxed">"${t.text}"</p>
                <div>
                    <h4 class="font-bold text-lg">${t.author}</h4>
                    <span class="text-rosa text-sm font-medium">${t.event} - ${t.location}</span>
                </div>
            </div>
        `;

        if (dotsContainer) {
            dotsContainer.innerHTML = testimonials.map((_, idx) => `
                <button
                    onclick="setTestimonial(${idx})"
                    class="w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-rosa w-6' : 'bg-gray-300'}"
                    aria-label="Vai alla testimonianza ${idx + 1}"
                ></button>
            `).join('');
        }
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        renderTestimonial();
    }

    function setTestimonial(index) {
        currentIndex = index;
        renderTestimonial();
        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    // Global function for onclick
    window.setTestimonial = setTestimonial;

    // Initialize
    renderTestimonial();
    autoSlideInterval = setInterval(nextTestimonial, 5000);

    // Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    container.addEventListener('mouseleave', resetAutoSlide);
}

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Lightbox
   -------------------------------------------------------------------------- */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.getElementById('lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-item img');

    if (!lightbox || galleryImages.length === 0) return;

    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
}

/* --------------------------------------------------------------------------
   Multi-Step Form
   -------------------------------------------------------------------------- */
function initMultiStepForm() {
    const form = document.getElementById('multi-step-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const progressFill = form.querySelector('.progress-fill');
    const prevBtn = form.querySelector('.prev-btn');
    const nextBtn = form.querySelector('.next-btn');
    const submitBtn = form.querySelector('.submit-btn');

    let currentStep = 0;
    const totalSteps = steps.length;

    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });

        // Update progress bar
        const progress = ((index + 1) / totalSteps) * 100;
        if (progressFill) progressFill.style.width = `${progress}%`;

        // Update buttons
        if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'block';
        if (nextBtn) nextBtn.style.display = index === totalSteps - 1 ? 'none' : 'block';
        if (submitBtn) submitBtn.style.display = index === totalSteps - 1 ? 'block' : 'none';
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    }

    showStep(0);
}

/* --------------------------------------------------------------------------
   Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = document.getElementById('navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Utility: Debounce
   -------------------------------------------------------------------------- */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* --------------------------------------------------------------------------
   Utility: Lazy Load Images
   -------------------------------------------------------------------------- */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoad);
