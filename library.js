document.addEventListener('DOMContentLoaded', () => {
    // Template filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const templates = document.querySelectorAll('.template-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            templates.forEach(template => {
                if(filter === 'all' || template.getAttribute('data-category') === filter) {
                    template.style.display = 'block';
                    gsap.from(template, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3
                    });
                } else {
                    template.style.display = 'none';
                }
            });
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Template use buttons
    const useBtns = document.querySelectorAll('.btn-use');
    useBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const templateName = btn.closest('.template-card').querySelector('h3').textContent;
            showNotification(`Template "${templateName}" selected! Redirecting...`, 'success');
            
            setTimeout(() => {
                window.location.href = 'signup.html';
            }, 1500);
        });
    });
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${message}</span>`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00f3ff, #8a2be2);
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        z-index: 100000;
        animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}