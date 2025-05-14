// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);
        
// DOM Elements
const navbar = document.getElementById('navbar');
const menuItems = document.querySelectorAll('.menu a');
const indicator = document.querySelector('.indicator');
const sections = document.querySelectorAll('section');
const progressBar = document.getElementById('progressBar');
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

// Set indicator position for active menu item
function setIndicatorPosition(element) {
    const rect = element.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - navRect.left}px`;
}

// Initialize indicator position
if (menuItems.length > 0) {
    setIndicatorPosition(menuItems[0]);
}

// Update active menu item based on scroll position
function updateActiveSection() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('active');
                    setIndicatorPosition(item);
                }
            });
        }
    });
}

// Change navbar style on scroll
window.addEventListener('scroll', function() {
    // Update navbar style
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active section
    updateActiveSection();
    
    // Update progress bar
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Menu item hover effects
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        if (!navbar.classList.contains('scrolled')) {
            setIndicatorPosition(this);
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const activeItem = document.querySelector('.menu a.active');
        if (activeItem && !navbar.classList.contains('scrolled')) {
            setIndicatorPosition(activeItem);
        }
    });
    
    // Click event for smooth scrolling
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
        
        // Update active class
        menuItems.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
        setIndicatorPosition(this);
        
        // Close mobile menu if open
        menu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        this.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        this.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Animate section content on scroll
sections.forEach(section => {
    const title = section.querySelector('.section-title');
    const desc = section.querySelector('.section-desc');
    const btn = section.querySelector('.btn');
    const shapes = section.querySelectorAll('.shape');
    
    gsap.from(title, {
        scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    });
    
    gsap.from(desc, {
        scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
    });
    
    gsap.from(btn, {
        scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out"
    });
    
    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            x: (index % 2 === 0) ? "15%" : "-15%",
            y: (index % 3 === 0) ? "10%" : "-10%",
            rotation: index * 15,
            ease: "none"
        });
    });
});

// Floating animation for shapes
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    gsap.to(shape, {
        y: (index % 2 === 0) ? 20 : -20,
        duration: 3 + index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Logo animation on hover
const logo = document.querySelector('.logo a');
logo.addEventListener('mouseenter', function() {
    gsap.to(this, {
        scale: 1.1,
        duration: 0.3,
        ease: "back.out(1.7)"
    });
});

logo.addEventListener('mouseleave', function() {
    gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
    });
});

// Initialize the page
updateActiveSection();