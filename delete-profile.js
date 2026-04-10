document.addEventListener('DOMContentLoaded', () => {
    const deleteForm = document.getElementById('deleteForm');
    const confirmInput = document.getElementById('confirmDelete');
    const deleteBtn = document.getElementById('deleteBtn');
    
    if(confirmInput) {
        confirmInput.addEventListener('input', (e) => {
            if(deleteBtn) {
                deleteBtn.disabled = e.target.value !== 'DELETE';
            }
        });
    }
    
    if(deleteForm) {
        deleteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const confirm = document.getElementById('confirmDelete').value;
            
            if(confirm === 'DELETE') {
                // Clear all user data
                localStorage.clear();
                
                showNotification('Account deleted permanently', 'success');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showNotification('Please type DELETE to confirm', 'error');
            }
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