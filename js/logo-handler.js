/**
 * Logo Handler - Shared functionality for all service pages
 * Handles logo loading, error handling, and interactions
 */

class LogoHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupLogoObserver();
        this.setupLogoInteractions();
        this.setupClientLogos();
        this.setupCompanyLogos();
    }

    setupLogoObserver() {
        // Performance optimization: Enhanced logo loading and error handling
        this.logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleLogoIntersection(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observe all logo icons for enhanced loading
        document.querySelectorAll('.logo-icon').forEach(icon => {
            this.logoObserver.observe(icon);
        });
    }

    handleLogoIntersection(logoIcon) {
        const img = logoIcon.querySelector('img');
        const fallbackSpan = logoIcon.querySelector('span');
        
        if (img && fallbackSpan) {
            // Add loading state
            logoIcon.style.opacity = '0.7';
            
            // Handle image load success
            img.onload = () => {
                logoIcon.style.opacity = '1';
                fallbackSpan.style.display = 'none';
                this.addLogoSuccessClass(logoIcon);
            };
            
            // Handle image load error
            img.onerror = () => {
                img.style.display = 'none';
                fallbackSpan.style.display = 'block';
                logoIcon.style.opacity = '1';
                this.addLogoFallbackClass(logoIcon);
            };
        }
        
        this.logoObserver.unobserve(logoIcon);
    }

    addLogoSuccessClass(logoIcon) {
        logoIcon.classList.add('logo-loaded');
        logoIcon.classList.remove('logo-fallback');
    }

    addLogoFallbackClass(logoIcon) {
        logoIcon.classList.add('logo-fallback');
        logoIcon.classList.remove('logo-loaded');
    }

    setupLogoInteractions() {
        // Enhanced logo click interactions with better feedback
        const techLogos = document.querySelectorAll('.tech-logo');
        techLogos.forEach(logo => {
            logo.addEventListener('click', (e) => this.handleLogoClick(e, logo));
        });
    }

    handleLogoClick(event, logo) {
        const techName = logo.querySelector('span').textContent;
        const logoIcon = logo.querySelector('.logo-icon');
        
        // Add click feedback
        logoIcon.style.transform = 'scale(0.95)';
        setTimeout(() => {
            logoIcon.style.transform = 'scale(1)';
        }, 150);
        
        // Log interaction
        console.log('Technology clicked:', techName);
        
        // Emit custom event for other components
        const customEvent = new CustomEvent('techLogoClicked', {
            detail: { techName, logoElement: logo }
        });
        document.dispatchEvent(customEvent);
    }

    setupClientLogos() {
        // Handle client logos with hover effects
        const clientLogos = document.querySelectorAll('.clients__logos img');
        clientLogos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.filter = 'grayscale(0%)';
                logo.style.opacity = '1';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.filter = 'grayscale(100%)';
                logo.style.opacity = '0.7';
            });
        });
    }

    setupCompanyLogos() {
        // Handle company logos in testimonials
        const companyLogos = document.querySelectorAll('.company-logo');
        companyLogos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                logo.style.opacity = '1';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.opacity = '0.8';
            });
        });
    }

    // Public method to refresh logos
    refreshLogos() {
        document.querySelectorAll('.logo-icon').forEach(icon => {
            this.logoObserver.observe(icon);
        });
    }

    // Public method to handle dynamic logo additions
    addLogo(logoElement) {
        if (logoElement.classList.contains('logo-icon')) {
            this.logoObserver.observe(logoElement);
        }
    }

    // Cleanup method
    destroy() {
        if (this.logoObserver) {
            this.logoObserver.disconnect();
        }
    }
}

// Initialize logo handler when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.logoHandler = new LogoHandler();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogoHandler;
}
