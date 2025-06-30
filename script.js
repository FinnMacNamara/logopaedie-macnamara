// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Easter Eggs Collection 🎉
    
    // 1. Konami Code Easter Egg
    let konamiSequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiSequence.push(e.code);
        if (konamiSequence.length > konamiCode.length) {
            konamiSequence.shift();
        }
        
        if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
            triggerConfettiRain();
            showSecret('🎉 Du hast den Konami Code gefunden! Magische Sprache ist überall! 🎉');
            konamiSequence = [];
        }
    });

    // 2. Logo Click Counter Easter Egg
    let logoClickCount = 0;
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', function() {
        logoClickCount++;
        if (logoClickCount === 7) {
            logo.classList.add('dancing-logo');
            showSecret('🕺 Die Logopädin tanzt! Du hast das Geheimnis entdeckt! 💃');
            setTimeout(() => logo.classList.remove('dancing-logo'), 3000);
        } else if (logoClickCount === 3) {
            logo.classList.add('shake');
            setTimeout(() => logo.classList.remove('shake'), 500);
        }
    });

    // 3. Speech Bubbles on Hover
    function createSpeechBubble(element, messages) {
        element.addEventListener('mouseenter', function() {
            if (!element.querySelector('.speech-bubble')) {
                const bubble = document.createElement('div');
                bubble.className = 'speech-bubble';
                bubble.textContent = messages[Math.floor(Math.random() * messages.length)];
                element.style.position = 'relative';
                element.appendChild(bubble);
                
                setTimeout(() => {
                    if (bubble.parentNode) bubble.remove();
                }, 2000);
            }
        });
    }

    // Add speech bubbles to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const speechMessages = [
        '🗣️ Sprache ist Macht!',
        '💬 Kommunikation verbindet!',
        '🌟 Jede Stimme zählt!',
        '🎯 Präzision in der Sprache!',
        '❤️ Sprechen mit Herz!'
    ];
    
    serviceCards.forEach(card => {
        createSpeechBubble(card, speechMessages);
    });

    // 4. Mouse Trail Effect
    let mouseTrail = [];
    let isTrailActive = false;
    
    // Activate trail with secret key combination (Ctrl + M)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'm') {
            isTrailActive = !isTrailActive;
            showSecret(isTrailActive ? '✨ Magischer Mauszeiger aktiviert!' : '💫 Mauszeiger normalisiert!');
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isTrailActive) {
            createMouseTrail(e.clientX, e.clientY);
        }
    });

    function createMouseTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        setTimeout(() => trail.remove(), 1000);
    }

    // 5. Secret Color Themes
    let currentTheme = 'default';
    const themes = {
        rainbow: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
        ocean: ['#0077BE', '#00A8CC', '#0099CC', '#66D0E6', '#B3E5FC'],
        sunset: ['#FF6B6B', '#FF8E53', '#FF6B9D', '#C44569', '#F8B500']
    };

    // Secret theme switcher (Alt + T)
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key === 't') {
            cycleThroughThemes();
        }
    });

    function cycleThroughThemes() {
        const themeNames = Object.keys(themes);
        const currentIndex = themeNames.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % (themeNames.length + 1);
        
        if (nextIndex === themeNames.length) {
            currentTheme = 'default';
            resetTheme();
            showSecret('🎨 Zurück zum Standard-Theme!');
        } else {
            currentTheme = themeNames[nextIndex];
            applyTheme(themes[currentTheme]);
            showSecret(`🌈 ${currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}-Theme aktiviert!`);
        }
    }

    function applyTheme(colors) {
        const root = document.documentElement;
        colors.forEach((color, index) => {
            root.style.setProperty(`--theme-color-${index + 1}`, color);
        });
        document.body.classList.add('themed');
    }

    function resetTheme() {
        document.body.classList.remove('themed');
        const root = document.documentElement;
        for (let i = 1; i <= 5; i++) {
            root.style.removeProperty(`--theme-color-${i}`);
        }
    }

    // 6. Floating Hearts Animation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 5000);
    }

    // Trigger hearts on contact section scroll
    const contactSection = document.getElementById('contact');
    let heartsTriggered = false;
    
    const heartObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heartsTriggered) {
                heartsTriggered = true;
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => createFloatingHeart(), i * 300);
                }
                setTimeout(() => heartsTriggered = false, 10000);
            }
        });
    });
    
    heartObserver.observe(contactSection);

    // 7. Confetti Rain Function
    function triggerConfettiRain() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createConfetti(), i * 50);
        }
    }

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }

    function getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#FF8E53', '#FF6B9D'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 8. Secret Message Display
    function showSecret(message) {
        const existing = document.querySelector('.secret-message');
        if (existing) existing.remove();
        
        const secret = document.createElement('div');
        secret.className = 'secret-message';
        secret.textContent = message;
        document.body.appendChild(secret);
        
        setTimeout(() => secret.classList.add('show'), 100);
        setTimeout(() => {
            secret.classList.remove('show');
            setTimeout(() => secret.remove(), 500);
        }, 3000);
    }

    // 9. Phone Number Easter Egg
    const phoneLink = document.querySelector('a[href^="tel:"]');
    let phoneClickCount = 0;
    
    phoneLink.addEventListener('click', function(e) {
        phoneClickCount++;
        if (phoneClickCount === 3) {
            e.preventDefault();
            showSecret('📞 Psst... Du kannst auch eine E-Mail schreiben! 📧');
            phoneClickCount = 0;
        }
    });

    // 10. Timeline Item Surprise
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('dblclick', function() {
            item.classList.add('timeline-surprise');
            const surprises = [
                '🎓 Dublin war magisch!',
                '🏥 Krankenhaus-Abenteuer!',
                '👶 Familien-Pause!',
                '🇨🇭 Schweizer Präzision!',
                '🧠 Neurologie ist faszinierend!',
                '🎯 Spezialisierung zahlt sich aus!',
                '🏠 Hausbesuche sind das Beste!',
                '🌟 Ein neues Kapitel beginnt!'
            ];
            showSecret(surprises[index] || '✨ Jede Erfahrung prägt!');
            setTimeout(() => item.classList.remove('timeline-surprise'), 1000);
        });
    });

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
                    // Easter egg for language switching
                    if (Math.random() < 0.3) {
                        showSecret(lang === 'de' ? '🇩🇪 Willkommen zurück!' : '🇬🇧 Welcome!');
                    }
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