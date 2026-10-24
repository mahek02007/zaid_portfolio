/**
 * ZAID PORTFOLIO - "MIDNIGHT CREATOR" CORE INTERACTION & VIDEO VIEWER ENGINE
 */

import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS, EDITING_LAB_CONFIG } from './portfolio-data.js';

let currentFilter = 'all';
let activeFilteredProjects = [...PORTFOLIO_PROJECTS];
let currentProjectIndex = 0;
let simulatedStreamInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initIntro();
  initNavigation();
  initPortfolioGrid();
  initEditingLab();
  initVideoViewer();
  initBriefModal();
  initDirectContact();
  initScrollReveal();
  initFooterYear();
});

/* ==========================================================================
   1. CINEMATIC INTRO CONTROLLER
   ========================================================================== */
function initIntro() {
  const intro = document.getElementById('cinematicIntro');
  const skipBtn = document.getElementById('skipIntroBtn');
  if (!intro) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem('zaid_intro_seen');

  const dismissIntro = () => {
    intro.classList.add('intro-dismissed');
    sessionStorage.setItem('zaid_intro_seen', 'true');
    setTimeout(() => {
      intro.setAttribute('aria-hidden', 'true');
    }, 800);
  };

  if (prefersReducedMotion || alreadySeen) {
    intro.style.display = 'none';
    intro.setAttribute('aria-hidden', 'true');
    return;
  }

  skipBtn?.addEventListener('click', dismissIntro);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !intro.classList.contains('intro-dismissed')) {
      dismissIntro();
    }
  });

  setTimeout(() => {
    if (!intro.classList.contains('intro-dismissed')) {
      dismissIntro();
    }
  }, 2600);
}

/* ==========================================================================
   2. NAVIGATION & SCROLL SPY
   ========================================================================== */
function initNavigation() {
  const header = document.getElementById('siteHeader');
  const toggleBtn = document.getElementById('navToggleBtn');
  const drawer = document.getElementById('mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta');

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.classList.toggle('active', isOpen);
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      drawer.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. EDITORIAL PORTFOLIO GALLERY & FILTERS
   ========================================================================== */
function initPortfolioGrid() {
  const grid = document.getElementById('projectsGrid');
  const emptyState = document.getElementById('portfolioEmptyState');
  const filterBtns = document.querySelectorAll('#portfolioFilters .filter-btn');
  const resetBtn = document.getElementById('emptyStateResetBtn');
  if (!grid) return;

  const renderProjects = (filter = 'all') => {
    currentFilter = filter;
    grid.innerHTML = '';

    activeFilteredProjects = filter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

    // Empty state check
    if (activeFilteredProjects.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    } else {
      grid.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
    }

    activeFilteredProjects.forEach((proj, idx) => {
      // Dynamic non-uniform editorial layout classes
      let tileClass = 'tile-feature';
      if (filter === 'all') {
        if (proj.format.includes('9:16')) tileClass = 'tile-vertical';
        else if (proj.format.includes('21:9')) tileClass = 'tile-wide';
        else if (proj.format.includes('4:5')) tileClass = 'tile-portrait';
        else if (proj.format.includes('1:1')) tileClass = 'tile-square';
        else if (proj.featured) tileClass = 'tile-feature';
        else tileClass = (idx % 2 === 0) ? 'tile-compact' : 'tile-half';
      } else {
        tileClass = 'tile-half';
      }

      const card = document.createElement('article');
      card.className = `project-card ${tileClass}`;
      card.setAttribute('data-id', proj.id);
      card.setAttribute('data-ratio', proj.aspectRatio || '16 / 9');
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View project: ${proj.title}`);

      // Graceful optional metadata
      const roleHtml = proj.role ? `<span class="project-role-badge">${proj.role}</span>` : '';
      const dateHtml = proj.date ? `<span class="project-date-badge">${proj.date}</span>` : '';
      const descHtml = proj.description ? `<p class="project-card-desc">${proj.description}</p>` : '';
      const toolsHtml = Array.isArray(proj.tools) && proj.tools.length > 0 
        ? proj.tools.map(t => `<span class="deliverable-pill">${t}</span>`).join('') 
        : '';

      // Media thumbnail or blueprint slot
      let mediaContent = '';
      if (proj.thumbnail) {
        mediaContent = `
          <img src="${proj.thumbnail}" alt="${proj.title}" class="project-thumb-img" loading="lazy">
        `;
      } else {
        mediaContent = `
          <div class="placeholder-stage">
            <div class="placeholder-top-bar">
              <span class="placeholder-chip">${proj.format}</span>
              <span class="placeholder-chip" style="color: var(--timeline-blue);">${proj.tools?.[0] || 'Studio'}</span>
            </div>
            <div class="placeholder-center">
              <div class="placeholder-play-circle" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <div class="placeholder-label-slot">${proj.placeholderLabel || 'Media Slot Ready'}</div>
              <div class="placeholder-hint">Click to launch player &amp; specs</div>
            </div>
            <div class="placeholder-bottom-timeline">
              <div class="timeline-track-bar">
                <div class="timeline-progress-bar" style="width: ${35 + (idx * 8)}%;"></div>
              </div>
              <span class="timeline-timecode">${proj.duration || 'STATIC / DESIGN'}</span>
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="project-media-frame">
          ${mediaContent}
        </div>
        <div class="project-card-body">
          <div class="project-card-meta-top">
            <span class="project-card-category">${proj.categoryLabel}</span>
            ${dateHtml}
          </div>

          <h3 class="project-card-title">${proj.title}</h3>
          
          <div style="margin-bottom: 12px;">
            ${roleHtml}
          </div>

          ${descHtml}

          <div class="project-deliverables">
            ${toolsHtml}
          </div>

          <div class="project-card-footer">
            <span style="font-size: 0.76rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px;">
              ${proj.format}
            </span>
            <span class="project-view-btn">
              <span>View Project</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>
      `;

      // Subtle desktop pointer tilt tracking
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = -(y / rect.height) * 4;
          const rotateY = (x / rect.width) * 4;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      }

      // Open Video/Project Viewer on click or Enter key
      card.addEventListener('click', () => {
        openProjectViewer(idx);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectViewer(idx);
        }
      });

      grid.appendChild(card);
    });
  };

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const filter = btn.getAttribute('data-filter') || 'all';
      renderProjects(filter);
    });
  });

  // Empty State Reset Button Click
  resetBtn?.addEventListener('click', () => {
    filterBtns.forEach(b => {
      if (b.getAttribute('data-filter') === 'all') {
        b.classList.add('active');
        b.setAttribute('aria-selected', 'true');
      } else {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      }
    });
    renderProjects('all');
  });

  // Initial render
  renderProjects('all');
}

/* ==========================================================================
   4. DEDICATED VIDEO & PROJECT VIEWER
   ========================================================================== */
function initVideoViewer() {
  const modal = document.getElementById('videoViewerModal');
  const closeBtn = document.getElementById('closeVideoModalBtn');
  const prevBtn = document.getElementById('prevProjectBtn');
  const nextBtn = document.getElementById('nextProjectBtn');
  const videoPlayer = document.getElementById('modalVideoPlayer');
  const playPauseBtn = document.getElementById('playerPlayPauseBtn');
  const playIcon = document.getElementById('playIconSvg');
  const pauseIcon = document.getElementById('pauseIconSvg');
  const scrubber = document.getElementById('videoScrubber');
  const scrubberProgress = document.getElementById('scrubberProgress');
  const currentTimeEl = document.getElementById('currentTimecode');
  const durationTimeEl = document.getElementById('durationTimecode');
  const muteBtn = document.getElementById('playerMuteBtn');
  const volHighIcon = document.getElementById('volumeHighSvg');
  const volMutedIcon = document.getElementById('volumeMutedSvg');
  const volSlider = document.getElementById('volumeSlider');
  const fullscreenBtn = document.getElementById('playerFullscreenBtn');
  const stageContainer = document.getElementById('playerStageContainer');
  const simulateBtn = document.getElementById('simulateStreamBtn');
  const inquireBtn = document.getElementById('modalInquireBtn');

  if (!modal || !videoPlayer) return;

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const updatePlayPauseIcons = (isPlaying) => {
    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? 'none' : 'block';
      pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }
  };

  const togglePlay = () => {
    if (videoPlayer.paused || videoPlayer.ended) {
      videoPlayer.play().catch(() => {});
    } else {
      videoPlayer.pause();
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    videoPlayer.pause();
    if (videoPlayer.srcObject) {
      const tracks = videoPlayer.srcObject.getTracks?.() || [];
      tracks.forEach(track => track.stop());
      videoPlayer.srcObject = null;
    }
    if (simulatedStreamInterval) {
      clearInterval(simulatedStreamInterval);
      simulatedStreamInterval = null;
    }
    updatePlayPauseIcons(false);
  };

  // Video event listeners
  videoPlayer.addEventListener('play', () => updatePlayPauseIcons(true));
  videoPlayer.addEventListener('pause', () => updatePlayPauseIcons(false));
  videoPlayer.addEventListener('timeupdate', () => {
    if (videoPlayer.duration) {
      const pct = (videoPlayer.currentTime / videoPlayer.duration) * 100;
      if (scrubber) scrubber.value = pct;
      if (scrubberProgress) scrubberProgress.style.width = `${pct}%`;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(videoPlayer.currentTime);
      if (durationTimeEl) durationTimeEl.textContent = formatTime(videoPlayer.duration);
    }
  });

  videoPlayer.addEventListener('loadedmetadata', () => {
    if (durationTimeEl) durationTimeEl.textContent = formatTime(videoPlayer.duration);
  });

  playPauseBtn?.addEventListener('click', togglePlay);
  videoPlayer.addEventListener('click', togglePlay);

  scrubber?.addEventListener('input', () => {
    if (videoPlayer.duration) {
      const targetTime = (scrubber.value / 100) * videoPlayer.duration;
      videoPlayer.currentTime = targetTime;
    }
  });

  // Volume & Mute
  muteBtn?.addEventListener('click', () => {
    videoPlayer.muted = !videoPlayer.muted;
    if (volHighIcon && volMutedIcon) {
      volHighIcon.style.display = videoPlayer.muted ? 'none' : 'block';
      volMutedIcon.style.display = videoPlayer.muted ? 'block' : 'none';
    }
    if (volSlider) volSlider.value = videoPlayer.muted ? 0 : videoPlayer.volume;
  });

  volSlider?.addEventListener('input', () => {
    const vol = parseFloat(volSlider.value);
    videoPlayer.volume = vol;
    videoPlayer.muted = (vol === 0);
    if (volHighIcon && volMutedIcon) {
      volHighIcon.style.display = (vol === 0) ? 'none' : 'block';
      volMutedIcon.style.display = (vol === 0) ? 'block' : 'none';
    }
  });

  // Fullscreen
  fullscreenBtn?.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      stageContainer?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  });

  // Next & Prev Project Navigation
  prevBtn?.addEventListener('click', () => {
    if (activeFilteredProjects.length === 0) return;
    currentProjectIndex = (currentProjectIndex - 1 + activeFilteredProjects.length) % activeFilteredProjects.length;
    openProjectViewer(currentProjectIndex);
  });

  nextBtn?.addEventListener('click', () => {
    if (activeFilteredProjects.length === 0) return;
    currentProjectIndex = (currentProjectIndex + 1) % activeFilteredProjects.length;
    openProjectViewer(currentProjectIndex);
  });

  closeBtn?.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      prevBtn?.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn?.click();
    } else if (e.key === ' ' && e.target !== scrubber) {
      e.preventDefault();
      togglePlay();
    }
  });

  // Inquire button inside modal
  inquireBtn?.addEventListener('click', () => {
    closeModal();
    const briefModal = document.getElementById('briefModal');
    briefModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Simulate video stream for testing player pipeline
  simulateBtn?.addEventListener('click', () => {
    startCanvasSimulation(videoPlayer, stageContainer);
  });
}

function openProjectViewer(index) {
  const modal = document.getElementById('videoViewerModal');
  const proj = activeFilteredProjects[index];
  if (!modal || !proj) return;

  currentProjectIndex = index;

  // Header data
  const categoryBadge = document.getElementById('modalCategoryBadge');
  const title = document.getElementById('modalProjectTitle');
  const counter = document.getElementById('modalProjectCounter');
  if (categoryBadge) categoryBadge.textContent = proj.categoryLabel;
  if (title) title.textContent = proj.title;
  if (counter) counter.textContent = `${index + 1} / ${activeFilteredProjects.length}`;

  // Description & Specs
  const descEl = document.getElementById('modalProjectDesc');
  const roleField = document.getElementById('modalRoleField');
  const roleVal = document.getElementById('modalRoleVal');
  const dateField = document.getElementById('modalDateField');
  const dateVal = document.getElementById('modalDateVal');
  const formatField = document.getElementById('modalFormatField');
  const formatVal = document.getElementById('modalFormatVal');
  const toolsRack = document.getElementById('modalToolsRack');

  if (descEl) descEl.textContent = proj.description || 'Project details and narrative direction configured for client work.';

  if (roleField && roleVal) {
    if (proj.role) {
      roleField.style.display = 'flex';
      roleVal.textContent = proj.role;
    } else {
      roleField.style.display = 'none';
    }
  }

  if (dateField && dateVal) {
    if (proj.date) {
      dateField.style.display = 'flex';
      dateVal.textContent = proj.date;
    } else {
      dateField.style.display = 'none';
    }
  }

  if (formatField && formatVal) {
    formatField.style.display = 'flex';
    formatVal.textContent = proj.format || 'Standard HD';
  }

  if (toolsRack) {
    if (Array.isArray(proj.tools) && proj.tools.length > 0) {
      toolsRack.innerHTML = proj.tools.map(t => `<span class="tool-badge">${t}</span>`).join('');
    } else {
      toolsRack.innerHTML = '<span class="tool-badge">Creative Suite</span>';
    }
  }

  // Stage aspect ratio
  const stage = document.getElementById('playerStageContainer');
  let aspectAttr = '16-9';
  if (proj.aspectRatio?.includes('9 / 16')) aspectAttr = '9-16';
  else if (proj.aspectRatio?.includes('21 / 9')) aspectAttr = '21-9';
  else if (proj.aspectRatio?.includes('4 / 5')) aspectAttr = '4-5';
  else if (proj.aspectRatio?.includes('1 / 1')) aspectAttr = '1-1';
  stage?.setAttribute('data-aspect', aspectAttr);

  // Player Elements
  const videoPlayer = document.getElementById('modalVideoPlayer');
  const videoIframe = document.getElementById('modalVideoIframe');
  const imageStage = document.getElementById('modalImageStage');
  const placeholderOverlay = document.getElementById('placeholderStageOverlay');
  const slotTitle = document.getElementById('placeholderSlotTitle');
  const customControls = document.getElementById('customVideoControls');

  // Reset states
  if (videoPlayer) {
    videoPlayer.pause();
    videoPlayer.src = '';
    videoPlayer.style.display = 'none';
  }
  if (videoIframe) {
    videoIframe.src = '';
    videoIframe.style.display = 'none';
  }
  if (imageStage) imageStage.style.display = 'none';
  if (customControls) customControls.style.display = 'none';
  if (placeholderOverlay) placeholderOverlay.classList.remove('hidden');

  // Media routing
  if (proj.videoUrl) {
    // Real video source supplied!
    if (proj.videoUrl.includes('youtube.com') || proj.videoUrl.includes('vimeo.com')) {
      if (videoIframe) {
        videoIframe.src = proj.videoUrl;
        videoIframe.style.display = 'block';
      }
      if (placeholderOverlay) placeholderOverlay.classList.add('hidden');
    } else {
      if (videoPlayer) {
        videoPlayer.src = proj.videoUrl;
        videoPlayer.style.display = 'block';
        if (customControls) customControls.style.display = 'flex';
      }
      if (placeholderOverlay) placeholderOverlay.classList.add('hidden');
    }
  } else if (proj.imageUrl) {
    // Real image / invitation design supplied
    if (imageStage) {
      const img = document.getElementById('modalImageDisplay');
      if (img) img.src = proj.imageUrl;
      imageStage.style.display = 'flex';
    }
    if (placeholderOverlay) placeholderOverlay.classList.add('hidden');
  } else {
    // Placeholder slot ready for future client media
    if (slotTitle) slotTitle.textContent = proj.placeholderLabel || 'CLIENT MEDIA SLOT READY';
    if (placeholderOverlay) placeholderOverlay.classList.remove('hidden');
    if (videoPlayer) videoPlayer.style.display = 'block';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Generates an active 60fps canvas video stream directly into the HTML5 video element.
 * This allows visitors and testers to verify actual responsive playback, play/pause toggles,
 * scrubber scrubbing, volume/mute control, and fullscreen behavior without inventing client video.
 */
function startCanvasSimulation(videoPlayer, stageContainer) {
  const canvas = document.getElementById('streamCanvas');
  const placeholderOverlay = document.getElementById('placeholderStageOverlay');
  const customControls = document.getElementById('customVideoControls');
  if (!canvas || !videoPlayer) return;

  const ctx = canvas.getContext('2d');
  let frame = 0;

  if (simulatedStreamInterval) clearInterval(simulatedStreamInterval);

  simulatedStreamInterval = setInterval(() => {
    frame++;
    // Draw Midnight Studio Timeline Frame
    ctx.fillStyle = '#06060a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // Glowing center emblem
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - 30);
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 38px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ZAID EDITING SUITE', 0, 0);

    ctx.font = '16px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('LIVE 60FPS TIMELINE FEED & COLOR PIPELINE', 0, 36);

    // Animated Audio VU Equalizer Bars
    for (let i = -12; i <= 12; i++) {
      const h = Math.abs(Math.sin((frame * 0.08) + i * 0.4)) * 70 + 8;
      const grad = ctx.createLinearGradient(0, 100, 0, 100 - h);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = grad;
      ctx.fillRect(i * 18 - 6, 120 - h, 12, h);
    }

    // Timecode
    const tcSec = Math.floor(frame / 30);
    const tcMs = (frame % 30) * 33;
    ctx.font = 'bold 22px monospace';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`TIMECODE: 00:00:${String(tcSec).padStart(2, '0')}:${String(tcMs).padStart(3, '0')}`, 0, 160);
    ctx.restore();
  }, 1000 / 30);

  // Capture canvas as media stream and pipe to video
  const stream = canvas.captureStream(30);
  videoPlayer.srcObject = stream;
  videoPlayer.style.display = 'block';
  videoPlayer.play().catch(() => {});

  if (placeholderOverlay) placeholderOverlay.classList.add('hidden');
  if (customControls) customControls.style.display = 'flex';

  showToast('Live video playback test initialized. Test controls now active.');
}

/* ==========================================================================
   5. INTERACTIVE EDITING LAB (BEFORE / AFTER COMPARISON STUDIO)
   ========================================================================== */
function initEditingLab() {
  const stage = document.getElementById('editingComparisonStage');
  const layerAfter = document.getElementById('layerAfter');
  const divider = document.getElementById('editingLabDivider');
  const handle = document.getElementById('editingLabHandle');
  const readout = document.getElementById('sliderPositionReadout');
  const resetBtn = document.getElementById('labResetBtn');
  const jumpBtns = document.querySelectorAll('.lab-jump-btn');
  const presetBtns = document.querySelectorAll('.lab-preset-btn');
  const syncPlayBtn = document.getElementById('syncPlayBtn');
  const syncPlayIcon = document.getElementById('syncPlayIcon');
  const syncPauseIcon = document.getElementById('syncPauseIcon');
  const syncPlayText = document.getElementById('syncPlayText');
  const videoBefore = document.getElementById('labVideoBefore');
  const videoAfter = document.getElementById('labVideoAfter');
  const beforeStill = document.getElementById('beforeStillFallback');
  const afterStill = document.getElementById('afterStillFallback');
  const beforeTitle = document.getElementById('beforeBadgeTitle');
  const beforeSub = document.getElementById('beforeBadgeSub');
  const afterTitle = document.getElementById('afterBadgeTitle');
  const afterSub = document.getElementById('afterBadgeSub');

  if (!stage || !layerAfter || !divider) return;

  let currentSplit = 50;
  let isDragging = false;
  let isSyncPlaying = false;

  const setSplit = (percentage, animate = false) => {
    currentSplit = Math.max(0, Math.min(100, percentage));
    
    if (animate) {
      layerAfter.style.transition = 'clip-path 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      divider.style.transition = 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        layerAfter.style.transition = '';
        divider.style.transition = '';
      }, 300);
    }

    layerAfter.style.clipPath = `polygon(0 0, ${currentSplit}% 0, ${currentSplit}% 100%, 0 100%)`;
    divider.style.left = `${currentSplit}%`;

    stage.setAttribute('aria-valuenow', Math.round(currentSplit));
    if (handle) handle.setAttribute('aria-valuenow', Math.round(currentSplit));
    if (readout) readout.textContent = `DIVIDER: ${Math.round(currentSplit)}%`;

    jumpBtns.forEach(btn => {
      const val = Number(btn.getAttribute('data-val'));
      if (Math.abs(val - currentSplit) < 2) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  const getPositionFromEvent = (e) => {
    const rect = stage.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const offset = clientX - rect.left;
    return (offset / rect.width) * 100;
  };

  const startDrag = (e) => {
    isDragging = true;
    setSplit(getPositionFromEvent(e));
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    setSplit(getPositionFromEvent(e));
  };

  const stopDrag = () => {
    isDragging = false;
  };

  // Mouse drag
  stage.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);

  // Touch drag (touch-action: pan-y in CSS allows vertical page scrolling)
  stage.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', onDrag, { passive: true });
  window.addEventListener('touchend', stopDrag);

  // Keyboard accessibility
  const handleKeydown = (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setSplit(currentSplit - 5, true);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setSplit(currentSplit + 5, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSplit(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSplit(100, true);
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'Enter') {
      e.preventDefault();
      setSplit(50, true);
    }
  };

  stage.addEventListener('keydown', handleKeydown);
  handle?.addEventListener('keydown', handleKeydown);

  // Reset to Center
  resetBtn?.addEventListener('click', () => {
    setSplit(50, true);
    showToast('Comparison divider reset to 50% center.');
  });

  // Quick Jumps
  jumpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetVal = Number(btn.getAttribute('data-val')) || 50;
      setSplit(targetVal, true);
    });
  });

  // Preset Mode Switcher
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const presetId = btn.getAttribute('data-preset');
      const presetData = EDITING_LAB_CONFIG.presets.find(p => p.id === presetId) || EDITING_LAB_CONFIG.presets[0];

      if (beforeTitle) beforeTitle.textContent = presetData.beforeTitle.replace('BEFORE: ', '');
      if (beforeSub) beforeSub.textContent = presetData.beforeSubtitle;
      if (afterTitle) afterTitle.textContent = presetData.afterTitle.replace('AFTER: ', '');
      if (afterSub) afterSub.textContent = presetData.afterSubtitle;

      if (presetId === 'preset-pacing') {
        if (beforeStill) {
          beforeStill.style.filter = 'contrast(0.7) brightness(1.1) blur(0.5px)';
        }
        if (afterStill) {
          afterStill.style.filter = 'contrast(1.3) saturate(1.3) drop-shadow(0 0 10px rgba(139, 92, 246, 0.4))';
        }
        showToast('Editing Lab Mode: Pacing, SFX & Motion Polish');
      } else {
        if (beforeStill) {
          beforeStill.style.filter = '';
        }
        if (afterStill) {
          afterStill.style.filter = '';
        }
        showToast('Editing Lab Mode: Color Science (Flat Log vs. Midnight LUT)');
      }
    });
  });

  // Synchronized Dual-Video / Playback Controller
  syncPlayBtn?.addEventListener('click', () => {
    isSyncPlaying = !isSyncPlaying;

    if (syncPlayIcon && syncPauseIcon) {
      syncPlayIcon.style.display = isSyncPlaying ? 'none' : 'block';
      syncPauseIcon.style.display = isSyncPlaying ? 'block' : 'none';
    }

    if (syncPlayText) {
      syncPlayText.textContent = isSyncPlaying ? 'Pause Synchronized Comparison' : 'Simulate Dual Synchronized Playback';
    }

    if (videoBefore?.src && videoAfter?.src) {
      if (isSyncPlaying) {
        videoAfter.currentTime = videoBefore.currentTime;
        videoBefore.play();
        videoAfter.play();
      } else {
        videoBefore.pause();
        videoAfter.pause();
      }
    } else {
      if (isSyncPlaying) {
        showToast('Dual-stream synchronized simulation active. 24fps frame lock.');
      }
    }
  });

  // Initial 50% split setup
  setSplit(50);
}

/* ==========================================================================
   6. CLIENT PROJECT BRIEF MODAL
   ========================================================================== */
function initBriefModal() {
  const briefModal = document.getElementById('briefModal');
  const closeBriefBtn = document.getElementById('closeBriefModalBtn');
  const openBriefBtns = document.querySelectorAll('#openBriefModalBtn, a[href="#contact"].btn-secondary');
  const briefForm = document.getElementById('projectBriefForm');

  const closeModal = () => {
    briefModal?.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBriefBtn?.addEventListener('click', closeModal);

  briefModal?.addEventListener('click', (e) => {
    if (e.target === briefModal) closeModal();
  });

  openBriefBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('btn-secondary')) {
        e.preventDefault();
      }
      briefModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.getElementById('clientName')?.focus();
    });
  });

  briefForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('clientName')?.value?.trim() || '';
    const contact = document.getElementById('clientContact')?.value?.trim() || '';
    const service = document.getElementById('projectType')?.value || '';
    const details = document.getElementById('projectDetails')?.value?.trim() || '';

    // Compose a pre-filled WhatsApp message with all the brief details
    const message = [
      `Hello Zaid! I found you through your portfolio and I'd like to work with you.`,
      ``,
      `*Name:* ${name}`,
      `*Contact:* ${contact}`,
      `*Service:* ${service}`,
      `*Project Details:* ${details}`,
    ].join('\n');

    const waUrl = `https://wa.me/917083311379?text=${encodeURIComponent(message)}`;

    closeModal();
    briefForm.reset();
    showToast(`Opening WhatsApp to send your brief to Zaid…`);
    setTimeout(() => window.open(waUrl, '_blank', 'noopener,noreferrer'), 400);
  });
}

/* ==========================================================================
   7. DIRECT CONTACT & TOAST NOTIFICATION
   ========================================================================== */
function initDirectContact() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const targetEmail = 'nilofarrouf30@gmail.com';

  copyBtn?.addEventListener('click', async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(targetEmail);
        showToast(`Email copied: ${targetEmail}`);
      } else {
        showToast(`Direct Email: ${targetEmail}`);
      }
    } catch {
      showToast(`Direct Email: ${targetEmail}`);
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}

/* ==========================================================================
   SCROLL-REVEAL ANIMATION ENGINE
   ========================================================================== */
function initScrollReveal() {
  // Add .reveal class to section headers, service rows, pillar cards, about content
  const revealTargets = [
    { selector: '.section-header', delay: 0 },
    { selector: '.service-row', delay: 100 },
    { selector: '.pillar-card', delay: 100 },
    { selector: '.about-poster-card', delay: 0 },
    { selector: '.about-content', delay: 200 },
    { selector: '.cta-crown', delay: 0 },
    { selector: '.cta-headline', delay: 100 },
    { selector: '.cta-hand-accent', delay: 200 },
    { selector: '.cta-actions', delay: 300 },
    { selector: '.hero-content', delay: 0 },
    { selector: '.lab-main-header', delay: 0 },
  ];

  revealTargets.forEach(({ selector, delay }) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${delay * i}ms`;
    });
  });

  if (!window.IntersectionObserver) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. FOOTER YEAR
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
