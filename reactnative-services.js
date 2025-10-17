// React Native Services Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	// Common functionality is handled by shared-components.js
	// Add React Native-specific customizations here
	
	// Technology set interactions - React Native specific
	(function initTechnologySet(){
		const tabs = document.querySelectorAll('.techset__tab');
		const panels = document.querySelectorAll('.techset__panel');
		if (!tabs.length || !panels.length) return;

		function activate(id){
			tabs.forEach(t => t.classList.remove('active'));
			panels.forEach(p => p.classList.remove('active'));
			const tab = Array.from(tabs).find(t => t.getAttribute('data-tech-panel') === id);
			const panel = document.getElementById(id);
			if (tab) tab.classList.add('active');
			if (panel) panel.classList.add('active');
		}

		tabs.forEach(tab => {
			tab.addEventListener('click', () => activate(tab.getAttribute('data-tech-panel')));
		});

		// Initialize first tab if none is active
		const activeTab = document.querySelector('.techset__tab.active');
		if (!activeTab && tabs.length > 0) {
			const firstTabId = tabs[0].getAttribute('data-tech-panel');
			activate(firstTabId);
		}
	})();

	// Service card interactions
	(function initServiceCards(){
		const serviceButtons = document.querySelectorAll('.service-btn');

		serviceButtons.forEach(button => {
			button.addEventListener('click', function(e) {
				e.preventDefault();
				console.log('React Native service button clicked:', this.textContent);
				
				// React Native-style animation
				this.style.transform = 'scale(0.95)';
				setTimeout(() => {
					this.style.transform = 'scale(1)';
				}, 150);
			});
		});
	})();

	// Initialize React Native-specific features
	(function initReactNativeFeatures(){
		const observeElements = document.querySelectorAll('.stat-number, .service-card h3, .tech-item h3');
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.transition = 'color 0.6s ease';
					if (entry.target.classList.contains('stat-number')) {
						entry.target.style.color = '';
					}
				}
			});
		}, {
			threshold: 0.5
		});

		observeElements.forEach(el => observer.observe(el));
	})();
	
	console.log('React Native Services page initialized');
});