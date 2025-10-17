// iOS Services Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	// Common functionality is handled by shared-components.js
	// Add iOS-specific customizations here
	
	// Technology set interactions - iOS specific
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

	// Service card interactions with iOS-style animations
	(function initServiceCards(){
		const serviceCards = document.querySelectorAll('.service-card');
		const serviceButtons = document.querySelectorAll('.service-btn');

		serviceButtons.forEach(button => {
			button.addEventListener('click', function(e) {
				e.preventDefault();
				// Add iOS-specific service interaction here
				console.log('iOS service button clicked:', this.textContent);
				
				// iOS-style button animation
				this.style.transform = 'scale(0.95)';
				this.style.filter = 'brightness(0.9)';
				setTimeout(() => {
					this.style.transform = 'scale(1)';
					this.style.filter = 'brightness(1)';
				}, 100);
			});
		});

		// Add iOS-style hover effects for service cards
		serviceCards.forEach(card => {
			card.addEventListener('mouseenter', function() {
				this.style.transform = 'translateY(-8px) scale(1.02)';
				this.style.boxShadow = '0 12px 50px rgba(0, 122, 255, 0.2)';
			});

			card.addEventListener('mouseleave', function() {
				this.style.transform = 'translateY(-5px) scale(1)';
				this.style.boxShadow = '0 8px 40px rgba(0, 122, 255, 0.15)';
			});
		});
	})();

	// Initialize iOS-specific features with Apple-style animations
	(function initIOSFeatures(){
		// Add iOS blue accent to certain elements on scroll with smooth animations
		const observeElements = document.querySelectorAll('.stat-number, .service-card h3, .tech-item h3');
		
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.transition = 'color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
					if (entry.target.classList.contains('stat-number')) {
						entry.target.style.color = '';
						// Add subtle pulse effect
						entry.target.style.animation = 'iosPulse 2s ease-in-out infinite';
					}
				}
			});
		}, {
			threshold: 0.6
		});

		observeElements.forEach(el => observer.observe(el));

		// Add iOS pulse animation
		const style = document.createElement('style');
		style.textContent = `
			@keyframes iosPulse {
				0%, 100% { transform: scale(1); }
				50% { transform: scale(1.05); }
			}
		`;
		document.head.appendChild(style);
	})();

	// iOS-specific scroll animations
	(function initScrollAnimations(){
		const elements = document.querySelectorAll('.service-card, .tech-item');
		
		const scrollObserver = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'translateY(0)';
				}
			});
		}, {
			threshold: 0.1
		});

		elements.forEach((el, index) => {
			el.style.opacity = '0';
			el.style.transform = 'translateY(30px)';
			el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
			scrollObserver.observe(el);
		});
	})();
	
	console.log('iOS Services page initialized with shared components and iOS-specific features');
});