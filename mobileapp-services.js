// Mobile App Services Page JS
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
			techsetTabs.forEach(tab => {
				tab.classList.remove('active');
				tab.setAttribute('aria-selected', 'false');
			});
			techsetPanels.forEach(panel => panel.classList.remove('active'));
			
			const activeTab = document.querySelector(`[data-tech-panel="${tabId}"]`);
			const activePanel = document.getElementById(tabId);
			
			if (activeTab) {
				activeTab.classList.add('active');
				activeTab.setAttribute('aria-selected', 'true');
			}
			if (activePanel) activePanel.classList.add('active');
		}

		techsetTabs.forEach(tab => {
			tab.addEventListener('click', () => {
				const tabId = tab.getAttribute('data-tech-panel');
				activateTechsetTab(tabId);
			});
		});

		// Carousel navigation functionality
		const order = Array.from(techsetPanels).map(p => p.id);
		let index = 0;
		const prevBtn = document.querySelector('.techset__nav--prev');
		const nextBtn = document.querySelector('.techset__nav--next');
		
		const syncIndex = () => { 
			index = order.findIndex(id => document.getElementById(id).classList.contains('active')); 
		};
		
		syncIndex();
		if (prevBtn) {
			prevBtn.addEventListener('click', () => { 
				syncIndex(); 
				index = (index - 1 + order.length) % order.length; 
				activateTechsetTab(order[index]); 
			});
		}
		if (nextBtn) {
			nextBtn.addEventListener('click', () => { 
				syncIndex(); 
				index = (index + 1) % order.length; 
				activateTechsetTab(order[index]); 
			});
		}

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
			const cardWidth = track.querySelector('.feedback-card')?.offsetWidth || 0;
			track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
			
			dots.forEach((dot, index) => {
				dot.classList.toggle('active', index === currentIndex);
			});
		}
		
		nextBtn.addEventListener('click', () => {
			currentIndex = (currentIndex + 1) % dots.length;
			updateSlider();
		});
		
		prevBtn.addEventListener('click', () => {
			currentIndex = currentIndex === 0 ? dots.length - 1 : currentIndex - 1;
			updateSlider();
		});
		
		dots.forEach((dot, index) => {
			dot.addEventListener('click', () => {
				currentIndex = index;
				updateSlider();
			});
		});

		// Auto-play slider every 5 seconds
		let autoPlayInterval = setInterval(() => {
			currentIndex = (currentIndex + 1) % dots.length;
			updateSlider();
		}, 5000);

		// Pause auto-play on hover
		const feedbackSlider = document.querySelector('.feedback-slider');
		if (feedbackSlider) {
			feedbackSlider.addEventListener('mouseenter', () => {
				clearInterval(autoPlayInterval);
			});

			feedbackSlider.addEventListener('mouseleave', () => {
				autoPlayInterval = setInterval(() => {
					currentIndex = (currentIndex + 1) % dots.length;
					updateSlider();
				}, 5000);
			});
		}

		// Initialize slider
		updateSlider();
	}

	// Service card interactions
	const serviceCards = document.querySelectorAll('.service-card');
	serviceCards.forEach(card => {
		const learnMoreBtn = card.querySelector('.service-btn');
		if (learnMoreBtn) {
			learnMoreBtn.addEventListener('click', () => {
				learnMoreBtn.style.transform = 'scale(0.95)';
				setTimeout(() => {
					learnMoreBtn.style.transform = 'scale(1)';
				}, 150);
				
				const scopeSection = document.getElementById('scope');
				if (scopeSection) {
					scopeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
			});
		}
	});

	// Request services button functionality
	const requestButtons = document.querySelectorAll('.request-services-btn');
	requestButtons.forEach(button => {
		button.addEventListener('click', () => {
			button.style.transform = 'scale(0.95)';
			setTimeout(() => {
				button.style.transform = 'scale(1)';
			}, 150);
			
			const contactSection = document.getElementById('contact');
			if (contactSection) {
				contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});

	// Add loading states and scroll animations
	window.addEventListener('load', () => {
		const elementsToFadeIn = document.querySelectorAll('.service-card, .scope-panel, .feedback-card');
		elementsToFadeIn.forEach((element, index) => {
			setTimeout(() => {
				element.style.opacity = '1';
				element.style.transform = 'translateY(0)';
			}, index * 100);
		});
	});

	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	const itemsToObserve = document.querySelectorAll('.service-card, .tech-logo');
	itemsToObserve.forEach(item => {
		item.style.opacity = '0';
		item.style.transform = 'translateY(20px)';
		item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		
		observer.observe(item);
	});

	// Enhanced button interactions
	const buttons = document.querySelectorAll('.btn--primary, .service-btn, .request-services-btn');
	buttons.forEach(button => {
		button.addEventListener('mouseenter', () => {
			button.style.transform = 'translateY(-2px) scale(1.02)';
		});

		button.addEventListener('mouseleave', () => {
			button.style.transform = 'translateY(0) scale(1)';
		});

		button.addEventListener('mousedown', () => {
			button.style.transform = 'translateY(0) scale(0.98)';
		});

		button.addEventListener('mouseup', () => {
			button.style.transform = 'translateY(-2px) scale(1.02)';
		});
	});

	// Enhanced techset item interactions
	const techsetItems = document.querySelectorAll('.techset__item');
	techsetItems.forEach(item => {
		item.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-4px)';
			this.style.boxShadow = '0 10px 24px rgba(206, 66, 43, 0.15)';
		});
		
		item.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0)';
			this.style.boxShadow = '';
		});
	});

	// Keyboard navigation for techset tabs
	const techsetTabs = document.querySelectorAll('.techset__tab');
	techsetTabs.forEach((tab, index) => {
		tab.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
				e.preventDefault();
				const direction = e.key === 'ArrowLeft' ? -1 : 1;
				const nextIndex = (index + direction + techsetTabs.length) % techsetTabs.length;
				techsetTabs[nextIndex].focus();
				techsetTabs[nextIndex].click();
			}
		});
	});

	// Keyboard navigation for tabs
	document.addEventListener('keydown', (e) => {
		const tabs = document.querySelectorAll('.scope-tab');
		const activeTab = document.querySelector('.scope-tab.active');
		
		if (!activeTab || !tabs.length) return;
		
		let currentIndex = Array.from(tabs).indexOf(activeTab);
		
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			currentIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
			tabs[currentIndex].click();
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			currentIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
			tabs[currentIndex].click();
		}
	});

	// Focus management for accessibility
	const focusableElements = document.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	);
	
	focusableElements.forEach(element => {
		element.addEventListener('focus', () => {
			element.style.outline = '2px solid #ce422b';
			element.style.outlineOffset = '2px';
		});

		element.addEventListener('blur', () => {
			element.style.outline = 'none';
		});
	});

	// Debounced resize handler to keep slider aligned
	let resizeTimeout;
	window.addEventListener('resize', () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(() => {
			const track = document.querySelector('.feedback-track');
			if (track) {
				const currentIndex = Array.from(document.querySelectorAll('.dot')).findIndex(dot => 
					dot.classList.contains('active')
				);
				if (currentIndex >= 0) {
					const cardWidth = track.querySelector('.feedback-card')?.offsetWidth || 0;
					track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
				}
			}
		}, 250);
	});

	// Error handling for missing elements
	const requiredElements = [
		{ selector: '.hero-section', name: 'Hero Section' },
		{ selector: '.mobile-services-section', name: 'Services Section' },
		{ selector: '.scope-section', name: 'Scope Section' }
	];

	requiredElements.forEach(({ selector, name }) => {
		if (!document.querySelector(selector)) {
			console.warn(`${name} not found - some functionality may not work`);
		}
	});

	// Mobile App Development Cycle Section Functionality
	function initDevelopmentCycleTabs() {
		const stepItems = document.querySelectorAll('.step-item');
		const detailPanels = document.querySelectorAll('.detail-panel');
		
		if (stepItems.length && detailPanels.length) {
			stepItems.forEach(item => {
				item.addEventListener('click', function() {
					const targetStep = this.getAttribute('data-step');
					
					// Remove active class from all step items and detail panels
					stepItems.forEach(step => step.classList.remove('active'));
					detailPanels.forEach(panel => panel.classList.remove('active'));
					
					// Add active class to clicked step item
					this.classList.add('active');
					
					// Show corresponding detail panel
					const targetPanel = document.getElementById(targetStep);
					if (targetPanel) {
						targetPanel.classList.add('active');
					}
				});
			});
		}
	}

	// Initialize development cycle tabs
	initDevelopmentCycleTabs();

	// Add keyboard accessibility for slider
	const feedbackSlider = document.querySelector('.feedback-slider');
	if (feedbackSlider) {
		feedbackSlider.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft') {
				e.preventDefault();
				prevBtn?.click();
			} else if (e.key === 'ArrowRight') {
				e.preventDefault();
				nextBtn?.click();
			}
		});
		feedbackSlider.setAttribute('tabindex', '0');
	}

	// Analytics tracking (placeholder)
	function trackInteraction(action, element) {
		console.log(`User interaction: ${action} on ${element}`);
	}

	document.querySelectorAll('.service-btn, .scope-tab, .request-services-btn').forEach(element => {
		element.addEventListener('click', () => {
			trackInteraction('click', element.className);
		});
	});
});