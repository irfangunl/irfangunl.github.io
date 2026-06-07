/* ==============================================
   irfangunel.me — Portfolio Scripts (v2)
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==============================================
  // SKILLS
  // ==============================================
  const skillsData = [
    { name: 'JavaScript', level: 85, icon: 'js' },
    { name: 'Python', level: 80, icon: 'python' },
    { name: 'React', level: 70, icon: 'react' },
    { name: 'Node.js', level: 65, icon: 'node' },
    { name: 'AI / ML', level: 75, icon: 'ai' },
    { name: 'Veri Bilimi', level: 70, icon: 'data' },
    { name: 'HTML & CSS', level: 90, icon: 'html' },
    { name: 'Git & GitHub', level: 85, icon: 'git' },
    { name: 'Linux', level: 75, icon: 'terminal' },
    { name: 'Fuzzy Logic', level: 65, icon: 'logic' },
  ];

  const skillIcons = {
    'js': 'M12 2L2 7l.5 9.5L12 22l9.5-5.5L22 7z M12 7v9M7 12l5 3 5-3',
    'python': 'M12 2l3 3h5v5l3 3-3 3v5h-5l-3 3-3-3H4v-5l-3-3 3-3V5h5z M7 12h10',
    'react': 'M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07',
    'node': 'M3 12L12 3l9 9-9 9z M12 7v10M7 12l5 3 5-3',
    'ai': 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
    'data': 'M3 21h18M3 10h18M3 10l3-7h12l3 7M9 10l1-3h4l1 3M5 21v-6m14 6v-6M9 21v-6m6 6v-6',
    'html': 'M4 3h16l-1.5 18L12 22l-6.5-1z M7 8h10l-.5 5.5L12 15l-4.5-1.5',
    'git': 'M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z M12 6v6l4 2',
    'terminal': 'M4 17l6-6-6-6M12 19h8',
    'logic': 'M2 12h4l2-3 4 6 4-6 2 3h4M2 12v6M22 12v6',
  };

  const skillsGrid = document.getElementById('skills-grid');
  if (skillsGrid) {
    skillsData.forEach(s => {
      const card = document.createElement('div');
      card.className = 'skill-card reveal';
      card.innerHTML = `
        <div class="skill-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="${skillIcons[s.icon] || skillIcons.js}"/>
          </svg>
        </div>
        <div class="skill-card-name">${s.name}</div>
        <div class="skill-card-level">${s.level}%</div>
        <div class="skill-bar"><div class="skill-bar-fill" data-width="${s.level}"></div></div>
      `;
      skillsGrid.appendChild(card);
    });
  }

  // ==============================================
  // STAT COUNTERS
  // ==============================================
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 30);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
    });
  }

  // ==============================================
  // SKILL BAR ANIMATION
  // ==============================================
  function animateSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(el => {
      const w = el.dataset.width;
      el.style.width = w + '%';
    });
  }

  // ==============================================
  // PROJECTS
  // ==============================================
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

  fetch('projects.json')
    .then(r => r.json())
    .then(data => {
      projects = data;
      buildFilters();
      renderProjects('all');
    })
    .catch(() => {
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
      card.style.transitionDelay = `${(i % 3) * 0.06}s`;

      card.innerHTML = `
        <div class="project-card-top">
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
        <div class="project-card-footer">
          <a href="${p.url || '#'}" class="project-card-link" target="_blank" rel="noopener">
            İncele
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
          ${p.stars ? `<span class="project-card-stars"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>${p.stars}</span>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });

    observeReveal();
  }

  // ==============================================
  // SCROLL REVEAL
  // ==============================================
  let revealObserver;

  function observeReveal() {
    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal:not(.visible)').forEach(el => revealObserver.observe(el));
  }

  // Initial observe
  observeReveal();

  // ==============================================
  // SECTION REVEAL — trigger counters & bars
  // ==============================================
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        aboutObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const aboutSection = document.querySelector('.about');
  if (aboutSection) aboutObserver.observe(aboutSection);

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) skillsObserver.observe(skillsSection);

  // ==============================================
  // MOBILE NAV
  // ==============================================
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ==============================================
  // NAV HIDE ON SCROLL
  // ==============================================
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
