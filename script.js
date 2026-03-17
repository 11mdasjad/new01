document.addEventListener('DOMContentLoaded', () => {
    /* --- Navigation Setup --- */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* --- Scroll Reveal Animations --- */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --- Lightbox Functionality --- */
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementsByClassName("lightbox-close")[0];
    const triggers = document.querySelectorAll(".lightbox-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            modal.style.display = "flex";
            modal.style.justifyContent = "center";
            modal.style.alignItems = "center";
            modalImg.src = this.getAttribute('data-src');
        });
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    modal.onclick = function(e) {
        if (e.target !== modalImg) {
            modal.style.display = "none";
        }
    }

    /* --- WhatsApp Form Submission --- */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const mobile = document.getElementById('mobile').value;
            const eventType = document.getElementById('eventType').value;
            const eventDate = document.getElementById('eventDate').value;
            const message = document.getElementById('message').value;
            
            // Format WhatsApp Message
            const whatsappText = `Hello Roushni Makeup Studio,

I want to book a makeup appointment.

*Name:* ${name}
*Mobile:* ${mobile}
*Event Type:* ${eventType}
*Date:* ${eventDate}
*Message:* ${message}`;
            
            // Send to WhatsApp
            const whatsappUrl = `https://wa.me/919661000030?text=${encodeURIComponent(whatsappText)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
        });
    }

    /* --- Smooth Scrolling Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                
                // Keep active state updated manually when clicking
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
