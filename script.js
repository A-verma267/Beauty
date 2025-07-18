tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#e91e63',
                'primary-dark': '#c2185b'
            }
        }
    }
}
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const closeMenuBtn = document.getElementById('closeMenuBtn');
        const menuBackdrop = document.getElementById('menuBackdrop');

        // Function to open mobile menu
        function openMobileMenu() {
            mobileMenuOverlay.classList.remove('menu-slide-out');
            mobileMenuOverlay.classList.add('menu-slide-in');
        }

        // Function to close mobile menu
        function closeMobileMenu() {
            mobileMenuOverlay.classList.remove('menu-slide-in');
            mobileMenuOverlay.classList.add('menu-slide-out');
        }

        // Event listeners
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        closeMenuBtn.addEventListener('click', closeMobileMenu);
        menuBackdrop.addEventListener('click', closeMobileMenu);

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });

        // Prevent scrolling when menu is open
        function toggleBodyScroll(disable) {
            if (disable) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }

        // Update event listeners to handle body scroll
        mobileMenuBtn.addEventListener('click', function() {
            openMobileMenu();
            toggleBodyScroll(true);
        });

        closeMenuBtn.addEventListener('click', function() {
            closeMobileMenu();
            toggleBodyScroll(false);
        });

        menuBackdrop.addEventListener('click', function() {
            closeMobileMenu();
            toggleBodyScroll(false);
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024) { // lg breakpoint
                closeMobileMenu();
                toggleBodyScroll(false);
            }
        });
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoPlayInterval = null;
        this.direction = 'forward'; // Track current direction: 'forward' or 'reverse'

        this.init();
    }

    init() {
        this.setupSlides();
        this.bindEvents();
        this.startAutoPlay();
    }

    setupSlides() {
        this.slides.forEach((slide, index) => {
            if (index === 0) {
                slide.style.transform = 'translateX(0%)';
            } else {
                slide.style.transform = 'translateX(100%)';
            }
        });
    }

    updateSlidePositions() {
        this.slides.forEach((slide, index) => {
            let position;
            
            if (index === this.currentSlide) {
                position = 0;
            } else if (index <= this.currentSlide) {
                position = -100;
            } else {
                position = 100;
            }
            slide.style.transform = `translateX(${position}%)`;
        });

        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.add('active');
                dot.classList.remove('bg-opacity-50');
                dot.classList.add('bg-white');
            } else {
                dot.classList.remove('active');
                dot.classList.add('bg-opacity-50');
            }
        });
    }

    goToSlide(slideIndex) {
        if (this.isAnimating) return;

        this.isAnimating = true;
        this.currentSlide = slideIndex;
        this.updateSlidePositions();

        setTimeout(() => {
            this.isAnimating = false;
        }, 800);
    }

    nextSlide() {
        if (this.isAnimating) return;

        let nextIndex;
        
        if (this.direction === 'forward') {
            if (this.currentSlide === this.totalSlides - 1) {
                // At last slide, switch to reverse direction
                this.direction = 'reverse';
                nextIndex = this.currentSlide - 1;
            } else {
                // Continue forward
                nextIndex = this.currentSlide + 1;
            }
        } else { // direction === 'reverse'
            if (this.currentSlide === 0) {
                // At first slide, switch to forward direction
                this.direction = 'forward';
                nextIndex = this.currentSlide + 1;
            } else {
                // Continue reverse
                nextIndex = this.currentSlide - 1;
            }
        }

        this.goToSlide(nextIndex);
    }

    prevSlide() {
        if (this.isAnimating) return;

        let prevIndex;
        
        if (this.direction === 'forward') {
            if (this.currentSlide === 0) {
                // At first slide, switch to reverse direction
                this.direction = 'reverse';
                prevIndex = this.currentSlide + 1;
            } else {
                // Continue backward (reverse of forward)
                prevIndex = this.currentSlide - 1;
            }
        } else { // direction === 'reverse'
            if (this.currentSlide === this.totalSlides - 1) {
                // At last slide, switch to forward direction
                this.direction = 'forward';
                prevIndex = this.currentSlide - 1;
            } else {
                // Continue backward (reverse of reverse = forward)
                prevIndex = this.currentSlide + 1;
            }
        }

        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    bindEvents() {
        // Arrow navigation
        this.nextBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.nextSlide();
            this.startAutoPlay();
        });

        this.prevBtn.addEventListener('click', () => {
            this.stopAutoPlay();
            this.prevSlide();
            this.startAutoPlay();
        });

        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            }
        });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        heroSection.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        heroSection.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isSwipe = false;

        heroSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipe = false;
        });

        heroSection.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const diffX = Math.abs(e.touches[0].clientX - startX);
            const diffY = Math.abs(e.touches[0].clientY - startY);

            if (diffX > diffY && diffX > 30) {
                isSwipe = true;
            }
        });

        heroSection.addEventListener('touchend', (e) => {
            if (!startX || !startY || !isSwipe) return;

            const diffX = e.changedTouches[0].clientX - startX;

            if (Math.abs(diffX) > 50) {
                this.stopAutoPlay();
                if (diffX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
                this.startAutoPlay();
            }

            startX = 0;
            startY = 0;
            isSwipe = false;
        });
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});
// Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);

        // Wait for DOM to be ready
        document.addEventListener('DOMContentLoaded', function() {
            // Header animations
            gsap.timeline()
                .to('.salon-header', {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                })
                .to('.salon-location', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.5")
                .to('.salon-hours', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.4")
                .to('.salon-social', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.3");

            // Navigation animations
            gsap.timeline({
                delay: 0.3
            })
                .to('.salon-nav', {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                })
                .to('.salon-logo', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.4")
                .to('.salon-menu', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.3")
                .to('.salon-phone', {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power2.out"
                }, "-=0.2");

            // Hero section animations with ScrollTrigger
            ScrollTrigger.create({
                trigger: '.salon-hero',
                start: 'top 80%',
                onEnter: () => {
                    gsap.timeline()
                        .to('.salon-hero', {
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out"
                        })
                        .to('.salon-content', {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: "power2.out"
                        }, "-=0.8")
                        .to('.salon-button', {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "back.out(1.7)"
                        }, "-=0.4")
                        .to('.salon-nav-arrow', {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            ease: "back.out(1.7)",
                            stagger: 0.1
                        }, "-=0.3")
                        .to('.salon-dots', {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out"
                        }, "-=0.2");
                }
            });


            // Hover animations for buttons
            const buttons = document.querySelectorAll('.salon-button');
            buttons.forEach(button => {
                button.addEventListener('mouseenter', () => {
                    gsap.to(button, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                button.addEventListener('mouseleave', () => {
                    gsap.to(button, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Hover animations for navigation arrows
            const navArrows = document.querySelectorAll('.salon-nav-arrow');
            navArrows.forEach(arrow => {
                arrow.addEventListener('mouseenter', () => {
                    gsap.to(arrow, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
                
                arrow.addEventListener('mouseleave', () => {
                    gsap.to(arrow, {
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    });
                });
            });

            // Social media icons hover effect
            const socialIcons = document.querySelectorAll('.salon-social i');
            socialIcons.forEach(icon => {
                icon.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotation: 360,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
                
                icon.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                });
            });
        });

         gsap.timeline({
            scrollTrigger: {
                trigger: ".services-hero",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })
        .from(".services-title", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        })
        .from(".services-divider", {
            opacity: 0,
            scaleX: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .from(".service-card", {
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        }, "-=0.2");

        // Service card hover animations
        gsap.utils.toArray(".service-card").forEach((card) => {
            const icon = card.querySelector(".service-icon i");
            const underline = card.querySelector(".service-underline");
            
            card.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    scale: 1.2,
                    rotation: 5,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(underline, {
                    scaleX: 1.5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(underline, {
                    scaleX: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Portfolio Section Animations
        gsap.timeline({
            scrollTrigger: {
                trigger: ".portfolio-hero",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })
        .from(".portfolio-title", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        })
        .from(".portfolio-divider", {
            opacity: 0,
            scaleX: 0,
            duration: 0.6,
            ease: "power2.out"
        }, "-=0.3")
        .from(".portfolio-item", {
            opacity: 0,
            y: 80,
            scale: 0.8,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.2");

        // Portfolio item hover animations
        gsap.utils.toArray(".portfolio-item").forEach((item) => {
            const img = item.querySelector("img");
            
            item.addEventListener("mouseenter", () => {
                gsap.to(item, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(img, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            item.addEventListener("mouseleave", () => {
                gsap.to(item, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
                gsap.to(img, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Secondary services grid animation
        
        gsap.from(".services-grid-secondary .service-card", {
            scrollTrigger: {
                trigger: ".services-grid-secondary",
                start: "top 85%",
                end: "bottom 20%",
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Parallax effect for sections
        gsap.to(".services-hero", {
            scrollTrigger: {
                trigger: ".services-hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -50,
            ease: "none"
        });

        gsap.to(".portfolio-hero", {
            scrollTrigger: {
                trigger: ".portfolio-hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            },
            y: -30,
            ease: "none"
        });
         gsap.to(".pricing-hero", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".pricing-hero",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate pricing divider
        gsap.to(".pricing-divider", {
            opacity: 1,
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.2,
            scrollTrigger: {
                trigger: ".pricing-divider",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate pricing tabs
        gsap.to(".pricing-tabs", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
                trigger: ".pricing-tabs",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate pricing items with stagger
        gsap.to(".pricing-item", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: ".pricing-item",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate CTA section
        gsap.to(".cta-container", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".cta-container",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate footer section
        gsap.to(".footer-section", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".footer-section",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate footer columns with stagger
        gsap.to(".footer-column", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            delay: 0.2,
            scrollTrigger: {
                trigger: ".footer-column",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate Instagram images
        gsap.to(".instagram-image", {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.4,
            scrollTrigger: {
                trigger: ".instagram-image",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate opening hours
        gsap.to(".opening-hours", {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.3,
            scrollTrigger: {
                trigger: ".opening-hours",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate social icons
        gsap.to(".social-icon", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.5,
            scrollTrigger: {
                trigger: ".social-icon",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Animate footer bottom
        gsap.to(".footer-bottom", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.6,
            scrollTrigger: {
                trigger: ".footer-bottom",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Add hover animations for interactive elements
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // Add hover animations for social icons
        document.querySelectorAll('.social-icon').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
            
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });