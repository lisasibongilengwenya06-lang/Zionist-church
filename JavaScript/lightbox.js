/*
 * lightbox.js
 * Handles the lightbox (enlarged image viewer) for Photo gallery.html
 *
 * How it works:
 *   1. On page load, find every gallery image and attach a click listener.
 *   2. When an image is clicked, populate the lightbox overlay with that
 *      image's src and caption, then show the overlay.
 *   3. The user can close by: clicking the ✕ button, clicking the dark
 *      backdrop, or pressing the Escape key.
 *   4. Left/right arrow buttons let the user navigate between images
 *      without closing the lightbox.
 */

// ── 1. Collect all gallery images once the page has loaded ───────────────────
// We wait for DOMContentLoaded so the images exist in the DOM before we
// try to query them.

document.addEventListener('DOMContentLoaded', function () {

    // Grab every clickable gallery image (we exclude the video element)
    var galleryImages = document.querySelectorAll('.photo-item img');

    // Track which image is currently shown so arrow navigation works
    var currentIndex = 0;

    // Convert NodeList to a plain array so we can use index arithmetic
    var imagesArray = Array.from(galleryImages);

    // ── 2. Get references to every lightbox element ──────────────────────────
    var overlay      = document.getElementById('lightbox-overlay');
    var lightboxImg  = document.getElementById('lightbox-img');
    var lightboxCap  = document.getElementById('lightbox-caption');
    var closeBtn     = document.getElementById('lightbox-close');
    var prevBtn      = document.getElementById('lightbox-prev');
    var nextBtn      = document.getElementById('lightbox-next');

    // ── 3. Attach click listeners to each gallery image ──────────────────────
    imagesArray.forEach(function (img, index) {

        // Change the cursor so users know images are clickable
        img.style.cursor = 'pointer';

        img.addEventListener('click', function () {
            openLightbox(index);
        });

    });

    // ── 4. openLightbox — show the overlay and populate it ───────────────────
    function openLightbox(index) {

        currentIndex = index;

        var clickedImg = imagesArray[currentIndex];

        // Set the large image source and alt text
        lightboxImg.src = clickedImg.src;
        lightboxImg.alt = clickedImg.alt;

        // Get the caption from the sibling <p class="photo-caption"> element
        // parentElement is .photo-item; we look for its <p> child
        var captionEl = clickedImg.parentElement.querySelector('.photo-caption');
        lightboxCap.textContent = captionEl ? captionEl.textContent : '';

        // Show the overlay (CSS sets display:none by default; we switch to flex)
        overlay.classList.add('open');

        // Trap keyboard: listen for Escape and arrow keys
        document.addEventListener('keydown', handleKeyboard);
    }

    // ── 5. closeLightbox — hide the overlay and clean up ─────────────────────
    function closeLightbox() {
        overlay.classList.remove('open');
        // Remove keyboard listener so it doesn't fire when lightbox is closed
        document.removeEventListener('keydown', handleKeyboard);
    }

    // ── 6. Navigation — move to previous or next image ───────────────────────
    function showPrev() {
        // Wrap around: if at the first image, jump to the last
        currentIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        openLightbox(currentIndex);
    }

    function showNext() {
        // Wrap around: if at the last image, jump to the first
        currentIndex = (currentIndex + 1) % imagesArray.length;
        openLightbox(currentIndex);
    }

    // ── 7. Keyboard handler ───────────────────────────────────────────────────
    function handleKeyboard(event) {
        if (event.key === 'Escape')     { closeLightbox(); }
        if (event.key === 'ArrowLeft')  { showPrev(); }
        if (event.key === 'ArrowRight') { showNext(); }
    }

    // ── 8. Button event listeners ─────────────────────────────────────────────
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Close when clicking the dark backdrop (not the image/controls)
    overlay.addEventListener('click', function (event) {
        // event.target is what was actually clicked
        // Only close if the click landed on the overlay itself, not its children
        if (event.target === overlay) {
            closeLightbox();
        }
    });

});
