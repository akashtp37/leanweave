// Cross-Platform App Development Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cross-Platform App Development Services page initialized');

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

    // Scope tabs functionality (added for new scope section)
    (function () {
        const scopeTabs = Array.from(document.querySelectorAll('.scope-tab'));
        const scopePanels = Array.from(document.querySelectorAll('.scope-panel'));
        if (!scopeTabs.length || !scopePanels.length) return;

        scopeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-tab');

                // update tab active state
                scopeTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // update panels
                scopePanels.forEach(p => p.classList.remove('active'));
                const panel = document.getElementById(target);
                if (panel) panel.classList.add('active');
            });
        });
    })();

    // Add any service-specific functionality here
    console.log('Cross-platform development services functionality loaded');
});