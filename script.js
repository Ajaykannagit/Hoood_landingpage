// Initialize Lucide Icons
lucide.createIcons();

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve after reveals if we want it to happen only once
            // revealObserver.unobserve(entry.target);
        } else {
            // Optional: remove class to reveal again on scroll up
            // entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-glass', 'h-16');
        navbar.classList.remove('h-20');
    } else {
        navbar.classList.remove('nav-glass', 'h-16');
        navbar.classList.add('h-20');
    }
});

// Smooth Parallax for Hero Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('#hero .max-w-6xl');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        const navLink = document.querySelector(`.md\\:flex a[href*=${sectionId}]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('text-brand-green');
            } else {
                navLink.classList.remove('text-brand-green');
            }
        }
    });
});
