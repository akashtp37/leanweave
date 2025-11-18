// Cloud Development Services Page JavaScript - Enhanced Button Functionality

document.addEventListener('DOMContentLoaded', function() {
	// Wait for shared components to initialize first
	setTimeout(() => {
		// Technology set interactions - Cloud specific
		(function initTechnologySet(){
			const tabs = document.querySelectorAll('.techset__tab');
			const panels = document.querySelectorAll('.techset__panel');

			console.log('Found techset tabs:', tabs.length);
			console.log('Found techset panels:', panels.length);

			if (!tabs.length || !panels.length) {
				console.warn('Techset tabs or panels not found');
				return;
			}

			function activate(id){
				console.log('Activating techset panel:', id);
				tabs.forEach(t => t.classList.remove('active'));
				panels.forEach(p => p.classList.remove('active'));
				const tab = Array.from(tabs).find(t => t.getAttribute('data-tech-panel') === id);
				const panel = document.getElementById(id);
				if (tab) {
					tab.classList.add('active');
					tab.setAttribute('aria-selected', 'true');
				}
				if (panel) {
					panel.classList.add('active');
				}

				// Update other tabs aria-selected
				tabs.forEach(t => {
					if (t !== tab) t.setAttribute('aria-selected', 'false');
				});
			}

			tabs.forEach(tab => {
				tab.addEventListener('click', function(e) {
					e.preventDefault();
					const panelId = this.getAttribute('data-tech-panel');
					console.log('Techset tab clicked:', panelId);
					activate(panelId);
				});
			});

			// Initialize first tab
			if (tabs.length > 0) {
				const firstTab = tabs[0];
				const firstPanelId = firstTab.getAttribute('data-tech-panel');
				activate(firstPanelId);
			}

			// Simple carousel next/prev cycling through panels
			const order = Array.from(panels).map(p => p.id);
			let index = 0;
			const prevBtn = document.querySelector('.techset__nav--prev');
			const nextBtn = document.querySelector('.techset__nav--next');

			if (prevBtn && nextBtn) {
				const syncIndex = () => {
					index = order.findIndex(id => document.getElementById(id).classList.contains('active'));
				};
				syncIndex();

				prevBtn.addEventListener('click', () => {
					syncIndex();
					index = (index - 1 + order.length) % order.length;
					activate(order[index]);
				});

				nextBtn.addEventListener('click', () => {
					syncIndex();
					index = (index + 1) % order.length;
					activate(order[index]);
				});
			}
		})();

		// Enhanced Service card interactions
		(function initServiceCards(){
			const serviceCards = document.querySelectorAll('.service-card');
			const serviceButtons = document.querySelectorAll('.service-btn');

			console.log('Found service cards:', serviceCards.length);
			console.log('Found service buttons:', serviceButtons.length);

			serviceButtons.forEach(button => {
				button.addEventListener('click', function(e) {
					e.preventDefault();
					console.log('Service button clicked:', this.textContent.trim());

					// Add visual feedback
					this.style.transform = 'scale(0.95)';
					this.style.transition = 'transform 0.15s ease';

					setTimeout(() => {
						this.style.transform = 'scale(1)';
					}, 150);

					// Scroll to contact section
					const contactSection = document.getElementById('contact');
					if (contactSection) {
						contactSection.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					} else {
						// Fallback: scroll to footer CTA
						const footerCTA = document.querySelector('.footer__cta');
						if (footerCTA) {
							footerCTA.scrollIntoView({
								behavior: 'smooth',
								block: 'start'
							});
						}
					}
				});
			});

			// Enhanced hover effects for service cards
			serviceCards.forEach(card => {
				card.addEventListener('mouseenter', function() {
					this.style.transform = 'translateY(-8px)';
					this.style.transition = 'transform 0.3s ease';
				});

				card.addEventListener('mouseleave', function() {
					this.style.transform = 'translateY(0)';
				});
			});
		})();

		// Enhanced CTA Button functionality
		(function initCTAButtons(){
			const ctaButtons = document.querySelectorAll('.cta-primary, .btn--primary, .btn--secondary');

			console.log('Found CTA buttons:', ctaButtons.length);

			ctaButtons.forEach(button => {
				button.addEventListener('click', function(e) {
					e.preventDefault();
					console.log('CTA button clicked:', this.textContent.trim());

					// Add click animation
					this.style.transform = 'scale(0.95)';
					this.style.transition = 'transform 0.15s ease';

					setTimeout(() => {
						this.style.transform = 'scale(1)';
					}, 150);

					// Scroll to contact section
					const contactSection = document.getElementById('contact');
					if (contactSection) {
						contactSection.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					} else {
						// Fallback: scroll to footer CTA
						const footerCTA = document.querySelector('.footer__cta');
						if (footerCTA) {
							footerCTA.scrollIntoView({
								behavior: 'smooth',
								block: 'start'
							});
						}
					}
				});
			});
		})();

		// Initialize Cloud-specific features
		(function initCloudFeatures(){
			// Add Cloud blue accent to certain elements on scroll
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

		// Debug: Log all buttons found
		const allButtons = document.querySelectorAll('button, .btn, [class*="btn"], [class*="cta"]');
		console.log('All buttons found:', allButtons.length);
		allButtons.forEach((btn, index) => {
			console.log(`Button ${index + 1}:`, btn.className, btn.textContent.trim());
		});

		console.log('Cloud Development Services page initialized with enhanced button functionality');
	}, 100); // Small delay to ensure shared components are loaded
});