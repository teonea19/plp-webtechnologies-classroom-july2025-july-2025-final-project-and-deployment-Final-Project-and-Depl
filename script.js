// script.js
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
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

// Form Validation for Contact Page
function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Clear previous errors
        document.querySelectorAll('.error').forEach(error => error.remove());
        
        // Name validation
        if (name === '') {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        // Email validation
        if (email === '') {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation (optional but if provided, validate)
        if (phone && !isValidPhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Message validation
        if (message === '') {
            showError('message', 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = '#e74c3c';
    error.style.fontSize = '14px';
    error.style.marginTop = '5px';
    error.textContent = message;
    field.parentNode.appendChild(error);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

// Inventory Filter Functionality
function setupInventoryFilters() {
    const vehicleTypeFilter = document.getElementById('vehicleType');
    const priceRangeFilter = document.getElementById('priceRange');
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    
    if (!vehicleTypeFilter || !priceRangeFilter) return;
    
    function filterVehicles() {
        const selectedType = vehicleTypeFilter.value;
        const maxPrice = parseInt(priceRangeFilter.value);
        
        vehicleCards.forEach(card => {
            const vehicleType = card.getAttribute('data-type');
            const vehiclePrice = parseInt(card.getAttribute('data-price'));
            
            const typeMatch = selectedType === 'all' || vehicleType === selectedType;
            const priceMatch = vehiclePrice <= maxPrice;
            
            if (typeMatch && priceMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    vehicleTypeFilter.addEventListener('change', filterVehicles);
    priceRangeFilter.addEventListener('input', filterVehicles);
}

// Scroll Animation
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .vehicle-card, .service-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    validateForm();
    setupInventoryFilters();
    setupScrollAnimations();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Sticky Navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});


// Add these to your existing script.js

// Enhanced Inventory Filtering
function setupInventoryFilters() {
    const vehicleTypeFilter = document.getElementById('vehicleType');
    const priceRangeFilter = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const yearRangeFilter = document.getElementById('yearRange');
    const resetButton = document.getElementById('resetFilters');
    const vehicleCards = document.querySelectorAll('.vehicle-card');
    const inquireButtons = document.querySelectorAll('.inquire-btn');
    
    if (!vehicleTypeFilter) return;

    // Update price value display
    if (priceRangeFilter && priceValue) {
        priceRangeFilter.addEventListener('input', function() {
            priceValue.textContent = this.value;
            filterVehicles();
        });
    }

    // Filter vehicles function
    function filterVehicles() {
        const selectedType = vehicleTypeFilter.value;
        const maxPrice = parseInt(priceRangeFilter.value);
        const selectedYear = yearRangeFilter.value;
        
        vehicleCards.forEach(card => {
            const vehicleType = card.getAttribute('data-type');
            const vehiclePrice = parseInt(card.getAttribute('data-price'));
            const vehicleYear = card.getAttribute('data-year');
            
            const typeMatch = selectedType === 'all' || vehicleType === selectedType;
            const priceMatch = vehiclePrice <= maxPrice;
            const yearMatch = selectedYear === 'all' || 
                (selectedYear === '2023-2025' && vehicleYear >= 2023) ||
                (selectedYear === '2020-2022' && vehicleYear >= 2020 && vehicleYear <= 2022) ||
                (selectedYear === '2017-2019' && vehicleYear >= 2017 && vehicleYear <= 2019);
            
            if (typeMatch && priceMatch && yearMatch) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            } else {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    // Event listeners
    if (vehicleTypeFilter) vehicleTypeFilter.addEventListener('change', filterVehicles);
    if (yearRangeFilter) yearRangeFilter.addEventListener('change', filterVehicles);
    
    // Reset filters
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            vehicleTypeFilter.value = 'all';
            priceRangeFilter.value = '100000';
            priceValue.textContent = '100000';
            yearRangeFilter.value = 'all';
            filterVehicles();
        });
    }

    // Inquire button functionality
    inquireButtons.forEach(button => {
        button.addEventListener('click', function() {
            const vehicleCard = this.closest('.vehicle-card');
            const vehicleName = vehicleCard.querySelector('h3').textContent;
            const vehiclePrice = vehicleCard.querySelector('.price').textContent;
            
            // Redirect to contact page with pre-filled information
            window.location.href = `contact.html?vehicle=${encodeURIComponent(vehicleName)}&price=${encodeURIComponent(vehiclePrice)}`;
        });
    });
}

// Enhanced Scroll Animations
function setupScrollAnimations() {
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

    // Observe elements for animation
    document.querySelectorAll('.service-card, .vehicle-card, .value-card, .step').forEach(el => {
        observer.observe(el);
    });
}

// Pre-fill contact form if coming from inventory
function prefillContactForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicle = urlParams.get('vehicle');
    const price = urlParams.get('price');
    
    if (vehicle && price) {
        const messageField = document.getElementById('message');
        if (messageField) {
            messageField.value = `I'm interested in the ${vehicle} (${price}). Please contact me with more information.`;
        }
    }
}

// Update the DOMContentLoaded function
document.addEventListener('DOMContentLoaded', function() {
    validateForm();
    setupInventoryFilters();
    setupScrollAnimations();
    prefillContactForm();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});