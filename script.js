// Loading Screen Controller
class LoadingScreenController {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.progressBar = document.querySelector('.progress-bar');
        this.particles = [];
        this.progress = 0;
        this.isLoading = true;
        this.particleCount = 30; // Increased particle count
        this.init();
    }

    init() {
        // Initialize all components
        this.createParticles();
        this.simulateProgress();
        this.initConstellation();
        this.initLoadingText();
        this.initGroupText();
        this.startAnimationLoop();
    }

    initGroupText() {
        const chars = document.querySelectorAll('.text-char');
        chars.forEach((char, index) => {
            char.style.animationDelay = `${index * 0.1}s`;
            this.addGlowEffect(char);
        });
    }

    addGlowEffect(element) {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.textShadow = `0 0 10px hsla(${hue}, 100%, 50%, 0.5)`;
        }, 50);
    }

    createParticles() {
        const container = document.querySelector('.particle-group');
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Enhanced particle positioning and animation
            const x1 = Math.random() * 200 - 100;
            const y1 = Math.random() * 200 - 100;
            const z1 = Math.random() * 100 - 50;
            const x2 = Math.random() * 200 - 100;
            const y2 = Math.random() * 200 - 100;
            const z2 = Math.random() * 100 - 50;

            particle.style.setProperty('--x1', `${x1}px`);
            particle.style.setProperty('--y1', `${y1}px`);
            particle.style.setProperty('--z1', `${z1}px`);
            particle.style.setProperty('--x2', `${x2}px`);
            particle.style.setProperty('--y2', `${y2}px`);
            particle.style.setProperty('--z2', `${z2}px`);

            // Random size and delay
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDelay = `${Math.random() * 4}s`;
            
            // Random color variation
            const hue = Math.random() * 60 - 30; // Color variation around base color
            particle.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
            
            container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    startAnimationLoop() {
        let time = 0;
        const animate = () => {
            time += 0.01;
            
            // Animate particles
            this.particles.forEach((particle, index) => {
                const x = Math.sin(time + index) * 50;
                const y = Math.cos(time + index) * 50;
                const z = Math.sin(time * 0.5 + index) * 30;
                particle.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            });

            // Animate constellation
            const lines = document.querySelectorAll('.constellation-line');
            lines.forEach((line, index) => {
                const offset = Math.sin(time + index) * 5;
                line.style.strokeDashoffset = `${offset}`;
            });

            requestAnimationFrame(animate);
        };
        animate();
    }

    initConstellation() {
        const lines = document.querySelectorAll('.constellation-line');
        const dots = document.querySelectorAll('.constellation-dot');

        lines.forEach(line => {
            line.style.strokeDasharray = '10';
            line.style.animationDelay = `${Math.random() * 3}s`;
        });

        dots.forEach(dot => {
            dot.style.animationDelay = `${Math.random() * 2}s`;
        });
    }

    initLoadingText() {
        const chars = document.querySelectorAll('.loading-char');
        chars.forEach((char, index) => {
            char.style.setProperty('--char-index', index);
            this.addGlowEffect(char);
        });
    }

    simulateProgress() {
        const increment = () => {
            if (this.progress >= 100) {
                this.completeLoading();
                return;
            }

            // More natural progress simulation
            const remaining = 100 - this.progress;
            const delta = Math.random() * Math.min(remaining * 0.1, 3) + 0.5;
            this.progress = Math.min(this.progress + delta, 100);
            this.updateProgress();

            setTimeout(increment, 100);
        };

        increment();
    }

    updateProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
            
            // Add pulse effect at certain progress points
            if (this.progress % 25 === 0) {
                this.progressBar.style.transform = 'scaleY(1.5)';
                setTimeout(() => {
                    this.progressBar.style.transform = 'scaleY(1)';
                }, 200);
            }
        }
    }

    completeLoading() {
        if (!this.isLoading) return;
        this.isLoading = false;

        // Enhanced completion animation
        this.loadingScreen.style.transform = 'scale(1.1)';
        this.loadingScreen.classList.add('loaded');

        setTimeout(() => {
            this.loadingScreen.style.transform = 'scale(0)';
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 500);
        }, 500);
    }
}

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loadingController = new LoadingScreenController();
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle Animation
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

navbarToggler.addEventListener('click', () => {
    navbarToggler.classList.toggle('active');
    navbarCollapse.classList.toggle('show');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.remove('active');
    }
});

// Add hover effect to nav links
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Team member card hover effect
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add new navbar features
// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('focused');
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('focused');
    });
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-sun');
        icon.classList.toggle('fa-moon');
    });
}

// Dropdown hover effect
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-menu').style.display = 'block';
    });
    
    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-menu').style.display = 'none';
    });
});

// Notification system
const notificationBadge = document.querySelector('.notification-badge');
if (notificationBadge) {
    // Example: Add notification
    function addNotification() {
        const count = parseInt(notificationBadge.textContent);
        notificationBadge.textContent = count + 1;
        notificationBadge.style.animation = 'none';
        notificationBadge.offsetHeight; // Trigger reflow
        notificationBadge.style.animation = 'pulse 2s infinite';
    }
    
    // Example: Remove notification
    function removeNotification() {
        const count = parseInt(notificationBadge.textContent);
        if (count > 0) {
            notificationBadge.textContent = count - 1;
        }
    }
}

// User profile dropdown
const userProfile = document.querySelector('.user-profile');
if (userProfile) {
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = userProfile.querySelector('.dropdown-menu');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    document.addEventListener('click', () => {
        const dropdown = userProfile.querySelector('.dropdown-menu');
        dropdown.style.display = 'none';
    });
}

// Add scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add navbar search suggestions
const searchSuggestions = document.createElement('div');
searchSuggestions.className = 'search-suggestions';
if (searchInput) {
    searchInput.parentElement.appendChild(searchSuggestions);
    
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.toLowerCase();
        if (value.length > 2) {
            // Example suggestions - replace with your actual search logic
            const suggestions = ['Home', 'About', 'Services', 'Contact'];
            const filtered = suggestions.filter(item => 
                item.toLowerCase().includes(value)
            );
            
            searchSuggestions.innerHTML = filtered.map(item => 
                `<div class="suggestion-item">${item}</div>`
            ).join('');
            
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    });
}

// Add navbar scroll progress indicator
const navbarProgress = document.createElement('div');
navbarProgress.className = 'navbar-progress';
navbar.appendChild(navbarProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    navbarProgress.style.width = scrolled + '%';
});

// Enhanced Cursor Effects
const cursor = document.createElement('div');
const cursorDot = document.createElement('div');
const cursorGlow = document.createElement('div');
const cursorText = document.createElement('div');

cursor.className = 'custom-cursor';
cursorDot.className = 'cursor-dot';
cursorGlow.className = 'cursor-glow';
cursorText.className = 'cursor-text';

document.body.appendChild(cursor);
document.body.appendChild(cursorDot);
document.body.appendChild(cursorGlow);
document.body.appendChild(cursorText);

// Mouse move handler with smooth interpolation
let currentX = 0, currentY = 0;
let targetX = 0, targetY = 0;

function updateCursorPosition() {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    cursorDot.style.left = `${currentX}px`;
    cursorDot.style.top = `${currentY}px`;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;

    requestAnimationFrame(updateCursorPosition);
}

document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

updateCursorPosition();

// Click effect
document.addEventListener('mousedown', () => {
    cursor.classList.add('cursor-click');
    createRipple(targetX, targetY);
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('cursor-click');
});

// Create ripple effect
function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 1000);
}

// Multi-particle trail
function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-trail';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random position offset
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 20;
    particle.style.transform = `translate(
        ${Math.cos(angle) * distance}px,
        ${Math.sin(angle) * distance}px
    )`;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
}

let lastTrailTime = 0;
document.addEventListener('mousemove', (e) => {
    const currentTime = Date.now();
    if (currentTime - lastTrailTime > 50) {
        for (let i = 0; i < 3; i++) { // Create multiple particles
            createTrailParticle(e.clientX, e.clientY);
        }
        lastTrailTime = currentTime;
    }
});

// Magnetic effect for images
document.querySelectorAll('.magnetic-image').forEach(image => {
    image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        image.style.transform = `translate(${deltaX * 20}px, ${deltaY * 20}px)`;
    });
    
    image.addEventListener('mouseleave', () => {
        image.style.transform = 'translate(0, 0)';
    });
});

// Custom cursor states for different elements
document.querySelectorAll('[data-cursor]').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add(`cursor-${element.dataset.cursor}`);
        if (element.dataset.cursorText) {
            cursorText.textContent = element.dataset.cursorText;
            cursorText.classList.add('show');
        }
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove(`cursor-${element.dataset.cursor}`);
        cursorText.classList.remove('show');
    });
});

// Interactive elements enhancement
document.querySelectorAll('.interactive-element').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Text highlight effect
document.querySelectorAll('.highlight-text').forEach(text => {
    text.addEventListener('mouseenter', () => {
        cursor.style.mixBlendMode = 'difference';
        cursor.style.background = '#fff';
    });
    
    text.addEventListener('mouseleave', () => {
        cursor.style.mixBlendMode = 'normal';
        cursor.style.background = '';
    });
});

// Initialize all cursor effects
document.addEventListener('DOMContentLoaded', () => {
    // Add data-cursor attributes to elements
    document.querySelectorAll('a').forEach(link => link.setAttribute('data-cursor', 'link'));
    document.querySelectorAll('button').forEach(button => button.setAttribute('data-cursor', 'button'));
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('data-cursor', 'image');
        img.classList.add('magnetic-image');
    });
    
    // Add interactive classes
    document.querySelectorAll('h1, h2, h3').forEach(heading => heading.classList.add('highlight-text'));
    document.querySelectorAll('.btn').forEach(btn => btn.classList.add('interactive-element'));
});

// Smooth scroll animation
const scrollElements = document.querySelectorAll('[data-scroll]');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)
    );
};

const displayScrollElement = (element) => {
    element.classList.add('is-visible');
};

const hideScrollElement = (element) => {
    element.classList.remove('is-visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 100)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Throttle function for scroll events
function throttle(func, wait = 100) {
    let timer = null;
    return function(...args) {
        if (timer === null) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, wait);
        }
    };
}

window.addEventListener('scroll', throttle(handleScrollAnimation, 50));
handleScrollAnimation(); // Initial check 