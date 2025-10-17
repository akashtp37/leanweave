// Database Development Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
	console.log('Database Development page initialized');

	// Tech stack tabs behavior (RDBMS / NoSQL)
	var tabs = Array.prototype.slice.call(document.querySelectorAll('.techset__tab'));
	var panels = Array.prototype.slice.call(document.querySelectorAll('.techset__panel'));

	function activateTab(tabId) {
		var targetPanelId = tabId === 'tab-rdbms' ? 'panel-rdbms' : 'panel-nosql';
		tabs.forEach(function(t){ t.classList.toggle('active', t.id === tabId); t.setAttribute('aria-selected', t.id === tabId ? 'true' : 'false'); });
		panels.forEach(function(p){ p.classList.toggle('active', p.id === targetPanelId); });
	}

	tabs.forEach(function(tab) {
		tab.addEventListener('click', function() { activateTab(tab.id); });
	});
});



