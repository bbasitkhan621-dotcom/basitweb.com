// Auto Counter Animation
class CounterAnimation {
    constructor() {
        this.initCounters();
    }
    
    initCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            this.animateCounter(counter, target);
        });
    }
    
    animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if(current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    }
}

// Auto Theme Switcher
class ThemeSwitcher {
    constructor() {
        this.themes = ['cyberpunk', 'nature', 'space', 'abstract'];
        this.currentTheme = 0;
        this.init();
    }
    
    init() {
        setInterval(() => this.switchTheme(), 5000);
    }
    
    switchTheme() {
        this.currentTheme = (this.currentTheme + 1) % this.themes.length;
        const theme = this.themes[this.currentTheme];
        
        const colors = {
            cyberpunk: { primary: '#ff006e', secondary: '#00f3ff' },
            nature: { primary: '#00ff88', secondary: '#00cc66' },
            space: { primary: '#6c47ff', secondary: '#a855f7' },
            abstract: { primary: '#ffaa00', secondary: '#ff6b6b' }
        };
        
        document.documentElement.style.setProperty('--primary', colors[theme].primary);
        document.documentElement.style.setProperty('--secondary', colors[theme].secondary);
    }
}

// Auto Save Form Data
class AutoSave {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if(this.form) {
            this.init();
        }
    }
    
    init() {
        this.form.addEventListener('input', () => {
            const formData = new FormData(this.form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            localStorage.setItem('autoSaveData', JSON.stringify(data));
        });
        
        const savedData = localStorage.getItem('autoSaveData');
        if(savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = this.form.querySelector(`[name="${key}"]`);
                if(input) input.value = data[key];
            });
        }
    }
}

// Auto Notification System
class NotificationSystem {
    static show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getIcon(type)}"></i>
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
            z-index: 100000;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    static getIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Initialize auto features
document.addEventListener('DOMContentLoaded', () => {
    new CounterAnimation();
    new ThemeSwitcher();
    new AutoSave('signupForm');
    new AutoSave('loginForm');
});