// Node.js Services Page JS
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
            console.log('Node.js Service button clicked:', this.previousElementSibling.previousElementSibling.textContent);
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



    // Scope tabs (match other pages)
    (function initScopeTabs(){
        const scopeTabs = document.querySelectorAll('.scope-tab');
        const scopePanels = document.querySelectorAll('.scope-panel');
        if (!scopeTabs.length || !scopePanels.length) return;
        
        function activateScope(id){
            scopeTabs.forEach(t => t.classList.remove('active'));
            scopePanels.forEach(p => p.classList.remove('active'));
            const tab = Array.from(scopeTabs).find(t => t.getAttribute('data-tab') === id);
            const panel = document.getElementById(id);
            if (tab) tab.classList.add('active');
            if (panel) panel.classList.add('active');
        }

        scopeTabs.forEach(tab => {
            tab.addEventListener('click', () => activateScope(tab.getAttribute('data-tab')));
        });
    })();

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


    // Node.js specific enhancements
    

    // Enhanced service card animations for Node.js
    const nodeServiceCards = document.querySelectorAll('.service-card');
    nodeServiceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

});