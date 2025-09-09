// PHP Services Page JS
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
        let index = order.findIndex(id => document.getElementById(id).classList.contains('active'));
        if (index < 0) index = 0;
        const prevBtn = document.querySelector('.techset__nav--prev');
        const nextBtn = document.querySelector('.techset__nav--next');
        const syncIndex = () => { index = order.findIndex(id => document.getElementById(id).classList.contains('active')); };
        if (prevBtn) prevBtn.addEventListener('click', () => { syncIndex(); index = (index - 1 + order.length) % order.length; activate(order[index]); });
        if (nextBtn) nextBtn.addEventListener('click', () => { syncIndex(); index = (index + 1) % order.length; activate(order[index]); });
    })();

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
            console.log('PHP Service button clicked:', this.previousElementSibling.previousElementSibling.textContent);
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

    // Tech stack item hover effects
    const techItems = document.querySelectorAll('.techset__item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // PHP Technologies Tabs Functionality
    const tabButtons = document.querySelectorAll('.techset__tab');
    const tabContents = document.querySelectorAll('.techset__panel');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.dataset.techPanel;
                
                // Remove active class from all tabs and content
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
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
    
    // Uncomment the line below to enable auto-scroll
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

    // Observe tech items for animation
    const techsetItems = document.querySelectorAll('.techset__item');
    techsetItems.forEach(item => {
        observer.observe(item);
    });
});