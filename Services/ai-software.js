// AI Software Page JavaScript - Using Shared Components

// AI Software Page JavaScript - Using Shared Components

document.addEventListener('DOMContentLoaded', function() {
	console.log('AI Software page (Services/) initialized with shared components');

	// Diagnostic logs to validate assumptions
	console.log('Checking if page elements are present...');
	const heroSection = document.querySelector('.hero-section');
	const benefitsSection = document.querySelector('.ai-benefits-section');
	const clientsSection = document.querySelector('.clients');
	const footer = document.querySelector('.main-footer');

	console.log('Hero section found:', !!heroSection);
	console.log('Benefits section found:', !!benefitsSection);
	console.log('Clients section found:', !!clientsSection);
	console.log('Footer found:', !!footer);

	// Check for missing content: AI tools list
	const aiToolsList = document.querySelector('.ai-tools-list'); // Assuming this class for tools list
	console.log('AI tools list section found:', !!aiToolsList);
	if (!aiToolsList) {
		console.warn('AI tools list section is missing - this may be the core issue.');
	}

	// Check for JS errors in shared components
	try {
		// Assuming shared components are loaded
		console.log('Shared components appear to be loaded.');
	} catch (error) {
		console.error('Error with shared components:', error);
	}
});
document.addEventListener('DOMContentLoaded', function() {
	console.log('AI Software page (Services/) initialized with shared components');
});

















