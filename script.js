// Firefox video inline fix
const video = document.getElementById('myVideo');
if (video && navigator.userAgent.includes('Firefox')) {
    video.removeAttribute('playsinline');
    video.muted = true; // Ensure autoplay works in Firefox
}

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll-triggered animations using Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Batch DOM operations for better performance
            requestAnimationFrame(() => {
                const elementsToFade = entry.target.querySelectorAll('.fade-in-text, .skill-card, .project-card, .timeline-item');
                elementsToFade.forEach(element => element.classList.add('fade-in'));
            });
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Lazy loading for images and videos
function lazyLoadMedia() {
    const media = document.querySelectorAll("img, video");
    if ("loading" in HTMLImageElement.prototype) {
        media.forEach((el) => el.setAttribute("loading", "lazy"));
    } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
        document.body.appendChild(script);
    }
}
lazyLoadMedia();

// Add loading state and hide loader
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    document.querySelector(".loader")?.classList.add("hidden");
    createParticles();
});

// Particle animation
function createParticles() {
    const particlesContainer = document.querySelector(".particles");
    if (particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            Object.assign(particle.style, {
                position: "absolute",
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: "rgba(0, 255, 255, 0.5)",
                borderRadius: "50%",
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animation: `particleMove ${Math.random() * 5 + 5}s infinite linear, fadeIn 0.5s ease-in`,
            });
            particlesContainer.appendChild(particle);
        }
    }
}

// Theme Toggle + Stars Initialization
   const themeToggle = document.getElementById('theme-toggle');
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
     const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');

     document.documentElement.dataset.theme = savedTheme;
     if (themeToggle) {
       themeToggle.checked = savedTheme === 'dark';
       themeToggle.addEventListener('change', () => {
         const mode = themeToggle.checked ? 'dark' : 'light';
         document.documentElement.dataset.theme = mode;
         localStorage.setItem('theme', mode);
       });
     }


// Hamburger menu and navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navItems = document.querySelector('.nav-items');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navItems.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
    }

    // Hamburger Click
    hamburger.addEventListener('click', toggleMenu);

    // Close Menu on Click Outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-items') && !e.target.closest('.hamburger')) {
            hamburger.classList.remove('active');
            navItems.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close Menu on Nav Link Click (Mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navItems.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Keyboard Navigation
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            toggleMenu();
        }
    });
});
