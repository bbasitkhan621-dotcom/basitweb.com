document.addEventListener('DOMContentLoaded', () => {
    const resetForm = document.getElementById('resetForm');
    
    if(resetForm) {
        resetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value;
            
            if(!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }
            
            // Simulate password reset email
            showNotification(`Password reset link sent to ${email}`, 'success');
            
            // Store reset request (simulated)
            localStorage.setItem('passwordResetRequest', JSON.stringify({
                email: email,
                timestamp: new Date().toISOString()
            }));
            
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        });
    }
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${message}</span>`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#ff006e' : 'linear-gradient(135deg, #00f3ff, #8a2be2)'};
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        z-index: 100000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}