// script.js
// Contact handling and interactivity logic

document.addEventListener('DOMContentLoaded', () => {
    const THERAPIST_NAME = 'Connie';
    const EMAIL = 'conniemuriithi068@gmail.com';
    const PHONE = '254787982266';
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
        });
    });

    // Email and Phone Click Handlers
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-type');
            if (type === 'email') {
                openEmailComposer(EMAIL, 'Contact from Website', `Hello ${THERAPIST_NAME}, I would like to get in touch.`);
            } else if (type === 'phone') {
                openWhatsApp(PHONE, `Hello ${THERAPIST_NAME}, I would like to message you.`);
            }
        });
        link.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Form Button Handlers
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    if (form) {
        const buttons = form.querySelectorAll('.submit-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const name = form.querySelector('#name').value.trim();
                const subject = form.querySelector('#subject').value.trim();
                const message = form.querySelector('#message').value.trim();

                if (name && subject && message) {
                    const action = button.getAttribute('data-action');
                    const body = `Name: ${name}\nSubject: ${subject}\nMessage: ${message}`;
                    const whatsappText = encodeURIComponent(`Hello ${THERAPIST_NAME}, I am ${name}. ${message} (Subject: ${subject})`);

                    try {
                        if (action === 'email') {
                            openEmailComposer(EMAIL, subject, body);
                        } else if (action === 'whatsapp') {
                            openWhatsApp(PHONE, whatsappText);
                        }
                        successMessage.textContent = `Message sent via ${action} successfully! We will get back to you soon.`;
                        successMessage.style.display = 'block';
                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 5000);
                        form.reset();
                    } catch (error) {
                        successMessage.textContent = `Failed to send via ${action}. Please try again or contact us directly.`;
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
            button.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }

    // Service Package Buttons
    const chooseButtons = document.querySelectorAll('.choose-btn');
    chooseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const packageName = button.getAttribute('data-package');
            const whatsappText = encodeURIComponent(`Hello ${THERAPIST_NAME}, I would like to book the ${packageName} Package. Please let me know the next steps.`);
            openWhatsApp(PHONE, whatsappText);
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
            setTimeout(() => win.location.href = mailtoUrl, 2000); // Fallback after 2s
        } else {
            window.location.href = mailtoUrl; // Fallback if popup blocked
        }
    }

    function openWhatsApp(phone, text) {
        const cleanPhone = phone.replace(/[^\d]/g, ''); // Remove non-numeric chars
        const whatsappUrl = `${WHATSAPP_BASE}${cleanPhone}?text=${text}`;
        const win = window.open(whatsappUrl, '_blank');
        if (!win) {
            alert('Popup blocked. Please allow popups or open WhatsApp manually.');
        }
    }
});