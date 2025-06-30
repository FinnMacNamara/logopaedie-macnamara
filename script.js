// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    function initLanguageToggle() {
        const langButtons = document.querySelectorAll('.lang-btn');
        console.log('Language toggle initialized. Found buttons:', langButtons.length);
        let currentLang = 'de';
        
        function switchLanguage(lang) {
            // Update button states
            langButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.lang === lang) {
                    btn.classList.add('active');
                }
            });
            
            // Update all elements with data attributes
            const elements = document.querySelectorAll('[data-de][data-en]');
            elements.forEach(element => {
                if (lang === 'de') {
                    element.textContent = element.dataset.de;
                } else {
                    element.textContent = element.dataset.en;
                }
            });
            
            // Update HTML lang attribute
            document.documentElement.lang = lang;
            
            // Update page title
            const title = document.querySelector('title');
            if (lang === 'de') {
                title.textContent = 'Anika Mac Namara - Sprachtherapie für Erwachsene';
            } else {
                title.textContent = 'Anika Mac Namara - Speech Therapy for Adults';
            }
            
            currentLang = lang;
        }
        
        // Add click event listeners to language buttons
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.dataset.lang;
                if (lang !== currentLang) {
                    switchLanguage(lang);
                }
            });
        });
    }
    
    // Initialize language toggle
    initLanguageToggle();

    // Slideshow functionality
    function initSlideshow() {
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        
        function nextSlide() {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        }
        
        // Start slideshow - change slide every 5 seconds
        setInterval(nextSlide, 5000);
        
        // Ensure first slide is visible initially
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }
    }
    
    // Initialize slideshow
    initSlideshow();

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .timeline-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(51, 51, 51, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#333';
            header.style.backdropFilter = 'none';
        }
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Handle image load
        img.addEventListener('load', function() {
            console.log('Image loaded:', this.src);
        });
        
        // Handle image error
        img.addEventListener('error', function() {
            console.error('Image failed to load:', this.src);
        });
        
        // Force load check for already loaded images
        if (img.complete) {
            console.log('Image already loaded:', img.src);
        }
    });
});

// Add some CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .mobile-menu-button {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(51, 51, 51, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-menu li {
            margin: 0.5rem 0;
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style); 