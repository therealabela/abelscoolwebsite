// Check if user is on iPad
function isIPad() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /ipad/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// Replace download buttons with unsupported message if not on iPad
if (!isIPad()) {
    // Replace the download button with unsupported message
    const downloadButton = document.querySelector('.download-button');
    if (downloadButton) {
        const unsupportedText = document.createElement('p');
        unsupportedText.className = 'unsupported-message';
        unsupportedText.textContent = 'This device is not supported!';
        downloadButton.parentNode.replaceChild(unsupportedText, downloadButton);
    }

    // Replace the CTA button in hero section with unsupported message
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        const unsupportedText = document.createElement('p');
        unsupportedText.className = 'unsupported-message';
        unsupportedText.textContent = 'This device is not supported!';
        ctaButton.parentNode.replaceChild(unsupportedText, ctaButton);
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

// Smooth scroll progress indicator
const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
        z-index: 1000;
        transform-origin: left;
        transform: scaleX(0);
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight);
        indicator.style.transform = `scaleX(${scrolled})`;
    });
};

createScrollIndicator();

// Add cursor follower effect for buttons
const buttons = document.querySelectorAll('.cta-button, .download-button');
buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Enhanced card interaction
const allCards = document.querySelectorAll('.feature-card, .showcase-card');
allCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Scroll to top button functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach(card => {
    card.addEventListener('click', function() {
        const icon = this.querySelector('.card-icon').textContent.trim();
        const info = cardDescriptions[icon];

        if (info) {
            // Create modal overlay
            const modal = document.createElement('div');
            modal.className = 'card-modal';
            modal.innerHTML = `
                <div class="card-modal-content">
                    <button class="card-modal-close" aria-label="Close modal">&times;</button>
                    <div class="card-modal-icon">${icon}</div>
                    <h3 class="card-modal-title">${info.title}</h3>
                    <p class="card-modal-description">${info.description}</p>
                </div>
            `;

            document.body.appendChild(modal);

            // Trigger animation
            setTimeout(() => modal.classList.add('active'), 10);

            // Close handlers
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            };

            modal.querySelector('.card-modal-close').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });

            // Close on escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }
    });

    // Add pointer cursor
    card.style.cursor = 'pointer';
});

console.log('🚀 Interactive Web App loaded successfully!');
