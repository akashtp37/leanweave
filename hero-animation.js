// Mobile Menu Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');

        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Mega Menu Functionality
        const techStackLink = document.querySelector('[data-menu="tech-stack"]');
        const techStackMenu = document.getElementById('techStackMenu');
        const categoryItems = document.querySelectorAll('.category-item');
        const categoryContents = document.querySelectorAll('.category-content');

        let megaMenuTimeout;

        // Show mega menu on hover
        techStackLink.addEventListener('mouseenter', () => {
            clearTimeout(megaMenuTimeout);
            techStackMenu.classList.add('active');
            techStackLink.classList.add('active');
        });

        // Hide mega menu on mouse leave with delay
        techStackLink.addEventListener('mouseleave', () => {
            megaMenuTimeout = setTimeout(() => {
                techStackMenu.classList.remove('active');
                techStackLink.classList.remove('active');
            }, 150);
        });

        // Keep menu open when hovering over mega menu
        techStackMenu.addEventListener('mouseenter', () => {
            clearTimeout(megaMenuTimeout);
        });

        techStackMenu.addEventListener('mouseleave', () => {
            techStackMenu.classList.remove('active');
            techStackLink.classList.remove('active');
        });

        // Category switching with improved UX
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                switchCategory(item);
            });

            // Hover effect for category items (desktop only)
            if (window.innerWidth > 768) {
                item.addEventListener('mouseenter', () => {
                    switchCategory(item);
                });
            }
        });

        function switchCategory(activeItem) {
            const categoryId = activeItem.getAttribute('data-category');
            
            // Remove active class from all items and contents
            categoryItems.forEach(cat => cat.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked item and corresponding content
            activeItem.classList.add('active');
            document.getElementById(categoryId).classList.add('active');
        }

        // Close mega menu function
        function closeMegaMenu() {
            techStackMenu.classList.remove('active');
            techStackLink.classList.remove('active');
        }

        // Close mega menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeMegaMenu();
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect removed

        // Responsive behavior
        function handleResize() {
            if (window.innerWidth <= 768) {
                // Mobile: Remove hover listeners, use click only
                categoryItems.forEach(item => {
                    const newItem = item.cloneNode(true);
                    item.parentNode.replaceChild(newItem, item);
                    newItem.addEventListener('click', (e) => {
                        e.preventDefault();
                        switchCategory(newItem);
                    });
                });
            }
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Call on load



window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  
  setTimeout(() => {
    hero.classList.add('shrink');
  }, 100); // slight delay helps browsers render initial state
});

const words = ["Precision", "Speed", "Innovation", "Simplicity", "Excellence"];
let index = 0;
const wordEl = document.getElementById("lean-word");

setInterval(() => {
  index = (index + 1) % words.length;
  wordEl.classList.add("fade-out");
  setTimeout(() => {
    wordEl.textContent = words[index];
    wordEl.classList.remove("fade-out");
  }, 500);
}, 3000);

const track = document.querySelector('.feedback-track');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;

function updateSlider(index) {
  track.style.transform = `translateX(-${index * 50}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % dots.length;
  updateSlider(currentIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateSlider(currentIndex);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateSlider(currentIndex);
  });
});

// Professional counter animation
        function animateCounter(element, target, suffix = '') {
            let current = 0;
            const increment = target / 60; // 60 frames for smooth animation
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 25);
        }

        // Initialize counters when page loads
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                const counters = document.querySelectorAll('.stat-number[data-target]');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    let suffix = '';
                    
                    // Determine suffix based on original content
                    if (counter.textContent.includes('%')) suffix = '%';
                    if (counter.textContent.includes('+')) suffix = '+';
                    
                    animateCounter(counter, target, suffix);
                });
            }, 800); // Start after container animation
        });


        



        // Enhanced cursor trail system
const trailElements = [];
const trailLength = 12;

for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    trailElements.push({ element: trail, x: 0, y: 0 });
}

let mouseX = 0, mouseY = 0;
let isMouseMoving = false;
let isInHero = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    setTimeout(() => { isMouseMoving = false; }, 100);
});

function updateTrail() {
    trailElements.forEach((trail, index) => {
        if (index === 0) {
            trail.x = mouseX;
            trail.y = mouseY;
        } else {
            const prevTrail = trailElements[index - 1];
            trail.x += (prevTrail.x - trail.x) * 0.25;
            trail.y += (prevTrail.y - trail.y) * 0.25;
        }

        trail.element.style.left = trail.x - 3 + 'px';
        trail.element.style.top = trail.y - 3 + 'px';
        trail.element.style.opacity = (isMouseMoving && isInHero) ? Math.max(0, 0.9 - index * 0.08) : 0;
        trail.element.style.transform = `scale(${Math.max(0.2, 1 - index * 0.08)})`;
    });

    requestAnimationFrame(updateTrail);
}
updateTrail();

const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mouseenter', () => {
        isInHero = true;
    });
    hero.addEventListener('mouseleave', () => {
        isInHero = false;
    });
}

// Interactive visual element
const visualElement = document.querySelector('.visual-element');
const circles = document.querySelectorAll('.thread-circle');

if (visualElement && circles.length > 0) {
    visualElement.addEventListener('mouseenter', () => {
        circles.forEach((circle, index) => {
            circle.style.animationDuration = (5 + index * 2) + 's';
            circle.style.borderWidth = '3px';
        });
    });

    visualElement.addEventListener('mouseleave', () => {
        circles.forEach((circle, index) => {
            circle.style.animationDuration = (20 - index * 5) + 's';
            circle.style.borderWidth = '2px';
        });
    });
}

// Button magnetic effect
const primaryButton = document.querySelector('.cta-primary');
if (primaryButton) {
    primaryButton.addEventListener('mousemove', (e) => {
        const rect = primaryButton.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        primaryButton.style.transform = `translateY(-3px) translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    primaryButton.addEventListener('mouseleave', () => {
        primaryButton.style.transform = 'translateY(0) translate(0, 0)';
    });
}

