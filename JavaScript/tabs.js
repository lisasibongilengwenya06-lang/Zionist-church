/*
 * tabs.js
 * Handles the denomination tabs on About us.html
 *
 * How it works:
 *   1. Find all tab buttons in the .tabs-nav
 *   2. When a button is clicked, remove 'active' from all buttons and panels
 *   3. Add 'active' to the clicked button and its matching panel
 *      (matched via data-target attribute on the button)
 */

document.addEventListener('DOMContentLoaded', function () {

    var tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(function (btn) {

        btn.addEventListener('click', function () {

            // Get the nav this button belongs to
            var nav = btn.closest('.tabs-nav');

            // Deactivate all tab buttons in this nav
            nav.querySelectorAll('.tab-btn').forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            // Deactivate all panels
            document.querySelectorAll('.tab-panel').forEach(function (p) {
                p.classList.remove('active');
            });

            // Activate clicked button and its matching panel
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            document.getElementById(btn.getAttribute('data-target')).classList.add('active');
        });
    });

});
