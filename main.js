/* ==========================================================================
   RJ18 PROPERTY DEALER & WORK SERVICE — main.js
   Vanilla JS only. No external libraries.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  injectBusinessBindings();
  initPreloader();
  initHeader();
  initMobileNav();
  initRippleButtons();
  initScrollReveal();
  initCounters();
  renderServices();
  renderProperties();
  renderWhyChoose();
  renderProcess();
  renderGallery();
  renderTestimonials();
  initLightbox();
  initTestimonialSlider();
  initPropertyFilters();
  initContactForm();
  initFloatingButtons();
  initHeroTypewriter();
  setFooterYear();
});

/* ---------- Fill every [data-biz="field"] element from config ---------- */
function injectBusinessBindings() {
  const b = RJ18.business;
  const map = {
    phone: b.phone,
    email: b.email,
    address: b.address,
    hours: b.hours,
    city: b.city,
    tagline: b.tagline
  };
  document.querySelectorAll('[data-biz]').forEach(el => {
    const key = el.getAttribute('data-biz');
    if (map[key]) el.textContent = map[key];
  });
  document.querySelectorAll('[data-tel-link]').forEach(el => el.href = `tel:${b.phoneRaw}`);
  document.querySelectorAll('[data-wa-link]').forEach(el => {
    const msg = encodeURIComponent("Hi RJ18, I'm interested in your properties. Please share details.");
    el.href = `https://wa.me/${b.whatsapp}?text=${msg}`;
  });
  document.querySelectorAll('[data-mail-link]').forEach(el => el.href = `mailto:${b.email}`);
  const mapFrame = document.querySelector('[data-map-frame]');
  if (mapFrame) mapFrame.src = b.mapEmbed;
}



/* ---------- Header scroll state ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mark active nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
}

/* ---------- Mobile nav ---------- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const scrim = document.querySelector('.nav-scrim');
  if (!toggle || !nav) return;
  const close = () => { toggle.classList.remove('open'); nav.classList.remove('open'); scrim?.classList.remove('open'); document.body.style.overflow = ''; };
  const open = () => { toggle.classList.add('open'); nav.classList.add('open'); scrim?.classList.add('open'); document.body.style.overflow = 'hidden'; };
  toggle.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
  scrim?.addEventListener('click', close);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  window.addEventListener('resize', () => { if (window.innerWidth > 900) close(); });
}

/* ---------- Button ripple effect ---------- */
function initRippleButtons() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    btn.style.setProperty('--rx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    btn.style.setProperty('--ry', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    const circle = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    circle.className = 'ripple';
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  });
}

/* ---------- Scroll reveal (IntersectionObserver, replaces AOS) ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
}

/* ---------- Animated number counters ---------- */
function initCounters() {
  const wrap = document.querySelector('.stats-card');
  if (!wrap) return;
  wrap.innerHTML = RJ18.stats.map(s => `
    <div class="stat-item" data-reveal="fade">
      <div class="stat-num"><span class="count" data-target="${s.value}">0</span><span class="suffix">${s.suffix}</span></div>
      <div class="stat-label">${s.label}</div>
    </div>`).join('');

  const counters = wrap.querySelectorAll('.count');
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => io.observe(c));
}

/* ---------- Icon library (inline SVG, no external icon font) ---------- */
const ICONS = {
  plot: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
  commercial: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg>',
  farmhouse: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11l8-7 8 7M6 10v10h12V10M10 20v-6h4v6"/></svg>',
  buy: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="21" r="1"/><circle cx="18" cy="21" r="1"/><path d="M2 3h2l2.6 12.6a2 2 0 0 0 2 1.4h8.8a2 2 0 0 0 2-1.6L21 8H6"/></svg>',
  sell: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H7"/></svg>',
  invest: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3v18h18M7 15l4-5 3 3 5-7"/></svg>',
  docs: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
  consult: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4A8.5 8.5 0 1 1 21 11.5z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>',
  legal: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2 3 6v6c0 5 4 8.5 9 10 5-1.5 9-5 9-10V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  verified: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2l2.6 1.7 3-.4 1 2.9 2.6 1.8-1 3 1 3-2.6 1.8-1 2.9-3-.4L12 22l-2.6-1.7-3 .4-1-2.9L2.8 16l1-3-1-3 2.6-1.8 1-2.9 3 .4z"/><path d="M9 12l2 2 4-4"/></svg>',
  price: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  trust: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  location: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  support: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
  guidance: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2a10 10 0 1 0 10 10M12 2v10l7-3.5"/></svg>'
};

/* ---------- Renderers ---------- */
function renderServices() {
  const grid = document.querySelector('[data-services-grid]');
  if (!grid) return;
  grid.innerHTML = RJ18.services.map((s, i) => `
    <div class="service-card" data-reveal data-reveal-delay="${(i % 4) + 1}">
      <div class="service-icon">${ICONS[s.icon] || ''}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
    </div>`).join('');
}

function renderProperties(limit) {
  const grid = document.querySelector('[data-properties-grid]');
  if (!grid) return;
  const list = limit ? RJ18.properties.slice(0, limit) : RJ18.properties;
  grid.innerHTML = list.map((p, i) => `
    <div class="property-card" data-type="${p.type}" data-reveal data-reveal-delay="${(i % 3) + 1}">
      <div class="property-media">
        <img src="${p.image}" alt="${p.title} — ${p.type} in ${p.location}" loading="lazy">
        <span class="property-tag">${p.tag}</span>
        <span class="property-price">${p.price}</span>
      </div>
      <div class="property-body">
        <h3>${p.title}</h3>
        <div class="property-loc">${ICONS.location.replace('width="24" height="24"', 'width="15" height="15"')} ${p.location}</div>
        <div class="property-meta">
          <div>Type<strong>${p.type}</strong></div>
          <div>Area<strong>${p.area}</strong></div>
        </div>
        <a class="btn btn-navy btn-sm" href="https://wa.me/${RJ18.business.whatsapp}?text=${encodeURIComponent('Hi, I am interested in ' + p.title + ' (' + p.location + ').')}" target="_blank" rel="noopener">View Details</a>
      </div>
    </div>`).join('');
}

function renderWhyChoose() {
  const grid = document.querySelector('[data-why-grid]');
  if (!grid) return;
  grid.innerHTML = RJ18.whyChoose.map((w, i) => `
    <div class="why-card" data-reveal data-reveal-delay="${(i % 4) + 1}">
      <div class="ico">${ICONS[w.icon] || ''}</div>
      <h4>${w.title}</h4>
      <p>${w.desc}</p>
    </div>`).join('');
}

function renderProcess() {
  const wrap = document.querySelector('[data-process-timeline]');
  if (!wrap) return;
  wrap.innerHTML = RJ18.process.map(p => `
    <div class="timeline-item" data-reveal="left">
      <div class="timeline-num">${p.step}</div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
    </div>`).join('');
}

function renderGallery() {
  const grid = document.querySelector('[data-gallery-grid]');
  if (!grid) return;
  grid.innerHTML = RJ18.gallery.map((src, i) => `
    <div class="masonry-item" data-reveal data-reveal-delay="${(i % 4) + 1}" data-index="${i}">
      <img src="${src}" alt="RJ18 property gallery image ${i + 1}" loading="lazy">
    </div>`).join('');
}

function renderTestimonials() {
  const track = document.querySelector('[data-testi-slides]');
  const dots = document.querySelector('[data-testi-dots]');
  if (!track) return;
  track.innerHTML = RJ18.testimonials.map(t => `
    <div class="testi-slide">
      <div class="testi-card">
        <div class="testi-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
        <p class="quote">“${t.text}”</p>
        <div class="testi-person">
          <div class="testi-avatar">${t.name.charAt(0)}</div>
          <div>
            <strong>${t.name}</strong>
            <span>${t.location}</span>
          </div>
        </div>
      </div>
    </div>`).join('');
  if (dots) {
    dots.innerHTML = RJ18.testimonials.map((_, i) => `<span class="testi-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></span>`).join('');
  }
}

/* ---------- Lightbox for gallery ---------- */
function initLightbox() {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  const img = lb.querySelector('img');
  const closeBtn = lb.querySelector('.lightbox-close');
  const prevBtn = lb.querySelector('.lightbox-prev');
  const nextBtn = lb.querySelector('.lightbox-next');
  let current = 0;

  const open = (i) => {
    current = i;
    img.src = RJ18.gallery[current];
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const close = () => { lb.classList.remove('active'); document.body.style.overflow = ''; };
  const nav = (dir) => { current = (current + dir + RJ18.gallery.length) % RJ18.gallery.length; img.src = RJ18.gallery[current]; };

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.masonry-item');
    if (item) open(parseInt(item.getAttribute('data-index'), 10));
  });
  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => nav(-1));
  nextBtn?.addEventListener('click', () => nav(1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
}

/* ---------- Testimonial slider ---------- */
function initTestimonialSlider() {
  const track = document.querySelector('[data-testi-slides]');
  if (!track) return;
  const dotsWrap = document.querySelector('[data-testi-dots]');
  const prev = document.querySelector('[data-testi-prev]');
  const next = document.querySelector('[data-testi-next]');
  let index = 0;
  const total = RJ18.testimonials.length;

  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsWrap?.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === index));
  };
  const go = (i) => { index = (i + total) % total; update(); };

  prev?.addEventListener('click', () => go(index - 1));
  next?.addEventListener('click', () => go(index + 1));
  dotsWrap?.addEventListener('click', (e) => {
    const dot = e.target.closest('.testi-dot');
    if (dot) go(parseInt(dot.getAttribute('data-dot'), 10));
  });

  let auto = setInterval(() => go(index + 1), 6000);
  const wrap = document.querySelector('.testi-track-wrap');
  wrap?.addEventListener('mouseenter', () => clearInterval(auto));
  wrap?.addEventListener('mouseleave', () => { auto = setInterval(() => go(index + 1), 6000); });
}

/* ---------- Property filters ---------- */
function initPropertyFilters() {
  const filterWrap = document.querySelector('[data-property-filters]');
  const grid = document.querySelector('[data-properties-grid]');
  if (!filterWrap || !grid) return;

  const types = ['All', ...new Set(RJ18.properties.map(p => p.type))];
  filterWrap.innerHTML = types.map((t, i) => `<button class="filter-btn${i === 0 ? ' active' : ''}" data-filter="${t}">${t}</button>`).join('');

  filterWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filterWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const type = btn.getAttribute('data-filter');
    grid.querySelectorAll('.property-card').forEach(card => {
      const show = type === 'All' || card.getAttribute('data-type') === type;
      card.style.display = show ? '' : 'none';
    });
  });
}

/* ---------- Contact form ---------- */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  const success = document.querySelector('.form-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const phone = data.get('phone') || '';
    const interest = data.get('interest') || '';
    const message = data.get('message') || '';

    const text = encodeURIComponent(
      `New Enquiry — RJ18 Website\nName: ${name}\nPhone: ${phone}\nInterested in: ${interest}\nMessage: ${message}`
    );

    if (success) {
      success.classList.add('show');
      success.textContent = '✓ Thank you! Redirecting you to WhatsApp to confirm your enquiry…';
    }
    form.reset();

    setTimeout(() => {
      window.open(`https://wa.me/${RJ18.business.whatsapp}?text=${text}`, '_blank');
    }, 900);
  });
}

/* ---------- Floating action buttons + back to top ---------- */
function initFloatingButtons() {
  const topBtn = document.querySelector('.float-top');
  if (!topBtn) return;
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Hero typewriter ---------- */
function initHeroTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;
  const words = ['Residential Plots', 'Commercial Plots', 'Houses & Shops', 'Farm Houses', 'Investment Properties'];
  let wIndex = 0, cIndex = 0, deleting = false;

  const caret = document.createElement('span');
  caret.className = 'type-caret';
  el.after(caret);

  const tick = () => {
    const word = words[wIndex];
    if (!deleting) {
      cIndex++;
      el.textContent = word.slice(0, cIndex);
      if (cIndex === word.length) { deleting = true; setTimeout(tick, 1500); return; }
    } else {
      cIndex--;
      el.textContent = word.slice(0, cIndex);
      if (cIndex === 0) { deleting = false; wIndex = (wIndex + 1) % words.length; }
    }
    setTimeout(tick, deleting ? 45 : 85);
  };
  tick();
}

function setFooterYear() {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
}
