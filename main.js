// Smooth scrolling for navigation links
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

// Scroll to demo section
function scrollToDemo() {
    document.getElementById('demo').scrollIntoView({
        behavior: 'smooth'
    });
}

// Presentation Modal
let currentSlide = 0;
const totalSlides = 6;

function showPresentationModal() {
    const modal = document.getElementById('presentationModal');
    modal.style.display = 'block';
    currentSlide = 0;
    showSlide(currentSlide);
    document.body.style.overflow = 'hidden';
}

function closePresentationModal() {
    const modal = document.getElementById('presentationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const counter = document.querySelector('.slide-counter');
    
    slides.forEach(slide => slide.classList.remove('active'));
    
    if (n >= slides.length) n = 0;
    if (n < 0) n = slides.length - 1;
    
    slides[n].classList.add('active');
    currentSlide = n;
    counter.textContent = `Слайд ${n + 1} из ${totalSlides}`;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Contact Modal
function showContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Form submission
document.getElementById('investorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name') || this.querySelector('input[type="text"]').value,
        email: formData.get('email') || this.querySelector('input[type="email"]').value,
        company: formData.get('company') || this.querySelectorAll('input[type="text"]')[1]?.value,
        message: formData.get('message') || this.querySelector('textarea').value
    };
    
    // In real implementation, send to backend
    console.log('Investor inquiry:', data);
    alert('✅ Спасибо за ваш интерес! Мы свяжемся с вами в ближайшее время.');
    this.reset();
    closeContactModal();
});

// Close modals when clicking outside
window.addEventListener('click', function(e) {
    const presentationModal = document.getElementById('presentationModal');
    const contactModal = document.getElementById('contactModal');
    
    if (e.target === presentationModal) {
        closePresentationModal();
    }
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// Add scroll animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.demo-card, .tech-layer, .market-card, .roadmap-phase, .investment-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Typewriter effect for demo
function typeWriterEffect() {
    const thinkingElement = document.querySelector('.thinking');
    const resultElement = document.querySelector('.result');
    
    if (thinkingElement && resultElement) {
        let thinkingText = 'AI анализирует запрос...';
        let resultText = '✅ Проект создан!\n🏠 2 этажа, 5 комнат\n📐 145 м², классическая крыша\n🔥 Камин в гостиной\n🪟 Панорамные окна';
        
        thinkingElement.textContent = '';
        resultElement.style.display = 'none';
        
        let i = 0;
        const thinkingInterval = setInterval(() => {
            if (i < thinkingText.length) {
                thinkingElement.textContent += thinkingText.charAt(i);
                i++;
            } else {
                clearInterval(thinkingInterval);
                setTimeout(() => {
                    thinkingElement.style.display = 'none';
                    resultElement.style.display = 'block';
                    resultElement.textContent = '';
                    
                    let j = 0;
                    const resultInterval = setInterval(() => {
                        if (j < resultText.length) {
                            resultElement.textContent += resultText.charAt(j);
                            j++;
                        } else {
                            clearInterval(resultInterval);
                        }
                    }, 50);
                }, 1000);
            }
        }, 100);
    }
}

// Initialize typewriter effect when demo section is in view
const demoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(typeWriterEffect, 1000);
            demoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const demoSection = document.getElementById('demo');
if (demoSection) {
    demoObserver.observe(demoSection);
}

// Keyboard navigation for presentation
document.addEventListener('keydown', function(e) {
    const presentationModal = document.getElementById('presentationModal');
    if (presentationModal.style.display === 'block') {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'Escape') {
            closePresentationModal();
        }
    }
    
    const contactModal = document.getElementById('contactModal');
    if (contactModal.style.display === 'block' && e.key === 'Escape') {
        closeContactModal();
    }
});