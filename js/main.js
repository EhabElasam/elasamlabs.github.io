/**
 * Elasam Labs - Main JavaScript
 * Modern, lightweight, and performant
 */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initIntersectionObserver();
    initAccessibility();
    initLanguageSwitcher();
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
    
    // Theme toggle listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark-mode');
                updateThemeIcon(true);
            } else {
                document.body.classList.remove('dark-mode');
                updateThemeIcon(false);
            }
        }
    });
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        const isActive = navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active', isActive);
        menuToggle.setAttribute('aria-expanded', isActive);
    });
    
    // Close menu when clicking on a link
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        });
    });
    
    // Close menu on Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// INTERSECTION OBSERVER
// ============================================

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.app-card, .principle-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// ============================================
// ACCESSIBILITY
// ============================================

function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--accent-primary);
        color: white;
        padding: 8px;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for buttons
    document.querySelectorAll('button, a').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.tagName === 'BUTTON') {
                this.click();
            }
        });
    });
}

// ============================================
// PERFORMANCE
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ============================================
// LANGUAGE SWITCHER
// ============================================

function initLanguageSwitcher() {
    const langEnBtn = document.getElementById('lang-en');
    const langDeBtn = document.getElementById('lang-de');

    if (!langEnBtn || !langDeBtn) return;

    const currentPath = window.location.pathname;
    const isGermanPage = currentPath.includes('.de.html');
    const isArabicPage = currentPath.includes('.ar.html');

    const langArBtn = document.getElementById('lang-ar');

    if (isGermanPage) {
        langDeBtn.classList.add('active');
        langEnBtn.classList.remove('active');
        if (langArBtn) langArBtn.classList.remove('active');
    } else if (isArabicPage) {
        if (langArBtn) langArBtn.classList.add('active');
        langEnBtn.classList.remove('active');
        langDeBtn.classList.remove('active');
    } else {
        langEnBtn.classList.add('active');
        langDeBtn.classList.remove('active');
        if (langArBtn) langArBtn.classList.remove('active');
    }

    langEnBtn.addEventListener('click', () => {
        if (isGermanPage) {
            window.location.href = currentPath.replace('.de.html', '.html');
        } else if (isArabicPage) {
            window.location.href = currentPath.replace('.ar.html', '.html');
        } else if (currentPath.includes('pdf-offline.html')) {
            window.location.href = '/pdf-offline.html';
        } else {
            window.location.href = '/index.html';
        }
    });

    langDeBtn.addEventListener('click', () => {
        if (!isGermanPage) {
            if (currentPath.includes('pdf-offline.html')) {
                window.location.href = '/pdf-offline.de.html';
            } else if (currentPath.includes('pdf-offline.ar.html')) {
                window.location.href = '/pdf-offline.de.html';
            } else if (isArabicPage) {
                window.location.href = '/index.de.html';
            } else {
                window.location.href = '/index.de.html';
            }
        }
    });

    if (langArBtn) {
        langArBtn.addEventListener('click', () => {
            if (!isArabicPage) {
                if (currentPath.includes('pdf-offline.html')) {
                    window.location.href = '/pdf-offline.ar.html';
                } else if (currentPath.includes('pdf-offline.de.html')) {
                    window.location.href = '/pdf-offline.ar.html';
                } else if (isGermanPage) {
                    window.location.href = '/index.ar.html';
                } else {
                    window.location.href = '/index.ar.html';
                }
            }
        });
    }
}

// ============================================
// UTILITIES
// ============================================

// Check for reduced motion preference
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Apply reduced motion if needed
if (prefersReducedMotion()) {
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
}

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}
