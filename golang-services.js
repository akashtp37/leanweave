// Golang Services Page JS
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
            // Remove active class from all tabs and panels
            tabs.forEach(tab => tab.classList.remove('active'));
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to selected tab and panel
            const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
            const activePanel = document.getElementById(tabId);
            
            if (activeTab) activeTab.classList.add('active');
            if (activePanel) activePanel.classList.add('active');
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
    })();

    // Client feedback slider functionality
    const track = document.querySelector('.feedback-track');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    
    if (track && nextBtn && prevBtn && dots.length) {
        let currentIndex = 0;
        
        function updateSlider() {
            const cardWidth = track.querySelector('.feedback-card').offsetWidth;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            // Update dots
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
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Auto-advance slider
        setInterval(() => {
            currentIndex = (currentIndex + 1) % dots.length;
            updateSlider();
        }, 5000);
    }

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.service-btn');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                // Add click animation
                learnMoreBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    learnMoreBtn.style.transform = 'scale(1)';
                }, 150);
                
                // Scroll to scope section when Learn More is clicked
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
            // Add click effect
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add loading states and error handling
    window.addEventListener('load', () => {
        // Loading complete
    });

    // Add intersection observer for animations
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

    // Observe service cards for scroll animations
    const itemsToObserve = document.querySelectorAll('.service-card');
    itemsToObserve.forEach(item => {
        observer.observe(item);
    });
});