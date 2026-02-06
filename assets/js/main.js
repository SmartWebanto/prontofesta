/* ==========================================================================
   Pronto Festa Roma - Main JavaScript
   Vanilla JS for all interactive functionality
   ========================================================================== */

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
    initLazyLoad();
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
    var revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    var revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) { revealObserver.observe(el); });
}

/* --------------------------------------------------------------------------
   Mobile Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
    var menuButton = document.getElementById('mobile-menu-button');
    var closeButton = document.getElementById('mobile-menu-close');
    var mobileMenu = document.getElementById('mobile-menu');
    var menuOverlay = document.getElementById('mobile-menu-overlay');
    var menuLinks = document.querySelectorAll('.mobile-menu-link');

    if (!menuButton || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add('open');
        if (menuOverlay) menuOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        menuButton.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        mobileMenu.classList.remove('open');
        if (menuOverlay) menuOverlay.classList.remove('open');
        document.body.style.overflow = '';
        menuButton.setAttribute('aria-expanded', 'false');
    }

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', openMenu);
    if (closeButton) closeButton.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

    menuLinks.forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });
}

/* --------------------------------------------------------------------------
   Sticky Navigation
   -------------------------------------------------------------------------- */
function initStickyNav() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var lastScroll = 0;
    var scrollThreshold = 100;

    window.addEventListener('scroll', function() {
        var currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

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
    var filterButtons = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var category = this.dataset.filter;

            filterButtons.forEach(function(btn) { btn.classList.remove('active'); });
            this.classList.add('active');

            galleryItems.forEach(function(item) {
                var itemCategory = item.dataset.category;

                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(function() {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(function() {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   Testimonial Slider
   -------------------------------------------------------------------------- */
function initTestimonialSlider() {
    var container = document.getElementById('testimonial-container');
    var dotsContainer = document.getElementById('testimonial-dots');

    if (!container) return;

    var testimonials = window.testimonialData || [
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

    var currentIndex = 0;
    var autoSlideInterval;

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function renderTestimonial() {
        var t = testimonials[currentIndex];

        var wrapper = document.createElement('div');
        wrapper.className = 'flex flex-col items-center text-center transition-all duration-500';
        wrapper.setAttribute('aria-live', 'polite');

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-10 h-10 text-rosa mb-6');
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('aria-hidden', 'true');
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z');
        svg.appendChild(path);
        wrapper.appendChild(svg);

        var quote = document.createElement('p');
        quote.className = 'text-xl md:text-2xl font-heading text-testo mb-6 italic leading-relaxed';
        quote.textContent = '\u201C' + t.text + '\u201D';
        wrapper.appendChild(quote);

        var authorDiv = document.createElement('div');
        var authorName = document.createElement('h4');
        authorName.className = 'font-bold text-lg';
        authorName.textContent = t.author;
        authorDiv.appendChild(authorName);
        var authorMeta = document.createElement('span');
        authorMeta.className = 'text-rosa-dark text-sm font-medium';
        authorMeta.textContent = t.event + ' - ' + t.location;
        authorDiv.appendChild(authorMeta);
        wrapper.appendChild(authorDiv);

        container.innerHTML = '';
        container.appendChild(wrapper);

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            testimonials.forEach(function(_, idx) {
                var dot = document.createElement('button');
                dot.className = 'w-3 h-3 rounded-full transition-all ' + (idx === currentIndex ? 'bg-rosa w-6' : 'bg-gray-300');
                dot.setAttribute('aria-label', 'Vai alla testimonianza ' + (idx + 1));
                dot.addEventListener('click', function() { setTestimonial(idx); });
                dotsContainer.appendChild(dot);
            });
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

    window.setTestimonial = setTestimonial;

    renderTestimonial();
    autoSlideInterval = setInterval(nextTestimonial, 5000);

    container.addEventListener('mouseenter', function() { clearInterval(autoSlideInterval); });
    container.addEventListener('mouseleave', resetAutoSlide);
}

/* --------------------------------------------------------------------------
   FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(function(item) {
        var question = item.querySelector('.faq-question');
        question.setAttribute('aria-expanded', 'false');

        question.addEventListener('click', function() {
            var isActive = item.classList.contains('active');

            faqItems.forEach(function(i) {
                i.classList.remove('active');
                var q = i.querySelector('.faq-question');
                if (q) q.setAttribute('aria-expanded', 'false');
            });

            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Lightbox
   -------------------------------------------------------------------------- */
function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    var lightboxClose = document.getElementById('lightbox-close');
    var galleryImages = document.querySelectorAll('.gallery-item img');

    if (!lightbox || galleryImages.length === 0) return;

    galleryImages.forEach(function(img) {
        img.style.cursor = 'pointer';
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');

        function openLightbox() {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        img.addEventListener('click', openLightbox);
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') openLightbox();
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
}

/* --------------------------------------------------------------------------
   Multi-Step Form
   -------------------------------------------------------------------------- */
function initMultiStepForm() {
    var form = document.getElementById('multi-step-form');
    if (!form) return;

    var steps = form.querySelectorAll('.form-step');
    var progressFill = form.querySelector('.progress-fill');
    var prevBtn = form.querySelector('.prev-btn');
    var nextBtn = form.querySelector('.next-btn');
    var submitBtn = form.querySelector('.submit-btn');

    var currentStep = 0;
    var totalSteps = steps.length;

    function showStep(index) {
        steps.forEach(function(step, i) {
            step.classList.toggle('active', i === index);
        });

        var progress = ((index + 1) / totalSteps) * 100;
        if (progressFill) progressFill.style.width = progress + '%';

        if (prevBtn) prevBtn.style.display = index === 0 ? 'none' : 'block';
        if (nextBtn) nextBtn.style.display = index === totalSteps - 1 ? 'none' : 'block';
        if (submitBtn) submitBtn.style.display = index === totalSteps - 1 ? 'block' : 'none';
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentStep < totalSteps - 1) {
                currentStep++;
                showStep(currentStep);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
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
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var navbar = document.getElementById('navbar');
                var navHeight = navbar ? navbar.offsetHeight : 0;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* --------------------------------------------------------------------------
   Lazy Load Images
   -------------------------------------------------------------------------- */
function initLazyLoad() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;

    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(function(img) { imageObserver.observe(img); });
    } else {
        lazyImages.forEach(function(img) { img.src = img.dataset.src; });
    }
}
