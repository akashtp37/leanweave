// Scala Services Page JS
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

    // Client feedback navigation functionality (home page style)
    const dots = document.querySelectorAll('.nav-dots .dot');
    const arrows = document.querySelectorAll('.nav-arrow');

    if (dots.length && arrows.length) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        let currentIndex = 0;
        arrows.forEach((arrow, index) => {
            arrow.addEventListener('click', () => {
                if (index === 0) { // Previous
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
                } else { // Next
                    currentIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
                }
                
                dots.forEach(d => d.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            });
        });
    }

    // Service button click handlers
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add your service button logic here
            console.log('Scala Service button clicked:', this.previousElementSibling.previousElementSibling.textContent);
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

    // Techset section functionality
    (function initTechsetTabs() {
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
            if (activePanel) activePanel.classList.add('active');
        }

        // Add click event listeners to tabs
        techsetTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tech-panel');
                activateTechsetTab(tabId);
            });
        });

        // Carousel navigation
        const order = Array.from(techsetPanels).map(p => p.id);
        let index = 0;
        const prevBtn = document.querySelector('.techset__nav--prev');
        const nextBtn = document.querySelector('.techset__nav--next');
        
        const syncIndex = () => { 
            index = order.findIndex(id => document.getElementById(id).classList.contains('active')); 
        };
        
        syncIndex();
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { 
                syncIndex(); 
                index = (index - 1 + order.length) % order.length; 
                activateTechsetTab(order[index]); 
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { 
                syncIndex(); 
                index = (index + 1) % order.length; 
                activateTechsetTab(order[index]); 
            });
        }

        // Initialize with first tab active
        if (techsetTabs.length > 0) {
            const firstTabId = techsetTabs[0].getAttribute('data-tech-panel');
            activateTechsetTab(firstTabId);
        }
    })();

    // Tech stack item hover effects for techset section
    const techItems = document.querySelectorAll('.techset__item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-6px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('click', function() {
            const techName = this.querySelector('span').textContent;
            console.log('Scala technology clicked:', techName);
            // Add logic to show more info about the Scala technology
        });
    });

    // Auto-scroll functionality removed - using home page style navigation

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

    // Scala specific enhancements
    
    // Enhanced service card animations for Scala
    const scalaServiceCards = document.querySelectorAll('.service-card');
    scalaServiceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

    // Request Services button handlers
    const requestServicesBtns = document.querySelectorAll('.request-services-btn');
    requestServicesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add Scala-specific service request logic here
            console.log('Scala service requested for:', this.closest('.scope-panel').id);
        });
    });

    // Performance optimization: Enhanced logo loading and error handling
    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logoIcon = entry.target;
                const img = logoIcon.querySelector('img');
                const fallbackSpan = logoIcon.querySelector('span');
                
                if (img && fallbackSpan) {
                    // Add loading state
                    logoIcon.style.opacity = '0.7';
                    
                    // Handle image load success
                    img.onload = function() {
                        logoIcon.style.opacity = '1';
                        fallbackSpan.style.display = 'none';
                    };
                    
                    // Handle image load error
                    img.onerror = function() {
                        img.style.display = 'none';
                        fallbackSpan.style.display = 'block';
                        logoIcon.style.opacity = '1';
                    };
                }
                
                logoObserver.unobserve(logoIcon);
            }
        });
    }, { threshold: 0.1 });

    // Observe all logo icons for enhanced loading
    document.querySelectorAll('.logo-icon').forEach(icon => {
        logoObserver.observe(icon);
    });

    // Enhanced logo click interactions with better feedback
    const techLogos = document.querySelectorAll('.tech-logo');
    techLogos.forEach(logo => {
        logo.addEventListener('click', function() {
            const techName = this.querySelector('span').textContent;
            const logoIcon = this.querySelector('.logo-icon');
            
            // Add click feedback
            logoIcon.style.transform = 'scale(0.95)';
            setTimeout(() => {
                logoIcon.style.transform = 'scale(1)';
            }, 150);
            
            console.log('Technology clicked:', techName);
            // Add logic to show more info about the technology
        });
    });

    // Mega menu functionality
    const megaMenuTrigger = document.querySelector('[data-menu="tech-stack"]');
    const megaMenu = document.getElementById('techStackMenu');
    
    if (megaMenuTrigger && megaMenu) {
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

    // Statistics animation on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = target.textContent;
                const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                
                if (numericValue) {
                    animateNumber(target, 0, numericValue, finalNumber.includes('+'));
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateNumber(element, start, end, hasPlus) {
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
    }

    // Scroll-triggered animations for scope section
    const scopeSection = document.querySelector('.scope-section');
    if (scopeSection) {
        const scopeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.2 });

        scopeObserver.observe(scopeSection);
    }

    // Global function to close mega menu (called from HTML)
    window.closeMegaMenu = function() {
        const megaMenu = document.getElementById('techStackMenu');
        if (megaMenu) {
            megaMenu.classList.remove('active');
        }
    };

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key closes mega menu
        if (e.key === 'Escape') {
            const megaMenu = document.getElementById('techStackMenu');
            if (megaMenu && megaMenu.classList.contains('active')) {
                megaMenu.classList.remove('active');
            }
        }
        
        // Arrow keys for slider navigation
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.prev');
            if (prevBtn) prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.next');
            if (nextBtn) nextBtn.click();
        }
    });

    console.log('Scala Services page initialized successfully');
});