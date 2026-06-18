/*
 * search.js
 * Handles real-time search and denomination filtering on Directory.html
 *
 * How it works:
 *   1. The text input fires an 'input' event on every keystroke.
 *   2. The filter buttons fire a 'click' event when pressed.
 *   3. Both events call filterCards() which:
 *        a. Gets the current search text (lowercased for case-insensitive matching)
 *        b. Gets the active denomination filter
 *        c. Loops through every .branch-card
 *        d. Checks if the card's data-keywords contains the search text
 *           AND if the card's data-denomination matches the active filter
 *        e. Shows or hides each card using display:block / display:none
 *   4. A results counter updates after each filter run.
 */

document.addEventListener('DOMContentLoaded', function () {

    // ── Get references to the UI elements ───────────────────────────────────
    var searchInput   = document.getElementById('search-input');
    var filterButtons = document.querySelectorAll('.filter-btn');
    var cards         = document.querySelectorAll('.branch-card');
    var resultsCount  = document.getElementById('results-count');
    var noResults     = document.getElementById('no-results');

    // Track the currently active denomination filter
    // 'all' means show every denomination
    var activeFilter = 'all';

    // ── Main filter function — called on every search or filter change ───────
    function filterCards() {

        // Get search text, trimmed and lowercased for comparison
        var searchText = searchInput.value.trim().toLowerCase();

        var visibleCount = 0;

        cards.forEach(function (card) {

            var keywords     = card.getAttribute('data-keywords').toLowerCase();
            var denomination = card.getAttribute('data-denomination');
            var cardTitle    = card.querySelector('h2').textContent.toLowerCase();

            // Check 1: does the card match the active denomination filter?
            var matchesFilter = (activeFilter === 'all') || (denomination === activeFilter);

            // Check 2: does the card match the search text?
            // We search both the keywords attribute and the card heading
            var matchesSearch = (searchText === '') ||
                                 keywords.includes(searchText) ||
                                 cardTitle.includes(searchText);

            // Show the card only if BOTH conditions are true
            if (matchesFilter && matchesSearch) {
                card.style.display = 'block';
                // Add a small animation when card appears
                card.style.animation = 'none';
                card.offsetHeight;   // force browser reflow to restart animation
                card.style.animation = 'slideUp 0.3s ease both';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Update the results counter
        if (searchText !== '' || activeFilter !== 'all') {
            resultsCount.textContent = visibleCount + ' result' + (visibleCount !== 1 ? 's' : '') + ' found';
        } else {
            resultsCount.textContent = '';
        }

        // Show or hide the "no results" message
        noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
    }

    // ── Text search — fires on every keystroke ───────────────────────────────
    searchInput.addEventListener('input', filterCards);

    // ── Filter buttons — fires on click ─────────────────────────────────────
    filterButtons.forEach(function (btn) {

        btn.addEventListener('click', function () {

            // Remove 'active' class from all buttons
            filterButtons.forEach(function (b) {
                b.classList.remove('active');
            });

            // Add 'active' to the clicked button
            btn.classList.add('active');

            // Update the active filter value
            activeFilter = btn.getAttribute('data-filter');

            // Re-run the filter
            filterCards();
        });
    });

});
