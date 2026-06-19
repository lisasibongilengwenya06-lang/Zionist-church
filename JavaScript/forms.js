/*
 * forms.js
 * Handles validation and submission for both forms on Contact us.html
 *
 * ENQUIRY FORM:
 *   - Validates name, email, phone, and enquiry type
 *   - On success: hides the form and shows a relevant response
 *     based on the enquiry type selected
 *
 * CONTACT FORM:
 *   - Validates name, email, subject, and message
 *   - On success: builds a mailto: link with all form data
 *     pre-filled and opens the user's email client
 *
 * VALIDATION RULES:
 *   - Name: required, minimum 2 characters
 *   - Email: required, must match standard email format
 *   - Phone: required, must be 10 digits (South African format)
 *   - Select fields: required, must not be empty
 *   - Message: required, minimum 10 characters, maximum 500
 */

/* SHARED HELPER FUNCTIONS */

// showError — display an error message below a field
function showError(fieldId, message) {
    var errorEl = document.getElementById(fieldId + '-error');
    var inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = message;
    if (inputEl) inputEl.classList.add('input-error');
}

// clearError — remove error styling from a field
function clearError(fieldId) {
    var errorEl = document.getElementById(fieldId + '-error');
    var inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = '';
    if (inputEl) inputEl.classList.remove('input-error');
}

// isValidEmail — checks email format using a regular expression
// The regex checks for: characters @ characters . characters
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// isValidPhone — checks South African phone number (10 digits)
function isValidPhone(phone) {
    var phoneRegex = /^0[0-9]{9}$/;  // starts with 0, followed by 9 digits
    return phoneRegex.test(phone.replace(/\s/g, '')); // remove spaces first
}


/*ENQUIRY FORM*/

// Responses shown after a successful enquiry submission
// Each key matches the value of the enquiry type dropdown
var enquiryResponses = {
    joining: {
        title: '&#128664; Joining a Congregation',
        body: 'Thank you for your interest in joining a Zionist congregation! ' +
              'A representative will contact you within 3–5 business days to ' +
              'discuss the nearest congregation to you, service times, and what ' +
              'to expect on your first visit. You are welcome to also visit our ' +
              'Directory page to find a church near you.'
    },
    volunteering: {
        title: '&#9996; Volunteering at a Church Event',
        body: 'Thank you for offering to volunteer! Zionist church events rely ' +
              'on the generosity of community members like yourself. We will ' +
              'contact you within 3–5 business days with upcoming event dates, ' +
              'volunteer roles available, and what you will need to bring. ' +
              'We look forward to welcoming you.'
    },
    sponsoring: {
        title: '&#127775; Sponsoring a Church Programme',
        body: 'Thank you for your generous interest in sponsoring a church programme! ' +
              'Sponsorship opportunities range from R500 for community outreach events ' +
              'to larger contributions for annual festivals. A member of our team will ' +
              'contact you within 3–5 business days to discuss available programmes, ' +
              'costs, and sponsorship packages.'
    },
    visiting: {
        title: '&#128205; Visiting Moria or Other Sites',
        body: 'Thank you for your interest in visiting our sacred sites! ' +
              'Moria in Limpopo is open to visitors year-round, with the largest ' +
              'gatherings during Easter and September festivals. Entry is free. ' +
              'We recommend planning your visit at least 2 weeks in advance. ' +
              'A representative will contact you with directions, accommodation ' +
              'options, and what to bring.'
    }
};

document.addEventListener('DOMContentLoaded', function () {

    var enquiryForm = document.getElementById('enquiry-form');

    if (enquiryForm) {

        enquiryForm.addEventListener('submit', function (event) {

            // Prevent the default form submission (page reload)
            event.preventDefault();

            // Clear all previous errors
            ['enq-name', 'enq-email', 'enq-phone', 'enq-type'].forEach(clearError);

            // Get field values
            var name   = document.getElementById('enq-name').value.trim();
            var email  = document.getElementById('enq-email').value.trim();
            var phone  = document.getElementById('enq-phone').value.trim();
            var type   = document.getElementById('enq-type').value;

            var isValid = true;

            // Validate name
            if (name.length < 2) {
                showError('enq-name', 'Please enter your full name (at least 2 characters).');
                isValid = false;
            }

            // Validate email
            if (!isValidEmail(email)) {
                showError('enq-email', 'Please enter a valid email address (e.g. name@email.com).');
                isValid = false;
            }

            // Validate phone
            if (!isValidPhone(phone)) {
                showError('enq-phone', 'Please enter a valid 10-digit South African phone number (e.g. 0821234567).');
                isValid = false;
            }

            // Validate enquiry type
            if (type === '') {
                showError('enq-type', 'Please select an enquiry type.');
                isValid = false;
            }

            // If validation passed — show the relevant response
            if (isValid) {
                var response = enquiryResponses[type];

                document.getElementById('response-title').innerHTML = response.title;
                document.getElementById('response-body').textContent = response.body;

                // Hide the form, show the response panel
                enquiryForm.style.display = 'none';
                document.getElementById('enquiry-response').style.display = 'block';
            }
        });
    }

});

// Reset enquiry form — called by the "Submit another enquiry" button
function resetEnquiryForm() {
    document.getElementById('enquiry-form').reset();
    document.getElementById('enquiry-form').style.display = 'block';
    document.getElementById('enquiry-response').style.display = 'none';
    ['enq-name', 'enq-email', 'enq-phone', 'enq-type'].forEach(clearError);
}


/* CONTACT / MESSAGE FORM*/

document.addEventListener('DOMContentLoaded', function () {

    var contactForm = document.getElementById('contact-form');
    var messageField = document.getElementById('con-message');
    var charCount    = document.getElementById('con-char-count');

    // Live character counter for the message textarea
    if (messageField && charCount) {
        messageField.addEventListener('input', function () {
            var count = messageField.value.length;
            charCount.textContent = count + ' / 500 characters';
            // Turn red if over limit
            charCount.style.color = count > 500 ? '#e74c3c' : '#9FE1CB';
        });
    }

    if (contactForm) {

        contactForm.addEventListener('submit', function (event) {

            event.preventDefault();

            // Clear previous errors
            ['con-name', 'con-email', 'con-subject', 'con-message'].forEach(clearError);

            // Get field values
            var name    = document.getElementById('con-name').value.trim();
            var email   = document.getElementById('con-email').value.trim();
            var subject = document.getElementById('con-subject').value;
            var message = document.getElementById('con-message').value.trim();

            var isValid = true;

            // Validate name
            if (name.length < 2) {
                showError('con-name', 'Please enter your full name (at least 2 characters).');
                isValid = false;
            }

            // Validate email
            if (!isValidEmail(email)) {
                showError('con-email', 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate subject
            if (subject === '') {
                showError('con-subject', 'Please select a subject.');
                isValid = false;
            }

            // Validate message
            if (message.length < 10) {
                showError('con-message', 'Please enter a message of at least 10 characters.');
                isValid = false;
            } else if (message.length > 500) {
                showError('con-message', 'Your message exceeds 500 characters. Please shorten it.');
                isValid = false;
            }

            if (isValid) {

                /*
                 * Build a mailto: link with the form data pre-filled.
                 * encodeURIComponent() converts special characters
                 * (spaces, newlines, etc.) to URL-safe format.
                 *
                 * Format: mailto:recipient?subject=...&body=...
                 */
                var recipient = 'zionchurches@icloud.com';
                var emailSubject = encodeURIComponent('[' + subject + '] from ' + name);
                var emailBody = encodeURIComponent(
                    'Name: ' + name + '\n' +
                    'Email: ' + email + '\n' +
                    'Subject: ' + subject + '\n\n' +
                    'Message:\n' + message
                );

                var mailtoLink = 'mailto:' + recipient +
                                 '?subject=' + emailSubject +
                                 '&body=' + emailBody;

                // Update the manual link in the response panel
                document.getElementById('mailto-link').href = mailtoLink;

                // Open the email client automatically
                window.location.href = mailtoLink;

                // Hide form, show success message
                contactForm.style.display = 'none';
                document.getElementById('contact-response').style.display = 'block';
            }
        });
    }

});

// Reset contact form — called by the "Write another message" button
function resetContactForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('contact-response').style.display = 'none';
    document.getElementById('con-char-count').textContent = '0 / 500 characters';
    ['con-name', 'con-email', 'con-subject', 'con-message'].forEach(clearError);
}
