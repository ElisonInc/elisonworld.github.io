/**
 * ELISON UNIVERSE - CINEMATIC ANIMATIONS
 * GSAP-powered scroll animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded - animations disabled');
        initFallbackAnimations();
        return;
    }
    
    // Register GSAP plugins
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Initialize all animations
    initPageLoader();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initAmbientEffects();
    initOrbitInteractions();
    initMobileMenu();
    initMagneticButtons();
});

/**
 * Page loader animation
 */
function initPageLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    
    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            // Remove from DOM after transition
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }, 800);
    });
    
    // Fallback: hide loader after 3 seconds max
    setTimeout(() => {
        if (!loader.classList.contains('loaded')) {
            loader.classList.add('loaded');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }
    }, 3000);
}

/**
 * Navigation scroll effects
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                // Add/remove scrolled class
                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link, a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    const navLinks = document.getElementById('navLinks');
                    const navToggle = document.getElementById('navToggle');
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        navToggle?.classList.remove('active');
                    }
                }
            }
        });
    });
}

/**
 * Hero entrance animations
 */
function initHeroAnimations() {
    const heroEyebrow = document.querySelector('.hero-eyebrow');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    // Use GSAP if available
    if (typeof gsap !== 'undefined') {
        const heroTl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            delay: 0.1 // Minimal delay for snappy feel
        });

        if (heroEyebrow) {
            heroTl.from(heroEyebrow, {
                y: 20,
                opacity: 0,
                duration: 0.5
            });
        }

        if (heroTitle) {
            heroTl.from(heroTitle.querySelectorAll('.line'), {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08
            }, '-=0.3');
        }

        if (heroSubtitle) {
            heroTl.from(heroSubtitle, {
                y: 20,
                opacity: 0,
                duration: 0.5
            }, '-=0.4');
        }

        if (heroCta) {
            heroTl.from(heroCta, {
                y: 15,
                opacity: 0,
                duration: 0.4
            }, '-=0.3');
        }

        if (heroScrollIndicator) {
            heroTl.from(heroScrollIndicator, {
                opacity: 0,
                duration: 0.5
            }, '-=0.2');
        }
        
        // Parallax effect on hero title
        if (typeof ScrollTrigger !== 'undefined' && heroTitle) {
            gsap.to(heroTitle, {
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: 100,
                opacity: 0.3
            });
        }
    } else {
        // Fallback: show elements immediately
        [heroEyebrow, heroTitle, heroSubtitle, heroCta, heroScrollIndicator].forEach(el => {
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'none';
            }
        });
    }
}

/**
 * Scroll-triggered animations for sections
 */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        // Fallback: show all animated elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }
    
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Universe section
    const universeText = document.querySelector('.universe-text');
    const universeVisual = document.querySelector('.universe-visual');
    
    if (universeText) {
        gsap.from(universeText, {
            scrollTrigger: {
                trigger: '.universe',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    if (universeVisual) {
        gsap.from(universeVisual, {
            scrollTrigger: {
                trigger: '.universe',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            x: 50,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out'
        });
    }
    
    // Entity cards with stagger
    const entityCards = document.querySelectorAll('.entity-card');
    if (entityCards.length > 0) {
        gsap.from(entityCards, {
            scrollTrigger: {
                trigger: '.entities-grid',
                start: 'top 75%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
    
    // Philosophy section
    const blockquote = document.querySelector('blockquote');
    const constellation = document.querySelector('.constellation');
    
    if (blockquote) {
        gsap.from(blockquote, {
            scrollTrigger: {
                trigger: '.philosophy',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }
    
    if (constellation) {
        gsap.from(constellation, {
            scrollTrigger: {
                trigger: '.philosophy',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            delay: 0.3,
            ease: 'power3.out'
        });
    }
    
    // Connect section
    const connectLead = document.querySelector('.connect-lead');
    const connectActions = document.querySelector('.connect-actions');
    const connectSocial = document.querySelector('.connect-social');
    
    if (connectLead) {
        gsap.from(connectLead, {
            scrollTrigger: {
                trigger: '.connect',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    }
    
    if (connectActions) {
        gsap.from(connectActions, {
            scrollTrigger: {
                trigger: '.connect',
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out'
        });
    }
    
    if (connectSocial) {
        gsap.from(connectSocial.querySelectorAll('.social-link'), {
            scrollTrigger: {
                trigger: connectSocial,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
    
    // Footer
    const footerInner = document.querySelector('.footer-inner');
    if (footerInner) {
        gsap.from(footerInner, {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    }
}

/**
 * Ambient background effects
 */
function initAmbientEffects() {
    const ambientGlow = document.querySelector('.ambient-glow');
    if (!ambientGlow) return;
    
    let mouseX = 50;
    let mouseY = 50;
    let currentX = 50;
    let currentY = 50;
    let isActive = true;
    let rafId = null;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    }, { passive: true });
    
    // Smooth animation loop
    function updateAmbientGlow() {
        if (!isActive) return;
        
        // Lerp for smooth following
        currentX += (mouseX - currentX) * 0.03;
        currentY += (mouseY - currentY) * 0.03;
        
        document.documentElement.style.setProperty('--mouse-x', `${currentX}%`);
        document.documentElement.style.setProperty('--mouse-y', `${currentY}%`);
        
        rafId = requestAnimationFrame(updateAmbientGlow);
    }
    
    // Only run on non-touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
        updateAmbientGlow();
    }
    
    // Cleanup on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            isActive = false;
            if (rafId) cancelAnimationFrame(rafId);
        } else {
            isActive = true;
            updateAmbientGlow();
        }
    });
    
    // Subtle parallax on scroll for entity cards
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.entity-card').forEach((card, i) => {
            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: (i % 2 === 0) ? -20 : 20,
                ease: 'none'
            });
        });
    }
}

/**
 * Orbit system interactions
 */
function initOrbitInteractions() {
    const orbitNodes = document.querySelectorAll('.orbit-node');
    
    orbitNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(node, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                node.style.transform = 'scale(1.2)';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(node, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                node.style.transform = 'scale(1)';
            }
        });
        
        // Click to scroll to entity
        node.addEventListener('click', () => {
            const entityType = node.dataset.entity;
            const entityMap = {
                'studio': 'onetime',
                'rights': 'songsplit',
                'automation': 'devhouse'
            };
            const targetEntity = entityMap[entityType] || entityType;
            const targetCard = document.querySelector(`.entity-card[data-entity="${targetEntity}"]`);
            
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight effect
                if (typeof gsap !== 'undefined') {
                    gsap.to(targetCard, {
                        boxShadow: '0 0 60px rgba(228, 228, 231, 0.2)',
                        duration: 0.3
                    });
                    
                    setTimeout(() => {
                        gsap.to(targetCard, {
                            boxShadow: 'none',
                            duration: 0.5
                        });
                    }, 1000);
                }
            }
        });
    });
    
    // Entity card hover effects
    document.querySelectorAll('.entity-card').forEach(card => {
        const glow = card.querySelector('.entity-glow');
        if (!glow) return;
        
        card.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(glow, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(glow, {
                    opacity: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        navToggle.classList.toggle('active', isActive);
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (typeof gsap !== 'undefined') {
            if (isActive) {
                gsap.to(spans[0], { rotation: 45, y: 3.5, duration: 0.3 });
                gsap.to(spans[1], { rotation: -45, y: -3.5, duration: 0.3 });
            } else {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
            }
        }
    });
    
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (typeof gsap !== 'undefined') {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
            }
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            
            const spans = navToggle.querySelectorAll('span');
            if (typeof gsap !== 'undefined') {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
            }
        }
    });
}

/**
 * Magnetic button effect (subtle pull toward cursor)
 */
function initMagneticButtons() {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    document.querySelectorAll('.btn, .entity-link').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        btn.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/**
 * Fallback animations when GSAP is not available
 */
function initFallbackAnimations() {
    // Show all elements immediately
    document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    
    // Simple fade in for hero elements
    const heroElements = document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta');
    heroElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100);
    });
    
    // Initialize other features
    initPageLoader();
    initNavigation();
    initMobileMenu();
}

/**
 * Constellation connection lines animation
 */
function animateConstellation() {
    const constellation = document.querySelector('.constellation');
    if (!constellation) return;
    
    const stars = constellation.querySelectorAll('.star');
    if (stars.length === 0) return;
    
    // Create SVG for connection lines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.zIndex = '0';
    
    constellation.appendChild(svg);
    
    // Wait for layout to settle
    setTimeout(() => {
        const containerRect = constellation.getBoundingClientRect();
        
        // Draw lines between nearby stars
        stars.forEach((star1, i) => {
            stars.forEach((star2, j) => {
                if (i >= j) return;
                
                const rect1 = star1.getBoundingClientRect();
                const rect2 = star2.getBoundingClientRect();
                
                const x1 = rect1.left - containerRect.left + rect1.width / 2;
                const y1 = rect1.top - containerRect.top + rect1.height / 2;
                const x2 = rect2.left - containerRect.left + rect2.width / 2;
                const y2 = rect2.top - containerRect.top + rect2.height / 2;
                
                const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                
                if (distance < 150) {
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', x1);
                    line.setAttribute('y1', y1);
                    line.setAttribute('x2', x2);
                    line.setAttribute('y2', y2);
                    line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
                    line.setAttribute('stroke-width', '1');
                    line.style.opacity = '0';
                    
                    svg.appendChild(line);
                    
                    if (typeof gsap !== 'undefined') {
                        gsap.to(line, {
                            opacity: 0.3,
                            duration: 1,
                            delay: Math.random() * 0.5,
                            ease: 'power2.out'
                        });
                    } else {
                        line.style.transition = 'opacity 1s ease';
                        setTimeout(() => {
                            line.style.opacity = '0.3';
                        }, Math.random() * 500);
                    }
                }
            });
        });
    }, 100);
}

// Run constellation animation after load
window.addEventListener('load', animateConstellation);
