// PWA Development Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('PWA Development Services page initialized');

    // Tech stack tabs behavior
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.techset__tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.techset__panel'));

    function activateTab(tabId) {
        var targetPanelId = tabId === 'tab-frameworks' ? 'panel-frameworks' : 'panel-tools';
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

    // Initialize with the first tab active
    if (tabs.length > 0) {
        activateTab(tabs[0].id);
    }

    // Scope tabs functionality
    const scopeTabButtons = document.querySelectorAll('.scope-tab');
    const scopePanels = document.querySelectorAll('.scope-panel');

    scopeTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            scopeTabButtons.forEach(btn => btn.classList.remove('active'));
            scopePanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding panel
            const targetPanel = document.getElementById(button.getAttribute('data-tab'));
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // Add any service-specific functionality here
    console.log('PWA development services functionality loaded');
});