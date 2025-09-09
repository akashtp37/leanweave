// Tech Stack page interactions

// Mobile Menu Toggle (shared behavior)
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
if (mobileToggle && navMenu) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });
}

// Mega Menu hover/click behavior for header
const techStackLink = document.querySelector('[data-menu="tech-stack"]');
const techStackMenu = document.getElementById('techStackMenu');
let megaMenuTimeout;
if (techStackLink && techStackMenu) {
  techStackLink.addEventListener('mouseenter', () => {
    clearTimeout(megaMenuTimeout);
    techStackMenu.classList.add('active');
    techStackLink.classList.add('active');
  });

  techStackLink.addEventListener('mouseleave', () => {
    megaMenuTimeout = setTimeout(() => {
      techStackMenu.classList.remove('active');
      techStackLink.classList.remove('active');
    }, 150);
  });

  techStackMenu.addEventListener('mouseenter', () => {
    clearTimeout(megaMenuTimeout);
  });

  techStackMenu.addEventListener('mouseleave', () => {
    techStackMenu.classList.remove('active');
    techStackLink.classList.remove('active');
  });
}

// Expose close function for the close button in markup
function closeMegaMenu() {
  if (!techStackMenu || !techStackLink) return;
  techStackMenu.classList.remove('active');
  techStackLink.classList.remove('active');
}

// Local stack tabs switching (left column)
const stackTabs = document.querySelectorAll('.stack-tabs .category-item');
const stackPanels = document.querySelectorAll('.stack-content .category-content');

function activateStackPanel(targetId) {
  stackTabs.forEach(t => t.classList.remove('active'));
  stackPanels.forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(targetId);
  if (panel) panel.classList.add('active');
}

stackTabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    e.preventDefault();
    const target = tab.getAttribute('data-target');
    tab.classList.add('active');
    activateStackPanel(target);
  });
});

// Header scroll effect for consistency
window.addEventListener('scroll', () => {
  const header = document.querySelector('.main-header');
  if (!header) return;
  if (window.scrollY > 100) {
    header.style.background = 'rgba(255, 255, 255, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = 'var(--light-color)';
    header.style.backdropFilter = 'none';
  }
});

// Testimonial slider (copied logic from homepage, scoped to local footer)
(function initTestimonials(){
  const track = document.querySelector('footer .feedback-track');
  const dots = document.querySelectorAll('footer .dot');
  const nextBtn = document.querySelector('footer .next');
  const prevBtn = document.querySelector('footer .prev');
  if (!track || !nextBtn || !prevBtn || dots.length === 0) return;
  let currentIndex = 0;
  function updateSlider(index) {
    track.style.transform = `translateX(-${index * 50}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % dots.length;
    updateSlider(currentIndex);
  });
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + dots.length) % dots.length;
    updateSlider(currentIndex);
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateSlider(currentIndex);
    });
  });
})();


