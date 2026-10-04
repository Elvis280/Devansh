/* ═══════════════════════════════════════════════════════════════
   DEVANSH SHARMA PORTFOLIO — main.js
   FastAPI + Jinja2 edition — All interactivity in vanilla JS
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ────────────────────────────────────────────────── */
  const loader = document.getElementById('loader');
  const mainContent = document.getElementById('main-content');
  if (loader && mainContent) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        loader.style.display = 'none';
        mainContent.style.opacity = '1';
      }, 600);
    }, 1800);
    mainContent.style.opacity = '0';
    mainContent.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1)';
  }

  /* ── NAVIGATION ────────────────────────────────────────────── */
  const navInner = document.querySelector('.nav-inner');
  const navOverlay = document.getElementById('nav-overlay');
  const navMenuBtn = document.getElementById('nav-menu-btn');
  const navCloseBtn = document.getElementById('nav-close-btn');
  const navLogoBtn = document.getElementById('nav-logo-btn');
  const socialRail  = document.getElementById('social-rail');

  // Scroll → frosted header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navInner?.classList.add('scrolled');
    } else {
      navInner?.classList.remove('scrolled');
    }

    // Hide social rail when not in hero
    const hero = document.getElementById('hero');
    if (socialRail && hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        socialRail.classList.add('hidden');
      } else {
        socialRail.classList.remove('hidden');
      }
    }
  }, { passive: true });

  // Open menu
  navMenuBtn?.addEventListener('click', () => {
    updateActiveNavLink();
    navOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  // Close menu
  navCloseBtn?.addEventListener('click', closeMenu);
  navOverlay?.addEventListener('click', (e) => {
    if (e.target === navOverlay) closeMenu();
  });

  function closeMenu() {
    navOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateActiveNavLink() {
    const sections = ['contact', 'achievements', 'journey', 'experiments', 'projects', 'about', 'hero'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom > 0) {
          document.querySelectorAll('.nav-link-item').forEach(b => {
            b.classList.toggle('active', b.dataset.target === id);
          });
          return;
        }
      }
    }
  }

  // Logo → scroll to top
  navLogoBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  });

  // Nav link items → smooth scroll
  document.querySelectorAll('.nav-link-item[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        closeMenu();
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  });

  /* ── SCROLL REVEAL (IntersectionObserver) ──────────────────── */
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in-view'));
  }

  /* ── HERO SCROLL CTA ───────────────────────────────────────── */
  const scrollCta = document.getElementById('hero-scroll-btn');
  scrollCta?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ── ABOUT – Polaroid Stack ────────────────────────────────── */
  const polaroids = document.querySelectorAll('.polaroid');
  let activePolaroid = 0;
  let polaroidInterval;

  function applyPolaroidState() {
    polaroids.forEach((p, i) => {
      const id = parseInt(p.dataset.id);
      const isActive = id === activePolaroid;
      const isNext = (activePolaroid + 1) % polaroids.length === id;
      const rotations = [-2, 2, -1];
      p.classList.toggle('inactive', !isActive);
      if (isActive) {
        p.style.transform = `translate(0,0) scale(1) rotate(${rotations[id] || 0}deg)`;
        p.style.zIndex = '30';
      } else if (isNext) {
        p.style.transform = `translate(25%,25%) scale(0.95) rotate(6deg)`;
        p.style.zIndex = '20';
      } else {
        p.style.transform = `translate(15%,-25%) scale(0.9) rotate(12deg)`;
        p.style.zIndex = '10';
      }
    });
  }

  if (polaroids.length > 0) {
    applyPolaroidState();
    polaroidInterval = setInterval(() => {
      activePolaroid = (activePolaroid + 1) % polaroids.length;
      applyPolaroidState();
    }, 8000);

    polaroids.forEach(p => {
      p.addEventListener('click', () => {
        activePolaroid = parseInt(p.dataset.id);
        applyPolaroidState();
        clearInterval(polaroidInterval);
        polaroidInterval = setInterval(() => {
          activePolaroid = (activePolaroid + 1) % polaroids.length;
          applyPolaroidState();
        }, 8000);
      });
    });
  }

  /* ── ABOUT – Dossier Modal ─────────────────────────────────── */
  const dossierModal = document.getElementById('dossier-modal');
  const dossierOpenBtn = document.getElementById('dossier-open-btn');
  const dossierCloseBtn = document.getElementById('dossier-close-btn');

  dossierOpenBtn?.addEventListener('click', () => {
    dossierModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  dossierCloseBtn?.addEventListener('click', () => {
    dossierModal?.classList.remove('open');
    document.body.style.overflow = '';
  });

  dossierModal?.addEventListener('click', (e) => {
    if (e.target === dossierModal) {
      dossierModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ── 03 — PROJECTS: 3D Infinite Menu & Case Study System ────── */
  let projectsData = [];
  const projectsScript = document.getElementById('projects-data');
  if (projectsScript) {
    try {
      projectsData = JSON.parse(projectsScript.textContent);
    } catch (err) {
      console.error('Error parsing projects data:', err);
    }
  }

  const infiniteCanvas = document.getElementById('infinite-grid-menu-canvas');
  let infiniteSketch = null;
  let activeProjectIndex = 0;
  let activeProjectId = projectsData[0]?.id || 'knowfforge';
  let activeTab = 'overview';

  // HUD and Overlay DOM Elements
  const menuActivePill = document.getElementById('menu-active-pill');
  const menuActiveCategory = document.getElementById('menu-active-category');
  const menuFaceTitleWrap = document.getElementById('menu-face-title-wrap');
  const menuFaceTitle = document.getElementById('menu-face-title');
  const menuFaceSubtitle = document.getElementById('menu-face-subtitle');
  const menuFaceDesc = document.getElementById('menu-face-desc');
  const menuFaceDescWrap = document.getElementById('menu-face-desc-wrap');
  const menuFaceTech = document.getElementById('menu-face-tech');
  const centerCardHoverZone = document.getElementById('center-card-hover-zone');
  const cardGithubGotoBtn = document.getElementById('card-github-goto-btn');
  const descCardViewBtn = document.getElementById('desc-card-view-btn');
  const caseModal = document.getElementById('case-modal');
  const caseModalClose = document.getElementById('case-modal-close');

  function updateActiveProjectUI(index) {
    if (!projectsData.length) return;
    const itemIndex = ((index % projectsData.length) + projectsData.length) % projectsData.length;
    activeProjectIndex = itemIndex;
    const item = projectsData[itemIndex];
    if (!item) return;

    activeProjectId = item.id;

    // Update Top HUD
    if (menuActivePill) menuActivePill.textContent = `SYS // ${item.number}`;
    if (menuActiveCategory) menuActiveCategory.textContent = item.category;

    // Update Left Title & Subtitle
    if (menuFaceTitle) menuFaceTitle.textContent = item.title;
    if (menuFaceSubtitle) menuFaceSubtitle.textContent = item.subtitle;

    // Update Right Description & Tech
    if (menuFaceDesc) menuFaceDesc.textContent = item.description;
    if (menuFaceTech && Array.isArray(item.tech)) {
      menuFaceTech.innerHTML = item.tech.slice(0, 4).map(t => `<span class="face-tech-tag">${t}</span>`).join('');
    }

    // Update Bottom-Left Card Goto GitHub Button
    if (cardGithubGotoBtn) {
      if (item.github) {
        cardGithubGotoBtn.href = item.github;
        cardGithubGotoBtn.setAttribute('aria-label', `Open GitHub Repository for ${item.title}`);
        cardGithubGotoBtn.style.display = 'inline-flex';
      } else {
        cardGithubGotoBtn.style.display = 'none';
      }
    }

    // Update Quick Selector Pills
    document.querySelectorAll('.quick-project-pill').forEach((pill, idx) => {
      pill.classList.toggle('active', idx === itemIndex);
    });
  }

  function handleMovementChange(isMoving) {
    if (menuFaceTitleWrap) {
      menuFaceTitleWrap.classList.toggle('active', !isMoving);
      menuFaceTitleWrap.classList.toggle('inactive', isMoving);
    }
    if (menuFaceDescWrap) {
      menuFaceDescWrap.classList.toggle('active', !isMoving);
      menuFaceDescWrap.classList.toggle('inactive', isMoving);
    }
    if (cardGithubGotoBtn) {
      cardGithubGotoBtn.classList.toggle('active', !isMoving);
      cardGithubGotoBtn.classList.toggle('inactive', isMoving);
    }
  }

  // Initialize InfiniteMenu if canvas and InfiniteGridMenu exist
  if (infiniteCanvas && window.InfiniteGridMenu) {
    try {
      infiniteSketch = new window.InfiniteGridMenu(
        infiniteCanvas,
        projectsData,
        (index) => updateActiveProjectUI(index),
        (isMoving) => handleMovementChange(isMoving),
        (sk) => sk.run(),
        1.25 // scale factor for optimal sphere framing
      );

      window.addEventListener('resize', () => {
        if (infiniteSketch) infiniteSketch.resize();
      });
    } catch (err) {
      console.warn('InfiniteGridMenu WebGL initialization skipped:', err);
    }
  }

  // Quick Selector Pills click
  document.querySelectorAll('.quick-project-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const index = parseInt(pill.dataset.index, 10);
      if (infiniteSketch && typeof infiniteSketch.snapToItem === 'function') {
        infiniteSketch.snapToItem(index);
      } else {
        updateActiveProjectUI(index);
      }
    });
  });

  // Action Button (Explore Case Study)
  function openActiveCaseStudy() {
    const item = projectsData[activeProjectIndex] || projectsData[0];
    if (!item) return;
    document.querySelectorAll('.case-study-content').forEach(c => {
      c.style.display = c.dataset.id === item.id ? 'block' : 'none';
    });
    caseModal?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // Card goto GitHub button click
  cardGithubGotoBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Case Study View Button
  descCardViewBtn?.addEventListener('click', openActiveCaseStudy);

  // Case study modal triggers & close
  document.querySelectorAll('.project-view-case').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openActiveCaseStudy();
    });
  });

  caseModalClose?.addEventListener('click', closeCaseModal);
  caseModal?.addEventListener('click', (e) => { if (e.target === caseModal) closeCaseModal(); });

  function closeCaseModal() {
    caseModal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Initial state setup
  if (projectsData.length > 0) {
    updateActiveProjectUI(0);
  }

  /* ── JOURNEY – Interactive Timeline Cards, SVG Nodes & Counters ── */
  const journeyCards = document.querySelectorAll('.exp-cards-row .exp-card');
  const journeyNodes = document.querySelectorAll('.exp-node-group');

  function setStepActive(stepIndex) {
    journeyCards.forEach(c => {
      const isTarget = c.dataset.step === String(stepIndex);
      c.classList.toggle('active', isTarget);
    });
    journeyNodes.forEach(n => {
      const isTarget = n.dataset.step === String(stepIndex);
      n.classList.toggle('active', isTarget);
    });
  }

  function clearStepActive() {
    journeyCards.forEach(c => c.classList.remove('active'));
    journeyNodes.forEach(n => n.classList.remove('active'));
  }

  // Card interactions (hover sync + click toggle)
  journeyCards.forEach(card => {
    const step = card.dataset.step;
    const matchingNode = document.querySelector(`.exp-node-group[data-step="${step}"]`);

    card.addEventListener('mouseenter', () => {
      matchingNode?.classList.add('hover-synced');
    });
    card.addEventListener('mouseleave', () => {
      matchingNode?.classList.remove('hover-synced');
    });
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) {
        clearStepActive();
      } else {
        setStepActive(step);
      }
    });
  });

  // SVG Node interactions (hover sync + click toggle)
  journeyNodes.forEach(node => {
    const step = node.dataset.step;
    const matchingCard = document.querySelector(`.exp-cards-row .exp-card[data-step="${step}"]`);

    node.addEventListener('mouseenter', () => {
      matchingCard?.classList.add('hover-synced');
    });
    node.addEventListener('mouseleave', () => {
      matchingCard?.classList.remove('hover-synced');
    });
    node.addEventListener('click', () => {
      if (matchingCard?.classList.contains('active')) {
        clearStepActive();
      } else {
        setStepActive(step);
      }
    });
  });

  // Key Impact numbers display statically without counter animation

  /* ── ACHIEVEMENTS / CERTIFICATIONS (360° 3D CYLINDER + MODAL) ─── */
  const stage = document.getElementById('ach-cards-stage');
  const achCards = document.querySelectorAll('.ach-card');
  const prevBtn = document.getElementById('ach-prev-btn');
  const nextBtn = document.getElementById('ach-next-btn');
  const pagerBtns = document.querySelectorAll('.ach-pager-num');

  // Client-side source of truth from portfolio_data.py
  const certDataEl = document.getElementById('certificates-data');
  let certificatesList = [];
  if (certDataEl) {
    try {
      certificatesList = JSON.parse(certDataEl.textContent).filter(c => c.featured);
    } catch (_) {}
  }

  // Modal elements
  const modal = document.getElementById('ach-modal');
  const modalCloseBtn = document.getElementById('ach-modal-close');
  const modalImg = document.getElementById('ach-modal-img');
  const modalTitle = document.getElementById('ach-modal-title');
  const modalIssuer = document.getElementById('ach-modal-issuer');
  const modalOrgIcon = document.getElementById('ach-modal-org-icon');
  const modalCredential = document.getElementById('ach-modal-credential');
  const modalDate = document.getElementById('ach-modal-date');
  const modalYearTag = document.getElementById('ach-modal-year-tag');
  const modalCategory = document.getElementById('ach-modal-category');
  const modalIndexBadge = document.getElementById('ach-modal-index-badge');
  const modalLearnedList = document.getElementById('ach-modal-learned-list');
  const modalSkillsWrap = document.getElementById('ach-modal-skills-wrap');
  const modalVerifyBtn = document.getElementById('ach-modal-verify-btn');

  let currentModalIndex = 0;

  function openModal(idx) {
    const data = certificatesList[idx];
    if (!data || !modal) return;
    currentModalIndex = idx;

    if (modalTitle) modalTitle.textContent = data.title || data.name;
    if (modalIndexBadge) {
      modalIndexBadge.textContent = `[ ${(idx + 1).toString().padStart(2, '0')} / ${certificatesList.length.toString().padStart(2, '0')} ]`;
    }
    if (modalCategory) modalCategory.textContent = data.category || 'CREDENTIAL';
    if (modalDate) modalDate.textContent = (data.date || data.year || '').toUpperCase();
    if (modalYearTag) modalYearTag.textContent = data.year || data.date || '2024';
    if (modalIssuer) modalIssuer.textContent = data.org_name || data.issuer || '';
    if (modalOrgIcon) modalOrgIcon.innerHTML = data.org_logo || '';
    if (modalCredential) modalCredential.textContent = data.credential || data.name || '';
    if (modalImg) {
      modalImg.src = data.image || '';
      modalImg.alt = `${data.title} Certificate`;
    }

    // Populate What I Learned bullet points
    if (modalLearnedList) {
      const learnedPoints = Array.isArray(data.learned) && data.learned.length > 0 
        ? data.learned 
        : [
            `Built hands-on proficiency in ${data.title}.`,
            `Applied core algorithmic and engineering principles in real-world environments.`,
            `Completed verified evaluation benchmarks and assessment criteria.`
          ];
      modalLearnedList.innerHTML = learnedPoints
        .map(pt => `<li><span class="ach-learned-bullet">&#9656;</span><span>${pt}</span></li>`)
        .join('');
    }

    // Populate Skills Badges
    if (modalSkillsWrap) {
      const skills = Array.isArray(data.skills) ? data.skills : [];
      modalSkillsWrap.innerHTML = skills
        .map(sk => `<span class="ach-modal-skill-badge">${sk}</span>`)
        .join('');
    }

    // Verification link CTA
    if (modalVerifyBtn) {
      const verifyUrl = data.verification_url || data.url;
      if (verifyUrl && verifyUrl !== '#' && !verifyUrl.startsWith('javascript:')) {
        modalVerifyBtn.href = verifyUrl;
        modalVerifyBtn.style.display = 'inline-flex';
        modalVerifyBtn.innerHTML = `<span>VERIFY CREDENTIAL</span><span class="ach-btn-arrow">&nearr;</span>`;
      } else {
        modalVerifyBtn.style.display = 'none';
      }
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ach-modal-open');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ach-modal-open');
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  let targetAngle = 0;
  let currentAngle = 0;
  let activeCardIndex = 0;

  function getRadius() {
    if (!stage) return 360;
    const w = stage.offsetWidth || 900;
    if (w < 450) return 195;
    if (w < 768) return 260;
    if (w < 1100) return 320;
    return Math.min(w * 0.40, 420);
  }

  function renderStage(angle) {
    const radius = getRadius();
    let closestIndex = 0;
    let minDistance = Infinity;

    achCards.forEach((card, idx) => {
      const baseAngle = idx * 45;
      const rawDiff = baseAngle - angle;
      // Normalize into [-180, 180]
      let rel = ((rawDiff % 360) + 540) % 360 - 180;

      const absRel = Math.abs(rel);
      if (absRel < minDistance) {
        minDistance = absRel;
        closestIndex = idx;
      }

      // Cylindrical coordinates
      const rad = (rel * Math.PI) / 180;
      const x = Math.sin(rad) * radius;
      const z = (Math.cos(rad) - 1) * radius;
      const rotY = -rel * 0.78;

      // Only front hemisphere |rel| <= 95 is visible
      if (absRel > 95) {
        card.style.transform = `translate3d(${Math.round(x)}px, 0px, ${Math.round(z)}px) scale(0.6)`;
        card.style.opacity = '0';
        card.style.visibility = 'hidden';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '0';
      } else {
        const depth = Math.max(0, Math.cos(rad));
        // Active front card has scale exactly 1.0 (no scaling blur); background cards scale down to 0.78
        const scale = 0.78 + 0.22 * depth;
        const opacity = Math.pow(depth, 0.85);
        const zIndex = Math.round(depth * 100);

        if (absRel < 0.35) {
          // Perfectly pixel-aligned at center for razor-sharp text
          card.style.transform = `translate3d(0px, 0px, 0px) scale(1)`;
        } else {
          card.style.transform = `translate3d(${Math.round(x)}px, 0px, ${Math.round(z)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        }

        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = zIndex;
        card.style.visibility = 'visible';
        card.style.pointerEvents = 'auto';
      }

      const isCardActive = absRel < 22.5;
      card.classList.toggle('active', isCardActive);
    });

    if (closestIndex !== activeCardIndex) {
      activeCardIndex = closestIndex;
      updatePager(activeCardIndex);
    }
  }

  function updatePager(activeIdx) {
    pagerBtns.forEach((btn, pIdx) => {
      const isActive = pIdx === activeIdx;
      btn.classList.toggle('active', isActive);
      const numStr = (pIdx + 1).toString().padStart(2, '0');
      btn.innerHTML = isActive 
        ? `<span class="ach-pager-bkt-l">[</span><span class="ach-pager-val">${numStr}</span><span class="ach-pager-bkt-r">]</span>`
        : `<span class="ach-pager-val">${numStr}</span>`;
    });
  }

  let animationFrameId = null;
  function startLoop() {
    function tick() {
      const diff = targetAngle - currentAngle;
      if (Math.abs(diff) > 0.02) {
        currentAngle += diff * 0.14;
        renderStage(currentAngle);
      } else if (currentAngle !== targetAngle) {
        currentAngle = targetAngle;
        renderStage(currentAngle);
      }
      animationFrameId = requestAnimationFrame(tick);
    }
    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(tick);
    }
  }

  // Mouse Wheel 360° scroll
  let wheelSnapTimeout = null;
  if (stage) {
    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetAngle += delta * 0.22;
      clearTimeout(wheelSnapTimeout);
      wheelSnapTimeout = setTimeout(() => {
        targetAngle = Math.round(targetAngle / 45) * 45;
      }, 160);
    }, { passive: false });
  }

  function rotateToCard(idx) {
    const snappedCurrent = ((Math.round(targetAngle / 45) % 8) + 8) % 8;
    let diff = idx - snappedCurrent;
    if (diff > 4) diff -= 8;
    if (diff < -4) diff += 8;
    targetAngle = Math.round(targetAngle / 45) * 45 + diff * 45;
  }

  // Pointer drag & touch swipe
  let isDragging = false;
  let dragStartX = 0;
  let dragStartAngle = 0;
  let totalDragDist = 0;
  let hasCaptured = false;

  if (stage) {
    stage.addEventListener('pointerdown', (e) => {
      if (e.button && e.button !== 0) return;
      isDragging = true;
      dragStartX = e.clientX;
      dragStartAngle = targetAngle;
      totalDragDist = 0;
      hasCaptured = false;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      totalDragDist = Math.abs(dx);
      if (totalDragDist > 6 && !hasCaptured) {
        hasCaptured = true;
        stage.classList.add('is-dragging');
        try { stage.setPointerCapture?.(e.pointerId); } catch (_) {}
      }
      targetAngle = dragStartAngle - dx * 0.38;
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-dragging');
      if (hasCaptured) {
        try { stage.releasePointerCapture?.(e.pointerId); } catch (_) {}
      }
      if (totalDragDist > 6) {
        targetAngle = Math.round(targetAngle / 45) * 45;
      }
    };

    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);
  }

  // Only certificate PREVIEW IMAGE opens the credential viewer
  achCards.forEach((card) => {
    const idx = parseInt(card.dataset.index, 10);

    // Clicking Preview image container opens modal directly
    const imgWrap = card.querySelector('.ach-card-img-wrap');
    imgWrap?.addEventListener('click', (e) => {
      e.stopPropagation();
      rotateToCard(idx);
      openModal(idx);
    });

    // Clicking elsewhere on a non-active card rotates it to the front
    card.addEventListener('click', (e) => {
      if (totalDragDist > 6) return;
      if (idx !== activeCardIndex) {
        rotateToCard(idx);
      }
    });
  });

  // Pager buttons click
  pagerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      if (!isNaN(idx)) {
        rotateToCard(idx);
      }
    });
  });

  // Prev / Next button clicks
  prevBtn?.addEventListener('click', () => {
    targetAngle = Math.round((targetAngle - 45) / 45) * 45;
  });
  nextBtn?.addEventListener('click', () => {
    targetAngle = Math.round((targetAngle + 45) / 45) * 45;
  });

  // Arrow keys & Escape key
  const carouselWrap = document.querySelector('.ach-carousel-wrap');
  window.addEventListener('keydown', (e) => {
    // If modal is open, Escape closes it, Left/Right arrows navigate
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowLeft') {
        const newIdx = (currentModalIndex - 1 + certificatesList.length) % certificatesList.length;
        rotateToCard(newIdx);
        openModal(newIdx);
      } else if (e.key === 'ArrowRight') {
        const newIdx = (currentModalIndex + 1) % certificatesList.length;
        rotateToCard(newIdx);
        openModal(newIdx);
      }
      return;
    }

    // Carousel navigation when section in view
    if (!carouselWrap) return;
    const rect = carouselWrap.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.key === 'ArrowLeft') {
        targetAngle = Math.round((targetAngle - 45) / 45) * 45;
      } else if (e.key === 'ArrowRight') {
        targetAngle = Math.round((targetAngle + 45) / 45) * 45;
      }
    }
  });

  window.addEventListener('resize', () => {
    renderStage(currentAngle);
  });

  if (achCards.length > 0) {
    targetAngle = 0;
    currentAngle = 0;
    renderStage(0);
    updatePager(0);
    startLoop();
  }

  /* ── CONTACT – Email Copy ──────────────────────────────────── */
  const emailCopyBtn = document.getElementById('email-copy-btn');
  const emailCopyText = document.getElementById('email-copy-text');
  const email = emailCopyBtn?.dataset.email;

  emailCopyBtn?.addEventListener('click', () => {
    if (!email) return;
    navigator.clipboard.writeText(email).then(() => {
      if (emailCopyText) emailCopyText.textContent = 'COPIED TO CLIPBOARD';
      emailCopyBtn.style.borderColor = 'var(--accent)';
      setTimeout(() => {
        if (emailCopyText) emailCopyText.textContent = 'SEND ME AN EMAIL';
        emailCopyBtn.style.borderColor = '';
      }, 2000);
    });
  });

  /* ── CONTACT – Back to top ─────────────────────────────────── */
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── ESC KEY – close any open modal ───────────────────────── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseModal();
      closeExpModal();
      if (dossierModal?.classList.contains('open')) {
        dossierModal.classList.remove('open');
        document.body.style.overflow = '';
      }
      closeMenu();
    }
  });

});
