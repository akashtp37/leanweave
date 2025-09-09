// .NET Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
	// Tab switching functionality
	const scopeTabs = document.querySelectorAll('.scope-tab');
	const scopePanels = document.querySelectorAll('.scope-panel');

	scopeTabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const targetTab = tab.getAttribute('data-tab');
			
			// Remove active class from all tabs and panels
			scopeTabs.forEach(t => t.classList.remove('active'));
			scopePanels.forEach(p => p.classList.remove('active'));
			
			// Add active class to clicked tab and corresponding panel
			tab.classList.add('active');
			document.getElementById(targetTab).classList.add('active');
		});
	});

	// Testimonial slider functionality
	const testimonialSlides = document.querySelectorAll('.testimonial-slide');
	const testimonialDots = document.querySelectorAll('.dot');
	let currentSlide = 0;
	let slideInterval;

	function showSlide(index) {
		testimonialSlides.forEach((slide, i) => {
			slide.classList.toggle('active', i === index);
		});
		
		testimonialDots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
		});
	}

	function nextSlide() {
		currentSlide = (currentSlide + 1) % testimonialSlides.length;
		showSlide(currentSlide);
	}

	function startAutoSlide() {
		slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
	}

	function stopAutoSlide() {
		clearInterval(slideInterval);
	}

	// Dot navigation
	testimonialDots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			currentSlide = index;
			showSlide(currentSlide);
			stopAutoSlide();
			startAutoSlide(); // Restart auto-slide
		});
	});

	// Pause auto-slide on hover
	const testimonialSlider = document.querySelector('.testimonial-slider');
	if (testimonialSlider) {
		testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
		testimonialSlider.addEventListener('mouseleave', startAutoSlide);
	}

	// Start auto-slide
	startAutoSlide();

	// Request Services button functionality
	const requestButtons = document.querySelectorAll('.request-services-btn');
	requestButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Add click animation
			this.style.transform = 'scale(0.95)';
			setTimeout(() => {
				this.style.transform = 'scale(1)';
			}, 150);
			
			// You can add form submission logic here
			console.log('Request Services button clicked');
		});
	});

	// Service button functionality
	const serviceButtons = document.querySelectorAll('.service-btn');
	serviceButtons.forEach(button => {
		button.addEventListener('click', function() {
			// Add click animation
			this.style.transform = 'scale(0.95)';
			setTimeout(() => {
				this.style.transform = 'scale(1)';
			}, 150);
			
			console.log('Service button clicked');
		});
	});

	// Smooth scrolling for anchor links
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);
			
			if (targetElement) {
				targetElement.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Add loading animation for images (only hide images that aren't loaded yet)
	const images = document.querySelectorAll('img');
	images.forEach(img => {
		img.style.transition = 'opacity 0.3s ease';
		if (img.complete && img.naturalWidth > 0) {
			img.style.opacity = '1';
		} else {
			img.style.opacity = '0';
			img.addEventListener('load', function() {
				this.style.opacity = '1';
			}, { once: true });
		}

		// Fallback for failed image loads: show label instead of broken image
		img.addEventListener('error', function() {
			const parent = this.parentElement;
			if (parent && parent.classList.contains('logo-icon')) {
				const altText = this.getAttribute('alt') || 'Logo';
				parent.setAttribute('data-fallback', altText);
				parent.innerHTML = '';
			}
			// Ensure the area isn't invisible
			this.style.opacity = '1';
		}, { once: true });
	});

	// Add intersection observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	function isInViewport(element) {
		const rect = element.getBoundingClientRect();
		return (
			rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
			rect.bottom > 0 &&
			rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
			rect.right > 0
		);
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe elements for animation (do not hide elements already in viewport)
	const animatedElements = document.querySelectorAll('.scope-panel, .stat-card, .testimonial-slide, .service-card');
	animatedElements.forEach(el => {
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		if (isInViewport(el)) {
			el.style.opacity = '1';
			el.style.transform = 'translateY(0)';
		} else {
			el.style.opacity = '0';
			el.style.transform = 'translateY(30px)';
		}
		observer.observe(el);
	});


});

// Technology set interactions
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

  // Simple carousel next/prev cycling through panels
  const order = Array.from(panels).map(p => p.id);
  let index = 0;
  const prevBtn = document.querySelector('.techset__nav--prev');
  const nextBtn = document.querySelector('.techset__nav--next');
  const syncIndex = () => { index = order.findIndex(id => document.getElementById(id).classList.contains('active')); };
  syncIndex();
  if (prevBtn) prevBtn.addEventListener('click', () => { syncIndex(); index = (index - 1 + order.length) % order.length; activate(order[index]); });
  if (nextBtn) nextBtn.addEventListener('click', () => { syncIndex(); index = (index + 1) % order.length; activate(order[index]); });
})();