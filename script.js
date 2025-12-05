



// DOM элементы
document.addEventListener('DOMContentLoaded', function() {
    const askNameBtn = document.getElementById('askName');
    const heroTitle = document.querySelector('.hero-title');
    const greeting = document.querySelector('.greeting');

    // Функция для показа персонального приветствия
    function showPersonalGreeting(name) {
        if (name) {
            greeting.textContent = `Привет, ${name}! Я`;
            heroTitle.style.color = 'var(--primary-color)';
            askNameBtn.innerHTML = '<i class="fas fa-user-check"></i> Спасибо за знакомство!';
            askNameBtn.disabled = true;
            askNameBtn.style.background = '#10b981';
        } else {
            greeting.textContent = 'Hello, I\'m';
            heroTitle.style.color = 'var(--dark-color)';
            askNameBtn.innerHTML = '<i class="fas fa-user"></i> Представиться';
            askNameBtn.disabled = false;
            askNameBtn.style.background = '';
        }
    }

    // Функция для запроса имени
    function askForName() {
        if (askNameBtn.disabled) return;
        
        const name = prompt('Привет! Как тебя зовут?');
        
        if (name && name.trim() !== '') {
            localStorage.setItem('visitorName', name.trim());
            showPersonalGreeting(name.trim());
            
            // Показываем уведомление
            showNotification(`Приятно познакомиться, ${name.trim()}! 🎉`);
        }
    }

    // Функция для показа уведомления
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Обработчик клика на кнопку
    askNameBtn.addEventListener('click', askForName);

    // Проверяем сохраненное имя при загрузке
    const savedName = localStorage.getItem('visitorName');
    if (savedName) {
        showPersonalGreeting(savedName);
    }

    // Навигация и анимации навыков
    initSkillsAnimation();
    initSmoothScrolling();
});

// Инициализация анимации навыков
function initSkillsAnimation() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillGroups = document.querySelectorAll('.skill-group');

    skillCategories.forEach(category => {
        category.addEventListener('click', () => {
            const targetCategory = category.getAttribute('data-category');
            
            // Убираем активный класс у всех категорий
            skillCategories.forEach(cat => cat.classList.remove('active'));
            skillGroups.forEach(group => group.classList.remove('active'));
            
            // Добавляем активный класс к выбранной категории
            category.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
            
            // Анимируем прогресс-бары
            animateSkillBars(targetCategory);
        });
    });
    
    // Анимируем прогресс-бары при загрузке
    setTimeout(() => {
        animateSkillBars('frontend');
    }, 500);
}

// Анимация прогресс-баров
function animateSkillBars(category) {
    const activeGroup = document.getElementById(category);
    const progressBars = activeGroup.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// Плавная прокрутка для навигации
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем активную ссылку
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}