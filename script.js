// Smooth scroll animation on scroll-in
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.service-card, .feature-item, .before-after-container, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Before/After Slider Functionality
document.querySelectorAll('.before-after-wrapper').forEach(wrapper => {
    const container = wrapper.querySelector('.after-image-container');
    const handle = wrapper.querySelector('.slider-handle');
    const afterImage = wrapper.querySelector('.after-image');
    let isDragging = false;

    // Move slider based on an x-position (clientX)
    function setPositionFromClientX(clientX) {
        const rect = wrapper.getBoundingClientRect();
        const rawX = clientX - rect.left;
        const clampedX = Math.max(0, Math.min(rect.width, rawX));
        let percentage = (clampedX / rect.width) * 100;

        // Keep within a comfortable range so it never snaps to 0 or 100
        percentage = Math.max(8, Math.min(92, percentage));

        container.style.width = percentage + '%';
        handle.style.left = percentage + '%';
        
        // Adjust after-image width proportionally to prevent zooming
        // When container is X% wide, image should be (100/X)*100% wide
        const imageWidth = (100 / percentage) * 100;
        afterImage.style.width = imageWidth + '%';
    }

    // Mouse events
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        wrapper.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        setPositionFromClientX(e.clientX);
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        setPositionFromClientX(touch.clientX);
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Click on wrapper to move slider smoothly
    wrapper.addEventListener('click', (e) => {
        if (e.target === handle || e.target.closest('.slider-handle')) return;
        setPositionFromClientX(e.clientX);
    });
});

// Form submission handler using Formspree
// IMPORTANT: Replace 'YOUR_FORMSPREE_ENDPOINT' with your actual Formspree form endpoint
// Get it from https://formspree.io/ after creating a form
// See EMAIL_SETUP.md for detailed instructions
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formMessage = document.getElementById('form-message');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    formMessage.style.display = 'none';
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
        _replyto: document.getElementById('email').value, // For reply-to functionality
        _subject: 'New Contact Form Submission from ' + document.getElementById('name').value
    };

    // Send email using Formspree
    // Replace 'YOUR_FORMSPREE_ENDPOINT' with your Formspree form URL
    // Example: 'https://formspree.io/f/YOUR_FORM_ID'
    fetch('https://formspree.io/f/mykkeqaz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(function(response) {
        if (response.ok) {
            // Success
            formMessage.style.display = 'block';
            formMessage.style.color = '#4CAF50';
            formMessage.style.fontWeight = '600';
            formMessage.textContent = '✓ Thank you! Your message has been sent. We will contact you within 24 hours.';
            
            // Reset form
            document.getElementById('contactForm').reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(function(error) {
        // Error
        formMessage.style.display = 'block';
        formMessage.style.color = '#f44336';
        formMessage.style.fontWeight = '600';
        formMessage.textContent = '✗ Sorry, there was an error sending your message. Please try again or call us directly at (480) 213-2445.';
        
        console.error('Formspree Error:', error);
    })
    .finally(function() {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    });
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', function() {
        const isOpen = nav.classList.toggle('nav-open');
        mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove('nav-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('nav-open')) {
            nav.classList.remove('nav-open');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});


// ===============================
// Photo Gallery Auto Slider
// ===============================

const galleryImages = [
    'Images/gallerypic10.png',
    'Images/gallerypic11.png',
    'Images/gallerypic9.png',
    'Images/gallerypic8.png',
    'Images/gallerypic7.png',
    'Images/gallerypic6.png',
    'Images/gallerypic12.png',
    'Images/gallerypic3.png',
    'Images/gallerypic4.png',
    'Images/gallerypic1.png',
    'Images/gallerypic2.png',
    'Images/gallerypic3.png',
    'Images/gallerypic5.png',
    'Images/gallerypic13.png'
];

let currentGalleryIndex = 0;
const galleryImgElement = document.getElementById('gallery-slide-image');
const galleryLeftBtn = document.querySelector('.gallery-nav.left');
const galleryRightBtn = document.querySelector('.gallery-nav.right');

function showGalleryImage(index) {
    galleryImgElement.style.opacity = 0;

    setTimeout(() => {
        galleryImgElement.src = galleryImages[index];
        galleryImgElement.style.opacity = 1;
    }, 200);
}

function nextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    showGalleryImage(currentGalleryIndex);
}

function prevGalleryImage() {
    currentGalleryIndex =
        (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    showGalleryImage(currentGalleryIndex);
}

if (galleryLeftBtn && galleryRightBtn) {
    galleryLeftBtn.addEventListener('click', () => {
        prevGalleryImage();
        resetGalleryInterval();
    });

    galleryRightBtn.addEventListener('click', () => {
        nextGalleryImage();
        resetGalleryInterval();
    });
}

// Auto-cycle every 3.5 seconds
let galleryInterval = setInterval(nextGalleryImage, 3500);

function resetGalleryInterval() {
    clearInterval(galleryInterval);
    galleryInterval = setInterval(nextGalleryImage, 3500);
}
