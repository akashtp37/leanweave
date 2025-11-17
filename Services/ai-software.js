// AI Software Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	console.log('AI Software page (Services/) initialized with shared components');

	// Technology set interactions - AI specific
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

	// Testimonial navigation
	(function initTestimonialNavigation(){
		const testimonials = document.querySelectorAll('.testimonial');
		const dots = document.querySelectorAll('.dot');
		const prevArrow = document.querySelector('.nav-arrow:first-child');
		const nextArrow = document.querySelector('.nav-arrow:last-child');

		if (!testimonials.length || !dots.length) return;

		let currentIndex = 0;

		function showTestimonial(index) {
			testimonials.forEach((testimonial, i) => {
				testimonial.style.display = i === index ? 'block' : 'none';
			});
			dots.forEach((dot, i) => {
				dot.classList.toggle('active', i === index);
			});
			currentIndex = index;
		}

		function nextTestimonial() {
			const nextIndex = (currentIndex + 1) % testimonials.length;
			showTestimonial(nextIndex);
		}

		function prevTestimonial() {
			const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
			showTestimonial(prevIndex);
		}

		// Event listeners
		if (nextArrow) {
			nextArrow.addEventListener('click', nextTestimonial);
		}
		if (prevArrow) {
			prevArrow.addEventListener('click', prevTestimonial);
		}

		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => showTestimonial(index));
		});

		// Initialize first testimonial
		showTestimonial(0);

		// Auto-rotate testimonials every 5 seconds
		setInterval(nextTestimonial, 5000);
	})();

	// Service card interactions with AI-style animations
	(function initServiceCards(){
		const serviceCards = document.querySelectorAll('.service-card');

		// Add AI-style hover effects for service cards
		serviceCards.forEach(card => {
			card.addEventListener('mouseenter', function() {
				this.style.transform = 'translateY(-8px) scale(1.02)';
				this.style.boxShadow = '0 12px 50px rgba(255, 107, 53, 0.2)';
			});

			card.addEventListener('mouseleave', function() {
				this.style.transform = 'translateY(-5px) scale(1)';
				this.style.boxShadow = '0 8px 40px rgba(255, 107, 53, 0.15)';
			});
		});
	})();

	// Initialize AI-specific features with smooth animations
	(function initAIFeatures(){
		// Add AI accent colors to certain elements on scroll with smooth animations
		const observeElements = document.querySelectorAll('.stat-number, .service-card h3, .tech-item h3');

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.transition = 'color 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
					if (entry.target.classList.contains('stat-number')) {
						entry.target.style.color = '';
						// Add subtle pulse effect
						entry.target.style.animation = 'aiPulse 2s ease-in-out infinite';
					}
				}
			});
		}, {
			threshold: 0.6
		});

		observeElements.forEach(el => observer.observe(el));

		// Add AI pulse animation
		const style = document.createElement('style');
		style.textContent = `
			@keyframes aiPulse {
				0%, 100% { transform: scale(1); }
				50% { transform: scale(1.05); }
			}
		`;
		document.head.appendChild(style);
	})();

	// AI-specific scroll animations
	(function initScrollAnimations(){
		const elements = document.querySelectorAll('.service-card, .tech-item, .benefit-card');

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

	// Technology item hover effects
	(function initTechItems(){
		const techItems = document.querySelectorAll('.tech-item');

		techItems.forEach(item => {
			item.addEventListener('mouseenter', function() {
				this.style.transform = 'translateY(-6px)';
				this.style.boxShadow = '0 12px 30px rgba(255, 107, 53, 0.15)';
			});

			item.addEventListener('mouseleave', function() {
				this.style.transform = 'translateY(-4px)';
				this.style.boxShadow = '0 8px 24px rgba(0,0,0,.08)';
			});
		});
	})();

	console.log('AI Software page initialized with shared components and AI-specific features');
});


















