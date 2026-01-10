// Check if user is on iPad
function isIPad() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /ipad/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Hide download buttons if not on iPad
if (!isIPad()) {
    // Hide the download button
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        downloadButton.style.display = 'none';
    }

    // Hide the CTA button in hero section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.style.display = 'none';
    }
}

// Dynamic navbar on scroll
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Download button click handler
const downloadButton = document.querySelector('.download-button');
if (downloadButton) {
    downloadButton.addEventListener('click', function() {
        // Open the shortcut download link in a new window
        window.open('https://www.icloud.com/shortcuts/8d910cbb6cab44c393db1d5ed59cf6d5', '_blank');

        // Show installation instructions after a brief delay
        setTimeout(() => {
            alert('After installing AbelToolsUPDCheck:\n\n1. Open the Shortcuts app on your iPad\n2. Find "AbelToolsUPDCheck" in your shortcuts\n3. Tap it to find the newest version\n4. Follow the on-screen instructions\n\nEnjoy your new shortcuts!');
        }, 1000);
    });
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// CTA button interaction (hero section)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        // Smooth scroll to download section
        document.querySelector('#download').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Feature cards tilt effect
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and sections
document.querySelectorAll('.feature-card, .interactive-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for floating cards
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const cards = document.querySelectorAll('.floating-card');

    cards.forEach((card, index) => {
        const speed = (index + 1) * 0.1;
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

console.log('🚀 Interactive Web App loaded successfully!');
