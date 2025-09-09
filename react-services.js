// React Services Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	// Common functionality is handled by shared-components.js
	// Add React-specific customizations here
	
	// Technology set interactions - React specific
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
		let index = 0;
		const prevBtn = document.querySelector('.techset__nav--prev');
		const nextBtn = document.querySelector('.techset__nav--next');
		const syncIndex = () => { index = order.findIndex(id => document.getElementById(id).classList.contains('active')); };
		syncIndex();
		if (prevBtn) prevBtn.addEventListener('click', () => { syncIndex(); index = (index - 1 + order.length) % order.length; activate(order[index]); });
		if (nextBtn) nextBtn.addEventListener('click', () => { syncIndex(); index = (index + 1) % order.length; activate(order[index]); });
	})();
	
	console.log('React Services page initialized with shared components');
});
