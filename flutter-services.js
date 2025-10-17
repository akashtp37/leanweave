// Flutter Services Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	// Common functionality is handled by shared-components.js
	// Add Flutter-specific customizations here
	
	// Service card interactions
	(function initServiceCards(){
		const serviceButtons = document.querySelectorAll('.service-btn');

		serviceButtons.forEach(button => {
			button.addEventListener('click', function(e) {
				e.preventDefault();
				console.log('Flutter service button clicked:', this.textContent);
				
				// Flutter-style animation
				this.style.transform = 'scale(0.95)';
				setTimeout(() => {
					this.style.transform = 'scale(1)';
				}, 150);
			});
		});
	})();

	// Initialize Flutter-specific features
	(function initFlutterFeatures(){
		const observeElements = document.querySelectorAll('.stat-number, .service-card h3');
		
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
	
	console.log('Flutter Services page initialized');
});