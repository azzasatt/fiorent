// main.js - ПОЛНЫЙ РАБОЧИЙ КОД



// ===== СИСТЕМА ТЕМ НАСТРОЕНИЯ =====
class MoodThemeSwitcher {
    constructor() {
        this.moodThemes = ['peaceful', 'energetic', 'mysterious'];
        this.moodIcons = {
            peaceful: '🌸',
            energetic: '🍊', 
            mysterious: '🌙'
        };
        
        // Автоматическая временная тема при загрузке
        this.timeTheme = this.getTimeBasedTheme();
        this.currentMood = null; // Начинаем без темы настроения
        
        this.init();
    }

    init() {
        // Устанавливаем временную тему
        this.applyTimeTheme(this.timeTheme);
        this.setupEventListeners();
        console.log('🕒 Установлена временная тема:', this.timeTheme);
    }

    // Получаем тему по времени (оставляем как было)
    getTimeBasedTheme() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 10) return 'morning';
        if (hour >= 10 && hour < 17) return 'day';
        if (hour >= 17 && hour < 22) return 'evening';
        return 'night';
    }

    // Применяем временную тему
    applyTimeTheme(theme) {
        document.documentElement.setAttribute('data-time', theme);
        this.updateMenu(theme);
    }

    // Применяем тему настроения
    applyMoodTheme(mood) {
        this.currentMood = mood;
        document.documentElement.setAttribute('data-mood', mood);
        this.updateMoodButton(mood);
        console.log('🎨 Установлена тема настроения:', mood);
    }


// В класс MoodThemeSwitcher добавьте этот метод после applyMoodTheme
applyMoodTheme(mood) {
    this.currentMood = mood;
    
    // Плавная смена фона
    this.animateHeroBackgroundChange(() => {
        document.documentElement.setAttribute('data-mood', mood);
        this.updateMoodButton(mood);
        console.log('🎨 Установлена тема настроения:', mood);
    });
}

// Новый метод для анимации смены фона
animateHeroBackgroundChange(callback) {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        // Добавляем класс анимации
        hero.style.opacity = '0.7';
        hero.style.transform = 'scale(1.02)';
        
        // Ждем завершения анимации и выполняем callback
        setTimeout(() => {
            callback();
            
            // Возвращаем нормальное состояние
            setTimeout(() => {
                hero.style.opacity = '1';
                hero.style.transform = 'scale(1)';
            }, 300);
        }, 300);
    } else {
        // Если hero не найден, просто выполняем callback
        callback();
    }
}

// Также обновите метод resetToTimeTheme
resetToTimeTheme() {
    // Плавная смена фона
    this.animateHeroBackgroundChange(() => {
        this.currentMood = null;
        document.documentElement.removeAttribute('data-mood');
        this.updateMoodButton(null);
        console.log('🔄 Возврат к временной теме:', this.timeTheme);
    });
}

    // Переключаем тему настроения
    nextMoodTheme() {
        if (!this.currentMood) {
            // Если темы настроения нет, устанавливаем первую
            this.applyMoodTheme(this.moodThemes[0]);
        } else {
            const currentIndex = this.moodThemes.indexOf(this.currentMood);
            const nextIndex = (currentIndex + 1) % this.moodThemes.length;
            this.applyMoodTheme(this.moodThemes[nextIndex]);
        }
        
        this.animateButton();
    }

    // Сбрасываем тему настроения (возвращаемся к временной)
    resetToTimeTheme() {
        this.currentMood = null;
        document.documentElement.removeAttribute('data-mood');
        this.updateMoodButton(null);
        console.log('🔄 Возврат к временной теме:', this.timeTheme);
    }

    // Обновляем кнопку темы
    updateMoodButton(mood) {
        const buttons = document.querySelectorAll('#themeToggle, #mobileThemeToggle');
        
        buttons.forEach(button => {
            const icon = button.querySelector('.theme-icon');
            if (icon) {
                if (mood) {
                    icon.textContent = this.moodIcons[mood];
                } else {
                    // Возвращаем иконку временной темы
                    const timeIcon = this.getTimeIcon(this.timeTheme);
                    icon.textContent = timeIcon;
                }
            }
        });
    }

    // Иконки для временных тем
    getTimeIcon(timeTheme) {
        const icons = {
            morning: '☀️',
            day: '🔆',
            evening: '🌇',
            night: '🌙'
        };
        return icons[timeTheme] || '🎨';
    }

    // Обновляем меню (оставляем как было)
    updateMenu(theme) {
        const menuItems = document.querySelectorAll('.menu-item');
        const currentTimeElement = document.querySelector('.current-time');
        const sectionHeader = document.querySelector('.section-header h2');
        
        const timeNames = {
            morning: 'Утро',
            day: 'День', 
            evening: 'Вечер',
            night: 'Ночь'
        };
        
        const menuTitles = {
            morning: 'Утреннее меню',
            day: 'Обеденное меню',
            evening: 'Вечернее меню',
            night: 'Ночное меню'
        };

        if (currentTimeElement) {
            currentTimeElement.textContent = timeNames[theme];
        }
        
        if (sectionHeader) {
            sectionHeader.textContent = menuTitles[theme];
        }
        
        menuItems.forEach(item => {
            const itemTime = item.getAttribute('data-time');
            if (itemTime === theme) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Анимация кнопки
    animateButton() {
        const buttons = document.querySelectorAll('#themeToggle, #mobileThemeToggle');
        buttons.forEach(button => {
            button.classList.add('rotating', 'pulsing');
            setTimeout(() => {
                button.classList.remove('rotating', 'pulsing');
            }, 600);
        });
    }

    // Настраиваем обработчики
    setupEventListeners() {
        // Клик по кнопке темы
        document.addEventListener('click', (e) => {
            if (e.target.closest('#themeToggle') || e.target.closest('#mobileThemeToggle')) {
                this.nextMoodTheme();
            }
        });

        // Двойной клик по кнопке для сброса к временной теме
        document.addEventListener('dblclick', (e) => {
            if (e.target.closest('#themeToggle') || e.target.closest('#mobileThemeToggle')) {
                this.resetToTimeTheme();
            }
        });

        // Переключение по клавише M
        document.addEventListener('keydown', (e) => {
            if (e.key === 'm' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.nextMoodTheme();
            }
        });
    }
}

// ===== ОБНОВЛЕННАЯ ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    // Очищаем старые сохранения
    localStorage.removeItem('user-theme');
    localStorage.removeItem('preferred-theme');
    
    // Инициализируем новые классы
    window.moodThemeSwitcher = new MoodThemeSwitcher();
    window.mobileMenu = new MobileMenu();
    window.headerScroll = new HeaderScroll();
    window.smoothScroll = new SmoothScroll();
    
    console.log('🚀 Все системы запущены!');
    console.log('🎨 Готовы темы настроения: умиротворенная, энергичный, загадочный');
    console.log('💡 Совет: Нажмите на кнопку темы для смены настроения, двойной клик для сброса');
});









// ===== MOBILE MENU =====
class MobileMenu {
    constructor() {
        this.burger = document.getElementById('burgerMenu');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.closeBtn = document.getElementById('closeMenu');
        this.mobileThemeBtn = document.getElementById('mobileThemeToggle');
        this.links = document.querySelectorAll('.mobile-menu__link');
        
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Открытие меню по клику на бургер
        this.burger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openMenu();
        });
        
        // Закрытие меню по клику на крестик
        this.closeBtn.addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Закрытие меню по клику на оверлей
        this.mobileMenu.addEventListener('click', (e) => {
            if (e.target === this.mobileMenu) {
                this.closeMenu();
            }
        });
        
        // Закрытие меню по клику на ссылку
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Переключение темы из мобильного меню
        this.mobileThemeBtn.addEventListener('click', () => {
            if (window.themeSwitcher) {
                window.themeSwitcher.nextMoodTheme();
            }
        });
        
        // Закрытие меню по клавише Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Предотвращаем закрытие при клике на контент меню
        this.mobileMenu.querySelector('.mobile-menu__content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    
    openMenu() {
        this.isOpen = true;
        this.burger.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');
    }
    
    closeMenu() {
        this.isOpen = false;
        this.burger.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// ===== HEADER SCROLL =====
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScrollY = window.scrollY;
        this.scrollThreshold = 100;
        this.hideClass = 'header--hidden';
        this.scrollClass = 'header--scrolled';
        this.animationDuration = 300;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        this.bindEvents();
        this.setupStyles();
    }
    
    bindEvents() {
        let ticking = false;
        
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', () => {
            this.lastScrollY = window.scrollY;
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        const scrollDelta = Math.abs(currentScrollY - this.lastScrollY);
        
        if (scrollDelta > this.scrollThreshold) {
            if (scrollDirection === 'down' && currentScrollY > 100) {
                this.hideHeader();
            } else {
                this.showHeader();
            }
            this.lastScrollY = currentScrollY;
        }
        
        if (currentScrollY > 50) {
            this.header.classList.add(this.scrollClass);
        } else {
            this.header.classList.remove(this.scrollClass);
        }
    }
    
    hideHeader() {
        if (!this.header.classList.contains(this.hideClass)) {
            this.header.classList.add(this.hideClass);
        }
    }
    
    showHeader() {
        if (this.header.classList.contains(this.hideClass)) {
            this.header.classList.remove(this.hideClass);
        }
    }
    
    setupStyles() {
        if (!document.getElementById('header-scroll-styles')) {
            const styles = `
                .header {
                    transition: transform ${this.animationDuration}ms ease-in-out, 
                                background-color 0.3s ease,
                                box-shadow 0.3s ease;
                    transform: translateY(0);
                }
                .header--hidden {
                    transform: translateY(-100%) !important;
                }
                .header--scrolled {
                    background: var(--header-bg) !important;
                    backdrop-filter: blur(20px) !important;
                    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1) !important;
                    padding: 0.5rem 0 !important;
                }
                body {
                    padding-top: 80px;
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = 'header-scroll-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }
}

// ===== SMOOTH SCROLL =====
class SmoothScroll {
    constructor() {
        this.offset = 80;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.scrollToTarget(target);
                
                // Закрываем мобильное меню
                this.closeMobileMenu();
            });
        });
    }
    
    scrollToTarget(target) {
        const element = document.querySelector(target);
        if (!element) return;
        
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - this.offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu() {
        const mobileMenu = document.getElementById('mobileMenu');
        const burger = document.getElementById('burgerMenu');
        
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
}

// ===== ИНИЦИАЛИЗАЦИЯ ВСЕГО =====
document.addEventListener('DOMContentLoaded', () => {
    // Очищаем localStorage чтобы убрать старые сохранения
    localStorage.removeItem('user-theme');
    localStorage.removeItem('preferred-theme');
    
    // Инициализируем все классы
    window.themeSwitcher = new ThemeSwitcher();
    window.mobileMenu = new MobileMenu();
    window.headerScroll = new HeaderScroll();
    window.smoothScroll = new SmoothScroll();
    
    console.log('🚀 Все системы запущены!');
    console.log('🎨 Текущая тема по времени:', window.themeSwitcher.currentTheme);
});

// Простые fallback функции
function initMobileMenuFallback() {
    const burger = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            burger.classList.add('active');
            document.body.classList.add('menu-open');
        });
        
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                burger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        const closeBtn = document.getElementById('closeMenu');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                burger.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }
    }
}

function initSimpleHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('header--hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header--hidden');
        } else if (currentScroll < lastScroll) {
            header.classList.remove('header--hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// Дублирующая инициализация для надежности
document.addEventListener('DOMContentLoaded', initMobileMenuFallback);
document.addEventListener('DOMContentLoaded', initSimpleHeaderScroll);
















////////////////////////////////////////////////////////////////////////////
// ===== BOOKING MODAL =====
class BookingModal {
    constructor() {
        this.modal = document.getElementById('bookingModal');
        this.closeBtn = document.getElementById('closeBookingModal');
        this.confirmBtn = document.getElementById('confirmBookingBtn');
        this.editBtn = document.getElementById('editBookingBtn');
        this.bookingForm = document.querySelector('.booking-form');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Обработчик отправки формы бронирования
        if (this.bookingForm) {
            this.bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm()) {
                    this.showModal();
                }
            });
        }
        
        // Закрытие модального окна
        this.closeBtn.addEventListener('click', () => {
            this.hideModal();
        });
        
        // Подтверждение бронирования
        this.confirmBtn.addEventListener('click', () => {
            this.handleConfirmation();
        });
        
        // Редактирование бронирования
        this.editBtn.addEventListener('click', () => {
            this.hideModal();
        });
        
        // Закрытие по клику на оверлей
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
        
        // Закрытие по Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.hideModal();
            }
        });
    }
    
    validateForm() {
        const inputs = this.bookingForm.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                this.showError(input, 'Это поле обязательно для заполнения');
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }
    
    showError(input, message) {
        this.clearError(input);
        
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        error.style.cssText = `
            color: #e53e3e;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        input.parentNode.appendChild(error);
        input.style.borderColor = '#e53e3e';
    }
    
    clearError(input) {
        const error = input.parentNode.querySelector('.form-error');
        if (error) {
            error.remove();
        }
        input.style.borderColor = '';
    }
    
    showModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Можно добавить отправку данных на сервер здесь
        console.log('Отправка данных бронирования...');
    }
    
    hideModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    handleConfirmation() {
        // Показываем анимацию загрузки
        this.confirmBtn.innerHTML = 'Обрабатываем...';
        this.confirmBtn.disabled = true;
        
        // Имитация отправки данных
        setTimeout(() => {
            this.confirmBtn.innerHTML = ' Готово!';
            
            setTimeout(() => {
                this.hideModal();
                this.resetForm();
                this.showSuccessMessage();
            }, 1000);
        }, 2000);
    }
    
    resetForm() {
        if (this.bookingForm) {
            this.bookingForm.reset();
        }
        
        // Восстанавливаем кнопку
        setTimeout(() => {
            this.confirmBtn.innerHTML = 'Понятно, жду звонка!';
            this.confirmBtn.disabled = false;
        }, 500);
    }
    
    showSuccessMessage() {
        // Можно добавить toast-уведомление здесь
        console.log(' Бронирование успешно отправлено!');
    }
}

// Инициализация модального окна бронирования
document.addEventListener('DOMContentLoaded', () => {
    window.bookingModal = new BookingModal();
});

// Простой fallback для формы бронирования
function initBookingFormFallback() {
    const bookingForm = document.querySelector('.booking-form');
    const bookingModal = document.getElementById('bookingModal');
    
    if (bookingForm && bookingModal) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            bookingModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
}

document.addEventListener('DOMContentLoaded', initBookingFormFallback);














////СКРЫТИЯ ФОТОГРФИЙ ГАЛЕРЕИ ПРОЛЕАМРОЬЕНРОШЛЕМОШЬКСАЕМОШКЕОШКСЕАМОШВКСАЕМОЧВКСАЕМОВАЕМПРЫЧВКЕАМПРСАП ВЕАПМ АЕНРП И 
// ===== ПРОСТОЙ ПЕРЕКЛЮЧАТЕЛЬ ГАЛЕРЕИ =====
class GalleryToggle {
    constructor() {
        this.isExpanded = false;
        this.visibleItems = 3; // Показываем только первый ряд (3 карточки)
        this.allItems = document.querySelectorAll('.gallery-item');
        this.toggleButton = document.getElementById('loadMorePhotos');
        this.galleryGrid = document.querySelector('.gallery-grid');
        
        this.init();
    }

    init() {
        this.hideExtraItems();
        this.bindEvents();
        this.setupStyles();
    }

    setupStyles() {
        // Добавляем стили для плавной анимации
        if (!document.getElementById('gallery-toggle-styles')) {
            const styles = `
                .gallery-item {
                    transition: all 0.5s ease-in-out !important;
                }
                .gallery-item.hidden {
                    opacity: 0 !important;
                    transform: translateY(20px) !important;
                    height: 0 !important;
                    margin: 0 !important;
                    overflow: hidden !important;
                }
                .gallery-grid {
                    transition: grid-template-rows 0.5s ease-in-out;
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = 'gallery-toggle-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }

    hideExtraItems() {
        this.allItems.forEach((item, index) => {
            if (index >= this.visibleItems) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });
    }

    showAllItems() {
        this.allItems.forEach(item => {
            item.classList.remove('hidden');
        });
    }

    bindEvents() {
        this.toggleButton.addEventListener('click', () => {
            this.toggleGallery();
        });
    }

    toggleGallery() {
        this.isExpanded = !this.isExpanded;
        
        if (this.isExpanded) {
            this.showAllItems();
            this.toggleButton.innerHTML = 'Спрятать фотографии <span class="btn-arrow">↑</span>';
        } else {
            this.hideExtraItems();
            this.toggleButton.innerHTML = 'Показать больше фотографий <span class="btn-arrow">↓</span>';
        }
        
        // Добавляем анимацию для кнопки
        this.animateButton();
    }

    animateButton() {
        this.toggleButton.classList.add('pulsing');
        setTimeout(() => {
            this.toggleButton.classList.remove('pulsing');
        }, 300);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    window.galleryToggle = new GalleryToggle();
});

// Fallback для надежности
function initGalleryToggleFallback() {
    const button = document.getElementById('loadMorePhotos');
    const items = document.querySelectorAll('.gallery-item');
    
    if (button && items.length > 3) {
        let isExpanded = false;
        
        // Сначала скрываем лишние карточки
        items.forEach((item, index) => {
            if (index >= 3) {
                item.style.display = 'none';
            }
        });
        
        button.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            items.forEach((item, index) => {
                if (index >= 3) {
                    if (isExpanded) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            if (isExpanded) {
                this.innerHTML = 'Спрятать фотографии <span class="btn-arrow">↑</span>';
            } else {
                this.innerHTML = 'Показать больше фотографий <span class="btn-arrow">↓</span>';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initGalleryToggleFallback);