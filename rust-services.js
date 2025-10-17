// Rust Services Page JavaScript
// Integrates with shared components and provides Rust-specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize shared components first
    if (window.LeanWeaveUtils) {
        window.LeanWeaveUtils.initAll();
    }

    // Rust-specific functionality
    initRustSpecificFeatures();
    
    // Enhanced tab functionality for scope section
    initScopeTabs();
    
    // Enhanced techset functionality
    initTechsetTabs();
    
    // Client feedback slider
    initClientFeedback();
    
    // Service card interactions
    initServiceCards();
    
    // Performance optimizations
    initPerformanceOptimizations();
});

/**
 * Initialize Rust-specific features
 */
function initRustSpecificFeatures() {
    // Add Rust-specific animations or interactions
    const rustCards = document.querySelectorAll('.service-card');
    
    rustCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effects specific to Rust services
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(206, 66, 43, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
    });
}

/**
 * Enhanced scope tabs functionality
 */
function initScopeTabs() {
    const tabs = document.querySelectorAll('.scope-tab');
    const panels = document.querySelectorAll('.scope-panel');
    
    if (!tabs.length || !panels.length) return;

    function activateTab(tabId) {
        // Remove active class from all tabs and panels
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        panels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to selected tab and panel
        const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
        const activePanel = document.getElementById(tabId);
        
        if (activeTab) {
            activeTab.classList.add('active');
            activeTab.setAttribute('aria-selected', 'true');
        }
        if (activePanel) {
            activePanel.classList.add('active');
            
            // Add entrance animation
            activePanel.style.opacity = '0';
            activePanel.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activePanel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                activePanel.style.opacity = '1';
                activePanel.style.transform = 'translateY(0)';
            }, 50);
        }
    }

    // Add click event listeners to tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            activateTab(tabId);
        });
    });

    // Initialize with first tab active
    if (tabs.length > 0) {
        const firstTabId = tabs[0].getAttribute('data-tab');
        activateTab(firstTabId);
    }
}

/**
 * Enhanced techset tabs functionality
 */
function initTechsetTabs() {
    const techsetTabs = document.querySelectorAll('.techset__tab');
    const techsetPanels = document.querySelectorAll('.techset__panel');
    
    if (!techsetTabs.length || !techsetPanels.length) return;

    function activateTechsetTab(tabId) {
        // Remove active class from all tabs and panels
        techsetTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        techsetPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active class to selected tab and panel
        const activeTab = document.querySelector(`[data-tech-panel="${tabId}"]`);
        const activePanel = document.getElementById(tabId);
        
        if (activeTab) {
            activeTab.classList.add('active');
            activeTab.setAttribute('aria-selected', 'true');
        }
        if (activePanel) {
            activePanel.classList.add('active');
            
            // Animate tech items
            const techItems = activePanel.querySelectorAll('.techset__item');
            techItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    }

    // Add click event listeners to tabs
    techsetTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tech-panel');
            activateTechsetTab(tabId);
        });
    });

    // Initialize with first tab active
    if (techsetTabs.length > 0) {
        const firstTabId = techsetTabs[0].getAttribute('data-tech-panel');
        activateTechsetTab(firstTabId);
    }
}

/**
 * Client feedback functionality
 */
function initClientFeedback() {
    const dots = document.querySelectorAll('.nav-dots .dot');
    const arrows = document.querySelectorAll('.nav-arrows .nav-arrow');
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (!dots.length || !arrows.length || !testimonials.length) return;
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    function updateSlider() {
        // On mobile, show only one testimonial at a time
        if (window.innerWidth <= 768) {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index === currentIndex ? 'block' : 'none';
            });
        } else {
            // On desktop, show all testimonials in grid
            testimonials.forEach((testimonial) => {
                testimonial.style.display = 'block';
            });
        }
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
        updateSlider();
    }
    
    function startAutoSlide() {
        // Only auto-slide on mobile
        if (window.innerWidth <= 768) {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    arrows.forEach((arrow, index) => {
        arrow.addEventListener('click', () => {
            if (index === 0) {
                prevSlide();
            } else {
                nextSlide();
            }
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        });
    });
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
            stopAutoSlide();
            setTimeout(startAutoSlide, 8000);
        });
    });
    
    // Pause on hover
    const feedbackSection = document.querySelector('.client-feedback');
    if (feedbackSection) {
        feedbackSection.addEventListener('mouseenter', stopAutoSlide);
        feedbackSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        updateSlider();
        stopAutoSlide();
        setTimeout(startAutoSlide, 1000);
    });
    
    // Initialize
    updateSlider();
    startAutoSlide();
}

/**
 * Service card interactions
 */
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.service-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                learnMoreBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    learnMoreBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Scroll to scope section
                const scopeSection = document.getElementById('scope');
                if (scopeSection) {
                    scopeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    });
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
    // Intersection Observer for animations
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

    // Observe elements for scroll animations
    const itemsToObserve = document.querySelectorAll('.service-card, .tech-logo, .techset__item');
    itemsToObserve.forEach(item => {
        // Set initial state for animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(item);
    });

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update slider positioning on resize
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
}

/**
 * Enhanced button interactions
 */
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn--primary, .service-btn, .request-services-btn, .btn--secondary');
    
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
});

/**
 * Keyboard navigation for tabs
 */
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

/**
 * Focus management for accessibility
 */
document.addEventListener('DOMContentLoaded', function() {
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
});

/**
 * Error handling and logging
 */
window.addEventListener('error', function(e) {
    console.error('Rust Services Page Error:', e.error);
});

// Analytics tracking for interactions (placeholder)
function trackInteraction(action, element) {
    // This would integrate with your analytics service
    console.log(`User interaction: ${action} on ${element}`);
}

// Add click tracking to key elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-btn, .scope-tab, .request-services-btn').forEach(element => {
        element.addEventListener('click', () => {
            trackInteraction('click', element.className);
        });
    });
});