/* ========================================
   irfangunel.me — Portfolio Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // SKILL PILLS
  // ========================================
  const skills = [
    { name: 'JavaScript', icon: 'code' },
    { name: 'Python', icon: 'code' },
    { name: 'React', icon: 'code' },
    { name: 'Yapay Zeka', icon: 'cpu' },
    { name: 'Veri Bilimi', icon: 'cpu' },
    { name: 'Web Geliştirme', icon: 'layout' },
    { name: 'Git', icon: 'git' },
    { name: 'Linux', icon: 'terminal' },
  ];

  const iconPaths = {
    'code': 'M16 18l6-6-6-6M8 6l-6 6 6 6',
    'cpu': 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    'layout': 'M3 3h18v18H3V3zm0 6h18M9 3v18',
    'git': 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM12 6v6l4 2',
    'terminal': 'M4 17l6-6-6-6M12 19h8',
  };

  const skillContainer = document.getElementById('skill-pills');
  if (skillContainer) {
    skills.forEach(s => {
      const pill = document.createElement('span');
      pill.className = 'skill-pill';
      pill.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="${iconPaths[s.icon] || iconPaths.code}"/></svg>${s.name}`;
      skillContainer.appendChild(pill);
    });
  }

  // ========================================
  // PROJECTS
  // ========================================
  const grid = document.getElementById('project-grid');
  const filterBar = document.getElementById('filter-bar');
  let projects = [];
  let activeFilter = 'all';

  const tagLabels = {
    'frontend': 'Frontend',
    'backend': 'Backend',
    'ai': 'AI/ML',
    'ml': 'ML',
    'data': 'Veri',
    'maps': 'Harita',
    'database': 'Veritabanı',
    'productivity': 'Üretkenlik',
    'portfolio': 'Portfolio',
  };

  // Fetch projects
  fetch('projects.json')
    .then(r => r.json())
    .then(data => {
      projects = data;
      buildFilters();
      renderProjects('all');
    })
    .catch(err => {
      if (grid) grid.innerHTML = '<p class="project-empty">Projeler yüklenemedi.</p>';
    });

  function buildFilters() {
    if (!filterBar) return;
    const tags = new Set();
    projects.forEach(p => (p.tags || []).forEach(t => tags.add(t)));

    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'Tümü';
    allBtn.dataset.filter = 'all';
    allBtn.addEventListener('click', () => setFilter('all'));
    filterBar.appendChild(allBtn);

    const sortedTags = ['frontend', 'ai', 'backend', 'data', 'maps', 'database', 'productivity', 'portfolio']
      .filter(t => tags.has(t));

    sortedTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = tagLabels[tag] || tag;
      btn.dataset.filter = tag;
      btn.addEventListener('click', () => setFilter(tag));
      filterBar.appendChild(btn);
    });
  }

  function setFilter(tag) {
    activeFilter = tag;
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.filter === tag);
    });
    renderProjects(tag);
  }

  function renderProjects(filter) {
    if (!grid) return;

    const filtered = filter === 'all'
      ? projects
      : projects.filter(p => p.tags && p.tags.includes(filter));

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="project-empty">Bu kategoride proje bulunamadı.</p>';
      return;
    }

    grid.innerHTML = '';
    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal';
      card.style.transitionDelay = `${(i % 3) * 0.08}s`;

      card.innerHTML = `
        <div class="project-card-header">
          <div class="project-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <span class="project-card-year">${p.year || ''}</span>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description || ''}</p>
        <div class="project-card-tags">
          ${(p.tags || []).map(t => `<span class="project-card-tag">${tagLabels[t] || t}</span>`).join('')}
        </div>
        <a href="${p.url || '#'}" class="project-card-link" target="_blank" rel="noopener">
          İncele
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        </a>
      `;
      grid.appendChild(card);
    });

    // Trigger scroll reveal for new cards
    observeCards();
  }

  // ========================================
  // SCROLL REVEAL
  // ========================================
  let observer = null;

  function observeCards() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
  }

  // Initial observe for sections already in DOM
  observeCards();

  // ========================================
  // MOBILE NAV
  // ========================================
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ========================================
  // NAV HIDE ON SCROLL
  // ========================================
  let lastScroll = 0;
  const nav = document.querySelector('.nav');

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > lastScroll && curr > 80) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    lastScroll = curr;
  }, { passive: true });

});
