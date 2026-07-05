// ============================================
// ELASAM LABS - INTERACTIVE FEATURES
// ============================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    loadThemePreference();
});

// ============================================
// THEME TOGGLE (Dark/Light Mode)
// ============================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    body.classList.toggle('dark-mode');
    
    // Update button icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        body.classList.add('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeToggle) {
            themeToggle.textContent = '🌙';
        }
    }
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

function initSmoothScroll() {
    // Smooth scroll is handled by CSS (scroll-behavior: smooth)
    // This function can be extended for additional scroll effects
    
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.app-card, .principle-card, .contact-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize intersection observer after page load
window.addEventListener('load', initIntersectionObserver);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Detect if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Apply reduced motion if needed
if (prefersReducedMotion()) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cElasam Labs', 'font-size: 24px; font-weight: bold; color: #06b6d4;');
console.log('%cPrivacy-first apps and AI-powered tools', 'font-size: 14px; color: #475569;');
console.log('%cVisit: https://elasamlabs.com', 'font-size: 12px; color: #94a3b8;');
