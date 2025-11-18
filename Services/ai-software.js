// AI Software Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	console.log('AI Software page (Services/) initialized with shared components');

	// Technology set interactions - AI specific
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

		// Initialize first tab if none is active
		const activeTab = document.querySelector('.techset__tab.active');
		if (!activeTab && tabs.length > 0) {
			const firstTabId = tabs[0].getAttribute('data-tech-panel');
			activate(firstTabId);
		}
	})();

	console.log('AI Software page initialized with technology stack functionality');
});



















