/*
 * main.js
 * Shared JavaScript loaded on every page.
 *
 * which has:
 *   1. Mobile navigation toggle — hamburger menu (☰) that shows/hides
 *      the nav links on small screens.
 *   2. Live date and time in the footer — updates every second.
 */

/* ── 1. Mobile navigation toggle ───────────────────────────────────────────
   How it works:
   - A button with id="menuToggle" sits in the header.
   - The nav links wrapper has id="navLinks".
   - Clicking the button toggles the 'active' class on navLinks.
   - CSS shows/hides the nav based on whether 'active' is present.
   - On desktop, the hamburger button is hidden via CSS (display:none).
────────────────────────────────────────────────────────────────────────── */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Update aria-expanded for accessibility
        const isOpen = navLinks.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        // Switch the hamburger icon between ☰ and ✕
        menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close nav when a link is clicked (good UX on mobile)
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.textContent = '☰';
        });
    });
}

/* ── 2. Live date and time in footer ───────────────────────────────────────
   How it works:
   - new Date() gets the current date and time.
   - toLocaleDateString() formats it in a human-readable way.
   - setInterval() calls the function every 1000ms (1 second)
     so the time updates in real time.
   - The result is inserted into <span id="datetime"> in the footer.
────────────────────────────────────────────────────────────────────────── */
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year:    'numeric',
        month:   'long',
        day:     'numeric',
        hour:    '2-digit',
        minute:  '2-digit',
        second:  '2-digit'
    };
    const datetimeEl = document.getElementById('datetime');
    if (datetimeEl) {
        datetimeEl.textContent = now.toLocaleDateString('en-US', options);
    }
}

// Run immediately then update every second
updateDateTime();
setInterval(updateDateTime, 1000);
