// Java Services Page JS
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

    // Technology set interactions (React-like)
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
            console.log('Service button clicked:', this.previousElementSibling.previousElementSibling.textContent);
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
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Java Technologies Tabs Functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length && tabContents.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
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

    // Tech Showcase Slider Functionality
    initializeTechShowcase();

    function initializeTechShowcase() {
        const showcases = document.querySelectorAll('.tech-showcase');
        
        showcases.forEach(showcase => {
            const track = showcase.querySelector('.tech-showcase__track');
            const cards = showcase.querySelectorAll('.tech-showcase__card');
            const prevBtn = showcase.querySelector('.slider-btn.prev');
            const nextBtn = showcase.querySelector('.slider-btn.next');
            const indicators = showcase.querySelectorAll('.indicator');
            
            if (!track || !cards.length) return;
            
            let currentIndex = 0;
            const cardsPerView = getCardsPerView();
            const maxIndex = Math.max(0, Math.ceil(cards.length / cardsPerView) - 1);
            
            function getCardsPerView() {
                const cardWidth = 200; // Base card width
                const gap = 32; // Gap between cards
                const containerWidth = showcase.offsetWidth;
                const availableWidth = containerWidth - 64; // Account for padding
                return Math.floor(availableWidth / (cardWidth + gap)) || 1;
            }
            
            function updateSlider() {
                const cardWidth = 200;
                const gap = 32;
                const offset = currentIndex * (cardWidth + gap) * cardsPerView;
                track.style.transform = `translateX(-${offset}px)`;
                
                // Update indicators
                indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('active', i === currentIndex);
                });
                
                // Update button states
                if (prevBtn) prevBtn.disabled = currentIndex === 0;
                if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex;
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        updateSlider();
                    }
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSlider();
                    }
                });
            }
            
            indicators.forEach((indicator, i) => {
                indicator.addEventListener('click', () => {
                    currentIndex = i;
                    updateSlider();
                });
            });
            
            // Handle window resize
            window.addEventListener('resize', () => {
                const newCardsPerView = getCardsPerView();
                const newMaxIndex = Math.max(0, Math.ceil(cards.length / newCardsPerView) - 1);
                if (currentIndex > newMaxIndex) {
                    currentIndex = newMaxIndex;
                }
                updateSlider();
            });
            
            // Initialize
            updateSlider();
        });
    }

    // Auto-scroll functionality for tech showcase (optional)
    function initAutoScroll() {
        const showcases = document.querySelectorAll('.tech-showcase');
        
        showcases.forEach(showcase => {
            let autoScrollInterval;
            
            function startAutoScroll() {
                autoScrollInterval = setInterval(() => {
                    const nextBtn = showcase.querySelector('.slider-btn.next');
                    if (nextBtn && !nextBtn.disabled) {
                        nextBtn.click();
                    } else {
                        const prevBtn = showcase.querySelector('.slider-btn.prev');
                        if (prevBtn) prevBtn.click();
                    }
                }, 5000);
            }
            
            function stopAutoScroll() {
                clearInterval(autoScrollInterval);
            }
            
            // Start auto-scroll
            startAutoScroll();
            
            // Pause on hover
            showcase.addEventListener('mouseenter', stopAutoScroll);
            showcase.addEventListener('mouseleave', startAutoScroll);
            
            // Stop on button click
            const buttons = showcase.querySelectorAll('.slider-btn, .indicator');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    stopAutoScroll();
                    setTimeout(startAutoScroll, 8000); // Restart after 8 seconds
                });
            });
        });
    }
    
    // Uncomment the line below to enable auto-scroll
    // initAutoScroll();
});
