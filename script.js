/**
 * ELISON UNIVERSE - CINEMATIC ANIMATIONS
 * GSAP-powered scroll animations and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize all animations
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initAmbientEffects();
    initOrbitInteractions();
    initMobileMenu();
});

/**
 * Navigation scroll effects
 */
function initNavigation() {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Hero entrance animations
 */
function initHeroAnimations() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTl
        .from('.hero-eyebrow', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.2
        })
        .from('.hero-title .line', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.15
        }, '-=0.4')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-cta', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-scroll-indicator', {
            opacity: 0,
            duration: 0.8
        }, '-=0.2');
    
    // Parallax effect on hero title
    gsap.to('.hero-title', {
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

/**
 * Scroll-triggered animations for sections
 */
function initScrollAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Universe section
    gsap.from('.universe-text', {
        scrollTrigger: {
            trigger: '.universe',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.universe-visual', {
        scrollTrigger: {
            trigger: '.universe',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    // Entity cards with stagger
    gsap.from('.entity-card', {
        scrollTrigger: {
            trigger: '.entities-grid',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Philosophy section
    gsap.from('blockquote', {
        scrollTrigger: {
            trigger: '.philosophy',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.constellation', {
        scrollTrigger: {
            trigger: '.philosophy',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
    });
    
    // Connect section
    gsap.from('.connect-lead', {
        scrollTrigger: {
            trigger: '.connect',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.connect-actions', {
        scrollTrigger: {
            trigger: '.connect',
            start: 'top 60%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.social-link', {
        scrollTrigger: {
            trigger: '.connect-social',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Footer
    gsap.from('.footer-inner', {
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

/**
 * Ambient background effects
 */
function initAmbientEffects() {
    const ambientGlow = document.querySelector('.ambient-glow');
    let mouseX = 50;
    let mouseY = 50;
    let currentX = 50;
    let currentY = 50;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    }, { passive: true });
    
    // Smooth animation loop
    function updateAmbientGlow() {
        // Lerp for smooth following
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        document.documentElement.style.setProperty('--mouse-x', `${currentX}%`);
        document.documentElement.style.setProperty('--mouse-y', `${currentY}%`);
        
        requestAnimationFrame(updateAmbientGlow);
    }
    
    updateAmbientGlow();
    
    // Subtle parallax on scroll for entity cards
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

/**
 * Orbit system interactions
 */
function initOrbitInteractions() {
    const orbitNodes = document.querySelectorAll('.orbit-node');
    
    orbitNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            gsap.to(node, {
                scale: 1.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        node.addEventListener('mouseleave', () => {
            gsap.to(node, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Click to scroll to entity
        node.addEventListener('click', () => {
            const entityType = node.dataset.entity;
            const targetCard = document.querySelector(`.entity-card[data-entity="${entityType}"]`) ||
                              document.querySelector(`.entity-card[data-entity="${entityType === 'studio' ? 'onetime' : entityType === 'rights' ? 'songsplit' : 'devhouse'}"]`);
            
            if (targetCard) {
                targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight effect
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
        });
    });
    
    // Entity card hover effects
    document.querySelectorAll('.entity-card').forEach(card => {
        const glow = card.querySelector('.entity-glow');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(glow, {
                opacity: 1,
                scale: 1.2,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(glow, {
                opacity: 0,
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                gsap.to(spans[0], { rotation: 45, y: 3.5, duration: 0.3 });
                gsap.to(spans[1], { rotation: -45, y: -3.5, duration: 0.3 });
            } else {
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
                gsap.to(spans[1], { rotation: 0, y: 0, duration: 0.3 });
            });
        });
    }
}

/**
 * Magnetic button effect (subtle pull toward cursor)
 */
document.querySelectorAll('.btn, .entity-link').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

/**
 * Text reveal animation for hero title lines
 */
function splitTextAnimation() {
    const lines = document.querySelectorAll('.hero-title .line');
    
    lines.forEach((line, index) => {
        const text = line.textContent;
        line.innerHTML = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            line.appendChild(span);
            
            gsap.to(span, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.5 + (index * 0.2) + (i * 0.02),
                ease: 'power3.out'
            });
        });
    });
}

// Run split text animation on load
window.addEventListener('load', splitTextAnimation);

/**
 * Constellation connection lines animation
 */
function animateConstellation() {
    const constellation = document.querySelector('.constellation');
    if (!constellation) return;
    
    const stars = constellation.querySelectorAll('.star');
    
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
    
    // Draw lines between nearby stars
    stars.forEach((star1, i) => {
        stars.forEach((star2, j) => {
            if (i >= j) return;
            
            const rect1 = star1.getBoundingClientRect();
            const rect2 = star2.getBoundingClientRect();
            const containerRect = constellation.getBoundingClientRect();
            
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
                
                gsap.to(line, {
                    opacity: 0.3,
                    duration: 1,
                    delay: Math.random() * 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Run constellation animation
window.addEventListener('load', animateConstellation);
