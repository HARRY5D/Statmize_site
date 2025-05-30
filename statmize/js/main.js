/*
 * STATmize Landing Page JavaScript
 * Features:
 * - Preloader
 * - Navigation Highlighting
 * - Smooth Scrolling
 * - Mobile Navigation
 * - Scroll Reveal Animations
 * - Testimonial Slider
 * - Counter Animation
 * - Theme Toggle
 * - Parallax Effect
 * - Contact Section
 * - Service Worker Registration (PWA Support)
 */

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initScrollHighlight();
    initMobileNav();
    initScrollReveal();
    initTestimonialSlider();
    initCounters();
    initThemeToggle();
    initParallaxEffect();
    initFormValidation();
    initScrollToTop();
});

// Preloader Animation
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });
}

// Navigation Highlighting on Scroll
function initScrollHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Add/remove header background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Determine current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // Highlight current nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Toggle hamburger animation
            hamburger.classList.toggle('active');
            
            // Toggle nav menu
            navLinks.classList.toggle('active');
            
            // Animate links
            navLinksItems.forEach((link, index) => {
                if (link.style.transitionDelay) {
                    link.style.transitionDelay = '';
                } else {
                    link.style.transitionDelay = `${0.1 * index}s`;
                }
            });
        });

        // Close menu when clicking a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                navLinksItems.forEach(link => {
                    link.style.transitionDelay = '';
                });
            });
        });
    }
}

// Scroll Reveal Animations
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        reveals.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check initially as well
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    
    if (testimonials.length === 0) return;
    
    // Function to show specific testimonial
    const showTestimonial = (index) => {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    };
    
    // Set click events for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto slide
    const autoSlide = () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    };
    
    // Start auto sliding
    let intervalId = setInterval(autoSlide, 5000);
    
    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            intervalId = setInterval(autoSlide, 5000);
        });
    }
    
    // Initialize the first slide
    showTestimonial(0);
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCount(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    // Use Intersection Observer to start counting when visible
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counter.innerText = '0';
        observer.observe(counter);
    });
}

// Theme Toggle
function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Check for saved theme preference or use device preference
    const getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Set theme on initial load
    const currentTheme = getCurrentTheme();
    if (currentTheme === 'dark') {
        document.body.classList.replace('light-mode', 'dark-mode');
    }
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Toggle theme class on body
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
            
            // Save preference to localStorage
            const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
        });
    });
}

// Enhanced Parallax Effect
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    // Mouse move parallax
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        parallaxElements.forEach(element => {
            const depth = 20;
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });
    
    // Scroll parallax for feature cards and gallery items
    const featureCards = document.querySelectorAll('.feature-card');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Apply subtle transition to feature cards on scroll (no rotation)
        featureCards.forEach((card, index) => {
            // Removed rotation for steady appearance
            const translateY = Math.sin(scrollY * 0.002 + index) * 3;
            
            card.style.transform = `translateY(${translateY}px)`;
        });
        
        // Apply subtle scale effect to gallery items on scroll
        galleryItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const distance = window.innerHeight - rect.top;
                const scale = 1 + Math.min(distance / 1000, 0.1);
                item.style.transform = `scale(${scale})`;
            }
        });
    });
}

// Form Validation & Submission
function initFormValidation() {
    // This function used to handle the contact form validation and submission
    // Since we're now using direct contact information instead of a form,
    // we'll leave this function empty but keep it to maintain code structure
    console.log('Contact section initialized with direct contact information.');
}

// Scroll to Top Button
function initScrollToTop() {
    // Create the button element
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    // Add button styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-top-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        @media screen and (max-width: 576px) {
            .scroll-top-btn {
                width: 40px;
                height: 40px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // Add click event
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
