// CMS-Based Web Development Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('CMS-Based Web Development Services page initialized');

    // Client Feedback navigation (match Home page behavior)
    (function () {
        const dots = document.querySelectorAll('.nav-dots .dot');
        const arrows = document.querySelectorAll('.nav-arrows .nav-arrow');
        if (!dots.length || !arrows.length) return;
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });
        let currentIndex = 0;
        arrows.forEach((arrow, index) => {
            arrow.addEventListener('click', () => {
                if (index === 0) {
                    currentIndex = currentIndex > 0 ? currentIndex - 1 : dots.length - 1;
                } else {
                    currentIndex = currentIndex < dots.length - 1 ? currentIndex + 1 : 0;
                }
                dots.forEach(d => d.classList.remove('active'));
                dots[currentIndex].classList.add('active');
            });
        });
    })();

    // Add any service-specific functionality here
    console.log('CMS-based web development services functionality loaded');
});
