// Python Services Page JS
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


    // Scope tabs (AI/Web/Big Data/IoT) interactions
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
            console.log('Python Service button clicked:', this.previousElementSibling.previousElementSibling.textContent);
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
    
    // Enable auto-scroll for Python page
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


    // Python-specific enhancements
    
    // Add Python logo animation on page load
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.querySelectorAll('.word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, 200 + (index * 200));
        });
    }


    // Service card interaction enhancements
    const pythonServiceCards = document.querySelectorAll('.service-card');
    pythonServiceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });

        // Stagger animation on page load
        setTimeout(() => {
            card.classList.add('animate-in');
        }, 100 * index);
    });

    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 100;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
        }, 20);
    });

    // Mega menu interactions
    const techStackLink = document.querySelector('[data-menu="tech-stack"]');
    const megaMenu = document.getElementById('techStackMenu');
    
    if (techStackLink && megaMenu) {
        techStackLink.addEventListener('mouseenter', () => {
            megaMenu.style.display = 'block';
            setTimeout(() => megaMenu.classList.add('active'), 10);
        });

        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.classList.remove('active');
            setTimeout(() => megaMenu.style.display = 'none', 300);
        });
    }

    // Category navigation in mega menu
    const categoryItems = document.querySelectorAll('.category-item');
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            categoryItems.forEach(cat => cat.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            item.classList.add('active');
            const targetCategory = item.dataset.category;
            const targetContent = document.getElementById(targetCategory);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// Close mega menu function (global)
function closeMegaMenu() {
    const megaMenu = document.getElementById('techStackMenu');
    if (megaMenu) {
        megaMenu.classList.remove('active');
        setTimeout(() => megaMenu.style.display = 'none', 300);
    }
}