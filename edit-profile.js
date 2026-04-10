document.addEventListener('DOMContentLoaded', () => {
    // Load user data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const username = localStorage.getItem('username') || '';
    
    // Populate form
    document.getElementById('username').value = username;
    document.getElementById('email').value = userData.email || '';
    
    const editForm = document.getElementById('editProfileForm');
    
    if(editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newUsername = document.getElementById('username').value;
            const bio = document.getElementById('bio').value;
            const theme = document.getElementById('theme').value;
            
            // Update localStorage
            localStorage.setItem('username', newUsername);
            
            if(userData) {
                userData.username = newUsername;
                userData.bio = bio;
                userData.theme = theme;
                localStorage.setItem('userData', JSON.stringify(userData));
            }
            
            showNotification('Profile updated successfully!', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        });
    }
    
    // Avatar upload
    const avatarUpload = document.getElementById('avatarUpload');
    if(avatarUpload) {
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if(file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const avatarImg = document.getElementById('avatarImg');
                    avatarImg.src = event.target.result;
                    localStorage.setItem('avatar', event.target.result);
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Load saved avatar
    const savedAvatar = localStorage.getItem('avatar');
    if(savedAvatar) {
        document.getElementById('avatarImg').src = savedAvatar;
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