/* ═══════════════════════════════════════════
   Naga Law Chambers — Premium Animation Engine
   Canvas particles, smooth scroll, magnetic btns,
   marquee, timeline, floating labels, back-to-top
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  if (preloader && !sessionStorage.getItem('preloaderShown')) {
    window.addEventListener('load', () => {
      setTimeout(() => { preloader.classList.add('hidden'); }, 1800);
      sessionStorage.setItem('preloaderShown', '1');
    });
  } else if (preloader) {
    preloader.style.display = 'none';
  }

  /* ── CANVAS PARTICLE SYSTEM ── */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    const maxParticles = 65;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 2 + 0.8;
        this.speedY = Math.random() * 0.3 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.15;
        this.fadeSpeed = Math.random() * 0.004 + 0.002;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.005) * 0.2;
        this.opacity -= this.fadeSpeed;
        if (this.y > canvas.height + 10 || this.opacity <= 0 || this.x < -10 || this.x > canvas.width + 10) {
          this.reset();
          this.opacity = Math.random() * 0.5 + 0.15;
        }
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${this.opacity})`;
        ctx.shadowColor = 'rgba(212,175,55,0.5)';
        ctx.shadowBlur = this.size * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      animId = requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ── SMOOTH SCROLL (Lenis-like) ── */
  const SmoothScroll = {
    target: 0,
    current: 0,
    ease: 0.075,
    raf: null,

    init() {
      this.current = window.scrollY;
      this.target = this.current;
      this.raf = requestAnimationFrame(this.tick.bind(this));
    },

    tick() {
      this.target = window.scrollY;
      this.current += (this.target - this.current) * this.ease;
      const diff = Math.abs(this.target - this.current);
      if (diff < 0.5) this.current = this.target;

      window.scrollTo(0, this.current);
      this.raf = requestAnimationFrame(this.tick.bind(this));
    },

    scrollTo(targetY, duration = 1200) {
      const start = this.current;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const y = start + (targetY - start) * eased;
        window.scrollTo(0, y);
        if (progress < 1) requestAnimationFrame(animate);
        else { this.target = targetY; this.current = targetY; }
      };
      requestAnimationFrame(animate);
    }
  };
  SmoothScroll.init();

  /* Override native smooth-scroll anchors */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 70;
      SmoothScroll.scrollTo(offset);
    });
  });

  /* ── SCROLL REVEALS ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.revealDelay) || 0;
        setTimeout(() => el.classList.add('revealed'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── SPLIT TEXT HERO ── */
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    const text = heroH1.textContent;
    const words = text.split(' ');
    heroH1.innerHTML = words.map((w, i) => {
      const isEm = w.includes('Legacy') || w.includes('Rights');
      const content = isEm ? `<em>${w}</em>` : w;
      return `<span class="line" style="transition-delay:${i * 0.12 + 0.3}s">${content}</span>`;
    }).join(' ');
    setTimeout(() => {
      heroH1.querySelectorAll('.line').forEach(l => l.classList.add('revealed'));
    }, 200);
  }

  /* ── COUNTER ANIMATION ── */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterObserver.unobserve(el);
      const raw = el.textContent;
      const num = parseFloat(raw.replace(/[^\d.]/g, ''));
      const suffix = raw.replace(/[\d.]+/, '');
      const dur = 2200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = (p === 1) ? raw : Math.round(eased * num) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count-animate]').forEach(el => counterObserver.observe(el));

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });

  /* ── CURSOR-AWARE CARDS ── */
  document.querySelectorAll('.practice-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  /* ── TILT CARD ── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03,1.03,1.03)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    });
  });

  /* ── GOLD PARTICLE BURST ── */
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
      const rect = btn.getBoundingClientRect();
      for (let i = 0; i < 10; i++) {
        const p = document.createElement('span');
        p.className = 'gold-particle';
        p.style.left = (e.clientX - rect.left) + 'px';
        p.style.top = (e.clientY - rect.top) + 'px';
        const angle = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 60;
        p.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
        p.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
        p.style.animation = `sparkle ${0.35 + Math.random() * 0.5}s ease-out forwards`;
        btn.appendChild(p);
        setTimeout(() => p.remove(), 900);
      }
    });
  });

  /* ── TESTIMONIAL MARQUEE ── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    const clones = track.innerHTML;
    track.innerHTML += clones; // Duplicate for seamless loop
  }

  /* ── TIMELINE REVEAL ── */
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length) {
    const timelineObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          timelineObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -60px 0px' });
    timelineItems.forEach(item => timelineObs.observe(item));
  }

  /* ── SIDE NAVIGATION DOTS ── */
  const sideDots = document.querySelectorAll('.side-dot');
  const sections = [];
  sideDots.forEach(dot => {
    const id = dot.dataset.target;
    const sec = document.getElementById(id);
    if (sec) sections.push({ dot, sec });
  });

  if (sections.length) {
    const dotObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sideDots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
        }
      });
    }, { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' });
    sections.forEach(s => dotObserver.observe(s.sec));

    sideDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const sec = document.getElementById(dot.dataset.target);
        if (sec) {
          const y = sec.getBoundingClientRect().top + window.scrollY - 70;
          SmoothScroll.scrollTo(y);
        }
      });
    });
  }

  /* ── BACK TO TOP ── */
  const btt = document.querySelector('.back-to-top');
  const progressCircle = document.querySelector('.progress-circle');
  if (btt && progressCircle) {
    const circumference = 2 * Math.PI * 19;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY / (docH || 1);
      progressCircle.style.strokeDashoffset = circumference - (scrolled * circumference);
      btt.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btt.addEventListener('click', () => SmoothScroll.scrollTo(0));
  }

  /* ── FLOATING LABELS ── */
  document.querySelectorAll('.float-group input, .float-group textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.toggle('filled', input.value.trim() !== '');
    });
    input.addEventListener('blur', () => {
      input.classList.toggle('filled', input.value.trim() !== '');
    });
    if (input.value.trim()) input.classList.add('filled');
  });

  /* ── FORM VALIDATION ── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('input:not([type=hidden]), textarea');
    const honey = contactForm.querySelector('input[name="_honey"]');

    contactForm.addEventListener('submit', function (e) {
      if (honey && honey.value) { e.preventDefault(); return; }
      let valid = true;

      inputs.forEach(input => {
        if (input === honey) return;
        const errorEl = input.parentElement.querySelector('.form-error');
        const val = input.value.trim();

        if (input.hasAttribute('required') && !val) {
          input.style.borderColor = '#F44336';
          if (errorEl) { errorEl.textContent = 'Required'; errorEl.classList.add('show'); }
          valid = false;
        } else if (input.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          input.style.borderColor = '#F44336';
          if (errorEl) { errorEl.textContent = 'Invalid email'; errorEl.classList.add('show'); }
          valid = false;
        } else if (input.type === 'tel' && val && val.replace(/\D/g, '').length < 10) {
          input.style.borderColor = '#F44336';
          if (errorEl) { errorEl.textContent = 'Min 10 digits'; errorEl.classList.add('show'); }
          valid = false;
        } else {
          input.style.borderColor = '';
          if (errorEl) errorEl.classList.remove('show');
        }
      });

      if (valid) {
        const btn = contactForm.querySelector('button');
        btn.classList.add('submitting');
        btn.textContent = 'Sending...';
        setTimeout(() => {
          btn.classList.remove('submitting');
          btn.classList.add('success');
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully';
        }, 2500);
      } else {
        e.preventDefault();
        const firstErr = contactForm.querySelector('input[style*="border-color: rgb(244, 67, 54)"]');
        if (firstErr) firstErr.focus();
      }
    });

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.style.borderColor) {
          input.style.borderColor = '';
          const err = input.parentElement.querySelector('.form-error');
          if (err) err.classList.remove('show');
        }
      });
    });
  }

  /* ── HEADER SCROLL ── */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
  }

  /* ── MOBILE NAV ── */
  const nav = document.querySelector('nav');
  const menuBtn = document.querySelector('.mobile-menu');
  const body = document.body;

  if (nav && menuBtn) {
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'nav-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      body.appendChild(overlay);
    }

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
      menuBtn.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }

    function closeNav() {
      nav.classList.remove('nav-open');
      overlay.classList.remove('active');
      menuBtn.style.display = '';
      closeBtn.style.display = 'none';
      menuBtn.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => { if (nav.classList.contains('nav-open')) closeNav(); });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) { closeNav(); menuBtn.focus(); }
    });
  }

  /* ── CURSOR TRAIL (desktop) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.setAttribute('aria-hidden', 'true');
    body.appendChild(trail);
    let mx = -100, my = -100, tx = -100, ty = -100;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
    function animTrail() {
      tx += (mx - tx) * 0.1;
      ty += (my - ty) * 0.1;
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';
      requestAnimationFrame(animTrail);
    }
    requestAnimationFrame(animTrail);
  }

  /* ── ABOUT IMAGE CLIP REVEAL ── */
  const aboutImg = document.querySelector('.about-image.reveal-image');
  if (aboutImg) {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        aboutImg.classList.add('revealed');
      }
    }, { threshold: 0.2 }).observe(aboutImg);
  }

  /* ── SECTION-LINE ANIMATION ── */
  document.querySelectorAll('.section-line').forEach(line => {
    new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        line.style.width = '50px';
        line.style.transition = 'width 1s var(--ease-out-expo) 0.3s';
      }
    }, { threshold: 0.5 }).observe(line);
  });

})();
