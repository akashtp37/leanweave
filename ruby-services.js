// Ruby Services Page JS
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

    // Client feedback slider functionality
    const track = document.querySelector('.feedback-track');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    
    if (track && nextBtn && prevBtn && dots.length) {
        let currentIndex = 0;
        
        function updateSlider(index) {
            track.style.transform = `translateX(-${index * 50}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % dots.length;
            updateSlider(currentIndex);
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + dots.length) % dots.length;
            updateSlider(currentIndex);
        });
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider(currentIndex);
            });
        });
    }

    // Service button click handlers
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add your service button logic here
            console.log('Ruby Service button clicked:', this.previousElementSibling.previousElementSibling.textContent);
        });
    });

    // Mobile navigation toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Auto-scroll functionality for client feedback (optional)
    function initAutoScroll() {
        const feedbackSlider = document.querySelector('.client-feedback');
        
        if (feedbackSlider) {
            let autoScrollInterval;
            
            function startAutoScroll() {
                autoScrollInterval = setInterval(() => {
                    const nextBtn = feedbackSlider.querySelector('.next');
                    if (nextBtn) {
                        nextBtn.click();
                    }
                }, 4000);
            }
            
            function stopAutoScroll() {
                clearInterval(autoScrollInterval);
            }
            
            // Start auto-scroll
            startAutoScroll();
            
            // Pause on hover
            feedbackSlider.addEventListener('mouseenter', stopAutoScroll);
            feedbackSlider.addEventListener('mouseleave', startAutoScroll);
            
            // Stop on button click
            const buttons = feedbackSlider.querySelectorAll('.slider-btn, .dot');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    stopAutoScroll();
                    setTimeout(startAutoScroll, 6000); // Restart after 6 seconds
                });
            });
        }
    }
    
    // Enable auto-scroll
    initAutoScroll();

    // Intersection Observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Ruby specific enhancements
    
    // Enhanced service card animations for Ruby
    const rubyServiceCards = document.querySelectorAll('.service-card');
    rubyServiceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

    // Ruby gem-like sparkle effect for service cards (optional enhancement)
    function addSparkleEffect() {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Create sparkle elements
                for (let i = 0; i < 3; i++) {
                    const sparkle = document.createElement('div');
                    sparkle.style.cssText = `
                        position: absolute;
                        width: 4px;
                        height: 4px;
                        background: #cc342d;
                        border-radius: 50%;
                        pointer-events: none;
                        animation: sparkle 0.8s ease-out forwards;
                        top: ${Math.random() * 100}%;
                        left: ${Math.random() * 100}%;
                        opacity: 0;
                    `;
                    this.appendChild(sparkle);
                    
                    // Remove sparkle after animation
                    setTimeout(() => {
                        if (sparkle.parentNode) {
                            sparkle.parentNode.removeChild(sparkle);
                        }
                    }, 800);
                }
            });
        });

        // Add sparkle animation to CSS if not already present
        if (!document.querySelector('#sparkle-animation')) {
            const style = document.createElement('style');
            style.id = 'sparkle-animation';
            style.textContent = `
                @keyframes sparkle {
                    0% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1) rotate(180deg); }
                    100% { opacity: 0; transform: scale(0) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Uncomment to enable sparkle effect
    // addSparkleEffect();

    // Ruby Outsourcing Offerings Section Functionality
    function initOutsourcingTabs() {
        const serviceItems = document.querySelectorAll('.service-item');
        const detailPanels = document.querySelectorAll('.detail-panel');
        
        if (serviceItems.length && detailPanels.length) {
            serviceItems.forEach(item => {
                item.addEventListener('click', function() {
                    const targetService = this.getAttribute('data-service');
                    
                    // Remove active class from all service items and detail panels
                    serviceItems.forEach(service => service.classList.remove('active'));
                    detailPanels.forEach(panel => panel.classList.remove('active'));
                    
                    // Add active class to clicked service item
                    this.classList.add('active');
                    
                    // Show corresponding detail panel
                    const targetPanel = document.getElementById(targetService);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                    }
                });
            });
        }
    }

    // Initialize outsourcing tabs
    initOutsourcingTabs();

    // Request quote button functionality
    function initQuoteButtons() {
        const quoteButtons = document.querySelectorAll('.request-quote-btn');
        
        quoteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.closest('.detail-panel').querySelector('h3').textContent;
                console.log(`Quote requested for: ${serviceName}`);
                
                // Add your quote request logic here
                // For example, open a modal, redirect to contact form, etc.
                
                // Optional: Show a success message
                const originalText = this.textContent;
                this.textContent = 'Request Sent!';
                this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = 'linear-gradient(135deg, var(--primary-color), #ff8c00)';
                }, 2000);
            });
        });
    }

    // Initialize quote buttons
    initQuoteButtons();

    // Ruby-themed console messages
    console.log('%c💎 Welcome to Ruby Development Services! 💎', 'color: #cc342d; font-size: 16px; font-weight: bold;');
    console.log('%cBuilding elegant, expressive applications with Ruby magic ✨', 'color: #666; font-size: 12px;');
});