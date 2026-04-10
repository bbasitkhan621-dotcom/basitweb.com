// Main Application Controller
class AppController {
    constructor() {
        this.checkAuth();
        this.initSwiper();
        this.initGSAP();
        this.setupEventListeners();
    }
    
    checkAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const protectedPages = ['dashboard.html', 'edit-profile.html', 'library.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if(protectedPages.includes(currentPage) && !isLoggedIn) {
            window.location.href = 'login.html';
        }
    }
    
    initSwiper() {
        const swiper = new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            },
        });
    }
    
    initGSAP() {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
        });
        
        gsap.from('.pricing-card', {
            scrollTrigger: {
                trigger: '.pricing-grid',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
        });
        
        gsap.from('.hero-content', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
        });
    }
    
    setupEventListeners() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Form submissions
        const loginForm = document.getElementById('loginForm');
        if(loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        const signupForm = document.getElementById('signupForm');
        if(signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup();
            });
        }
    }
    
    handleLogin() {
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        
        if(email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            NotificationSystem.show('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            NotificationSystem.show('Please fill all fields', 'error');
        }
    }
    
    handleSignup() {
        const username = document.getElementById('username')?.value;
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        const confirmPassword = document.getElementById('confirmPassword')?.value;
        
        if(password !== confirmPassword) {
            NotificationSystem.show('Passwords do not match', 'error');
            return;
        }
        
        if(username && email && password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('userEmail', email);
            NotificationSystem.show('Account created successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'edit-profile.html';
            }, 1500);
        } else {
            NotificationSystem.show('Please fill all fields', 'error');
        }
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
});