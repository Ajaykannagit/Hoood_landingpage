// Initialize Lucide Icons
lucide.createIcons();

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
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

// Parallax Effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Aurora Blobs Parallax
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');
    if (blob1) blob1.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
    if (blob2) blob2.style.transform = `translate(-${scrolled * 0.05}px, -${scrolled * 0.05}px)`;

    // Hero Content Parallax
    const heroContent = document.querySelector('#hero .max-w-6xl');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
    }
});

// Interactive 3D Tilt Effect for Cards
document.querySelectorAll('.futuristic-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(`.md\\:flex a[href*=${sectionId}]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('text-brand-green', 'scale-110');
                navLink.classList.remove('text-gray-400');
            } else {
                navLink.classList.remove('text-brand-green', 'scale-110');
                navLink.classList.add('text-gray-400');
            }
        }
    });
});
