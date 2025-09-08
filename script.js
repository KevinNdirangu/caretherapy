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

    // --- CONTACT FORM SUBMISSION USING MAILTO + WHATSAPP ---
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

            // Open Gmail / default email client
            window.location.href = mailtoLink;

            // Optional: open WhatsApp link in a new tab
            // const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            // window.open(whatsappLink, '_blank');

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
                contactSection.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('name').focus();
            }
        });
    });
});
