document.addEventListener('DOMContentLoaded', () => {
    // Clear all session data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userData');
    
    // Optional: Clear specific items but keep theme preferences
    // sessionStorage.clear();
    
    // Show logout animation
    const logoutContainer = document.querySelector('.logout-container');
    if(logoutContainer) {
        gsap.to(logoutContainer, {
            opacity: 0,
            duration: 2,
            onComplete: () => {
                window.location.href = 'index.html';
            }
        });
    } else {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
});