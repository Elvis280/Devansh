/**
 * DriftWall.js — Vanilla JavaScript implementation of React Bits <DriftWall /> component.
 * Features 3D perspective plane rotation, pointer parallax damping, mouse-wheel inertia,
 * continuous high-FPS column tracks, and smooth GPU-accelerated tile lift.
 */

(function () {
  'use strict';

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const columnFactor = (index, variance) => {
    const pseudo = ((index * 0.6180339887 + 0.35) % 1) * 2 - 1;
    return 1 + variance * pseudo;
  };

  class DriftWall {
    constructor(container, options = {}) {
      if (!container) return;
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) return;

      this.options = Object.assign(
        {
          items: [],
          columns: 6,
          tileWidth: 235,
          tileHeight: 154,
          gap: 18,
          radius: 12,
          tilt: 14,
          turn: -12,
          roll: 0,
          perspective: 1200,
          depth: 130,
          speed: 36,
          direction: 'up',
          variance: 0.4,
          parallax: 0.5,
          pauseOnHover: false,
          lift: 70,
          fade: 0.38,
          dim: 0.65,
          grayscale: false,
          overlayColor: '#040804',
          onTileClick: null,
        },
        options
      );

      // Responsive column configuration
      if (window.innerWidth < 640) {
        this.options.columns = 3;
        this.options.tileWidth = 150;
        this.options.tileHeight = 104;
        this.options.gap = 12;
      } else if (window.innerWidth < 1024) {
        this.options.columns = 4;
        this.options.tileWidth = 190;
        this.options.tileHeight = 126;
        this.options.gap = 15;
      } else if (window.innerWidth < 1440) {
        this.options.columns = 5;
        this.options.tileWidth = 220;
        this.options.tileHeight = 144;
        this.options.gap = 18;
      } else {
        this.options.columns = 6;
        this.options.tileWidth = 238;
        this.options.tileHeight = 154;
        this.options.gap = 20;
      }

      this.reduced = prefersReducedMotion();
      this.containerHeight = this.container.clientHeight || window.innerHeight;

      // Pointer & Damping
      this.pointer = { x: 0, y: 0 };
      this.pointerDamped = { x: 0, y: 0 };
      this.wheelVelocity = 0;
      this.wallHovered = false;
      this.activeTileEl = null;

      // Track physics
      this.offsets = [];
      this.velocities = [];
      this.baseVelocities = [];
      this.columnItems = [];
      this.columnMeta = [];
      this.trackEls = [];
      this.rafId = null;
      this.lastTs = null;
      this.containerRect = null;

      this.init();
    }

    init() {
      this.updateRect();
      this.applyCSSVariables();
      this.buildDOM();
      this.setupColumns();
      this.bindEvents();
      this.start();
    }

    updateRect() {
      this.containerRect = this.container.getBoundingClientRect();
      this.containerHeight = this.containerRect.height || window.innerHeight;
    }

    applyCSSVariables() {
      const o = this.options;
      const s = this.container.style;
      s.setProperty('--dw-tile-w', `${o.tileWidth}px`);
      s.setProperty('--dw-tile-h', `${o.tileHeight}px`);
      s.setProperty('--dw-gap', `${o.gap}px`);
      s.setProperty('--dw-radius', `${o.radius}px`);
      s.setProperty('--dw-perspective', `${o.perspective}px`);
      s.setProperty('--dw-lift', `${o.lift}px`);
      s.setProperty('--dw-dim', o.dim);
      s.setProperty('--dw-gray', o.grayscale ? 1 : 0);
      s.setProperty('--dw-overlay', o.overlayColor);
      s.setProperty('--dw-edge', `${Math.max(0, (1 - o.fade) * 100)}%`);
    }

    setupColumns() {
      const o = this.options;
      const items = o.items && o.items.length ? o.items : this.getDefaultItems();

      this.columnItems = Array.from({ length: o.columns }, () => []);
      items.forEach((item, i) => {
        this.columnItems[i % o.columns].push(item);
      });
      this.columnItems = this.columnItems.map((col) => (col.length ? col : items.slice(0, 1)));

      const unit = o.tileHeight + o.gap;
      this.columnMeta = this.columnItems.map((col) => {
        const copyHeight = Math.max(unit, col.length * unit);
        const copies = Math.max(2, Math.ceil((this.containerHeight * 2.0) / copyHeight) + 1);
        return { copyHeight, copies };
      });

      const dirSign = o.direction === 'up' ? 1 : -1;
      this.baseVelocities = this.columnItems.map((_, c) => {
        return o.speed * columnFactor(c, o.variance) * dirSign;
      });

      this.offsets = this.columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
      this.velocities = this.baseVelocities.slice();
    }

    buildDOM() {
      this.container.classList.add('drift-wall');
      if (this.reduced) this.container.classList.add('drift-wall--reduced');

      this.container.innerHTML = '';
      this.planeEl = document.createElement('div');
      this.planeEl.className = 'drift-wall__plane';
      this.container.appendChild(this.planeEl);

      this.setupColumns();

      this.trackEls = [];
      this.columnItems.forEach((col, c) => {
        const colEl = document.createElement('div');
        colEl.className = 'drift-wall__col';

        const trackEl = document.createElement('div');
        trackEl.className = 'drift-wall__track';

        const meta = this.columnMeta[c];
        for (let copyIndex = 0; copyIndex < meta.copies; copyIndex++) {
          col.forEach((item, itemIndex) => {
            const tileId = `${c}-${copyIndex}-${itemIndex}`;
            const tileEl = this.createTileElement(item, tileId, c, itemIndex);
            trackEl.appendChild(tileEl);
          });
        }

        colEl.appendChild(trackEl);
        this.planeEl.appendChild(colEl);
        this.trackEls.push(trackEl);
      });
    }

    createTileElement(item, id, colIndex, itemIndex) {
      const tile = document.createElement('div');
      tile.className = 'drift-wall__tile';
      tile.dataset.tileId = id;
      tile.dataset.col = String(colIndex);
      tile.dataset.index = String(itemIndex);
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      tile.setAttribute('aria-label', item.title || 'Event Tile');

      const inner = document.createElement('span');
      inner.className = 'drift-wall__inner';

      const img = document.createElement('img');
      img.src = item.image || item.src;
      img.alt = item.title || item.caption || '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.draggable = false;
      inner.appendChild(img);

      const overlay = document.createElement('span');
      overlay.className = 'drift-wall__overlay';
      overlay.setAttribute('aria-hidden', 'true');
      inner.appendChild(overlay);

      // HUD Tag Badge (Top-Left)
      if (item.tag) {
        const chip = document.createElement('span');
        chip.className = 'drift-wall__chip';
        chip.textContent = item.tag;
        inner.appendChild(chip);
      }

      // Title & Category HUD Bar (Bottom)
      if (item.title || item.caption) {
        const titleBar = document.createElement('span');
        titleBar.className = 'drift-wall__title-bar';

        if (item.category) {
          const cat = document.createElement('span');
          cat.className = 'drift-wall__category';
          cat.textContent = item.category;
          titleBar.appendChild(cat);
        }

        const titleText = document.createElement('span');
        titleText.className = 'drift-wall__title-text';
        titleText.textContent = item.title || item.caption;
        titleBar.appendChild(titleText);

        inner.appendChild(titleBar);
      }

      tile.appendChild(inner);

      // Fast, lightweight hover listeners (no layout recalculations)
      tile.addEventListener('pointerenter', () => this.activateTile(tile));
      tile.addEventListener('pointerleave', () => this.releaseTile(tile));
      tile.addEventListener('focus', () => this.activateTile(tile));
      tile.addEventListener('blur', () => this.releaseTile(tile));

      // Click and tap handler (robust against drifting 3D frame translations)
      let pointerDownPos = null;
      tile.addEventListener('pointerdown', (e) => {
        pointerDownPos = { x: e.clientX, y: e.clientY, time: Date.now() };
      });
      tile.addEventListener('pointerup', (e) => {
        if (!pointerDownPos) return;
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        const elapsed = Date.now() - pointerDownPos.time;
        pointerDownPos = null;
        if (dist < 15 && elapsed < 600) {
          if (typeof this.options.onTileClick === 'function') {
            e.preventDefault();
            this.options.onTileClick(item, tile);
          } else if (item.href && item.href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(item.href);
            target?.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, '', item.href);
          }
        }
      });

      // Standard click fallback
      tile.addEventListener('click', (e) => {
        if (typeof this.options.onTileClick === 'function') {
          e.preventDefault();
          this.options.onTileClick(item, tile);
        } else if (item.href && item.href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(item.href);
          target?.scrollIntoView({ behavior: 'smooth' });
          history.pushState(null, '', item.href);
        }
      });

      return tile;
    }

    activateTile(tileEl) {
      if (this.activeTileEl && this.activeTileEl !== tileEl) {
        this.activeTileEl.classList.remove('is-active');
      }
      this.activeTileEl = tileEl;
      tileEl.classList.add('is-active');
    }

    releaseTile(tileEl) {
      if (tileEl) tileEl.classList.remove('is-active');
      if (this.activeTileEl === tileEl) {
        this.activeTileEl = null;
      }
    }

    bindEvents() {
      this.handlePointerMove = (e) => {
        if (!this.containerRect || !this.options.parallax || this.reduced) return;
        const rect = this.containerRect;
        this.pointer.x = (e.clientX - rect.left) / rect.width - 0.5;
        this.pointer.y = (e.clientY - rect.top) / rect.height - 0.5;
      };

      this.handlePointerEnter = () => {
        this.wallHovered = true;
        this.updateRect();
      };

      this.handlePointerLeave = () => {
        this.wallHovered = false;
        this.pointer.x = 0;
        this.pointer.y = 0;
        if (this.activeTileEl) {
          this.releaseTile(this.activeTileEl);
        }
      };

      // Mouse Wheel Inertia Scroll Support
      this.handleWheel = (e) => {
        // Prevent default browser scroll to avoid fighting the canvas
        e.preventDefault();
        let dy = e.deltaY;
        if (e.deltaMode === 1) { // Line mode
          dy *= 32;
        } else if (e.deltaMode === 2) { // Page mode
          dy *= 320;
        }
        // Smoothly inject momentum in the wheel scroll direction
        this.wheelVelocity += dy * 1.6;
        // Clamp maximum velocity to prevent wild teleportation
        this.wheelVelocity = Math.max(-1400, Math.min(1400, this.wheelVelocity));
      };

      this.container.addEventListener('pointermove', this.handlePointerMove, { passive: true });
      this.container.addEventListener('pointerenter', this.handlePointerEnter, { passive: true });
      this.container.addEventListener('pointerleave', this.handlePointerLeave, { passive: true });
      this.container.addEventListener('wheel', this.handleWheel, { passive: false });

      // Resize listener
      this.handleResize = () => {
        this.updateRect();
        this.setupColumns();
      };
      window.addEventListener('resize', this.handleResize, { passive: true });
    }

    applyPlaneTransform(px, py) {
      if (!this.planeEl) return;
      const o = this.options;
      const rotX = o.tilt + py;
      const rotY = o.turn + px;
      const rotZ = o.roll;
      const z = -o.depth;
      this.planeEl.style.transform =
        `translate(-50%, -50%) scale(1.28) ` +
        `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ}deg) ` +
        `translateZ(${z}px)`;
    }

    start() {
      const animate = (ts) => {
        if (this.lastTs === null) this.lastTs = ts;
        const dt = Math.min(0.04, Math.max(0.001, (ts - this.lastTs) / 1000));
        this.lastTs = ts;

        // Smooth Pointer Parallax Damping
        const maxTilt = this.options.parallax * 8;
        const targetX = this.pointer.x * maxTilt;
        const targetY = -this.pointer.y * maxTilt;
        const damp = 1 - Math.exp(-dt / 0.16);
        this.pointerDamped.x += (targetX - this.pointerDamped.x) * damp;
        this.pointerDamped.y += (targetY - this.pointerDamped.y) * damp;

        this.applyPlaneTransform(this.pointerDamped.x, this.pointerDamped.y);

        // Smooth Wheel Inertia Friction
        const friction = Math.exp(-dt * 4.2);
        this.wheelVelocity *= friction;
        if (Math.abs(this.wheelVelocity) < 0.2) this.wheelVelocity = 0;
        const wheelStep = this.wheelVelocity * dt;

        if (!this.reduced) {
          const isTileActive = !!this.activeTileEl;
          // When hovering on a card, gracefully slow down drift so user can inspect and click
          const targetSpeedFactor = isTileActive ? 0.08 : (this.options.pauseOnHover && this.wallHovered ? 0.2 : 1.0);

          for (let c = 0; c < this.trackEls.length; c++) {
            const meta = this.columnMeta[c];
            if (!meta) continue;

            const target = this.baseVelocities[c] * targetSpeedFactor;
            const ease = 1 - Math.exp(-dt / 0.24);
            this.velocities[c] += (target - this.velocities[c]) * ease;

            let next = (this.offsets[c] ?? 0) + (this.velocities[c] * dt) + wheelStep;
            next = ((next % meta.copyHeight) + meta.copyHeight) % meta.copyHeight;
            this.offsets[c] = next;

            const track = this.trackEls[c];
            if (track) {
              track.style.transform = `translate3d(0, ${-next.toFixed(1)}px, 0)`;
            }
          }
        }

        this.rafId = requestAnimationFrame(animate);
      };

      this.rafId = requestAnimationFrame(animate);
    }

    destroy() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      this.container.removeEventListener('pointermove', this.handlePointerMove);
      this.container.removeEventListener('pointerenter', this.handlePointerEnter);
      this.container.removeEventListener('pointerleave', this.handlePointerLeave);
      this.container.removeEventListener('wheel', this.handleWheel);
      window.removeEventListener('resize', this.handleResize);
    }

    getDefaultItems() {
      return [
        { image: '/static/img/images/AlgoZ1.jpg', title: 'AlgoZenith Flagship Workshop', tag: 'WORKSHOP', category: 'AlgoZenith SRMCEM' },
        { image: '/static/img/images/GFG1.jpg', title: 'GeeksforGeeks Flagship Hackathon', tag: 'KEYNOTE', category: 'GeeksforGeeks_SRMCEM' },
        { image: '/static/img/images/AlgoZ5.JPG', title: 'AlgoZenith Core Executive Team', tag: 'CORE TEAM', category: 'AlgoZenith SRMCEM' },
        { image: '/static/img/images/GFG7.jpg', title: 'GeeksforGeeks Chapter Team Photo', tag: 'CORE TEAM', category: 'GeeksforGeeks_SRMCEM' },
        { image: '/static/img/images/AlgoZ4.jpg', title: 'Campus Coding League & Problem Solving', tag: 'CONTEST', category: 'AlgoZenith SRMCEM' },
      ];
    }
  }

  // Export to global scope
  window.DriftWall = DriftWall;

  // Auto-initialize when DriftWall container is present
  document.addEventListener('DOMContentLoaded', () => {
    const wallContainer = document.getElementById('journey-drift-wall');
    if (!wallContainer) return;

    let items = [];
    const dataEl = document.getElementById('driftwall-data');
    if (dataEl) {
      try {
        items = JSON.parse(dataEl.textContent);
      } catch (e) {
        console.warn('Failed to parse driftwall data:', e);
      }
    }

    // Lightbox Modal Controller for DriftWall Tiles
    const lightbox = document.getElementById('journey-lightbox');
    const lightboxImg = document.getElementById('journey-lightbox-img');
    const lightboxCaption = document.getElementById('journey-lightbox-caption');
    const lightboxTag = document.getElementById('journey-lightbox-tag');
    const lightboxCounter = document.getElementById('journey-lightbox-counter');
    const lightboxClose = document.getElementById('journey-lightbox-close');
    const lightboxPrev = document.getElementById('journey-lightbox-prev');
    const lightboxNext = document.getElementById('journey-lightbox-next');
    const lightboxBackdrop = document.getElementById('journey-lightbox-backdrop');

    let currentTileIdx = 0;

    function openTileLightbox(idx) {
      if (!items || !items.length) return;
      currentTileIdx = ((idx % items.length) + items.length) % items.length;
      const it = items[currentTileIdx];

      if (lightbox && lightboxImg) {
        lightboxImg.src = it.image || it.src;
        lightboxImg.alt = it.title || it.caption || '';
        if (lightboxCaption) lightboxCaption.textContent = it.title || it.caption || '';
        if (lightboxTag) lightboxTag.textContent = it.tag || 'MILESTONE';
        if (lightboxCounter) {
          lightboxCounter.textContent = `[ ${(currentTileIdx + 1).toString().padStart(2, '0')} / ${items.length.toString().padStart(2, '0')} ]`;
        }

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeTileLightbox() {
      if (lightbox) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (lightbox) {
      lightboxClose?.addEventListener('click', closeTileLightbox);
      lightboxBackdrop?.addEventListener('click', closeTileLightbox);
      lightboxPrev?.addEventListener('click', (e) => {
        e.stopPropagation();
        openTileLightbox(currentTileIdx - 1);
      });
      lightboxNext?.addEventListener('click', (e) => {
        e.stopPropagation();
        openTileLightbox(currentTileIdx + 1);
      });

      window.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeTileLightbox();
        if (e.key === 'ArrowLeft') openTileLightbox(currentTileIdx - 1);
        if (e.key === 'ArrowRight') openTileLightbox(currentTileIdx + 1);
      });
    }

    // Activate fullscreen body mode
    document.body.classList.add('journey-fullscreen-active');

    // Fullscreen Toggle Button Handler
    const fsBtn = document.getElementById('drift-fullscreen-toggle');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });

      document.addEventListener('fullscreenchange', () => {
        const isFs = !!document.fullscreenElement;
        const txt = fsBtn.querySelector('.fs-text');
        if (txt) txt.textContent = isFs ? 'EXIT' : 'FULLSCREEN';
      });
    }

    window.journeyDriftWallInstance = new DriftWall(wallContainer, {
      items: items,
      columns: 6,
      tileWidth: 238,
      tileHeight: 154,
      gap: 20,
      radius: 12,
      tilt: 14,
      turn: -12,
      roll: 0,
      perspective: 1200,
      depth: 130,
      speed: 36,
      direction: 'up',
      variance: 0.4,
      parallax: 0.5,
      pauseOnHover: false,
      lift: 70,
      fade: 0.38,
      dim: 0.65,
      grayscale: false,
      overlayColor: '#040804',
      onTileClick: (item) => {
        const idx = items.indexOf(item);
        openTileLightbox(idx >= 0 ? idx : 0);
      },
    });
  });
})();
