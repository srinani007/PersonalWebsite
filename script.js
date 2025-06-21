(() => {
  // DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    /* ==================== THEME TOGGLE ==================== */
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

    /* ==================== HAMBURGER NAVIGATION ==================== */
    const hamburger = document.querySelector('.hamburger');
    const nav = document.getElementById('nav-primary');
    const navLinks = nav ? nav.querySelectorAll('a') : [];

    const toggleMenu = () => {
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('is-hidden');
    };

    if (hamburger && nav) {
      hamburger.addEventListener('click', toggleMenu);

      // Keyboard support
      hamburger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleMenu();
        }
      });

      // Close menu on link click (mobile)
      navLinks.forEach(link => link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && !nav.classList.contains('is-hidden')) {
          toggleMenu();
        }
      }));
    }

    /* ==================== SMOOTH SCROLL ==================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behaviour: 'smooth' });
        }
      });
    });

    /* ==================== INTERSECTION‑OBSERVER ANIMS ==================== */
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          requestAnimationFrame(() => {
            entry.target.querySelectorAll('.fade-in-text, .skill-card, .project-card, .timeline-item')
              .forEach(el => el.classList.add('fade-in'));
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.section').forEach(section => io.observe(section));

    /* ==================== LAZY LOAD MEDIA ==================== */
    const lazyLoadMedia = () => {
      const media = document.querySelectorAll('img, video');
      if ('loading' in HTMLImageElement.prototype) {
        media.forEach(el => el.setAttribute('loading', 'lazy'));
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
      }
    };
    lazyLoadMedia();

    /* ==================== PARTICLE BACKGROUND & LOADER ==================== */
    const particlesContainer = document.querySelector('.particles');
    const createParticles = () => {
      if (!particlesContainer) return;
      for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
          position:absolute;
          width:${Math.random() * 3 + 1}px;
          height:${Math.random() * 3 + 1}px;
          background:rgba(0,255,255,.5);
          border-radius:50%;
          top:${Math.random() * 100}vh;
          left:${Math.random() * 100}vw;
          animation:particleMove ${Math.random() * 5 + 5}s infinite linear,fadeIn .5s ease-in;
        `;
        particlesContainer.appendChild(p);
      }
    };

    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      document.querySelector('.loader')?.classList.add('hidden');
      createParticles();
    });

    /* ==================== FOOTER YEAR ==================== */
    document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());

    /* ==================== FIREFOX INLINE VIDEO FIX ==================== */
    const video = document.getElementById('myVideo');
    if (video && navigator.userAgent.includes('Firefox')) {
      video.removeAttribute('playsinline');
      video.muted = true;
    }
  });
})();
