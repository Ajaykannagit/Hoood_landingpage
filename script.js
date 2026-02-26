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
    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progress = document.getElementById("scroll-progress");
    if (progress) progress.style.width = scrolled + "%";

    if (window.scrollY > 50) {
        navbar.classList.add('nav-glass', 'h-16');
        navbar.classList.remove('h-20');
    } else {
        navbar.classList.remove('nav-glass', 'h-16');
        navbar.classList.add('h-20');
    }
});

// Custom Cursor Logic
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .futuristic-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Magnetic Elements Logic (Buttons & Nav Links)
document.querySelectorAll('.btn-premium, .md\\:flex a').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        if (window.matchMedia("(pointer: coarse)").matches) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        if (btn.tagName === 'A') btn.style.color = '#10b981';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate(0px, 0px)`;
        if (btn.tagName === 'A' && !btn.classList.contains('text-brand-green')) {
            btn.style.color = '';
        }
    });
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

// Terminal Typing Animation
const typingText = document.getElementById('typing-text');
const prompts = [
    "remix --target recursion --depth 5",
    "optimize --model gpt-4 --precision high",
    "deploy --edge-node global",
    "generate-logic --context 'neural architecture'"
];

let currentPromptIdx = 0;
let charIdx = 0;
let isDeleting = false;

function typeAnimation() {
    if (!typingText) return;

    const currentPrompt = prompts[currentPromptIdx];

    if (isDeleting) {
        typingText.textContent = currentPrompt.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = currentPrompt.substring(0, charIdx + 1);
        charIdx++;
    }

    let speed = isDeleting ? 30 : 70;

    if (!isDeleting && charIdx === currentPrompt.length) {
        speed = 2000;
        isDeleting = true;
        // Morph Effect: Add a glow when completed
        typingText.classList.add('glow-text');
        setTimeout(() => typingText.classList.remove('glow-text'), 500);
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentPromptIdx = (currentPromptIdx + 1) % prompts.length;
        speed = 500;
    }

    setTimeout(typeAnimation, speed);
}

// Waitlist Form Handling
const waitlistForm = document.getElementById('waitlist-form');
const waitlistStatus = document.getElementById('waitlist-status');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = waitlistForm.querySelector('button');
        const input = waitlistForm.querySelector('input');

        btn.disabled = true;
        btn.textContent = "JOINING...";

        setTimeout(() => {
            waitlistForm.style.opacity = '0.5';
            waitlistForm.style.pointerEvents = 'none';
            waitlistStatus.style.opacity = '1';
            btn.textContent = "JOINED";
            input.value = "";
        }, 1500);
    });
}


// Start animation when terminal is revealed
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typeAnimation();
            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const terminal = document.querySelector('.terminal-window');
if (terminal) terminalObserver.observe(terminal);

// Neural Grid Background Logic
const canvas = document.getElementById('neural-grid');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 60;
    const maxDistance = 150;
    let mouseX = 0;
    let mouseY = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        resize();
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();

            // Connect to mouse
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(16, 185, 129, ${1 - distance / maxDistance})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }

            // Connect to other particles
            particles.forEach(p2 => {
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (distance2 < maxDistance) {
                    ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distance2 / maxDistance) * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    init();
    animate();
}
