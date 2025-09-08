// script.js
// Contact handling and interactivity logic

document.addEventListener('DOMContentLoaded', () => {
    const THERAPIST_NAME = 'Connie Wawira';
    const EMAIL = 'conniemuriithi068@gmail.com';
    const PHONE = '254741629462';
    const WHATSAPP_BASE = 'https://wa.me/';
    const GMAIL_URL = 'https://mail.google.com/mail/?view=cm&to=';

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Contact Form Submission
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const subject = form.querySelector('#subject').value.trim();
            const message = form.querySelector('#message').value.trim();

            if (name && email && subject && message) {
                const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
                const whatsappText = encodeURIComponent(`Hello ${THERAPIST_NAME}, I am ${name} (${email}). ${message} (Subject: ${subject})`);

                try {
                    openEmailComposer(EMAIL, subject, body);
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                        form.reset();
                    }, 5000);
                } catch (error) {
                    successMessage.textContent = 'Failed to send. Please try again or use the contact links above.';
                    successMessage.style.display = 'block';
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            } else {
                successMessage.textContent = 'Please fill in all fields.';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
    }

    // Service Package Buttons
    const chooseButtons = document.querySelectorAll('.choose-btn');
    chooseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageName = button.getAttribute('data-package');
            const baseMessage = `Hello ${THERAPIST_NAME}, I would like to book the ${packageName} Package. Please let me know the next steps.`;
            if (confirm('Would you like to contact via Email or WhatsApp? (OK for Email, Cancel for WhatsApp)')) {
                openEmailComposer(EMAIL, `Booking: ${packageName} Package`, baseMessage);
            } else {
                openWhatsApp(PHONE, encodeURIComponent(baseMessage));
            }
        });
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Ripple Effect
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = button.querySelector('::after');
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = '200px';
            ripple.style.height = '200px';
            setTimeout(() => {
                ripple.style.width = '0';
                ripple.style.height = '0';
            }, 400);
        });
    });

    // Utility Functions
    function openEmailComposer(to, subject, body) {
        const gmailUrl = `${GMAIL_URL}${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const win = window.open(gmailUrl, '_blank');
        if (win) {
            setTimeout(() => win.location.href = mailtoUrl, 2000);
        } else {
            window.location.href = mailtoUrl;
        }
    }

    function openWhatsApp(phone, text) {
        const cleanPhone = phone.replace(/[^\d]/g, '');
        const whatsappUrl = `${WHATSAPP_BASE}${cleanPhone}?text=${text}`;
        const win = window.open(whatsappUrl, '_blank');
        if (!win) {
            alert('Popup blocked. Please allow popups or open WhatsApp manually.');
        }
    }
});