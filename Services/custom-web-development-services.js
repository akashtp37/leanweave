// Custom Web Development Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Custom Web Development Services page initialized');

    // Tech stack tabs behavior
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.techset__tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.techset__panel'));

    function activateTab(tabId) {
        var targetPanelId = tabId === 'tab-technologies' ? 'panel-technologies' : 'panel-services';
        tabs.forEach(function(t){
            t.classList.toggle('active', t.id === tabId);
            t.setAttribute('aria-selected', t.id === tabId ? 'true' : 'false');
        });
        panels.forEach(function(p){
            p.classList.toggle('active', p.id === targetPanelId);
        });
    }

    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            activateTab(tab.id);
        });
    });

    // Backend Services Tab Functionality
    const beTabs = document.querySelectorAll('.be-tab');
    const bePanels = document.querySelectorAll('.be-panel');

    function activateBeTab(targetId) {
        console.log('Activating tab:', targetId);

        // Remove active class from all tabs and panels
        beTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });

        bePanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Activate the selected tab and panel
        const activeTab = document.querySelector(`[data-target="${targetId}"]`);
        const activePanel = document.getElementById(targetId);

        console.log('Active tab element:', activeTab);
        console.log('Active panel element:', activePanel);

        if (activeTab && activePanel) {
            activeTab.classList.add('active');
            activeTab.setAttribute('aria-selected', 'true');
            activePanel.classList.add('active');
            console.log('Tab and panel activated successfully');
        } else {
            console.error('Failed to find tab or panel for targetId:', targetId);
        }
    }

    // Add click and touch event listeners to all backend tabs
    beTabs.forEach(tab => {
        // Click event for desktop
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Tab clicked:', this.getAttribute('data-target'));
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                activateBeTab(targetId);
            }
        });

        // Touch event for mobile devices
        tab.addEventListener('touchend', function(e) {
            e.preventDefault();
            console.log('Tab touched:', this.getAttribute('data-target'));
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                activateBeTab(targetId);
            }
        });

        // Add keyboard navigation support
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                console.log('Tab activated via keyboard:', this.getAttribute('data-target'));
                const targetId = this.getAttribute('data-target');
                if (targetId) {
                    activateBeTab(targetId);
                }
            }
        });
    });

    // Initialize with the first tab active
    if (beTabs.length > 0 && bePanels.length > 0) {
        console.log('Initializing tabs. Found', beTabs.length, 'tabs and', bePanels.length, 'panels');
        const firstTab = beTabs[0];
        const firstTargetId = firstTab.getAttribute('data-target');
        console.log('First tab targetId:', firstTargetId);
        if (firstTargetId) {
            activateBeTab(firstTargetId);
        }
    } else {
        console.error('No tabs or panels found for initialization');
    }

    // Add any service-specific functionality here
});