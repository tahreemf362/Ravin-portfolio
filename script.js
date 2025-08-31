// === Animated magical particles background ===
window.addEventListener('DOMContentLoaded', () => {
  // Magical orbs config
  const ORB_COUNT = 8;
  const orbs = Array.from({length: ORB_COUNT}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 38 + 22,
    dx: (Math.random() - 0.5) * 0.7,
    dy: (Math.random() - 0.5) * 0.7,
    phase: Math.random() * 2 * Math.PI
  }));
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const STAR_COUNT = 120;
  const stars = Array.from({length: STAR_COUNT}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.6 + 0.7,
    alpha: Math.random() * 0.7 + 0.35,
    speed: Math.random() * 0.3 + 0.1,
    twinkle: Math.random() * 2 * Math.PI,
    dx: (Math.random() - 0.5) * 0.3, // horizontal movement
    dy: (Math.random() - 0.5) * 0.3, // vertical movement
    spark: Math.random() < 0.18 // some stars will spark
  }));

  function getTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const theme = getTheme();

    // Draw magical orbs
    for (const orb of orbs) {
      orb.x += orb.dx * (0.7 + Math.sin(orb.phase) * 0.2);
      orb.y += orb.dy * (0.7 + Math.cos(orb.phase) * 0.2);
      orb.phase += 0.01 + Math.random() * 0.01;
      if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
      if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
      if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
      if (orb.y > canvas.height + orb.r) orb.y = -orb.r;
      ctx.save();
      ctx.globalAlpha = theme === 'dark' ? 0.18 : 0.13;
      const orbColor = theme === 'dark'
        ? `radial-gradient(circle at 40% 40%, #a78bfa 0%, #38bdf8 60%, transparent 100%)`
        : `radial-gradient(circle at 40% 40%, #2563eb 0%, #f472b6 60%, transparent 100%)`;
      // Simulate gradient with shadow and fill
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.r, 0, 2 * Math.PI);
      ctx.fillStyle = theme === 'dark' ? '#a78bfa' : '#2563eb';
      ctx.shadowColor = theme === 'dark' ? '#38bdf8' : '#f472b6';
      ctx.shadowBlur = 40;
      ctx.fill();
      ctx.restore();
    }

    // Draw stars
    for (const star of stars) {
      // Move star
      star.x += star.dx;
      star.y += star.dy;
      // Bounce off edges
      if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
      if (star.y < 0 || star.y > canvas.height) star.dy *= -1;

      // Twinkle and spark
      star.twinkle += star.speed * 0.04;
      let twinkleAlpha = star.alpha + Math.sin(star.twinkle) * 0.22;
      if (star.spark && Math.random() < 0.04) {
        twinkleAlpha = 1;
      }
      ctx.save();
      ctx.globalAlpha = Math.max(0.18, twinkleAlpha);
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      if (theme === 'dark') {
        ctx.fillStyle = star.spark ? '#fffbe6' : '#fff';
        ctx.shadowColor = star.spark ? '#f472b6' : '#a78bfa';
      } else {
        ctx.fillStyle = star.spark ? '#2563eb' : '#0a1a33';
        ctx.shadowColor = star.spark ? '#38bdf8' : '#2563eb';
      }
      ctx.shadowBlur = star.spark ? 16 : 8;
      ctx.fill();
      ctx.restore();
    }
  }

  // Listen for theme changes
  const observer = new MutationObserver(drawStars);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  function animate() {
    drawStars();
    requestAnimationFrame(animate);
  }
  animate();
});
/* ========= THEME TOGGLE (persist) ========= */
// ===== True Typing Animation (JS) =====
function typeText(element, text, speed = 60, callback) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

window.addEventListener('DOMContentLoaded', () => {
  // Animate only the intro paragraph first, then summary
  const introEl = document.querySelector('.lead.typing span');
  if (introEl) {
    const introText = introEl.textContent;
    introEl.textContent = '';
    typeText(introEl, introText, 60);
  }
});
const root = document.documentElement;
const toggleBtn = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
  if (toggleBtn) toggleBtn.textContent = '☀️ Light Mode';
}
toggleBtn?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const dark = document.documentElement.classList.contains('dark');
  toggleBtn.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
});

/* ========= MOBILE SIDEBAR TOGGLE ========= */
/* ========= MOBILE SIDEBAR TOGGLE ========= */
const menuBtn = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

menuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  // set aria-hidden
  const open = sidebar.classList.contains('active');
  sidebar.setAttribute('aria-hidden', !open);
  overlay.setAttribute('aria-hidden', !open);
});
overlay?.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  sidebar.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
});

document.querySelectorAll('.sidebar .nav-link').forEach(link=>{
  link.addEventListener('click', ()=> {
    if (window.innerWidth <= 992) {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  });
});

/* ========= Smooth scroll for nav links ========= */
document.querySelectorAll('.nav-link[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ========= Button ripple position for fancy buttons ========= */
document.querySelectorAll('.fancy-btn').forEach(btn=>{
  btn.addEventListener('pointermove', e=>{
    const r = btn.getBoundingClientRect();
    btn.style.setProperty('--x', `${e.clientX - r.left}px`);
    btn.style.setProperty('--y', `${e.clientY - r.top}px`);
  });
});

/* ========= GSAP Animations (entrance + scroll) ========= */
window.addEventListener('load', () => {
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    // hero title
    gsap.from('.hero-title', { y: 24, opacity: 0, duration: .9, ease: 'power3.out' });

    // reveal elements when they enter
    document.querySelectorAll('.reveal').forEach(el=>{
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: ()=> el.classList.add('visible')
      });
    });

    // stagger reveal for cards
    gsap.utils.toArray('.accent-card, .card-compact').forEach((el, i)=>{
      gsap.from(el, {
        y: 18, opacity: 0, duration: .7, delay: i * 0.03,
        scrollTrigger: { trigger: el, start: 'top 92%' }
      });
    });

    // quick float on hover
    document.querySelectorAll('.accent-card, .card-compact, .project-card').forEach(card=>{
      const q = gsap.quickTo(card, "y", { duration: .2, ease: "power2.out" });
      card.addEventListener('mouseenter', ()=> q(-6));
      card.addEventListener('mouseleave', ()=> q(0));
    });
  }
});

/* ========= COUNTERS (animate when in view) ========= */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 100));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = start;
      }
    }, 14);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => counterObserver.observe(c));

/* ========= REVEAL ON SCROLL FALLBACK (for non-GSAP) ========= */
function simpleRevealOnScroll(){
  document.querySelectorAll('.reveal').forEach(el=>{
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 80) el.classList.add('visible');
  });
}
window.addEventListener('scroll', simpleRevealOnScroll);
window.addEventListener('load', simpleRevealOnScroll);

/* ========= SPARKLE / MAGIC CURSOR EFFECT ========= */
(() => {
  const canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = innerWidth;
  let H = canvas.height = innerHeight;
  const particles = [];
  const maxParticles = 140;

  window.addEventListener('resize', () => {
    W = canvas.width = innerWidth;
    H = canvas.height = innerHeight;
  });

  function Particle(x, y) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.7) * 1.2 - 0.8;
    this.size = Math.random() * 2.4 + 0.6;
    this.life = 40 + Math.random() * 40;
    this.ttl = this.life;
    // purple-cyan hue range
    this.h = 260 + Math.random() * 40; // purple-ish
    this.s = 70 + Math.random() * 15;
    this.l = 60 + Math.random() * 5;
  }
  Particle.prototype.update = function() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02;
    this.ttl--;
  };
  Particle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = `hsla(${this.h}, ${this.s}%, ${this.l}%, ${Math.max(0, this.ttl / this.life)})`;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  };

  let pointer = { x: W / 2, y: H / 2, moving: false };
  function spawn(x, y, count = 6) {
    for (let i = 0; i < count; i++) {
      if (particles.length < maxParticles) particles.push(new Particle(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10));
    }
  }

  window.addEventListener('pointermove', e => {
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.moving = true;
    spawn(pointer.x, pointer.y, 5);
  });

  let idle = 0;
  setInterval(() => {
    if (!pointer.moving) { idle++; if (idle > 90) return; }
    spawn(pointer.x + (Math.random() - 0.5) * 30, pointer.y + (Math.random() - 0.5) * 30, 1);
    pointer.moving = false;
  }, 120);

  function loop() {
    ctx.clearRect(0,0,W,H);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.ttl <= 0 || p.y > H + 50) particles.splice(i, 1);
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
