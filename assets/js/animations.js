/* ═══════════════════════════════════════════
   Naga Law Chambers - Animation Engine
   Scroll reveals, tilt, particles, counters,
   typed text, parallax, mobile nav, cursor trail
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  /* ── Scroll-triggered Reveals ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || 0;
          setTimeout(() => el.classList.add('revealed'), delay);
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  /* ── Counter Animation ── */
  function parseCounterValue(text) {
    const match = text.match(/([\d,.]+)/);
    return match ? { value: parseFloat(match[1].replace(/,/g, '')), suffix: text.replace(match[1], '') } : null;
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterObserver.unobserve(el);

        const parsed = parseCounterValue(el.textContent);
        if (!parsed) return;

        const { value: target, suffix } = parsed;
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(eased * target);

          if (target >= 100) {
            el.textContent = current + suffix;
          } else {
            el.textContent = (eased * target).toFixed(1) + suffix;
          }

          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }

        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('[data-count-animate]').forEach((el) => counterObserver.observe(el));

  /* ── Gold Particle Burst on CTAs ── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach((btn) => {
    btn.addEventListener('mouseenter', spawnParticles);
    btn.addEventListener('mouseleave', clearParticles);
  });

  function spawnParticles(e) {
    const btn = e.currentTarget;
    const rect = btn.bb || btn.getBoundingClientRect();
    btn.bb = rect;

    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('span');
      particle.className = 'gold-particle';
      particle.style.left = (e.clientX - rect.left) + 'px';
      particle.style.top = (e.clientY - rect.top) + 'px';
      particle.style.setProperty('--sx', (Math.random() - 0.5) * 80 + 'px');
      particle.style.setProperty('--sy', (Math.random() - 0.5) * 80 + 'px');
      particle.style.animation = `sparkle ${0.4 + Math.random() * 0.6}s ease-out forwards`;
      btn.appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  }

  function clearParticles(e) {
    e.currentTarget.querySelectorAll('.gold-particle').forEach((p) => p.remove());
  }

  /* ── Mouse-Tracking Tilt ── */
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    });
  });

  /* ── Practice Card Mouse Glow ── */
  document.querySelectorAll('.practice-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width) * 100 + '%');
      card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height) * 100 + '%');
    });
  });

  /* ── Typed Text Effect ── */
  const typedEls = document.querySelectorAll('[data-typed-text]');
  typedEls.forEach((el) => {
    const text = el.dataset.typedText;
    if (!text) return;

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.unobserve(el);

        el.textContent = '';
        el.appendChild(cursor);
        let i = 0;

        function type() {
          if (i < text.length) {
            el.textContent = text.substring(0, i + 1);
            el.appendChild(cursor);
            i++;
            setTimeout(type, 30 + Math.random() * 25);
          } else {
            cursor.remove();
          }
        }
        type();
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
  });

  /* ── Parallax Hero ── */
  const heroBg = document.querySelector('.hero-bg');
  const heroPattern = document.querySelector('.hero-pattern');
  if (heroBg || heroPattern) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scroll = window.scrollY;
          if (heroBg) heroBg.style.transform = `translateY(${scroll * 0.35}px)`;
          if (heroPattern) heroPattern.style.transform = `translateY(${scroll * 0.12}px)`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── Header Scroll Shrink ── */
  const header = document.getElementById('header');
  if (header) {
    let headerTicking = false;
    window.addEventListener('scroll', () => {
      if (!headerTicking) {
        requestAnimationFrame(() => {
          header.classList.toggle('scrolled', window.scrollY > 50);
          headerTicking = false;
        });
        headerTicking = true;
      }
    }, { passive: true });
  }

  /* ── Smooth Scroll for Anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Mobile Navigation ── */
  const nav = document.querySelector('nav');
  const menuBtn = document.querySelector('.mobile-menu');
  const body = document.body;

  if (nav && menuBtn) {
    // Create overlay if not exists
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      body.appendChild(overlay);
    }

    // Add close button inside nav for mobile
    let closeBtn = nav.querySelector('.nav-close-btn');
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.className = 'nav-close-btn mobile-menu';
      closeBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.style.display = 'none';
      closeBtn.addEventListener('click', closeNav);
      nav.insertBefore(closeBtn, nav.firstChild);
    }

    function openNav() {
      nav.classList.add('nav-open');
      overlay.classList.add('active');
      menuBtn.style.display = 'none';
      closeBtn.style.display = 'block';
      overlay.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }

    function closeNav() {
      nav.classList.remove('nav-open');
      overlay.classList.remove('active');
      menuBtn.style.display = '';
      closeBtn.style.display = 'none';
      overlay.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);

    // Close on nav link click
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('nav-open')) closeNav();
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
        closeNav();
        menuBtn.focus();
      }
    });
  }

  /* ── Custom Cursor Trail (Desktop Only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.setAttribute('aria-hidden', 'true');
    body.appendChild(trail);

    let mouseX = -100, mouseY = -100, trailX = -100, trailY = -100;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';
      requestAnimationFrame(animateTrail);
    }
    requestAnimationFrame(animateTrail);
  }

  /* ── Form Validation ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input:not([type=hidden]), textarea');
    const honeypot = contactForm.querySelector('input[name="_honey"]');

    inputs.forEach((input) => {
      const errorEl = input.parentElement.querySelector('.form-error');

      input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.classList.add('input-error');
          if (errorEl) { errorEl.textContent = 'This field is required'; errorEl.classList.add('show'); }
        } else if (input.type === 'email' && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          input.classList.add('input-error');
          if (errorEl) { errorEl.textContent = 'Please enter a valid email'; errorEl.classList.add('show'); }
        } else if (input.type === 'tel' && input.value && input.value.replace(/\D/g, '').length < 10) {
          input.classList.add('input-error');
          if (errorEl) { errorEl.textContent = 'Please enter a valid phone number'; errorEl.classList.add('show'); }
        } else {
          input.classList.remove('input-error');
          if (errorEl) errorEl.classList.remove('show');
        }
      });

      input.addEventListener('input', () => {
        if (input.classList.contains('input-error')) {
          input.classList.remove('input-error');
          const err = input.parentElement.querySelector('.form-error');
          if (err) err.classList.remove('show');
        }
      });
    });

    contactForm.addEventListener('submit', function (e) {
      let valid = true;
      if (honeypot && honeypot.value) { e.preventDefault(); return; }

      inputs.forEach((input) => {
        if (input === honeypot) return;
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.classList.add('input-error');
          const err = input.parentElement.querySelector('.form-error');
          if (err) { err.textContent = 'This field is required'; err.classList.add('show'); }
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        const firstError = contactForm.querySelector('.input-error');
        if (firstError) firstError.focus();
      } else {
        const btn = contactForm.querySelector('button');
        if (btn) { btn.classList.add('submitting'); btn.textContent = 'Sending...'; }
      }
    });
  }

  /* ── Initialize section-line animation ── */
  const sectionLineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'slideRight 0.8s ease-out forwards';
        sectionLineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-line').forEach((line) => sectionLineObserver.observe(line));

})();
