// CMS Web Development Services page enhancements
document.addEventListener('DOMContentLoaded', function () {
    console.log('CMS-based web development services page initialized');

    var steps = Array.prototype.slice.call(document.querySelectorAll('.step-card'));

    steps.forEach(function (step) {
        step.addEventListener('mouseenter', function () {
            step.classList.add('is-active');
        });
        step.addEventListener('mouseleave', function () {
            step.classList.remove('is-active');
        });
    });
});

