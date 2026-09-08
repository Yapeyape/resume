// Page entrance: gently fade the hero in once everything is ready.
window.addEventListener('load', () => {
  requestAnimationFrame(() => document.body.classList.add('loaded'));
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const designLab = document.getElementById('designLab');
const designLabToggle = document.getElementById('designLabToggle');
const designLabClose = document.getElementById('designLabClose');
const designLabDefaults = {
  headingFont: 'system', bodyFont: 'system', headingSize: 88, headingWeight: 700,
  headingTracking: -0.035, bodySize: 1.0625, accentColor: '#ff6a5f',
  pageColor: '#e5484b', sheetColor: '#242729', textColor: '#f3f6f8',
  radius: 20, sectionSpace: 72, motionSpeed: 250
};
const designFonts = {
  system: 'var(--font)',
  fraunces: '"Fraunces", Georgia, serif',
  space: '"Space Grotesk", sans-serif',
  manrope: '"Manrope", sans-serif',
  dmSans: '"DM Sans", sans-serif',
  plexMono: '"IBM Plex Mono", monospace'
};
const setDesignValue = (name, value) => document.documentElement.style.setProperty(name, value);
const updateDesignLab = () => {
  const headingFont = document.getElementById('headingFont').value;
  const bodyFont = document.getElementById('bodyFont').value;
  const headingSize = document.getElementById('headingSize').value;
  const headingWeight = document.getElementById('headingWeight').value;
  const headingTracking = document.getElementById('headingTracking').value;
  const bodySize = document.getElementById('bodySize').value;
  const accentColor = document.getElementById('accentColor').value;
  const pageColor = document.getElementById('pageColor').value;
  const sheetColor = document.getElementById('sheetColor').value;
  const textColor = document.getElementById('textColor').value;
  const radius = document.getElementById('radius').value;
  const sectionSpace = document.getElementById('sectionSpace').value;
  const motionSpeed = document.getElementById('motionSpeed').value;
  setDesignValue('--heading-font', designFonts[headingFont]);
  setDesignValue('--body-font', designFonts[bodyFont]);
  setDesignValue('--heading-size', `${headingSize}px`);
  setDesignValue('--heading-weight', headingWeight);
  setDesignValue('--heading-tracking', `${headingTracking}em`);
  setDesignValue('--body-size', `${bodySize}rem`);
  setDesignValue('--accent', accentColor);
  setDesignValue('--red', pageColor);
  setDesignValue('--sheet', sheetColor);
  setDesignValue('--text', textColor);
  setDesignValue('--radius', `${radius}px`);
  setDesignValue('--radius-sm', `${Math.min(12, radius)}px`);
  setDesignValue('--sp-8', `${sectionSpace}px`);
  setDesignValue('--t', `${motionSpeed}ms`);
  document.getElementById('headingSizeValue').textContent = `${headingSize}px`;
  document.getElementById('headingWeightValue').textContent = headingWeight;
  document.getElementById('headingTrackingValue').textContent = `${headingTracking}em`;
  document.getElementById('bodySizeValue').textContent = `${bodySize}rem`;
  document.getElementById('radiusValue').textContent = `${radius}px`;
  document.getElementById('sectionSpaceValue').textContent = `${sectionSpace}px`;
  document.getElementById('motionSpeedValue').textContent = `${motionSpeed}ms`;
};
const resetDesignLab = () => {
  Object.entries(designLabDefaults).forEach(([id, value]) => {
    const control = document.getElementById(id);
    if (control) control.value = value;
  });
  updateDesignLab();
};
if (designLab && designLabToggle) {
  const setLabOpen = isOpen => {
    designLab.classList.toggle('open', isOpen);
    designLabToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };
  designLabToggle.addEventListener('click', () => setLabOpen(!designLab.classList.contains('open')));
  designLabClose.addEventListener('click', () => setLabOpen(false));
  designLab.querySelectorAll('select,input').forEach(control => control.addEventListener('input', updateDesignLab));
  document.getElementById('resetDesign').addEventListener('click', resetDesignLab);
  document.getElementById('copyDesignCss').addEventListener('click', async event => {
    const css = `:root { --heading-font: ${getComputedStyle(document.documentElement).getPropertyValue('--heading-font')}; --body-font: ${getComputedStyle(document.documentElement).getPropertyValue('--body-font')}; --heading-size: ${getComputedStyle(document.documentElement).getPropertyValue('--heading-size')}; --heading-weight: ${getComputedStyle(document.documentElement).getPropertyValue('--heading-weight')}; --heading-tracking: ${getComputedStyle(document.documentElement).getPropertyValue('--heading-tracking')}; --body-size: ${getComputedStyle(document.documentElement).getPropertyValue('--body-size')}; --accent: ${getComputedStyle(document.documentElement).getPropertyValue('--accent')}; --red: ${getComputedStyle(document.documentElement).getPropertyValue('--red')}; --sheet: ${getComputedStyle(document.documentElement).getPropertyValue('--sheet')}; --text: ${getComputedStyle(document.documentElement).getPropertyValue('--text')}; --radius: ${getComputedStyle(document.documentElement).getPropertyValue('--radius')}; --sp-8: ${getComputedStyle(document.documentElement).getPropertyValue('--sp-8')}; --t: ${getComputedStyle(document.documentElement).getPropertyValue('--t')}; }`;
    await navigator.clipboard.writeText(css);
    event.currentTarget.textContent = 'Copied';
    setTimeout(() => { event.currentTarget.textContent = 'Copy CSS'; }, 1200);
  });
  updateDesignLab();
}

// Play the creative videos sequentially in the same player.
const creativeVideo = document.getElementById('creativeVideo');
const creativeDots = document.querySelectorAll('.video-dot');
const creativeSources = [
  'Adobe%20Express%20-%20Timeline%202.mp4',
  'Sequence%2001.mp4',
  'referenssi.mp4'
];
const creativeDotLabels = ['Timeline 2', 'Sequence 01', 'Referenssi'];
let creativeVideoIndex = 0;
const updateCreativeDots = (activeIndex) => {
  creativeDots.forEach((dot, index) => {
    const isActive = index === activeIndex;
    dot.classList.toggle('active', isActive);
    dot.setAttribute('aria-label', `${creativeDotLabels[index]}, ${isActive ? 'playing' : 'next'}`);
  });
  const dots = document.querySelector('.video-dots');
  if (dots) dots.setAttribute('aria-label', `Video ${activeIndex + 1} of ${creativeDots.length}`);
};
const showCreativeVideo = (videoIndex) => {
  creativeVideoIndex = (videoIndex + creativeSources.length) % creativeSources.length;
  creativeVideo.classList.toggle('creative-video-landscape', creativeVideoIndex === 2);
  updateCreativeDots(creativeVideoIndex);
  creativeVideo.src = creativeSources[creativeVideoIndex];
  creativeVideo.load();
  creativeVideo.play().catch(() => {});
};

if (creativeVideo) {
  creativeVideo.addEventListener('ended', () => {
    showCreativeVideo(creativeVideoIndex + 1);
  });

  creativeDots.forEach(dot => {
    dot.addEventListener('click', () => {
      showCreativeVideo(Number(dot.dataset.videoIndex));
    });
  });

  let swipeStartX = 0;
  creativeVideo.addEventListener('touchstart', event => {
    swipeStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  creativeVideo.addEventListener('touchend', event => {
    const swipeDistance = event.changedTouches[0].clientX - swipeStartX;
    if (Math.abs(swipeDistance) < 45) return;
    showCreativeVideo(creativeVideoIndex + (swipeDistance < 0 ? 1 : -1));
  }, { passive: true });
}

const stillImage = document.getElementById('stillImage');
const imageDots = document.getElementById('imageDots');
const stillStage = document.getElementById('stillStage');
const profileBubbles = document.getElementById('profileBubbles');
const stillSources = [
  'Photo%201.jpg', 'Photo%202.jpg', 'Photo%203.jpg', 'Photo%204.jpg', 'Photo%205.webp',
  'Photo%206.jpg', 'Photo%207.jpg', 'Photo%208.jpg', 'Photo%209.jpg', 'Photo%2010.jpg', 'Photo%2011.jpg', 'profile-bubbles'
];
let stillImageIndex = 0;
const showStillImage = (imageIndex) => {
  stillImageIndex = (imageIndex + stillSources.length) % stillSources.length;
  const showingProfiles = stillSources[stillImageIndex] === 'profile-bubbles';
  if (stillImage) {
    stillImage.src = showingProfiles ? stillSources[0] : stillSources[stillImageIndex];
    stillImage.alt = `Photo ${stillImageIndex + 1} of ${stillSources.length}`;
  }
  if (stillStage) stillStage.classList.toggle('profile-active', showingProfiles);
  if (profileBubbles) profileBubbles.classList.toggle('visible', showingProfiles);
  if (imageDots) {
    imageDots.setAttribute('aria-label', `Image ${stillImageIndex + 1} of ${stillSources.length}`);
    imageDots.querySelectorAll('.image-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === stillImageIndex);
      dot.setAttribute('aria-label', `${index === stillSources.length - 1 ? 'Profile photos' : `Photo ${index + 1}`}${index === stillImageIndex ? ', showing' : ', next'}`);
    });
  }
};

if (stillImage && imageDots) {
  stillSources.forEach((source, index) => {
    const dot = document.createElement('button');
    dot.className = `image-dot${index === 0 ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `${index === stillSources.length - 1 ? 'Profile photos' : `Photo ${index + 1}`}${index === 0 ? ', showing' : ', next'}`);
    dot.addEventListener('click', () => showStillImage(index));
    imageDots.appendChild(dot);
  });

  if (!reduceMotion) {
    const advanceStillShow = () => {
      const delay = stillSources[stillImageIndex] === 'profile-bubbles' ? 2000 : 1000;
      window.setTimeout(() => {
        showStillImage(stillImageIndex + 1);
        advanceStillShow();
      }, delay);
    };
    advanceStillShow();
  }
}

// Respect reduced motion: don't autoplay the project video.
if (reduceMotion) {
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.removeAttribute('autoplay');
    video.pause();
  });
}

// Scroll-in reveal (staggered).
const revealEls = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 50}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// Scroll-spy: highlight the nav link of the section currently in view.
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const spyTargets = navLinks
  .map(link => document.querySelector(link.hash))
  .filter(Boolean);

if ('IntersectionObserver' in window && spyTargets.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.hash === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  spyTargets.forEach(target => spy.observe(target));
}

// Courses dropdown (Education section)
const coursesBlock = document.getElementById('coursesBlock');
const coursesToggle = document.getElementById('coursesToggle');
if (coursesBlock && coursesToggle) {
  coursesToggle.addEventListener('click', () => {
    const isOpen = coursesBlock.classList.toggle('open');
    coursesToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Project carousel — arrow buttons scroll the snap row.
const projectCarousel = document.getElementById('projectCarousel');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
if (projectCarousel && carouselPrev && carouselNext) {
  const scrollByCard = () => {
    const card = projectCarousel.querySelector('.project-card');
    const gap = 24;
    return card ? card.getBoundingClientRect().width + gap : 420;
  };
  carouselPrev.addEventListener('click', () => {
    projectCarousel.scrollBy({ left: -scrollByCard(), behavior: 'smooth' });
  });
  carouselNext.addEventListener('click', () => {
    projectCarousel.scrollBy({ left: scrollByCard(), behavior: 'smooth' });
  });
}
