// Frontend Services - Interactions

// Tabs for Scope Section
(function () {
	const tabs = Array.from(document.querySelectorAll('.scope-tab'));
	const panels = Array.from(document.querySelectorAll('.scope-panel'));
	if (!tabs.length || !panels.length) return;

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const target = tab.getAttribute('data-tab');

			// update tab active state
			tabs.forEach(t => t.classList.remove('active'));
			tab.classList.add('active');

			// update panels
			panels.forEach(p => p.classList.remove('active'));
			const panel = document.getElementById(target);
			if (panel) panel.classList.add('active');
		});
	});
})();

// Client Feedback Slider (copied behavior)
(function () {
	const track = document.querySelector('.feedback-track');
	const dots = Array.from(document.querySelectorAll('.slider-dots .dot'));
	const prevBtn = document.querySelector('.slider-btn.prev');
	const nextBtn = document.querySelector('.slider-btn.next');
	if (!track || !dots.length || !prevBtn || !nextBtn) return;

	let index = 0;
	function update() {
		const width = track.children[0].getBoundingClientRect().width;
		track.style.transform = `translateX(-${index * width}px)`;
		dots.forEach((d, i) => d.classList.toggle('active', i === index));
	}

	dots.forEach((dot, i) => dot.addEventListener('click', () => { index = i; update(); }));
	prevBtn.addEventListener('click', () => { index = Math.max(0, index - 1); update(); });
	nextBtn.addEventListener('click', () => { index = Math.min(track.children.length - 2, index + 1); update(); });

	window.addEventListener('resize', update);
	update();
})();

// Initialize mobile menu (reuse from main navigation)
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Mega menu functionality
function initMegaMenu() {
    const megaMenuTriggers = document.querySelectorAll('.has-dropdown');
    const megaMenus = document.querySelectorAll('.mega-menu');
    const closeBtns = document.querySelectorAll('.mega-close');
    
    megaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const menuType = this.getAttribute('data-menu');
            const megaMenu = document.getElementById(menuType + 'Menu');
            
            if (megaMenu) {
                megaMenu.classList.add('active');
            }
        });
    });
    
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.mega-menu').classList.remove('active');
        });
    });
    
    // Close mega menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mega-menu') && !e.target.closest('.has-dropdown')) {
            megaMenus.forEach(menu => menu.classList.remove('active'));
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Statistics counter animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateNumber(element) {
    const finalNumber = element.textContent;
    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
    const suffix = finalNumber.replace(/[\d\s]/g, '');
    
    let currentNumber = 0;
    const increment = numericValue / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        if (currentNumber >= numericValue) {
            element.textContent = finalNumber;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentNumber) + suffix;
        }
    }, stepTime);
}

// Global functions for mega menu (to be called from HTML)
function closeMegaMenu() {
    document.querySelectorAll('.mega-menu').forEach(menu => {
        menu.classList.remove('active');
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initMegaMenu();
    initSmoothScrolling();
    initStatsAnimation();
});

