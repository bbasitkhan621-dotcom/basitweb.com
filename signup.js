document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    
    if(signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if(!username || !email || !password || !confirmPassword) {
                showNotification('Please fill all fields', 'error');
                return;
            }
            
            if(password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if(password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Save to localStorage
            const userData = {
                username: username,
                email: email,
                password: btoa(password), // Simple encoding (not secure for production)
                createdAt: new Date().toISOString(),
                xp: 0,
                level: 1
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', username);
            
            showNotification('Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'edit-profile.html';
            }, 2000);
        });
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    if(passwordInput) {
        passwordInput.addEventListener('input', (e) => {
            const password = e.target.value;
            const strength = checkPasswordStrength(password);
            updateStrengthIndicator(strength);
        });
    }
});

function checkPasswordStrength(password) {
    let strength = 0;
    if(password.length >= 6) strength++;
    if(password.match(/[a-z]/)) strength++;
    if(password.match(/[A-Z]/)) strength++;
    if(password.match(/[0-9]/)) strength++;
    if(password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
}

function updateStrengthIndicator(strength) {
    let indicator = document.querySelector('.strength-indicator');
    if(!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'strength-indicator';
        passwordInput.parentNode.appendChild(indicator);
    }
    
    const colors = ['#ff006e', '#ffaa00', '#00ff88', '#00f3ff', '#8a2be2'];
    const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    
    indicator.style.cssText = `
        height: 3px;
        background: ${colors[strength-1] || '#ff006e'};
        width: ${strength * 20}%;
        transition: all 0.3s;
        margin-top: 5px;
        border-radius: 3px;
    `;
    
    if(strength > 0) {
        indicator.title = texts[strength-1];
    }
}

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