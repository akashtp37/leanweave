document.addEventListener('DOMContentLoaded', () => {
	const includeElements = document.querySelectorAll('[data-include]');
	includeElements.forEach(async (element) => {
		const src = element.getAttribute('data-include');
		if (!src) return;
		try {
			const response = await fetch(src);
			if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
			element.innerHTML = await response.text();
		} catch (error) {
			console.error('Include failed:', src, error);
		}
	});
});


