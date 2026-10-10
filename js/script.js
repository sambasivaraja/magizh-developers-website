document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple sticky header effect enhancement (optional, CSS handles most of it)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
        } else {
            header.style.padding = '1rem 0';
        }
    });

    // Form submission handler (Placeholder)
    //const form = document.querySelector('.contact-form');
    //if (form) {
    //    form.addEventListener('submit', (e) => {
    //        e.preventDefault();
    //        alert('Thank you for your interest! We will contact you soon.');
    //        form.reset();
    //    });
    //}
    // Stats Counter Animation
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counter');
    let started = false; // Function started ? No

    function startCount(el) {
        let goal = el.dataset.target;
        let count = setInterval(() => {
            el.textContent++;
            if (el.textContent == goal) {
                clearInterval(count);
            }
        }, 2000 / goal); // Adjust speed
    }

    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                counters.forEach(counter => startCount(counter));
                started = true;
            }
        });
        observer.observe(statsSection);
    }

    // Initialize Slick Carousel for Gallery
    if (typeof jQuery !== 'undefined' && jQuery.fn.slick) {
        jQuery('.gallery-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev">←</button>',
            nextArrow: '<button type="button" class="slick-next">→</button>',
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false
                    }
                }
            ]
        });
    }
});

// Modal Functions
function showThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Reset form
        const form = document.querySelector('.contact-form');
        if (form) {
            form.reset();
        }

        // Reset submitted flag
        submitted = false;
    }
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Initialize Gallery Image Click Handlers for Lightbox
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach(img => {
            img.addEventListener('click', function (e) {
                e.stopPropagation(); // Prevent carousel navigation
                openLightbox(this.src, this.alt);
            });
        });
    }, 500); // Wait for Slick to initialize
});

// Lightbox Functions
function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (lightbox && lightboxImage) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = imageAlt;
        lightboxCaption.textContent = imageAlt;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close lightbox when clicking on overlay or pressing Escape
document.addEventListener('DOMContentLoaded', () => {
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeThankYouModal();
            closeLightbox();
        }
    });
});
