// C/C++ Services Page JS (parity with other pages)
document.addEventListener('DOMContentLoaded', function() {
	// Smooth scrolling for anchor links
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			const targetId = this.getAttribute('href');
			if (targetId.length > 1) {
				e.preventDefault();
				const target = document.querySelector(targetId);
				if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Scope section tab functionality
	(function initScopeTabs() {
		const tabs = document.querySelectorAll('.scope-tab');
		const panels = document.querySelectorAll('.scope-panel');
		if (!tabs.length || !panels.length) return;

		function activateTab(tabId) {
			tabs.forEach(tab => tab.classList.remove('active'));
			panels.forEach(panel => panel.classList.remove('active'));
			const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
			const activePanel = document.getElementById(tabId);
			if (activeTab) activeTab.classList.add('active');
			if (activePanel) activePanel.classList.add('active');
		}

		tabs.forEach(tab => {
			tab.addEventListener('click', () => {
				const tabId = tab.getAttribute('data-tab');
				activateTab(tabId);
			});
		});

		if (tabs.length > 0) {
			const firstTabId = tabs[0].getAttribute('data-tab');
			activateTab(firstTabId);
		}
	})();

	// Techset section tab functionality
	(function initTechsetTabs() {
		const techsetTabs = document.querySelectorAll('.techset__tab');
		const techsetPanels = document.querySelectorAll('.techset__panel');
		if (!techsetTabs.length || !techsetPanels.length) return;

		function activateTechsetTab(tabId) {
			techsetTabs.forEach(tab => { tab.classList.remove('active'); tab.setAttribute('aria-selected', 'false'); });
			techsetPanels.forEach(panel => panel.classList.remove('active'));
			const activeTab = document.querySelector(`[data-tech-panel="${tabId}"]`);
			const activePanel = document.getElementById(tabId);
			if (activeTab) { activeTab.classList.add('active'); activeTab.setAttribute('aria-selected', 'true'); }
			if (activePanel) activePanel.classList.add('active');
		}

		techsetTabs.forEach(tab => {
			tab.addEventListener('click', () => {
				const tabId = tab.getAttribute('data-tech-panel');
				activateTechsetTab(tabId);
			});
		});

		if (techsetTabs.length > 0) {
			const firstTabId = techsetTabs[0].getAttribute('data-tech-panel');
			activateTechsetTab(firstTabId);
		}
	})();

	// Client feedback slider functionality
	const track = document.querySelector('.feedback-track');
	const dots = document.querySelectorAll('.dot');
	const nextBtn = document.querySelector('.next');
	const prevBtn = document.querySelector('.prev');
	if (track && nextBtn && prevBtn && dots.length) {
		let currentIndex = 0;
		function updateSlider() {
			const cardWidth = track.querySelector('.feedback-card').offsetWidth;
			track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
			dots.forEach((dot, index) => { dot.classList.toggle('active', index === currentIndex); });
		}
		nextBtn.addEventListener('click', () => { currentIndex = (currentIndex + 1) % dots.length; updateSlider(); });
		prevBtn.addEventListener('click', () => { currentIndex = currentIndex === 0 ? dots.length - 1 : currentIndex - 1; updateSlider(); });
		dots.forEach((dot, index) => { dot.addEventListener('click', () => { currentIndex = index; updateSlider(); }); });
		setInterval(() => { currentIndex = (currentIndex + 1) % dots.length; updateSlider(); }, 5000);
	}

	// Service card interactions
	document.querySelectorAll('.service-card .service-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			btn.style.transform = 'scale(0.95)';
			setTimeout(() => { btn.style.transform = 'scale(1)'; }, 150);
			const scopeSection = document.getElementById('scope');
			if (scopeSection) scopeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});

	// Request services button functionality
	document.querySelectorAll('.request-services-btn').forEach(button => {
		button.addEventListener('click', () => {
			button.style.transform = 'scale(0.95)';
			setTimeout(() => { button.style.transform = 'scale(1)'; }, 150);
			const contactSection = document.getElementById('contact');
			if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});

	// Intersection observer animations
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => { if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; } });
	}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

	const itemsToObserve = document.querySelectorAll('.service-card, .tech-logo');
	itemsToObserve.forEach(item => {
		item.style.opacity = '0';
		item.style.transform = 'translateY(20px)';
		item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(item);
	});

	// Button interactions
	document.querySelectorAll('.btn--primary, .service-btn, .request-services-btn').forEach(button => {
		button.addEventListener('mouseenter', () => { button.style.transform = 'translateY(-2px) scale(1.02)'; });
		button.addEventListener('mouseleave', () => { button.style.transform = 'translateY(0) scale(1)'; });
		button.addEventListener('mousedown', () => { button.style.transform = 'translateY(0) scale(0.98)'; });
		button.addEventListener('mouseup', () => { button.style.transform = 'translateY(-2px) scale(1.02)'; });
	});

	// Keyboard navigation for tabs
	document.addEventListener('keydown', (e) => {
		const tabs = document.querySelectorAll('.scope-tab');
		const activeTab = document.querySelector('.scope-tab.active');
		if (!activeTab || !tabs.length) return;
		let currentIndex = Array.from(tabs).indexOf(activeTab);
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); currentIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1; tabs[currentIndex].click(); }
		else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); currentIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0; tabs[currentIndex].click(); }
	});

	// Focus styles for accessibility
	document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])').forEach(element => {
		element.addEventListener('focus', () => { element.style.outline = '2px solid var(--primary-color)'; element.style.outlineOffset = '2px'; });
		element.addEventListener('blur', () => { element.style.outline = 'none'; });
	});

	// Debounced resize: keep slider aligned
	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			const track = document.querySelector('.feedback-track');
			if (track) {
				const currentIndex = Array.from(document.querySelectorAll('.dot')).findIndex(dot => dot.classList.contains('active'));
				if (currentIndex >= 0) {
					const cardWidth = track.querySelector('.feedback-card')?.offsetWidth || 0;
					track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
				}
			}
		}, 250);
	});

	// Basic interaction tracking (placeholder)
	function trackInteraction(action, element) { console.log(`User interaction: ${action} on ${element}`); }
	document.querySelectorAll('.service-btn, .scope-tab, .request-services-btn').forEach(element => {
		element.addEventListener('click', () => { trackInteraction('click', element.className); });
	});
});



