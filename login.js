document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    if(togglePassword) {
        togglePassword.addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }
    
    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if(!email || !password) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            // Check credentials (simulated)
            const userData = localStorage.getItem('userData');
            
            if(userData) {
                const user = JSON.parse(userData);
                if(user.email === email && atob(user.password) === password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', user.username);
                    showNotification('Login successful! Redirecting...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showNotification('Invalid email or password', 'error');
                }
            } else {
                // Demo login for testing
                if(email === 'demo@demo.com' && password === 'demo123') {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', 'Demo User');
                    showNotification('Login successful! Redirecting...', 'success');
                    
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                } else {
                    showNotification('Invalid email or password', 'error');
                }
            }
        });
    }
    
    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Social login coming soon!', 'info');
        });
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00f3ff, #8a2be2)' : '#ff006e'};
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        z-index: 100000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}