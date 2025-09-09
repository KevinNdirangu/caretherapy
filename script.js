document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const THERAPIST_NAME = 'Connie Wawira';
    const CONTACT_EMAIL = 'conniemuriithi068@gmail.com';
    const WHATSAPP_NUMBER = '254741629462'; // include country code without '+'

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu on click
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- CONTACT FORM SUBMISSION USING MAILTO ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                showFormStatus('Please fill in all fields.', 'error');
                return;
            }

            // Construct mailto URL
            const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\n${message}`
            )}`;

            // Open default email client
            window.location.href = mailtoLink;

            showFormStatus('Your email client has opened. Please send your message from there.', 'success');
            contactForm.reset();
        });
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 6000);
    }

    // --- SEND VIA WHATSAPP ---
    const whatsappBtn = document.getElementById('sendWhatsApp'); // fixed ID to match HTML
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value || 'Anonymous';
            const email = document.getElementById('email').value || 'Not provided';
            const subject = document.getElementById('subject').value || 'No subject';
            const message = document.getElementById('message').value || 'No message';

            const whatsappMessage = `Hello ${THERAPIST_NAME},%0A%0A` +
                `You have a new inquiry via your website.%0A%0A` +
                `👤 Name: ${name}%0A` +
                `📧 Email: ${email}%0A` +
                `📝 Subject: ${subject}%0A` +
                `💬 Message: ${message}`;

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- SERVICE PACKAGE BUTTONS ---
    document.querySelectorAll('.choose-btn').forEach(button => {
        button.addEventListener('click', () => {
            const packageName = button.getAttribute('data-package');
            const subject = `Inquiry about the ${packageName} Package`;
            const message = `Hello ${THERAPIST_NAME},\n\nI am interested in learning more about the "${packageName} Package." Please let me know the next steps.\n\nThank you,`;

            // Prefill the contact form fields
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                document.getElementById('subject').value = subject;
                document.getElementById('message').value = message;

                // Auto scroll into view
                contactSection.scrollIntoView({ behavior: 'smooth' });

                // Focus on name input for better UX
                document.getElementById('name').focus();
            }
        });
    });
});
