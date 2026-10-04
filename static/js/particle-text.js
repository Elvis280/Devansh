/**
 * ParticleText - Vanilla JS Port of React Bits ParticleText Component
 * Samples offscreen glyph canvas and animates interactive particles with
 * scatter-gather, pointer repulsion, idle drift, and bloom glow.
 */

(function () {
  const hexToRgb = (hex) => {
    if (!hex) return null;
    let clean = hex.replace('#', '').trim();
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    if (clean.length === 8) {
      clean = clean.slice(0, 6);
    }
    if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
    return {
      r: parseInt(clean.slice(0, 2), 16),
      g: parseInt(clean.slice(2, 4), 16),
      b: parseInt(clean.slice(4, 6), 16)
    };
  };

  const mixRgb = (from, to, amount) => ({
    r: Math.round(from.r + (to.r - from.r) * amount),
    g: Math.round(from.g + (to.g - from.g) * amount),
    b: Math.round(from.b + (to.b - from.b) * amount)
  });

  const rgbToCss = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  // Procedural 2D value noise & FBM for authentic weathered grunge texture
  const hash2D = (x, y) => {
    let n = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    n = (n ^ (n >>> 13));
    n = Math.imul(n, 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
  };

  const smoothNoise2D = (x, y) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const u = fx * fx * (3 - 2 * fx);
    const v = fy * fy * (3 - 2 * fy);

    const n00 = hash2D(ix, iy);
    const n10 = hash2D(ix + 1, iy);
    const n01 = hash2D(ix, iy + 1);
    const n11 = hash2D(ix + 1, iy + 1);

    const nx0 = n00 + (n10 - n00) * u;
    const nx1 = n01 + (n11 - n01) * u;
    return nx0 + (nx1 - nx0) * v;
  };

  const grungeNoise = (x, y) => {
    return smoothNoise2D(x * 0.028, y * 0.028) * 0.55 +
           smoothNoise2D(x * 0.075, y * 0.075) * 0.30 +
           smoothNoise2D(x * 0.18, y * 0.18) * 0.15;
  };

  const resolveFontSize = (value, container, fontWeight, fontFamily) => {
    if (typeof value === 'number') return value;

    const probe = document.createElement('span');
    probe.textContent = 'M';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.pointerEvents = 'none';
    probe.style.fontSize = value;
    probe.style.fontWeight = String(fontWeight);
    probe.style.fontFamily = fontFamily;
    container.appendChild(probe);
    const size = parseFloat(window.getComputedStyle(probe).fontSize) || 96;
    probe.remove();
    return size;
  };

  const waitForFonts = async (font) => {
    if (!('fonts' in document)) return;
    try {
      await document.fonts.load(font);
    } catch {}
    await document.fonts.ready;
  };

  class ParticleText {
    constructor(container, userOptions = {}) {
      if (!container) return;
      this.container = container;

      this.options = Object.assign({
        text: 'DEVANSH\nSHARMA',
        particleSize: 2.4,
        density: 2,
        color: '#b8b8b8',
        highlightColor: '#8b5cf6',
        scatter: 160,
        gatherDuration: 1300,
        stagger: 280,
        pointerRepel: 60,
        repelRadius: 140,
        idleDrift: 0,
        trigger: 'mount',
        fontSize: 'clamp(5.5rem, 18vw, 15.5rem)',
        fontWeight: 400,
        fontFamily: "'Bebas Neue', sans-serif",
        lineHeight: 0.84,
        glow: false,
        textAlign: 'left'
      }, userOptions);

      this.canvas = container.querySelector('canvas');
      if (!this.canvas) {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-text__canvas';
        this.canvas.setAttribute('aria-hidden', 'true');
        this.container.appendChild(this.canvas);
      }

      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.particles = [];
      this.animationFrame = null;
      this.resizeFrame = null;
      this.buildId = 0;
      this.gathering = false;
      this.gatherStart = 0;
      this.hasFormedOnce = false;
      this.reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      this.width = 0;
      this.height = 0;
      this.dpr = 1;
      this.lastHoverTime = 0;

      this.pointer = {
        active: false,
        x: 0,
        y: 0,
        smoothX: 0,
        smoothY: 0
      };

      this.init();
    }

    init() {
      this.handlePointerMove = (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.pointer.x = event.clientX - rect.left;
        this.pointer.y = event.clientY - rect.top;
        this.pointer.active = true;
      };

      this.handlePointerLeave = () => {
        this.pointer.active = false;
      };

      this.handlePointerEnter = (event) => {
        this.handlePointerMove(event);
        this.pointer.smoothX = this.pointer.x;
        this.pointer.smoothY = this.pointer.y;
        if (this.options.trigger === 'hover') {
          const now = performance.now();
          if (now - this.lastHoverTime > 900) {
            this.lastHoverTime = now;
            this.startGather(true);
          }
        }
      };

      this.handleClick = () => {
        if (this.options.trigger === 'click') {
          this.startGather(true);
        }
      };

      this.canvas.addEventListener('pointerenter', this.handlePointerEnter);
      this.canvas.addEventListener('pointermove', this.handlePointerMove);
      this.canvas.addEventListener('pointerleave', this.handlePointerLeave);
      this.canvas.addEventListener('click', this.handleClick);

      this.reduceMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      this.handleReduceMotionChange = (event) => {
        this.reducedMotion = event.matches;
        this.sampleText();
      };
      this.reduceMotionQuery?.addEventListener('change', this.handleReduceMotionChange);

      this.resizeObserver = new ResizeObserver(() => {
        if (this.resizeFrame) cancelAnimationFrame(this.resizeFrame);
        this.resizeFrame = requestAnimationFrame(() => this.sampleText());
      });
      this.resizeObserver.observe(this.container);

      this.sampleText();
    }

    startGather(fromScatter = true) {
      if (!this.particles.length) return;

      const now = performance.now();
      const spread = this.reducedMotion ? 0 : this.options.scatter;

      this.particles.forEach(particle => {
        if (fromScatter) {
          const angle = particle.seed * Math.PI * 2;
          const distance = spread * (0.35 + particle.depth * 0.75);
          particle.x = particle.targetX + Math.cos(angle) * distance + (particle.depth - 0.5) * spread * 0.55;
          particle.y = particle.targetY + Math.sin(angle) * distance + (particle.seed - 0.5) * spread * 0.55;
        }

        particle.startX = particle.x;
        particle.startY = particle.y;
        particle.delay = this.reducedMotion ? 0 : particle.seed * this.options.stagger;
      });

      this.gatherStart = now;
      this.gathering = true;
    }

    drawParticle(particle) {
      this.ctx.fillStyle = particle.color;
      this.ctx.fillRect(
        Math.floor(particle.x - particle.size / 2),
        Math.floor(particle.y - particle.size / 2),
        Math.ceil(particle.size),
        Math.ceil(particle.size)
      );
    }

    render(now) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.options.glow && !this.reducedMotion) {
        this.ctx.shadowBlur = this.options.particleSize * 3;
        this.ctx.shadowColor = this.options.highlightColor;
      } else {
        this.ctx.shadowBlur = 0;
      }

      this.pointer.smoothX += (this.pointer.x - this.pointer.smoothX) * 0.36;
      this.pointer.smoothY += (this.pointer.y - this.pointer.smoothY) * 0.36;

      let complete = true;

      this.particles.forEach(particle => {
        let baseX = particle.targetX;
        let baseY = particle.targetY;
        let progress = 1;

        if (this.gathering) {
          const local = (now - this.gatherStart - particle.delay) / Math.max(1, this.reducedMotion ? 1 : this.options.gatherDuration);
          progress = clamp(local, 0, 1);
          const eased = easeOutCubic(progress);
          baseX = particle.startX + (particle.targetX - particle.startX) * eased;
          baseY = particle.startY + (particle.targetY - particle.startY) * eased;
          if (progress < 1) complete = false;
        } else if (!this.reducedMotion && this.options.idleDrift > 0) {
          const driftTime = now * 0.001;
          baseX += Math.sin(driftTime * 0.9 + particle.seed * 10) * this.options.idleDrift * particle.depth;
          baseY += Math.cos(driftTime * 0.75 + particle.depth * 10) * this.options.idleDrift * particle.depth;
        }

        if (this.pointer.active && !this.reducedMotion && this.options.pointerRepel > 0 && this.options.repelRadius > 0) {
          const dx = baseX - this.pointer.smoothX;
          const dy = baseY - this.pointer.smoothY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < this.options.repelRadius) {
            const force = Math.pow(1 - distance / this.options.repelRadius, 2) * this.options.pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const follow = this.reducedMotion ? 1 : 0.32;
        particle.x += (baseX - particle.x) * follow;
        particle.y += (baseY - particle.y) * follow;

        this.ctx.globalAlpha = clamp(0.35 + progress * 0.65, 0, 1);
        this.drawParticle(particle);
      });

      this.ctx.globalAlpha = 1;
      this.ctx.shadowBlur = 0;

      if (this.gathering && complete) {
        this.gathering = false;
        this.hasFormedOnce = true;
      }

      this.animationFrame = requestAnimationFrame((t) => this.render(t));
    }

    ensureRenderLoop() {
      if (this.animationFrame === null) {
        this.animationFrame = requestAnimationFrame((t) => this.render(t));
      }
    }

    async sampleText() {
      const currentBuild = ++this.buildId;
      const rect = this.container.getBoundingClientRect();
      this.width = Math.floor(rect.width);
      this.height = Math.floor(rect.height);

      if (this.width <= 0 || this.height <= 0) return;

      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.canvas.width = Math.max(1, Math.floor(this.width * this.dpr));
      this.canvas.height = Math.max(1, Math.floor(this.height * this.dpr));
      this.canvas.style.width = '100%';
      this.canvas.style.height = '100%';
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      const computed = window.getComputedStyle(this.container);
      const resolvedFamily = this.options.fontFamily === 'inherit' ? computed.fontFamily || 'sans-serif' : this.options.fontFamily;
      let resolvedSize = resolveFontSize(this.options.fontSize, this.container, this.options.fontWeight, resolvedFamily);
      let font = `${this.options.fontWeight} ${resolvedSize}px ${resolvedFamily}`;

      await waitForFonts(font);
      if (currentBuild !== this.buildId) return;

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
      if (!offCtx) return;

      const lines = String(this.options.text || ' ').split('\n');
      const maxTextWidth = this.width * 0.98;
      offCtx.font = font;

      // Fit font size to container width
      let maxMeasuredWidth = Math.max(1, ...lines.map(line => offCtx.measureText(line).width));
      if (maxMeasuredWidth > maxTextWidth) {
        resolvedSize = Math.max(18, resolvedSize * (maxTextWidth / maxMeasuredWidth));
        font = `${this.options.fontWeight} ${resolvedSize}px ${resolvedFamily}`;
        await waitForFonts(font);
        if (currentBuild !== this.buildId) return;
        offCtx.font = font;
        maxMeasuredWidth = Math.max(1, ...lines.map(line => offCtx.measureText(line).width));
      }

      // Fit font size to container height
      const lineStep = resolvedSize * (this.options.lineHeight || 0.84);
      const approxHeight = (lines.length - 1) * lineStep + resolvedSize;
      const maxTextHeight = this.height * 0.98;
      if (approxHeight > maxTextHeight) {
        resolvedSize = Math.max(18, resolvedSize * (maxTextHeight / approxHeight));
        font = `${this.options.fontWeight} ${resolvedSize}px ${resolvedFamily}`;
        await waitForFonts(font);
        if (currentBuild !== this.buildId) return;
        offCtx.font = font;
      }

      offCtx.font = font;
      const metricsList = lines.map(line => offCtx.measureText(line));
      const firstMetrics = metricsList[0];
      const ascent = Math.ceil(firstMetrics.actualBoundingBoxAscent || resolvedSize * 0.78);
      const lastMetrics = metricsList[metricsList.length - 1];
      const descent = Math.ceil(lastMetrics.actualBoundingBoxDescent || resolvedSize * 0.22);
      const padding = Math.max(6, Math.ceil(resolvedSize * 0.04));

      const actualLineStep = resolvedSize * (this.options.lineHeight || 0.84);
      const textBlockHeight = (lines.length - 1) * actualLineStep + ascent + descent;
      const textBlockWidth = Math.max(1, ...metricsList.map(m => Math.ceil((m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width))));

      offscreen.width = textBlockWidth + padding * 2;
      offscreen.height = textBlockHeight + padding * 2;
      offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
      offCtx.font = font;
      offCtx.textAlign = 'left';
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = '#ffffff';

      lines.forEach((line, i) => {
        const y = padding + ascent + i * actualLineStep;
        offCtx.fillText(line, padding, y);
      });

      const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
      const targets = [];
      const step = Math.max(1, Math.round(this.options.density));

      let originX = 0;
      if (this.options.textAlign === 'center') {
        originX = this.width / 2 - offscreen.width / 2;
      } else {
        originX = -padding;
      }
      const originY = Math.max(0, this.height / 2 - offscreen.height / 2);

      // Position the signature lime dot relative to the end of the top line "DEVANSH"
      const limeDot = this.container.querySelector('.hero-lime-dot');
      if (limeDot && metricsList.length > 0) {
        const line0Width = metricsList[0].width;
        limeDot.style.left = `${Math.round(originX + padding + line0Width + 14)}px`;
        limeDot.style.top = `${Math.max(6, Math.round(originY + padding + 6))}px`;
      }

      for (let y = 0; y < offscreen.height; y += step) {
        for (let x = 0; x < offscreen.width; x += step) {
          const px = Math.min(offscreen.width - 1, Math.floor(x));
          const py = Math.min(offscreen.height - 1, Math.floor(y));
          const alpha = imageData.data[(py * offscreen.width + px) * 4 + 3];
          if (alpha >= 120) {
            // Check boundary to preserve sharp outer edges
            const leftA = (px >= step) ? imageData.data[(py * offscreen.width + (px - step)) * 4 + 3] : 0;
            const rightA = (px + step < offscreen.width) ? imageData.data[(py * offscreen.width + (px + step)) * 4 + 3] : 0;
            const topA = (py >= step) ? imageData.data[((py - step) * offscreen.width + px) * 4 + 3] : 0;
            const botA = (py + step < offscreen.height) ? imageData.data[((py + step) * offscreen.width + px) * 4 + 3] : 0;
            const isEdge = (leftA < 120 || rightA < 120 || topA < 120 || botA < 120);

            targets.push({
              x: originX + x,
              y: originY + y,
              normX: x / Math.max(1, offscreen.width),
              normY: y / Math.max(1, offscreen.height),
              alpha: alpha / 255,
              isEdge
            });
          }
        }
      }

      const lightGray = this.options.color || '#b8b8b8';
      const selected = targets;

      this.particles = selected.map((target, index) => {
        const seed = ((index * 9301 + 49297) % 233280) / 233280;
        const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;
        const angle = seed * Math.PI * 2;
        const distance = (this.reducedMotion ? 0 : this.options.scatter) * (0.35 + depth * 0.75);
        const startX = target.x + Math.cos(angle) * distance + (seed - 0.5) * this.options.scatter * 0.45;
        const startY = target.y + Math.sin(angle) * distance + (depth - 0.9) * this.options.scatter * 0.45;

        return {
          x: this.reducedMotion ? target.x : startX,
          y: this.reducedMotion ? target.y : startY,
          startX,
          startY,
          targetX: target.x,
          targetY: target.y,
          size: this.options.particleSize,
          color: lightGray,
          seed,
          depth,
          delay: seed * this.options.stagger
        };
      });

      this.pointer.x = this.width / 2;
      this.pointer.y = this.height / 2;
      this.pointer.smoothX = this.pointer.x;
      this.pointer.smoothY = this.pointer.y;

      if (this.reducedMotion || this.hasFormedOnce) {
        this.particles.forEach(particle => {
          particle.x = particle.targetX;
          particle.y = particle.targetY;
          particle.startX = particle.targetX;
          particle.startY = particle.targetY;
          particle.delay = 0;
        });
        this.gathering = false;
      } else {
        this.startGather(false);
      }

      this.ensureRenderLoop();
    }

    destroy() {
      this.buildId += 1;
      this.resizeObserver?.disconnect();
      this.reduceMotionQuery?.removeEventListener('change', this.handleReduceMotionChange);
      this.canvas?.removeEventListener('pointerenter', this.handlePointerEnter);
      this.canvas?.removeEventListener('pointermove', this.handlePointerMove);
      this.canvas?.removeEventListener('pointerleave', this.handlePointerLeave);
      this.canvas?.removeEventListener('click', this.handleClick);

      if (this.animationFrame !== null) cancelAnimationFrame(this.animationFrame);
      if (this.resizeFrame !== null) cancelAnimationFrame(this.resizeFrame);
    }
  }

  window.ParticleText = ParticleText;

  // Auto-initialize hero particle text if element exists
  function initHeroParticle() {
    const heroTarget = document.getElementById('hero-particle-text');
    if (heroTarget && !heroTarget._particleTextInstance) {
      heroTarget._particleTextInstance = new ParticleText(heroTarget, {
        text: 'DEVANSH\nSHARMA',
        particleSize: 2.4,
        density: 2,
        color: '#b8b8b8',
        scatter: 160,
        gatherDuration: 1300,
        stagger: 280,
        pointerRepel: 60,
        repelRadius: 140,
        idleDrift: 0,
        trigger: 'mount',
        fontSize: 'clamp(5.5rem, 18vw, 15.5rem)',
        fontWeight: 400,
        fontFamily: "'Bebas Neue', sans-serif",
        lineHeight: 0.84,
        glow: false,
        textAlign: 'left'
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroParticle);
  } else {
    initHeroParticle();
  }
})();
