// --- Initial Loader Logic ---
window.addEventListener('DOMContentLoaded', () => {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderProgress = document.getElementById('loader-progress');
    document.body.classList.add('loading');

    // Simulate progress bar
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        if (loaderProgress) loaderProgress.style.width = `${progress}%`;
        if (progress === 100) clearInterval(interval);
    }, 200);

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loaderProgress) loaderProgress.style.width = '100%';
            setTimeout(() => {
                if (loaderWrapper) {
                    loaderWrapper.classList.add('loader-hidden');
                    document.body.classList.remove('loading');
                    // Small delay to remove from DOM if needed, but here we just hide it
                    setTimeout(() => {
                        loaderWrapper.style.display = 'none';
                    }, 700);
                }
            }, 500);
        }, 800);
    });
});

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

    // Hero Content Parallax (Optimized to stay visible)
    const heroContent = document.querySelector('#hero .max-w-6xl');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
        heroContent.style.opacity = Math.max(0.1, 1 - (scrolled / 1000));
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

// Counter Animation Logic
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/[^0-9]/g, '');
            const suffix = counter.getAttribute('data-suffix') || '';
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc).toLocaleString() + suffix;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target.toLocaleString() + suffix;
            }
        };
        updateCount();
    });
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.getElementById('stats');
if (statsSection) statsObserver.observe(statsSection);

// Enhanced Magnetic Follow for Cards
document.querySelectorAll('.futuristic-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create a spotlight effect
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(16, 185, 129, 0.2)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        card.style.boxShadow = '';
    });
});

// Optimization: Single resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof init === 'function') init();
    }, 250);
});

// Initialize Neural Grid Background Logic
const canvas = document.getElementById('neural-grid');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60; // Performance optimization for mobile
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
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    let ripples = [];

    function init() {
        resize();
        particles = [];
        ripples = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();

            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distance / maxDistance) * 0.6})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }

            particles.forEach(p2 => {
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (distance2 < maxDistance) {
                    ctx.strokeStyle = `rgba(16, 185, 129, ${(1 - distance2 / maxDistance) * 0.15})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });

        // Draw ripples
        ripples.forEach((r, i) => {
            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            r.radius += 4;
            r.alpha -= 0.02;
            if (r.alpha <= 0) ripples.splice(i, 1);
        });

        requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('click', (e) => {
        ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 0,
            alpha: 1
        });

        // Push particles away from click
        particles.forEach(p => {
            const dx = p.x - e.clientX;
            const dy = p.y - e.clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                p.vx += (dx / dist) * 2;
                p.vy += (dy / dist) * 2;
            }
        });
    });

    init();
    animate();
}// Animated Stepper Logic
const stepperTrack = document.getElementById('stepper-track');
const stepIndicators = document.querySelectorAll('.step-indicator');
const stepPanes = document.querySelectorAll('.step-pane');
const stepPrev = document.getElementById('step-prev');
const stepNext = document.getElementById('step-next');
const stepLineFill = document.querySelector('.stepper-line-fill');
const stepOuter = document.querySelector('.stepper-content-outer');

let currentStep = 0;
const totalSteps = stepPanes.length;

function updateStepper() {
    // Update Indicators
    stepIndicators.forEach((ind, idx) => {
        ind.classList.toggle('active', idx === currentStep);
        ind.classList.toggle('completed', idx < currentStep);
    });

    // Update Track Position
    if (stepperTrack) {
        stepperTrack.style.transform = `translateX(-${(currentStep * 100) / totalSteps}%)`;
    }

    // Update Line Fill
    const progress = (currentStep / (totalSteps - 1)) * 100;
    if (stepLineFill) stepLineFill.style.width = `${progress}%`;

    // Update Panes
    stepPanes.forEach((pane, idx) => {
        pane.classList.toggle('active', idx === currentStep);
    });

    // Update Height
    if (stepOuter) {
        const activePane = stepPanes[currentStep];
        stepOuter.style.height = activePane.offsetHeight + 'px';
    }

    // Update Controls
    if (stepPrev) {
        stepPrev.disabled = currentStep === 0;
        stepPrev.style.opacity = currentStep === 0 ? '0.5' : '1';
        stepPrev.style.cursor = currentStep === 0 ? 'not-allowed' : 'pointer';
    }

    if (stepNext) {
        stepNext.innerHTML = currentStep === totalSteps - 1
            ? 'Complete <i data-lucide="check" class="w-4 h-4 inline ml-2"></i>'
            : 'Continue <i data-lucide="arrow-right" class="w-4 h-4 inline ml-2"></i>';
        lucide.createIcons();
    }
}

if (stepNext) {
    stepNext.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            updateStepper();
        } else {
            // "Complete" logic - maybe a confetti effect or success message
            stepNext.innerHTML = "Success!";
            stepNext.classList.add('bg-emerald-600');
        }
    });
}

if (stepPrev) {
    stepPrev.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateStepper();
        }
    });
}

stepIndicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
        currentStep = idx;
        updateStepper();
    });
});

// Initialize stepper height
window.addEventListener('load', () => {
    setTimeout(updateStepper, 500);
});

// Interactive Folder Logic
function openFolder() {
    const folder = document.getElementById('main-folder');
    if (folder) {
        folder.classList.toggle('open');
    }
}

// Folder Mouse Move Parallax
const folder = document.getElementById('main-folder');
if (folder) {
    folder.addEventListener('mousemove', (e) => {
        if (!folder.classList.contains('open')) return;
        const rect = folder.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const papers = folder.querySelectorAll('.folder-paper');
        papers.forEach((paper, idx) => {
            const factor = (idx + 1) * 10;
            paper.style.transform = `translate(${x * factor}px, ${-40 * (idx + 1) + y * factor}px) rotate(${x * 5}deg)`;
        });
    });

    folder.addEventListener('mouseleave', () => {
        if (!folder.classList.contains('open')) return;
        const papers = folder.querySelectorAll('.folder-paper');
        papers.forEach((paper, idx) => {
            paper.style.transform = '';
        });
    });
}

// Scroll Stack Effect Logic
const scrollStackItems = document.querySelectorAll('.scroll-stack-card');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    scrollStackItems.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + scrollY;
        const offset = scrollY - cardTop + (window.innerHeight * 0.15);

        if (offset > 0) {
            const scale = Math.max(0.85, 1 - (offset / 2000));
            const brightness = Math.max(0.4, 1 - (offset / 1000));
            card.style.transform = `scale(${scale}) translateY(${offset * 0.1}px)`;
            card.style.filter = `brightness(${brightness})`;
            card.style.opacity = Math.max(0.5, 1 - (offset / 1500));
        } else {
            card.style.transform = 'scale(1) translateY(0)';
            card.style.filter = 'brightness(1)';
            card.style.opacity = '1';
        }
    });
});

// Live Activity Ticker Logic
const tickerItems = [
    { user: "@syntax-king", action: "deployed", logic: "Recursive Reasoner v4" },
    { user: "@neural-ninja", action: "remixed", logic: "Chain-of-Thought Core" },
    { user: "@logic-lord", action: "optimized", logic: "Python Speedster" },
    { user: "@ai-architect", action: "deployed", logic: "Meta-Analytic Pro" },
    { user: "@data-demon", action: "cloned", logic: "Efficiency Master" },
    { user: "@code-crafter", action: "remixed", logic: "World Builder Pro" }
];

function initTicker() {
    const tickerContainer = document.getElementById('live-ticker');
    if (!tickerContainer) return;

    // Create double items for seamless looping
    const items = [...tickerItems, ...tickerItems];

    tickerContainer.innerHTML = items.map(item => `
        <div class="ticker-item">
            <span class="opacity-50">${item.user}</span>
            <strong class="mx-2">${item.action}</strong>
            <span class="text-white">${item.logic}</span>
            <span class="ml-4 opacity-20">•</span>
        </div>
    `).join('');
}

// Mind Graph Interaction
document.querySelectorAll('.graph-node').forEach(node => {
    node.addEventListener('mouseenter', () => {
        const links = document.querySelectorAll('.graph-line');
        links.forEach(link => {
            if (link.getAttribute('x1') === node.getAttribute('cx') ||
                link.getAttribute('x2') === node.getAttribute('cx')) {
                link.classList.add('opacity-100');
                link.style.strokeWidth = "2";
            }
        });
    });

    node.addEventListener('mouseleave', () => {
        const links = document.querySelectorAll('.graph-line');
        links.forEach(link => {
            link.classList.remove('opacity-100');
            link.style.strokeWidth = "1";
        });
    });
});

// Cinematic Staggered Text Reveal Logic
function initStaggeredReveals() {
    document.querySelectorAll('.reveal-stagger').forEach(el => {
        let wordCount = 0;

        const processNode = (node) => {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                if (!text.trim()) return;

                const words = text.split(/(\s+)/);
                const fragment = document.createDocumentFragment();

                words.forEach(word => {
                    if (word.trim()) {
                        const span = document.createElement('span');
                        span.className = 'reveal-word';
                        span.innerText = word;
                        span.style.transitionDelay = `${wordCount * 0.05}s`;
                        fragment.appendChild(span);
                        wordCount++;
                    } else {
                        fragment.appendChild(document.createTextNode(word));
                    }
                });

                node.parentNode.replaceChild(fragment, node);
            } else if (node.nodeType === 1) { // Element node
                // Don't process internal reveal-word spans if re-run
                if (node.classList.contains('reveal-word')) return;
                Array.from(node.childNodes).forEach(processNode);
            }
        };

        processNode(el);
        if (typeof revealObserver !== 'undefined') {
            revealObserver.observe(el);
        }
    });
}

// Testimonial Infinite Slider Logic (Clone items for seamless scroll)
function initTestimonialSlider() {
    const track = document.querySelector('.testimonials-track');
    if (track) {
        const content = track.innerHTML;
        track.innerHTML = content + content; // Double the items
    }
}

// Initialize New Features
initTicker();
initStaggeredReveals();
initTestimonialSlider();

// --- AI Chat Assistant Logic ---
const chatToggleBtn = document.getElementById('chat-toggle');
const aiChatWindow = document.getElementById('chat-window');
const closeChatBtn = document.getElementById('close-chat');
const chatMsgsBody = document.getElementById('chat-body');
const chatInputForm = document.getElementById('chat-form');
const chatInputField = document.getElementById('chat-input');
const chatNotifDot = chatToggleBtn?.querySelector('.bg-red-500');

let isChatWidgetOpen = false;
let hasOpenedChatWidget = false;

if (chatToggleBtn && aiChatWindow) {
    const handleChatToggle = () => {
        isChatWidgetOpen = !isChatWidgetOpen;
        if (isChatWidgetOpen) {
            aiChatWindow.classList.add('chat-open');
            if (chatNotifDot) chatNotifDot.classList.add('hidden');
            if (!hasOpenedChatWidget) {
                hasOpenedChatWidget = true;
                setTimeout(() => {
                    appendChatMessage("bot", "Hello! I'm the Hoood Engine. How can I assist you with AI prompts today?");
                }, 500);
            }
        } else {
            aiChatWindow.classList.remove('chat-open');
        }
    };

    chatToggleBtn.addEventListener('click', handleChatToggle);
    closeChatBtn.addEventListener('click', handleChatToggle);

    chatInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = chatInputField.value.trim();
        if (!msg) return;

        appendChatMessage("user", msg);
        chatInputField.value = '';

        const submitBtn = chatInputForm.querySelector('button');
        chatInputField.disabled = true;
        submitBtn.disabled = true;

        const typingId = showTypingDots();

        setTimeout(() => {
            removeTypingDots(typingId);
            appendChatMessage("bot", getBotReply(msg));
            chatInputField.disabled = false;
            submitBtn.disabled = false;
            chatInputField.focus();
        }, 1200 + Math.random() * 800);
    });
}

function appendChatMessage(sender, text) {
    const msgDiv = document.createElement('div');
    const isUser = sender === 'user';
    msgDiv.className = `max-w-[85%] rounded-2xl px-4 py-2.5 text-sm chat-message-enter flex flex-col ${isUser ? 'bg-brand-green text-white self-end rounded-br-none' : 'bg-white/10 text-gray-200 self-start rounded-tl-none border border-white/5 shadow-md'}`;

    msgDiv.innerHTML = text; // allow basic html in bot replies
    chatMsgsBody.appendChild(msgDiv);
    chatMsgsBody.scrollTop = chatMsgsBody.scrollHeight;
}

function showTypingDots() {
    const id = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.className = `max-w-[85%] rounded-2xl px-4 py-3 text-sm chat-message-enter flex items-center gap-1 bg-white/10 self-start rounded-tl-none border border-white/5 typing-dots`;
    msgDiv.innerHTML = `
        <span class="w-1.5 h-1.5 bg-brand-green rounded-full inline-block"></span>
        <span class="w-1.5 h-1.5 bg-brand-green rounded-full inline-block"></span>
        <span class="w-1.5 h-1.5 bg-brand-green rounded-full inline-block"></span>
    `;
    chatMsgsBody.appendChild(msgDiv);
    chatMsgsBody.scrollTop = chatMsgsBody.scrollHeight;
    return id;
}

function removeTypingDots(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

function getBotReply(text) {
    text = text.toLowerCase();
    if (text.includes('remix')) return `Remixing is easy! Just find a prompt you like in our library and hit the 'Remix' button to branch it.`;
    if (text.includes('price') || text.includes('cost')) return `We have an Explorer tier for free, and an Engineer tier for $29/mo that includes unlimited remixes!`;
    if (text.includes('deploy')) return `You can deploy prompts to any model (GPT-4, Claude 3, etc.) directly from your Hoood dashboard.`;
    return `That sounds interesting! The v3.0 network is designed to help with exactly that type of AI logic. Feel free to explore our Neural Tiers.`;
}

// --- Prompt Lab Logic ---
function initPromptLab() {
    const optimizeBtn = document.getElementById('optimize-btn');
    const engineVisual = document.getElementById('engine-visual');
    const optimizedCard = document.getElementById('optimized-card');
    const optimizedText = document.getElementById('optimized-prompt-text');
    const engineStatus = document.getElementById('engine-status');
    const standardText = document.getElementById('standard-prompt-text');

    if (!optimizeBtn) return;

    let isOptimizing = false;

    optimizeBtn.addEventListener('click', () => {
        if (isOptimizing) return;
        isOptimizing = true;

        // Reset and start animation
        optimizeBtn.disabled = true;
        optimizeBtn.textContent = "Processing...";
        engineStatus.textContent = "Neural Synthesis in Progress...";
        engineVisual.classList.add('animate-pulse');
        optimizedCard.classList.add('processing');
        optimizedText.classList.remove('reveal-active');
        optimizedText.style.opacity = '0.2';

        // Glitch effect on input
        standardText.classList.add('optimization-glitch');

        setTimeout(() => {
            // End processing state
            isOptimizing = false;
            optimizeBtn.disabled = false;
            optimizeBtn.textContent = "Optimization Complete";
            engineStatus.textContent = "Optimization Successful";
            engineVisual.classList.remove('animate-pulse');
            optimizedCard.classList.remove('processing');
            standardText.classList.remove('optimization-glitch');

            // Reveal optimized text
            optimizedText.style.opacity = '1';

            // Wrap text in spans if not already for staggered reveal
            if (!optimizedText.querySelector('span')) {
                const words = optimizedText.innerHTML.split(/(\s+|<br>)/);
                optimizedText.innerHTML = words.map((word, i) => {
                    if (word === '<br>') return '<br>';
                    if (word.trim()) {
                        return `<span style="transition-delay: ${i * 0.03}s">${word}</span>`;
                    }
                    return word;
                }).join('');
            }

            setTimeout(() => {
                optimizedText.classList.add('reveal-active');

                // Trigger counter animation for the efficiency boost
                const counter = optimizedCard.querySelector('.counter');
                if (counter) {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const duration = 1500;
                    const step = target / (duration / 16);

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    updateCounter();
                }
            }, 50);

            // Reset button after some time
            setTimeout(() => {
                optimizeBtn.textContent = "Run Optimization";
                engineStatus.textContent = "Engine Ready";
            }, 5000);

        }, 2000);
    });
}

// --- Neural Graph Logic ---
function initNeuralGraph() {
    const graphNodes = document.querySelectorAll('.graph-node');
    const labelDisplay = document.getElementById('node-label');
    const graphContainer = document.querySelector('.mind-graph-container');
    const logicGraph = document.getElementById('logic-graph');

    if (!graphNodes.length || !labelDisplay) return;

    // Node Hover Interaction
    graphNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const label = node.getAttribute('data-label');
            labelDisplay.textContent = label;
            labelDisplay.style.background = 'rgba(16, 185, 129, 0.2)';
            labelDisplay.style.borderColor = 'rgba(16, 185, 129, 0.8)';
            labelDisplay.style.transform = 'translateX(-50%) scale(1.1)';
        });

        node.addEventListener('mouseleave', () => {
            labelDisplay.textContent = 'Hover nodes to explore logic';
            labelDisplay.style.background = 'rgba(16, 185, 129, 0.1)';
            labelDisplay.style.borderColor = 'rgba(16, 185, 129, 0.4)';
            labelDisplay.style.transform = 'translateX(-50%) scale(1)';
        });

        // Click for "Neural Flare" effect
        node.addEventListener('click', () => {
            const flare = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            flare.setAttribute("cx", node.getAttribute("cx"));
            flare.setAttribute("cy", node.getAttribute("cy"));
            flare.setAttribute("r", "5");
            flare.setAttribute("fill", "#fff");
            flare.innerHTML = `<animate attributeName="r" from="5" to="50" dur="0.8s" fill="freeze" />
                               <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" fill="freeze" />`;
            logicGraph.appendChild(flare);
            setTimeout(() => flare.remove(), 1000);
        });
    });

    // Mouse Parallax effect
    if (graphContainer) {
        graphContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = graphContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;

            logicGraph.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(1.02)`;
        });

        graphContainer.addEventListener('mouseleave', () => {
            logicGraph.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)`;
        });
    }
}

// Call initPromptLab and initNeuralGraph on load
window.addEventListener('load', () => {
    initPromptLab();
    initNeuralGraph();
});
