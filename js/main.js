document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('siteHeader');
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookiesBtn = document.getElementById('acceptCookies');
    const mainContent = document.querySelector('.main-content');
    
    // Last scroll position for header hide/show
    let lastScrollTop = 0;
    
    // Check if cookie consent is already accepted
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.classList.remove('hidden');
        mainContent.classList.add('blur-content');
    }
    
    // Accept cookies
    acceptCookiesBtn.addEventListener('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.classList.add('hidden');
        mainContent.classList.remove('blur-content');
    });
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
    
    // Hide/show header on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down, hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up, show header
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.content-block, .card, .review');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Create star rating elements
    const createStarRating = (rating) => {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = i <= rating ? '★' : '☆';
            starsContainer.appendChild(star);
        }
        
        return starsContainer;
    };
    
    // Apply star ratings to elements with data-rating attribute
    document.querySelectorAll('[data-rating]').forEach(element => {
        const rating = parseFloat(element.getAttribute('data-rating'));
        const starsElement = createStarRating(rating);
        element.appendChild(starsElement);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
