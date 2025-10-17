/**
 * Mega Menu Functionality
 * Handles all mega-menu interactions including hover effects, category switching, and mobile behavior
 */

class MegaMenu {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Get all dropdown triggers
        const dropdownTriggers = document.querySelectorAll('.nav-link.has-dropdown');
        const megaMenus = document.querySelectorAll('.mega-menu');
        const categoryItems = document.querySelectorAll('.category-item');
        const closeButtons = document.querySelectorAll('.mega-close');

        // Handle dropdown hover events (desktop)
        dropdownTriggers.forEach(trigger => {
            const menuId = trigger.getAttribute('data-menu');
            const targetMenu = document.getElementById(menuId + 'Menu');

            if (targetMenu) {
                // Show mega menu on hover
                trigger.addEventListener('mouseenter', () => {
                    this.showMegaMenu(targetMenu);
                });

                // Keep menu open when hovering over it
                targetMenu.addEventListener('mouseenter', () => {
                    this.showMegaMenu(targetMenu);
                });

                // Hide menu when leaving trigger or menu
                trigger.addEventListener('mouseleave', (e) => {
                    setTimeout(() => {
                        if (!targetMenu.matches(':hover') && !trigger.matches(':hover')) {
                            this.hideMegaMenu(targetMenu);
                        }
                    }, 100);
                });

                targetMenu.addEventListener('mouseleave', () => {
                    this.hideMegaMenu(targetMenu);
                });
            }
        });

        // Handle category switching
        categoryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchCategory(item);
            });
        });

        // Handle close button clicks
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const megaMenu = button.closest('.mega-menu');
                if (megaMenu) {
                    this.hideMegaMenu(megaMenu);
                }
            });
        });

        // Close mega menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-item') && !e.target.closest('.mega-menu')) {
                this.hideAllMegaMenus();
            }
        });

        // Close mega menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideAllMegaMenus();
            }
        });
    }

    setupMobileMenu() {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const dropdownTriggers = document.querySelectorAll('.nav-link.has-dropdown');

        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                mobileToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Handle mobile dropdown clicks
        dropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const menuId = trigger.getAttribute('data-menu');
                    const targetMenu = document.getElementById(menuId + 'Menu');
                    
                    if (targetMenu) {
                        targetMenu.classList.toggle('active');
                        trigger.classList.toggle('active');
                    }
                }
            });
        });
    }

    showMegaMenu(megaMenu) {
        // Hide any other open mega menus first
        this.hideAllMegaMenus();
        
        // Show the target mega menu
        megaMenu.classList.add('active');
        
        // Add active state to the trigger
        const trigger = document.querySelector(`[data-menu="${megaMenu.id.replace('Menu', '')}"]`);
        if (trigger) {
            trigger.classList.add('active');
        }

        // Prevent body scroll on mobile when menu is open
        if (window.innerWidth <= 768) {
            document.body.style.overflow = 'hidden';
        }
    }

    hideMegaMenu(megaMenu) {
        megaMenu.classList.remove('active');
        
        // Remove active state from the trigger
        const trigger = document.querySelector(`[data-menu="${megaMenu.id.replace('Menu', '')}"]`);
        if (trigger) {
            trigger.classList.remove('active');
        }

        // Restore body scroll
        document.body.style.overflow = '';
    }

    hideAllMegaMenus() {
        const megaMenus = document.querySelectorAll('.mega-menu');
        const triggers = document.querySelectorAll('.nav-link.has-dropdown');

        megaMenus.forEach(menu => {
            menu.classList.remove('active');
        });

        triggers.forEach(trigger => {
            trigger.classList.remove('active');
        });

        // Restore body scroll
        document.body.style.overflow = '';
    }

    switchCategory(categoryItem) {
        const targetCategory = categoryItem.getAttribute('data-category');
        const megaMenu = categoryItem.closest('.mega-menu');

        if (!megaMenu) return;

        // Update category navigation
        const allCategoryItems = megaMenu.querySelectorAll('.category-item');
        allCategoryItems.forEach(item => {
            item.classList.remove('active');
        });
        categoryItem.classList.add('active');

        // Update content display
        const allContentSections = megaMenu.querySelectorAll('.category-content');
        allContentSections.forEach(section => {
            section.classList.remove('active');
        });

        const targetContent = megaMenu.querySelector(`#${targetCategory}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    // Handle window resize
    handleResize() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state
            const navMenu = document.getElementById('navMenu');
            const mobileToggle = document.getElementById('mobileToggle');
            
            if (navMenu) navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement && targetId !== '#') {
                    e.preventDefault();
                    
                    // Close mega menu if open
                    this.hideAllMegaMenus();
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Initialize mega menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const megaMenu = new MegaMenu();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        megaMenu.handleResize();
    });
    
    // Setup smooth scrolling
    megaMenu.setupSmoothScrolling();
});

// Global function for backward compatibility (used by close button onclick)
function closeMegaMenu() {
    const activeMenu = document.querySelector('.mega-menu.active');
    if (activeMenu) {
        activeMenu.classList.remove('active');
        
        const trigger = document.querySelector(`[data-menu="${activeMenu.id.replace('Menu', '')}"]`);
        if (trigger) {
            trigger.classList.remove('active');
        }
        
        document.body.style.overflow = '';
    }
}

// Enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    const activeMenu = document.querySelector('.mega-menu.active');
    
    if (activeMenu && (e.key === 'Tab' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        const focusableElements = activeMenu.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab' && e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else if (e.key === 'Tab') {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});