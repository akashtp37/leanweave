/**
 * Shared Component Library for LeanWeave Service Pages
 * This file contains reusable JavaScript utilities to eliminate code duplication
 */

// Global utilities namespace
window.LeanWeaveUtils = {
    
    /**
     * Standardized Mega Menu Management
     */
    initMegaMenu: function() {
        const megaMenuTrigger = document.querySelector('[data-menu="tech-stack"]');
        const megaMenu = document.getElementById('techStackMenu');
        
        if (megaMenuTrigger && megaMenu) {
            // Click to toggle mega menu
            megaMenuTrigger.addEventListener('click', function(e) {
                e.preventDefault();
                megaMenu.classList.toggle('active');
            });

            // Close mega menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!megaMenu.contains(e.target) && !megaMenuTrigger.contains(e.target)) {
                    megaMenu.classList.remove('active');
                }
            });

            // Close button functionality
            const closeBtn = megaMenu.querySelector('.mega-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    megaMenu.classList.remove('active');
                });
            }

            // Category navigation in mega menu
            const categoryItems = document.querySelectorAll('.category-item');
            const categoryContents = document.querySelectorAll('.category-content');
            
            categoryItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.getAttribute('data-category');
                    
                    // Remove active class from all items and contents
                    categoryItems.forEach(i => i.classList.remove('active'));
                    categoryContents.forEach(c => c.classList.remove('active'));
                    
                    // Add active class to clicked item and corresponding content
                    this.classList.add('active');
                    const targetContent = document.getElementById(category);
                    if (targetContent) {
                        targetContent.classList.add('active');
                    }
                });
            });
        }

        // Enhanced keyboard navigation
        document.addEventListener('keydown', function(e) {
            // Escape key closes mega menu
            if (e.key === 'Escape') {
                const megaMenu = document.getElementById('techStackMenu');
                if (megaMenu && megaMenu.classList.contains('active')) {
                    megaMenu.classList.remove('active');
                }
            }
        });
    },

    /**
     * Standardized Tab System
     */
    initTabSystem: function(tabSelector = '.scope-tab', panelClass = '.scope-panel') {
        const tabs = document.querySelectorAll(tabSelector);
        const panels = document.querySelectorAll(panelClass);
        
        if (!tabs.length || !panels.length) return;

        function activateTab(targetId) {
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to target tab and panel
            const targetTab = Array.from(tabs).find(t => t.getAttribute('data-tab') === targetId);
            const targetPanel = document.getElementById(targetId);
            
            if (targetTab) targetTab.classList.add('active');
            if (targetPanel) targetPanel.classList.add('active');
        }

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-tab');
                activateTab(targetId);
            });
        });

        // Initialize first tab if none is active
        const activeTab = document.querySelector(tabSelector + '.active');
        if (!activeTab && tabs.length > 0) {
            const firstTabId = tabs[0].getAttribute('data-tab');
            activateTab(firstTabId);
        }
    },

    /**
     * Standardized Testimonial Slider
     */
    initTestimonialSlider: function(container = '.client-feedback') {
        const slider = document.querySelector(container);
        if (!slider) return;

        const track = slider.querySelector('.feedback-track');
        const dots = slider.querySelectorAll('.dot');
        const nextBtn = slider.querySelector('.next');
        const prevBtn = slider.querySelector('.prev');
        
        if (!track || !dots.length || !nextBtn || !prevBtn) return;

        let currentIndex = 0;
        let autoSlideInterval;
        
        function updateSlider(index) {
            track.style.transform = `translateX(-${index * 50}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % dots.length;
            updateSlider(currentIndex);
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + dots.length) % dots.length;
            updateSlider(currentIndex);
        }
        
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 4000);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 6000); // Restart after pause
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 6000); // Restart after pause
        });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider(currentIndex);
                stopAutoSlide();
                setTimeout(startAutoSlide, 6000); // Restart after pause
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Initialize
        updateSlider(0);
        startAutoSlide();
    },

    /**
     * Smooth Scrolling for Anchor Links
     */
    initSmoothScrolling: function() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId.length > 1) {
                    e.preventDefault();
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    },

    /**
     * Mobile Menu Toggle
     */
    initMobileMenu: function() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    },

    /**
     * Request Services Button Handlers
     */
    initServiceButtons: function() {
        const requestButtons = document.querySelectorAll('.request-services-btn, .service-btn');
        requestButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // Scroll to contact section if it exists
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    /**
     * Statistics Animation
     */
    initStatsAnimation: function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (!statNumbers.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                    const hasPlus = finalNumber.includes('+');
                    
                    if (numericValue) {
                        this.animateNumber(target, 0, numericValue, hasPlus);
                    }
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    },

    /**
     * Animate Number Utility
     */
    animateNumber: function(element, start, end, hasPlus = false) {
        const duration = 2000;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (hasPlus ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    },

    /**
     * Initialize All Components
     */
    initAll: function() {
        // Initialize all common components
        this.initMegaMenu();
        this.initTabSystem();
        this.initTestimonialSlider();
        this.initSmoothScrolling();
        this.initMobileMenu();
        this.initServiceButtons();
        this.initStatsAnimation();
        
        console.log('LeanWeave shared components initialized');
    }
};

// Global function for HTML onclick handlers
function closeMegaMenu() {
    const megaMenu = document.getElementById('techStackMenu');
    if (megaMenu) {
        megaMenu.classList.remove('active');
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.LeanWeaveUtils.initAll();
});