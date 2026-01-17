// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Inisialisasi Typed.js
    const typed = new Typed('#typed-text', {
        strings: ['Full Stack Developer', 'Cloud Architect', 'Tech Enthusiast', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll untuk anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update navbar active link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Counter animation
    function animateCounter(elementId, targetValue, duration = 2000) {
        const element = document.getElementById(elementId);
        let current = 0;
        const increment = targetValue / (duration / 16); // 60fps
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                element.textContent = targetValue + (elementId === 'codeHours' ? 'k+' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (elementId === 'codeHours' ? 'k+' : '+');
            }
        }, 16);
    }
    
    // Trigger counter ketika section stats terlihat
    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter('projectCount', 87);
                animateCounter('clientCount', 42);
                animateCounter('experienceCount', 8);
                animateCounter('codeHours', 15);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 300);
        });
    }
    
    // Trigger skill bars animation ketika section skills terlihat
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Initialize skills chart
    const skillsChartCtx = document.getElementById('skillsChart').getContext('2d');
    const skillsChart = new Chart(skillsChartCtx, {
        type: 'radar',
        data: {
            labels: ['Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Mobile'],
            datasets: [{
                label: 'Tingkat Kemampuan',
                data: [95, 92, 88, 85, 90, 75],
                backgroundColor: 'rgba(108, 99, 255, 0.2)',
                borderColor: 'rgba(108, 99, 255, 1)',
                pointBackgroundColor: 'rgba(108, 99, 255, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(108, 99, 255, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
    
    // Portfolio filtering
    const portfolioItems = [
        { id: 1, category: 'web', title: 'SaaS Project Management', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80' },
        { id: 2, category: 'ecommerce', title: 'E-Commerce Platform', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80' },
        { id: 3, category: 'dashboard', title: 'Analytics Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80' },
        { id: 4, category: 'mobile', title: 'Health & Fitness App', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80' },
        { id: 5, category: 'web', title: 'Real Estate Portal', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80' },
        { id: 6, category: 'dashboard', title: 'Financial Dashboard', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80' }
    ];
    
    function renderPortfolioItems(filter = 'all') {
        const portfolioGrid = document.getElementById('portfolioGrid');
        portfolioGrid.innerHTML = '';
        
        const filteredItems = filter === 'all' 
            ? portfolioItems 
            : portfolioItems.filter(item => item.category === filter);
        
        filteredItems.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            col.innerHTML = `
                <div class="portfolio-item" data-category="${item.category}">
                    <img src="${item.image}" class="portfolio-img" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <h4>${item.title}</h4>
                        <p>${item.category.charAt(0).toUpperCase() + item.category.slice(1)} Application</p>
                        <a href="#" class="btn btn-light mt-3">Lihat Detail</a>
                    </div>
                </div>
            `;
            portfolioGrid.appendChild(col);
        });
    }
    
    // Inisialisasi portfolio
    renderPortfolioItems();
    
    // Filter portfolio
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            const filter = this.getAttribute('data-filter');
            renderPortfolioItems(filter);
        });
    });
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi pengiriman
        formMessage.innerHTML = '<div class="alert alert-info">Mengirim pesan...</div>';
        
        setTimeout(() => {
            formMessage.innerHTML = '<div class="alert alert-success">Pesan berhasil dikirim! Saya akan membalas dalam 1x24 jam.</div>';
            contactForm.reset();
            
            // Reset pesan setelah 5 detik
            setTimeout(() => {
                formMessage.innerHTML = '';
            }, 5000);
        }, 1500);
    });
    
    // Update active nav link berdasarkan scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
});