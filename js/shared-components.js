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
        const requestButtons = document.querySelectorAll('.request-services-btn, .service-btn, .cta-primary, .btn--primary, .btn--secondary');
        
        console.log('Shared components: Found service buttons:', requestButtons.length);
        
        requestButtons.forEach(button => {
            // Remove any existing listeners to prevent duplicates
            button.removeEventListener('click', this.handleServiceButtonClick);
            
            // Add new listener
            button.addEventListener('click', this.handleServiceButtonClick.bind(this));
        });
    },

    /**
     * Handle service button clicks
     */
    handleServiceButtonClick: function(e) {
        e.preventDefault();
        
        console.log('Service button clicked:', this.textContent.trim());
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        this.style.transition = 'transform 0.15s ease';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Scroll to contact section if it exists
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Fallback: scroll to footer CTA
            const footerCTA = document.querySelector('.footer__cta');
            if (footerCTA) {
                footerCTA.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    },

    /**
     * Statistics Animation
     */
    initStatsAnimation: function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (!statNumbers.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const target = entry.target;
                const dataset = target.dataset || {};
                const originalText = (target.textContent || '').trim();
                const valueAttr = dataset.value;
                let numericValue = null;

                if (valueAttr !== undefined) {
                    const parsed = parseFloat(valueAttr);
                    numericValue = Number.isNaN(parsed) ? null : parsed;
                } else {
                    const numericMatches = originalText.match(/[\d.,]+/g);
                    if (numericMatches && numericMatches.length) {
                        const lastMatch = numericMatches[numericMatches.length - 1].replace(/,/g, '');
                        const parsed = parseFloat(lastMatch);
                        numericValue = Number.isNaN(parsed) ? null : parsed;
                    }
                }

                if (numericValue === null) {
                    observer.unobserve(target);
                    return;
                }

                const decimals = dataset.decimals
                    ? Math.max(parseInt(dataset.decimals, 10) || 0, 0)
                    : valueAttr && valueAttr.includes('.')
                        ? valueAttr.split('.').pop().length
                        : 0;

                const prefix = dataset.prefix || '';
                let suffix;

                if (dataset.suffix !== undefined) {
                    suffix = dataset.suffix;
                } else {
                    suffix = originalText.replace(/[\d.,\s]/g, '');
                }

                const finalText = dataset.final || null;
                const duration = dataset.duration ? Math.max(parseInt(dataset.duration, 10) || 2000, 200) : 2000;
                const startValue = dataset.start ? parseFloat(dataset.start) : 0;

                this.animateNumber(target, {
                    start: Number.isNaN(startValue) ? 0 : startValue,
                    end: numericValue,
                    decimals,
                    prefix,
                    suffix,
                    duration,
                    finalText
                });

                observer.unobserve(target);
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => observer.observe(stat));
    },

    /**
     * Animate Number Utility
     */
    animateNumber: function(element, options, legacyEnd, legacyHasPlus = false) {
        let settings;

        if (typeof options === 'object' && options !== null) {
            const defaults = {
                start: 0,
                end: 0,
                decimals: 0,
                prefix: '',
                suffix: '',
                duration: 2000,
                finalText: null
            };

            settings = Object.assign({}, defaults, options);
        } else {
            settings = {
                start: Number(options) || 0,
                end: Number(legacyEnd) || 0,
                decimals: 0,
                prefix: '',
                suffix: legacyHasPlus ? '+' : '',
                duration: 2000,
                finalText: null
            };
        }

        const {
            start,
            end,
            decimals,
            prefix,
            suffix,
            duration,
            finalText
        } = settings;

        const startTime = performance.now();
        const decimalPlaces = Number.isInteger(decimals) ? Math.max(decimals, 0) : 0;

        const formatValue = (value) => {
            const rounded = decimalPlaces > 0
                ? value.toFixed(decimalPlaces)
                : Math.round(value).toString();
            return `${prefix}${rounded}${suffix}`;
        };

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = start + (end - start) * progress;

            element.textContent = formatValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else if (finalText) {
                element.textContent = finalText;
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