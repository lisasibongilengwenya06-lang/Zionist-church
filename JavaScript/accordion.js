/*
 * Handles the accordion on Devotions.html
 * which:
 *   1. Finds all accordion buttons
 *   2. When clicked, toggle the 'open' class on the body and arrow
 *   3. Update aria-expanded for accessibility
 */

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.accordion-btn').forEach(function (btn) {

        btn.addEventListener('click', function () {

            var body  = btn.nextElementSibling;  // .accordion-body
            var arrow = btn.querySelector('.accordion-arrow');
            var isOpen = body.classList.contains('open');

            if (isOpen) {
                body.classList.remove('open');
                arrow.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            } else {
                body.classList.add('open');
                arrow.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

});
