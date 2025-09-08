document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const THERAPIST_NAME = 'Connie Wawira';
    const CONTACT_EMAIL = 'conniemuriithi068@gmail.com'; // Your receiving email
    const WHATSAPP_NUMBER = '254741629462';

    // --- EMAILJS CONFIGURATION ---
    // TO-DO: Replace these with your actual IDs from your EmailJS account
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    // Initialize EmailJS SDK
    (function() {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    })();

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

    // --- CONTACT FORM SUBMISSION WITH EMAILJS ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // Template parameters for EmailJS
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('FAILED...', error);
                    showFormStatus('Failed to send message. Please try again or use the contact links.', 'error');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
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
            
            // Redirect to the contact form and pre-fill the subject
            const contactSection = document.getElementById('contact');
            if(contactSection) {
                document.getElementById('subject').value = subject;
                document.getElementById('message').value = message;
                contactSection.scrollIntoView({ behavior: 'smooth' });
                document.getElementById('name').focus();
            }
        });
    });
});