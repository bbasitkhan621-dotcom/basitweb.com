document.addEventListener('DOMContentLoaded', () => {
    // Service card interactions
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
        const btn = item.querySelector('.btn-service');
        if(btn) {
            btn.addEventListener('click', () => {
                const serviceName = item.querySelector('h3').textContent;
                showNotification(`Selected ${serviceName} plan`, 'success');
                
                // Store selected plan
                localStorage.setItem('selectedPlan', serviceName);
                
                // Redirect to signup
                setTimeout(() => {
                    window.location.href = 'signup.html';
                }, 1000);
            });
        }
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}