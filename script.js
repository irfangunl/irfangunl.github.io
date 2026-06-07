/* ==============================================
   irfangunel.me — Portfolio Scripts v3
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==============================================
  // SCROLL PROGRESS
  // ==============================================
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ==============================================
  // TYPED WORD
  // ==============================================
  const typedEl = document.getElementById('typedWord');
  const words = ['scale', 'work', 'persist', 'matter'];
  let wordIdx = 0, charIdx = 0, deleting = false;

  function typeLoop() {
    if (!typedEl) return;
    const word = words[wordIdx];
    if (!deleting) {
      typedEl.textContent = word.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === word.length) { deleting = true; setTimeout(typeLoop, 1800); return; }
      setTimeout(typeLoop, 80 + Math.random() * 60);
    } else {
      typedEl.textContent = word.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; setTimeout(typeLoop, 300); return; }
      setTimeout(typeLoop, 40);
    }
  }
  typeLoop();

  // ==============================================
  // ==============================================
  // ==============================================
  // EXPERIENCE
  // ==============================================
  const experienceData = [
    {
      period: '2026 — Present',
      role: 'Software Engineering Intern',
      company: 'Miote',
      desc: 'Working as a software engineering intern on production systems. Collaborating with the team on real features, learning how professional software gets shipped at scale.',
      tags: ['Internship', 'Production code', 'Team collaboration']
    },
    {
      period: '2025 — Present',
      role: 'Open-Source Maintainer',
      company: 'GitHub · irfangunl',
      desc: 'Maintaining and shipping open-source projects: VerusPanel (server control panel), VerusDB (embedded database), RouteZero (AI model router), and smaller experiments. 12+ public repositories.',
      tags: ['OSS', 'PHP', 'TypeScript', 'Python']
    },
    {
      period: '2025',
      role: 'Freelance Web Developer',
      company: 'Merbil Eğitim Araçları',
      desc: 'Designed and developed the e-commerce website for a Turkish educational tools retailer. The site was built contact-first — driving visitors to WhatsApp rather than expecting cart-based checkout.',
      tags: ['PHP', 'Laravel', 'MySQL', 'Client work']
    },
    {
      period: '2024 — Present',
      role: 'IT Student (Final Year)',
      company: 'University',
      desc: 'Final-year IT student. Coursework in algorithms, databases, software engineering, and AI. The rest I learned by building.',
      tags: ['IT', 'Algorithms', 'Databases', 'AI coursework']
    }
  ];

  const expList = document.getElementById('experience-list');
  if (expList) {
    experienceData.forEach((e, i) => {
      const item = document.createElement('div');
      item.className = 'experience-item reveal';
      item.style.transitionDelay = `${i * 0.06}s`;
      item.innerHTML = `
        <div class="experience-period">${e.period}</div>
        <div class="experience-content">
          <h3 class="experience-role">${e.role}</h3>
          <div class="experience-company">${e.company}</div>
          <p class="experience-desc">${e.desc}</p>
          <div class="experience-tags">
            ${e.tags.map(t => `<span class="experience-tag">${t}</span>`).join('')}
          </div>
        </div>
      `;
      expList.appendChild(item);
    });
  }

  // ==============================================
  // STACK
  // ==============================================
  const skillIcons = {
    'PHP': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', // file/code
    'Laravel': 'M12 2a10 10 0 1 0 10 10', // arc/blade
    'MySQL': 'M3 7c0-1 4-3 9-3s9 2 9 3v10c0 1-4 3-9 3s-9-2-9-3V7zM3 12c0 1 4 3 9 3s9-2 9-3', // database
    'REST APIs': 'M22 12h-4l-3 9L9 3l-3 9H2', // nodes/network
    'Composer': 'M12 2L2 7l10 5 10-5L12 2zM2 17l10 5 10-5M2 12l10 5 10-5', // box/dependency
    'Bash': 'M4 4l6 6-6 6M12 18h8', // terminal
    'JavaScript (ES6+)': 'M8 5L3 12l5 7M16 5l5 7-5 7', // curly braces
    'TypeScript': 'M4 4h16v16H4zM9 12h6M12 9v6', // TS square
    'React': 'M12 2C9 2 7 6 7 12s2 10 5 10 5-4 5-10-2-10-5-10zM7 12h10M12 2c3 0 5 4 5 10s-2 10-5 10', // atom
    'Vue.js': 'M2 3h20L12 21 2 3zM12 21l4-9h-4v-3', // V shape
    'Tailwind CSS': 'M12 5c-4 0-6 3-6 6 2 0 4-1 6-2 2-1 4-2 6-2 0-3-2-6-6-6zM6 11c-2 0-4 1-6 2 2 2 4 3 6 3 2 0 4-1 6-2', // style/brush
    'Blade Templates': 'M3 3h18v18H3zM3 9h18', // layout/grid
    'Python': 'M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4zM5 12h14l-2 9H7l-2-9z', // code/brain
    'TensorFlow / Keras': 'M6 4v16M18 4v16M12 2v20M4 8h16M4 16h16', // plus/graph
    'Pandas / NumPy': 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z', // grid/table
    'Scikit-learn': 'M3 21h18M3 10h4v11H3zM9 6h4v15H9zM15 3h4v18h-4z', // chart
    'OpenCV': 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 6 0 3 3 0 0 0-6 0z', // eye
    'Fuzzy Logic': 'M4 6c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M4 18c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2', // wave/sigmoid
    'Git & GitHub': 'M6 3v12M18 3v12M6 15c0 3 3 6 6 6s6-3 6-6M6 9h12', // git branch
    'Linux': 'M4 4l6 6-6 6M12 18h8', // terminal/console
    'Docker': 'M3 8h6v6H3zM11 8h6v6h-6zM19 8h2v6h-2zM7 14h6v6H7zM15 14h6v6h-6z', // container/boxes
    'Node.js': 'M12 22V2M5 12h14', // cross/plus
    'VS Code': 'M8 5L3 12l5 7M16 5l5 7-5 7', // angle brackets (code)
    'Nginx / Apache': 'M12 2a10 10 0 1 0 10 10M2 12h20M12 2v20', // globe
  };
  const defaultIcon = 'M12 2L2 7l10 5 10-5L12 2z'; // default hexagon

  const stackData = [
    {
      name: 'Backend (main)',
      icon: 'M5 12h14M12 5l7 7-7 7',
      items: [
        { name: 'PHP', level: 5 },
        { name: 'Laravel', level: 5 },
        { name: 'MySQL', level: 5 },
        { name: 'REST APIs', level: 5 },
        { name: 'Composer', level: 4 },
        { name: 'Bash', level: 4 },
      ]
    },
    {
      name: 'Frontend',
      icon: 'M2 3h20v18H2z M2 9h20 M9 21V9',
      items: [
        { name: 'Blade Templates', level: 5 },
        { name: 'JavaScript (ES6+)', level: 4 },
        { name: 'TypeScript', level: 4 },
        { name: 'React', level: 4 },
        { name: 'Tailwind CSS', level: 4 },
        { name: 'Vue.js', level: 3 },
      ]
    },
    {
      name: 'AI / Data',
      icon: 'M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z M5 12h14l-2 9H7l-2-9z',
      items: [
        { name: 'Python', level: 4 },
        { name: 'TensorFlow / Keras', level: 4 },
        { name: 'Pandas / NumPy', level: 4 },
        { name: 'Scikit-learn', level: 4 },
        { name: 'Fuzzy Logic', level: 4 },
        { name: 'OpenCV', level: 3 },
      ]
    },
    {
      name: 'Tools & Ops',
      icon: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
      items: [
        { name: 'Git & GitHub', level: 5 },
        { name: 'VS Code', level: 5 },
        { name: 'Linux', level: 4 },
        { name: 'Node.js', level: 4 },
        { name: 'Nginx / Apache', level: 4 },
        { name: 'Docker', level: 3 },
      ]
    }
  ];

  const stackCategories = document.getElementById('stack-categories');
  if (stackCategories) {
    stackData.forEach(cat => cat.items.sort((a, b) => b.level - a.level));
    stackData.forEach((cat, i) => {
      const card = document.createElement('div');
      card.className = 'stack-category reveal';
      card.style.transitionDelay = `${i * 0.1}s`;
      card.innerHTML = `
        <div class="stack-category-head">
          <div class="stack-category-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <path d="${cat.icon}"/>
            </svg>
          </div>
          <h3 class="stack-category-name">${cat.name}</h3>
        </div>
        <div class="stack-chip-list">
          ${cat.items.map(item => `
            <div class="stack-chip">
              <svg class="stack-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
                <path d="${skillIcons[item.name] || defaultIcon}"/>
              </svg>
              <span class="stack-chip-name">${item.name}</span>
            </div>
          `).join('')}
        </div>
      `;
      stackCategories.appendChild(card);
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
    'fullstack': 'Full-Stack',
    'ai': 'AI/ML',
    'ml': 'ML',
    'data': 'Data',
    'maps': 'Maps',
    'database': 'Database',
    'productivity': 'Productivity',
    'portfolio': 'Portfolio',
    'web': 'Web',
    'saas': 'SaaS',
    'accessibility': 'Accessibility',
    'open-source': 'Open Source',
    'client': 'Client Work',
  };

  fetch('projects.json')
    .then(r => r.json())
    .then(data => {
      projects = data;
      buildFilters();
      renderProjects('all');
    })
    .catch(() => {
      if (grid) grid.innerHTML = '<p class="project-empty">Could not load projects.</p>';
    });

  function buildFilters() {
    if (!filterBar) return;
    const tags = new Set();
    projects.forEach(p => (p.tags || []).forEach(t => tags.add(t)));

    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.textContent = 'All';
    allBtn.dataset.filter = 'all';
    allBtn.addEventListener('click', () => setFilter('all'));
    filterBar.appendChild(allBtn);

    const order = ['fullstack', 'backend', 'ai', 'frontend', 'database', 'saas', 'open-source', 'client', 'productivity'];
    order.filter(t => tags.has(t)).forEach(tag => {
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

  function statusLabel(s) {
    if (s === 'active') return 'Active';
    if (s === 'completed') return 'Completed';
    if (s === 'in-progress') return 'In progress';
    return s;
  }

  function renderProjects(filter) {
    if (!grid) return;
    const filtered = filter === 'all'
      ? projects
      : projects.filter(p => p.tags && p.tags.includes(filter));

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="project-empty">No projects in this category.</p>';
      return;
    }

    grid.innerHTML = '';
    filtered.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal-scale';
      card.style.transitionDelay = `${(i % 3) * 0.06}s`;
      card.dataset.projectId = p.id;
      card.tabIndex = 0;

      const firstLetter = p.title.charAt(0);
      const imageHTML = p.image
        ? `<img src="${p.image}" alt="${p.title} screenshot" loading="lazy">`
        : `<div class="project-card-visual" style="color: ${p.color};">${firstLetter}</div>`;

      card.innerHTML = `
        <div class="project-card-image" style="background: linear-gradient(135deg, ${p.color}22, ${p.color}08);">
          ${imageHTML}
          <div class="project-card-status ${p.status}">${statusLabel(p.status)}</div>
          <div class="project-card-overlay">
            <span class="project-card-view">
              View details
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </div>
        <div class="project-card-body">
          <div class="project-card-meta">
            <span class="project-card-category">${p.category}</span>
            <span>${p.year}</span>
          </div>
          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-tagline">${p.tagline || ''}</p>
          <p class="project-card-desc">${p.description || ''}</p>
          <div class="project-card-tech">
            ${(p.tech || []).slice(0, 4).map(t => `<span class="project-card-tech-item">${t}</span>`).join('')}
            ${(p.tech && p.tech.length > 4) ? `<span class="project-card-tech-item">+${p.tech.length - 4}</span>` : ''}
          </div>
        </div>
      `;
      card.addEventListener('click', () => openModal(p));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p); }
      });
      grid.appendChild(card);
    });

    observeReveal();
  }

  // ==============================================
  // MODAL
  // ==============================================
  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  let lastFocusedElement = null;

  function openModal(project) {
    if (!modal || !modalBody) return;
    lastFocusedElement = document.activeElement;
    modalBody.innerHTML = buildModalContent(project);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function buildModalContent(p) {
    const metrics = p.metrics || {};
    const metricEntries = Object.entries(metrics);
    const imageHTML = p.image
      ? `<div class="modal-image"><img src="${p.image}" alt="${p.title} screenshot"></div>`
      : '';

    return `
      ${imageHTML}
      <div class="modal-hero" style="--accent: ${p.color};">
        <div class="modal-status" style="color: ${p.color}; border-color: ${p.color}40;">${statusLabel(p.status)}</div>
        <h2 class="modal-title">${p.title}</h2>
        <p class="modal-tagline">${p.tagline || ''}</p>
        <div class="modal-meta-grid">
          <div>
            <div class="modal-meta-label">Role</div>
            <div class="modal-meta-value">${p.role || 'Developer'}</div>
          </div>
          <div>
            <div class="modal-meta-label">Duration</div>
            <div class="modal-meta-value">${p.duration || '-'}</div>
          </div>
          <div>
            <div class="modal-meta-label">Team</div>
            <div class="modal-meta-value">${p.team || '-'}</div>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">Overview</h3>
        <p class="modal-text">${p.longDescription || p.description || ''}</p>
      </div>

      ${(p.highlights && p.highlights.length) ? `
        <div class="modal-section">
          <h3 class="modal-section-title">Highlights</h3>
          <div class="modal-highlights">
            ${p.highlights.map(h => `<div class="modal-highlight">${h}</div>`).join('')}
          </div>
        </div>
      ` : ''}

      ${(p.tech && p.tech.length) ? `
        <div class="modal-section">
          <h3 class="modal-section-title">Tech stack</h3>
          <div class="modal-tech">
            ${p.tech.map(t => `<span class="modal-tech-item">${t}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${metricEntries.length ? `
        <div class="modal-section">
          <h3 class="modal-section-title">By the numbers</h3>
          <div class="modal-metrics">
            ${metricEntries.map(([key, value]) => `
              <div class="modal-metric">
                <span class="modal-metric-value">${value}</span>
                <span class="modal-metric-label">${key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="modal-actions">
        ${p.url && p.url !== '#' ? `<a href="${p.url}" class="btn btn-primary" target="_blank" rel="noopener">
          <span>Source code</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>` : ''}
        ${p.demo ? `<a href="${p.demo}" class="btn btn-outline" target="_blank" rel="noopener">
          <span>Live demo</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>` : ''}
      </div>
    `;
  }

  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', closeModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  // ==============================================
  // SCROLL REVEAL
  // ==============================================
  let revealObserver;
  function observeReveal() {
    if (revealObserver) revealObserver.disconnect();
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal, .reveal-scale').forEach(el => el.classList.add('visible'));
      return;
    }
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal:not(.visible), .reveal-scale:not(.visible)').forEach(el => revealObserver.observe(el));
  }
  observeReveal();

  // ==============================================
  // MOBILE NAV
  // ==============================================
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('nav-open');
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
    if (curr > lastScroll && curr > 100) nav.style.transform = 'translateY(-100%)';
    else nav.style.transform = 'translateY(0)';
    lastScroll = curr;
  }, { passive: true });

});
