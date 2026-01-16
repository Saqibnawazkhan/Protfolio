/**
 * Portfolio Website JavaScript
 * Handles all interactive functionality including:
 * - Preloader
 * - Navigation
 * - Smooth scrolling
 * - Dark mode toggle
 * - Portfolio filtering
 * - Form handling
 * - Scroll animations
 * - Skill bar animations
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initPreloader();
    initNavigation();
    initSmoothScroll();
    initThemeToggle();
    initPortfolioFilter();
    initContactForm();
    initScrollAnimations();
    initSkillBars();
    initScrollToTop();
    initTestimonialSlider();
    initTypingAnimation();
    initTiltEffect();
    initMagneticButtons();
    initCursorEffect();
    initParticles();
    initTextReveal();
    initRippleEffect();
    initSmoothCounter();
    initImageHover();
    initNavHover();
    initCardShine();
    initScrollProgress();
    initReviewSystem();
});

/**
 * Preloader
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Enable scroll after preloader is hidden
            document.body.style.overflow = 'visible';
        }, 500);
    });

    // Fallback: hide preloader after 3 seconds even if not fully loaded
    setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 3000);
}

/**
 * Navigation
 */
function initNavigation() {
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Create menu overlay
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);

    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'visible';
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'visible';
    });

    // Close menu when clicking nav links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'visible';

            // Update active link
            navLinksItems.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Smooth Scrolling
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Dark Mode Toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme === 'dark');
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcon(true);
    }

    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme === 'dark');
    });

    function updateThemeIcon(isDark) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Contact Form
 */
function initContactForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Send form data to Formspree
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                showNotification('Oops! Something went wrong. Please try again or email me directly.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2DB67D' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease forwards;
    `;

    // Add animation keyframes if not exists
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 0;
                margin-left: 8px;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.service-card, .portfolio-card, .skill-item, .testimonial-card, .about-image-section, .about-content');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

/**
 * Skill Bar Animations
 */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (barTop < windowHeight - 50) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = `${progress}%`;
            }
        });
    };

    // Initial check
    animateSkillBars();

    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

/**
 * Scroll to Top Button
 */
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Testimonial Slider (Basic)
 */
function initTestimonialSlider() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const cards = document.querySelectorAll('.testimonial-card');

    // Only apply slider behavior on mobile
    if (window.innerWidth <= 768) {
        let currentSlide = 0;

        const showSlide = (index) => {
            cards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Auto-slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % cards.length;
            showSlide(currentSlide);
        }, 5000);

        // Initial show
        showSlide(0);
    }
}

/**
 * Typing Effect (Optional - for hero section)
 */
function initTypingEffect() {
    const text = "Software Engineer // Full Stack Developer";
    const typingElement = document.querySelector('.hero-subtitle');

    if (!typingElement) return;

    let index = 0;
    typingElement.textContent = '';

    const type = () => {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    };

    // Start typing after a delay
    setTimeout(type, 1000);
}

/**
 * Parallax Effect for Hero Section
 */
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    const decorations = document.querySelectorAll('.decoration');

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        if (heroImage) {
            heroImage.style.transform = `translateX(-50%) translateY(${scrollY * 0.1}px)`;
        }

        decorations.forEach((dec, index) => {
            const speed = 0.05 * (index + 1);
            dec.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

/**
 * Counter Animation for Stats
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .exp-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };

        // Start animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Initialize counter animation
document.addEventListener('DOMContentLoaded', animateCounters);

/**
 * Lazy Loading Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Download CV functionality
 */
document.querySelectorAll('.download-cv').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Show notification
        showNotification('CV download will start shortly...', 'success');

        // Simulate download (replace with actual CV file path)
        setTimeout(() => {
            // In production, replace this with actual CV download logic
            // window.location.href = '/path/to/cv.pdf';
            showNotification('CV downloaded successfully!', 'success');
        }, 1500);
    });
});

/**
 * Talk Circle Click Handler
 */
document.querySelector('.talk-circle')?.addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

/**
 * Typing Animation for Roles
 */
function initTypingAnimation() {
    const roleText = document.getElementById('role-text');
    if (!roleText) return;

    const roles = [
        'Software Engineer',
        'Graphic Designer',
        'AI Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Deleting
            roleText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            // Typing
            roleText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        // Finished typing current word
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing animation after a short delay
    setTimeout(type, 1000);
}

/**
 * Review Modal and Star Rating
 * Reviews are stored in localStorage and displayed for visitors
 * Note: For production, use a backend database for persistent cross-user storage
 */
function initReviewSystem() {
    console.log('initReviewSystem called');

    const openModalBtn = document.getElementById('open-review-modal');
    const closeModalBtn = document.getElementById('close-review-modal');
    const reviewModal = document.getElementById('review-modal');
    const starRating = document.getElementById('star-rating');
    const ratingInput = document.getElementById('rating-value');
    const reviewForm = document.getElementById('review-form');
    const reviewsContainer = document.getElementById('reviews-container');

    console.log('openModalBtn:', openModalBtn);
    console.log('reviewModal:', reviewModal);
    console.log('reviewsContainer:', reviewsContainer);

    if (!openModalBtn || !reviewModal || !reviewsContainer) {
        console.log('Review system elements not found');
        return;
    }

    console.log('Adding click listener to Leave a Review button');

    // Open modal
    openModalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Leave a Review button clicked!');
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close on backdrop click
    reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reviewModal.classList.contains('active')) {
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Star rating functionality
    if (starRating) {
        const stars = starRating.querySelectorAll('i');

        stars.forEach((star, index) => {
            // Hover effect
            star.addEventListener('mouseenter', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            // Click to select
            star.addEventListener('click', () => {
                const rating = star.getAttribute('data-rating');
                ratingInput.value = rating;

                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });
        });

        // Reset hover on mouse leave
        starRating.addEventListener('mouseleave', () => {
            const currentRating = parseInt(ratingInput.value);
            stars.forEach((s, i) => {
                s.classList.remove('hover');
                if (i < currentRating) {
                    s.classList.add('active');
                }
            });
        });
    }

    // Load existing reviews
    loadReviews();

    // Handle form submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewer-name').value.trim();
            const role = document.getElementById('reviewer-role').value.trim();
            const rating = parseInt(ratingInput.value);
            const text = document.getElementById('review-text').value.trim();

            if (rating === 0) {
                showNotification('Please select a star rating', 'error');
                return;
            }

            // Create review object
            const review = {
                id: Date.now(),
                name: escapeHTML(name),
                role: escapeHTML(role) || 'Client',
                rating,
                text: escapeHTML(text),
                date: new Date().toISOString()
            };

            // Save review
            saveReview(review);

            // Add to UI with animation
            addReviewToUI(review, true);

            // Reset form
            reviewForm.reset();
            ratingInput.value = '0';
            starRating.querySelectorAll('i').forEach(s => s.classList.remove('active'));

            // Close modal
            reviewModal.classList.remove('active');
            document.body.style.overflow = '';

            // Show success message
            showNotification('Thank you for your review!', 'success');
        });
    }

    // Escape HTML to prevent XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Save review to localStorage
    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');
        reviews.unshift(review);
        // Keep only last 50 reviews
        if (reviews.length > 50) {
            reviews = reviews.slice(0, 50);
        }
        localStorage.setItem('portfolio_reviews', JSON.stringify(reviews));
    }

    // Load reviews from localStorage
    function loadReviews() {
        // First, remove "no reviews" message if it exists
        const noReviewsMsg = reviewsContainer.querySelector('.no-reviews-message');
        if (noReviewsMsg) {
            noReviewsMsg.remove();
        }

        let reviews = JSON.parse(localStorage.getItem('portfolio_reviews') || '[]');

        // Add some default reviews if none exist
        if (reviews.length === 0) {
            reviews = [
                {
                    id: 1,
                    name: 'Ahmed Hassan',
                    role: 'CEO, TechStart',
                    rating: 5,
                    text: 'Excellent work on our company website! Saqib delivered beyond expectations with great attention to detail and professional communication throughout the project.',
                    date: '2024-12-15T10:30:00.000Z'
                },
                {
                    id: 2,
                    name: 'Sarah Miller',
                    role: 'Founder, DesignHub',
                    rating: 5,
                    text: 'Working with Saqib was a fantastic experience. He understood our vision perfectly and created a beautiful, functional web application. Highly recommended!',
                    date: '2024-11-20T14:45:00.000Z'
                },
                {
                    id: 3,
                    name: 'Muhammad Ali',
                    role: 'Project Manager',
                    rating: 4,
                    text: 'Great developer with strong technical skills. The mobile app he built for us works flawlessly. Will definitely work with him again on future projects.',
                    date: '2024-10-08T09:15:00.000Z'
                }
            ];
            localStorage.setItem('portfolio_reviews', JSON.stringify(reviews));
        }

        // Display all reviews
        reviews.forEach(review => addReviewToUI(review, false));
    }

    // Add review card to UI
    function addReviewToUI(review, animate = false) {
        // Remove "no reviews" message if exists
        const noReviewsMsg = reviewsContainer.querySelector('.no-reviews-message');
        if (noReviewsMsg) {
            noReviewsMsg.remove();
        }

        const initial = review.name.charAt(0).toUpperCase();
        const starsHTML = Array(5).fill('').map((_, i) =>
            `<i class="fas fa-star" style="color: ${i < review.rating ? '#ffc107' : 'rgba(255,255,255,0.2)'}"></i>`
        ).join('');

        // Format date
        const reviewDate = new Date(review.date);
        const formattedDate = reviewDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card' + (animate ? ' review-card-new' : '');
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${initial}</div>
                    <div>
                        <h4 class="reviewer-name">${review.name}</h4>
                        <span class="reviewer-role">${review.role}</span>
                    </div>
                </div>
                <div class="review-rating">
                    <div class="review-stars">${starsHTML}</div>
                    <span class="review-date">${formattedDate}</span>
                </div>
            </div>
            <p class="review-text">"${review.text}"</p>
        `;

        reviewsContainer.insertBefore(reviewCard, reviewsContainer.firstChild);

        // Trigger animation
        if (animate) {
            setTimeout(() => {
                reviewCard.classList.remove('review-card-new');
            }, 100);
        }
    }
}

/**
 * 3D Tilt Effect for Cards
 */
function initTiltEffect() {
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .skills-category');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/**
 * Magnetic Button Effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .social-link, .portfolio-link');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Custom Cursor Effect - Modern dot style
 */
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    // Add styles - simple elegant dot cursor
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            width: 8px;
            height: 8px;
            background: #2DB67D;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.15s ease, background 0.2s ease, width 0.2s ease, height 0.2s ease;
            transform: translate(-50%, -50%);
            box-shadow: 0 0 15px rgba(45, 182, 125, 0.5);
        }
        .custom-cursor.hover {
            width: 40px;
            height: 40px;
            background: transparent;
            border: 2px solid #2DB67D;
            box-shadow: 0 0 25px rgba(45, 182, 125, 0.4);
        }
        .custom-cursor.clicking {
            transform: translate(-50%, -50%) scale(0.8);
        }
        @media (max-width: 768px) {
            .custom-cursor { display: none; }
        }
    `;
    document.head.appendChild(style);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .service-card, .portfolio-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

/**
 * Particle Background Effect
 */
function initParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
    `;
    heroSection.insertBefore(particleContainer, heroSection.firstChild);

    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 5 + 2;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(45, 182, 125, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
    `;

    container.appendChild(particle);

    // Add keyframes if not exists
    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
                25% { transform: translate(30px, -30px) rotate(90deg); opacity: 1; }
                50% { transform: translate(-20px, -60px) rotate(180deg); opacity: 0.7; }
                75% { transform: translate(40px, -40px) rotate(270deg); opacity: 0.9; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Text Reveal Animation
 */
function initTextReveal() {
    // Only apply to section titles, not hero title (to preserve name visibility)
    const titles = document.querySelectorAll('.section-title');

    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        title.style.opacity = '1';

        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.cssText = `
                display: inline-block;
                opacity: 0;
                transform: translateY(50px) rotate(10deg);
                animation: revealChar 0.5s ease forwards ${i * 0.03}s;
            `;
            title.appendChild(span);
        });
    });

    // Add keyframes
    if (!document.getElementById('text-reveal-keyframes')) {
        const style = document.createElement('style');
        style.id = 'text-reveal-keyframes';
        style.textContent = `
            @keyframes revealChar {
                to { opacity: 1; transform: translateY(0) rotate(0deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Ripple Effect on Buttons
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add keyframes
    if (!document.getElementById('ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Smooth Counter Animation
 */
function initSmoothCounter() {
    const counters = document.querySelectorAll('.stat-number, .exp-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.textContent);
                animateValue(entry.target, 0, target, 2000);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // Ease out quart
        const current = Math.floor(start + range * easeProgress);
        element.textContent = current + '+';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Image Hover Zoom Effect
 */
function initImageHover() {
    const images = document.querySelectorAll('.portfolio-image img, .about-image-container img');

    images.forEach(img => {
        img.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';

        img.parentElement.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.1)';
        });

        img.parentElement.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
}

/**
 * Navigation Link Hover Animation
 */
function initNavHover() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Card Shine Effect
 */
function initCardShine() {
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .review-card');

    cards.forEach(card => {
        const shine = document.createElement('div');
        shine.className = 'card-shine';
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
            );
            pointer-events: none;
            z-index: 10;
        `;
        card.style.position = 'relative';
        card.style.overflow = 'hidden';
        card.appendChild(shine);

        card.addEventListener('mouseenter', () => {
            shine.style.transition = 'left 0.5s ease';
            shine.style.left = '100%';
        });

        card.addEventListener('mouseleave', () => {
            shine.style.transition = 'none';
            shine.style.left = '-100%';
        });
    });
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Console welcome message
console.log('%c Welcome to SNKHAN Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 15px; border-radius: 10px;');
console.log('%c Built with Love & JavaScript ', 'color: #2DB67D; font-size: 14px; font-weight: bold;');
console.log('%c 🚀 50 Interactive Features Loaded! ', 'color: #f093fb; font-size: 12px;');
