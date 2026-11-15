/**
 * ====================================================================
 * GODLIN R E - MASTER JAVASCRIPT
 * Interactions, Dynamic Rendering, Modals, Forms & Scroll Logic
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initDynamicProjects();
  initDynamicCertifications();
  initModals();
  initContactForm();
  initCopyEmail();
  initBackToTop();
  initHeroTyping();
});

/* --------------------------------------------------
   1. NAVBAR & NAVIGATION SCROLL SPY
   -------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileOverlay = document.getElementById('mobileNavOverlay');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll event for sticky navbar style & scroll spy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background blur on scroll
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Scroll Spy
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Toggle
  function toggleMobileMenu() {
    hamburgerBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('open');
    mobileOverlay.classList.toggle('open');
    document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('active');
    mobileDrawer.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close drawer when mobile nav link is clicked
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

/* --------------------------------------------------
   2. HERO DYNAMIC TEXT CYCLER
   -------------------------------------------------- */
function initHeroTyping() {
  const cycleElem = document.getElementById('dynamicHeroText');
  if (!cycleElem) return;

  const phrases = [
    "Aspiring AI/ML Engineer",
    "B.Tech CSE Student (AIML)",
    "Problem Solver & Developer",
    "Neural Network Enthusiast"
  ];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let speed = 90;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      cycleElem.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      speed = 45;
    } else {
      cycleElem.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      speed = 90;
    }

    if (!isDeleting && letterIndex === currentPhrase.length) {
      speed = 2000; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400; // Pause before typing new word
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();
}

/* --------------------------------------------------
   3. DYNAMIC PROJECTS RENDERING & FILTERING
   -------------------------------------------------- */
function initDynamicProjects() {
  const container = document.getElementById('projectsContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!container) return;

  function renderProjects(filter = 'all') {
    const filtered = (typeof getProjects === 'function') ? getProjects(filter) : [];
    container.innerHTML = '';

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <p>No projects found in this category yet. You can add more easily in <code>js/projects-data.js</code>.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((project) => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', project.category);

      const techTagsHtml = project.technologies
        .map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
        .join('');

      card.innerHTML = `
        <div>
          <div class="project-card-header">
            <div class="project-folder-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="project-actions">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-action-link" title="View Source on GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <button class="project-action-link project-detail-trigger" data-id="${project.id}" title="Project Details">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>

          <span class="project-category-badge">${escapeHtml(project.categoryName || project.category)}</span>
          <h3 class="project-title">${escapeHtml(project.title)}</h3>
          <p class="project-description">${escapeHtml(project.description)}</p>
        </div>

        <div>
          <div class="project-tech-tags">
            ${techTagsHtml}
          </div>
          <div class="project-card-footer">
            <button class="view-details-btn project-detail-trigger" data-id="${project.id}">
              <span>Explore Overview</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="padding: 0.35rem 0.85rem; font-size: 0.78rem;">
              GitHub
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach click triggers to detail buttons
    document.querySelectorAll('.project-detail-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const projId = btn.getAttribute('data-id');
        openProjectModal(projId);
      });
    });
  }

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Initial render
  renderProjects('all');
}

/* --------------------------------------------------
   4. DYNAMIC CERTIFICATIONS RENDERING
   -------------------------------------------------- */
function initDynamicCertifications() {
  const container = document.getElementById('certsContainer');
  if (!container) return;

  const certs = (typeof getCertifications === 'function') ? getCertifications() : [];
  container.innerHTML = '';

  certs.forEach((cert) => {
    const card = document.createElement('div');
    card.className = 'cert-card';

    const skillsHtml = cert.skillsLearned
      .map(s => `<span class="cert-skill-pill">${escapeHtml(s)}</span>`)
      .join('');

    card.innerHTML = `
      <div>
        <div class="cert-badge-row">
          <div class="cert-icon-seal">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
          </div>
          <span class="cert-status-tag">${escapeHtml(cert.status)}</span>
        </div>

        <h3 class="cert-title">${escapeHtml(cert.title)}</h3>
        <p class="cert-issuer">${escapeHtml(cert.issuer)}</p>
        <p class="cert-description">${escapeHtml(cert.description)}</p>
      </div>

      <div>
        <div class="cert-skills-wrap">
          ${skillsHtml}
        </div>
        <div class="cert-footer-row">
          <span class="cert-id-tag">ID: ${escapeHtml(cert.credentialId)}</span>
          <button class="cert-verify-btn" onclick="openCertPlaceholderModal('${escapeHtml(cert.title)}')">
            <span>View Details</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/* --------------------------------------------------
   5. MODALS & POPUP CONTROLLERS
   -------------------------------------------------- */
function initModals() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      closeModal();
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Resume buttons triggers
  const resumeBtns = document.querySelectorAll('.btn-resume-trigger');
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  });
}

function closeModal() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function openProjectModal(projectId) {
  const project = (typeof getProjectById === 'function') ? getProjectById(projectId) : null;
  if (!project) return;

  const modalBody = document.getElementById('modalDynamicContent');
  const modalOverlay = document.getElementById('projectModalOverlay');

  const highlightsHtml = project.highlights && project.highlights.length > 0
    ? `<div style="margin: 1.5rem 0;">
        <h4 style="font-size: 0.95rem; color: #fff; margin-bottom: 0.75rem; text-transform: uppercase; font-family: var(--font-mono); letter-spacing: 1px;">Key Features & Architecture:</h4>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
          ${project.highlights.map(h => `<li style="font-size: 0.9rem; color: var(--text-secondary); display: flex; gap: 0.6rem;"><span style="color: var(--accent-cyan);">\u25B8</span> ${escapeHtml(h)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  const techHtml = project.technologies
    .map(t => `<span class="tech-tag" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.3); color: #e9d5ff;">${escapeHtml(t)}</span>`)
    .join('');

  modalBody.innerHTML = `
    <span class="project-category-badge" style="font-size: 0.8rem;">${escapeHtml(project.categoryName || project.category)}</span>
    <h2 style="font-family: var(--font-heading); font-size: 1.85rem; color: #fff; margin-bottom: 1rem;">${escapeHtml(project.title)}</h2>
    
    <p style="font-size: 1rem; color: var(--text-secondary); line-height: 1.75; margin-bottom: 1.5rem;">
      ${escapeHtml(project.longDescription || project.description)}
    </p>

    ${highlightsHtml}

    <div style="margin: 1.5rem 0;">
      <h4 style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; font-family: var(--font-mono);">Technologies Employed:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
        ${techHtml}
      </div>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
      <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span>View on GitHub</span>
      </a>
      <button class="btn btn-secondary" onclick="closeModal()">
        <span>Close</span>
      </button>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openResumeModal() {
  const modalBody = document.getElementById('modalDynamicContent');
  const modalOverlay = document.getElementById('projectModalOverlay');

  modalBody.innerHTML = `
    <div style="text-align: center; padding: 1rem 0;">
      <div style="width: 60px; height: 60px; border-radius: 16px; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--accent-cyan);">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      </div>

      <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: #fff; margin-bottom: 0.5rem;">Resume Placeholder</h3>
      <p style="font-size: 0.95rem; color: var(--accent-purple); font-weight: 600; margin-bottom: 1.25rem;">Godlin R E | B.Tech CSE (AIML), Jain University</p>

      <div style="text-align: left; background: rgba(18, 24, 48, 0.6); border: 1px dashed rgba(168, 85, 247, 0.35); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 2rem;">
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1rem;">
          This is an interactive placeholder for your official resume. As requested, no achievements or credentials have been invented.
        </p>
        <p style="font-size: 0.88rem; color: var(--accent-cyan); font-family: var(--font-mono);">
          \u2726 To attach your resume PDF: Place your file at <code>assets/resume.pdf</code> or link your Google Drive / LinkedIn document.
        </p>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <a href="mailto:jazzojazzy288@gmail.com?subject=Requesting%20Resume%20-%20Godlin%20R%20E" class="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <span>Request Resume via Email</span>
        </a>
        <button class="btn btn-secondary" onclick="closeModal()">
          <span>Close</span>
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

window.openCertPlaceholderModal = function (certTitle) {
  const modalBody = document.getElementById('modalDynamicContent');
  const modalOverlay = document.getElementById('projectModalOverlay');

  modalBody.innerHTML = `
    <div style="text-align: center; padding: 1rem 0;">
      <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; color: var(--accent-cyan);">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="7"></circle>
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
        </svg>
      </div>

      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin-bottom: 0.5rem;">${escapeHtml(certTitle)}</h3>
      <span class="status-badge" style="margin-bottom: 1.25rem; display: inline-flex;">Verification &amp; Link Placeholder</span>

      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">
        This certificate card is structured and ready for your verified credential URL, completion ID, or online badge (e.g. Coursera, DeepLearning.AI, Udemy, HackerRank).
      </p>

      <div style="text-align: left; background: rgba(18, 24, 48, 0.6); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 2rem; font-family: var(--font-mono); font-size: 0.85rem; color: #cbd5e1;">
        <span style="color: var(--accent-purple);">// To update this certification:</span><br>
        Open <code>js/certifications-data.js</code> and replace the <code>credentialUrl</code> and <code>issuer</code> with your direct links.
      </div>

      <button class="btn btn-primary" onclick="closeModal()">
        <span>Got it!</span>
      </button>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

/* --------------------------------------------------
   6. CONTACT FORM HANDLING & VALIDATION
   -------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Simple validation
    if (!name || !email || !message) {
      showToast('Please fill in all required fields (Name, Email, Message).', 'warning');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Please provide a valid email address.', 'warning');
      return;
    }

    // Prepare mailto link as client fallback
    const mailtoSubject = encodeURIComponent(subject ? `Portfolio Contact: ${subject}` : `Portfolio Contact from ${name}`);
    const mailtoBody = encodeURIComponent(`Hi Godlin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:jazzojazzy288@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show celebratory confirmation
    showToast(`Thank you, ${name}! Opening your email client to send to Godlin...`, 'success');

    // Trigger mailto fallback after 800ms
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();
  });
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/* --------------------------------------------------
   7. 1-CLICK EMAIL COPY
   -------------------------------------------------- */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-trigger');
  const emailToCopy = 'jazzojazzy288@gmail.com';

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailToCopy).then(() => {
          showToast(`Copied to clipboard: ${emailToCopy}`, 'success');
        }).catch(() => {
          fallbackCopyText(emailToCopy);
        });
      } else {
        fallbackCopyText(emailToCopy);
      }
    });
  });
}

function fallbackCopyText(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied to clipboard: ${text}`, 'success');
  } catch (err) {
    showToast(`Email address: ${text}`, 'info');
  }
  document.body.removeChild(textArea);
}

/* --------------------------------------------------
   8. TOAST NOTIFICATIONS
   -------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = `
    <svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;

  if (type === 'success') {
    iconSvg = `
      <svg class="toast-icon" style="color: #34d399;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else if (type === 'warning') {
    iconSvg = `
      <svg class="toast-icon" style="color: #f59e0b;" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    `;
  }

  toast.innerHTML = `
    ${iconSvg}
    <span class="toast-message">${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

/* --------------------------------------------------
   9. BACK TO TOP BUTTON
   -------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------
   HELPER UTILITIES
   -------------------------------------------------- */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
