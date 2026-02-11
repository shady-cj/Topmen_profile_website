// update copyright year dynamically

document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('copyright-year-placeholder');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});


// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .activity-card, .feature-item, .mission-card');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
};

// Initial check
revealOnScroll();

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', data);
    const encodedMessage = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\nMessage: ${data.message}`);
    
    const mailto = `mailto:olatoyetemitope3182@gmail.com?subject=Website%20Contact&body=${encodedMessage}`;

    // window.open(mailto, '_blank');
    window.location.href = mailto;
    
        
    // Reset form
    contactForm.reset();
    
    // Show success message 
    contactForm.querySelector('button[type="submit"]').textContent = 'Thank you! We\'ll get back to you soon.';

    setTimeout(() => {
        contactForm.querySelector('button[type="submit"]').textContent = 'Send Message';
    }, 5000);
 
});

// Counter animation for statistics (if you want to add stats later)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        if (parallax && scrolled < window.innerHeight) {
            parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
            parallax.style.opacity = 1 - (scrolled / 600);
        }
    });
}

// Add hover effect to cards
const cards = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .activity-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Image lazy loading


// const images = document.querySelectorAll('img[data-src]');

// const loadImage = (img) => {
//     console.log('Loading image:', img.dataset.src);
//    console.log('Loading image:', new URL(img.dataset.src, import.meta.url).href);
//   img.src = img.dataset.src;
//   img.removeAttribute('data-src');
// };
// const imageObserver = new IntersectionObserver((entries, observer) => {
//     console.log('Observing images for lazy loading...', entries);
//     entries.forEach(entry => {
//         console.log('Image entry:', entry);
//         if (entry.isIntersecting) {
//             const img = entry.target;
//             console.log('Loading image:', img);
//             loadImage(img);
//             observer.unobserve(img);
//         }
//     });
// },{
//   rootMargin: '0px 0px 100px 0px', // load a little before image enters viewport
//   threshold: 0.1 // trigger when 10% visible
// }
// );

// images.forEach(img => {
//     imageObserver.observe(img)
//     // Edge case: image already visible on load
//     if (img.getBoundingClientRect().top < window.innerHeight) {
//         loadImage(img);
//         imageObserver.unobserve(img);
//     }
// });

// Preload critical images
// window.addEventListener('load', () => {
//     const criticalImages = document.querySelectorAll('.hero img, .project-card:nth-child(-n+3) img');
//     criticalImages.forEach(img => {
//         if (img.dataset.src) {
//             img.src = img.dataset.src;
//         }
//     });
// });

// Add animation delay to grid items
const gridItems = document.querySelectorAll('.services-grid > *, .projects-grid > *, .testimonials-grid > *');
gridItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Back to top button (optional - you can add this to HTML if needed)
function createBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0ea5e9, #1e3a8a);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

createBackToTop();

// Performance optimization: Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
    activateNavLink();
}, 10));

