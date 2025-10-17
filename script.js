// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on('scroll', (e) => {
  console.log(e);
});

// Implement scroll speed effect for elements with data-scroll-speed attribute
function initScrollSpeedEffect() {
  const scrollSpeedElements = document.querySelectorAll('[data-scroll-speed]');
  
  if (scrollSpeedElements.length === 0) return;
  
  // Store element data for performance
  const elementsData = Array.from(scrollSpeedElements).map(element => ({
    element,
    speed: parseFloat(element.getAttribute('data-scroll-speed')) || 1,
    initialOffset: 0
  }));
  
  // Single scroll handler for all elements
  lenis.on('scroll', (e) => {
    elementsData.forEach(({ element, speed }) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Check if element is in viewport
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        // Calculate scroll offset based on speed (negative for parallax effect)
        const scrollOffset = -(e.scroll * speed * 0.1);
        element.style.transform = `translateY(${scrollOffset}px)`;
      }
    });
  });
}

// Initialize scroll speed effect when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollSpeedEffect);