// Видео плейсхолдерге клик әрекеті - УДАЛЕНО

// Форманы жіберу функциясы - тек керек болса орындалады
const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Форма деректерін алу
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const rating = document.getElementById('rating').value;
        const message = document.getElementById('message').value;
        
        // Форманы тазалау
        this.reset();
    });
}

// Галерея функциялары
function showGalleryTab(tabName) {
    // Барлық таб контенттерін жасыру
    const allTabs = document.querySelectorAll('.gallery-tab-content');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Барлық таб батырмаларынан active классын алып тастау
    const allBtns = document.querySelectorAll('.tab-btn');
    allBtns.forEach(btn => btn.classList.remove('active'));
    
    // Таңдалған табты көрсету
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Таңдалған батырманы белсенді ету
    const selectedBtn = document.querySelector(`[onclick="showGalleryTab('${tabName}')"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
}

// Пікірлерді фильтрлеу
function filterReviews(filterType) {
    const reviews = document.querySelectorAll('.review');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Барлық батырмалардан active классын алып тастау
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let visibleCount = 0;
    
    reviews.forEach(review => {
        const rating = parseInt(review.dataset.rating);
        let shouldShow = false;
        
        switch(filterType) {
            case 'positive':
                shouldShow = rating >= 8;
                break;
            case 'negative':
                shouldShow = rating <= 6;
                break;
            case 'neutral':
                shouldShow = rating === 7;
                break;
            default:
                shouldShow = true;
        }
        
        if (shouldShow) {
            review.style.display = 'block';
            visibleCount++;
        } else {
            review.style.display = 'none';
        }
    });
    
    // Пагинацияны жаңарту
    updatePagination(visibleCount);
}

// Пагинацияны жаңарту
function updatePagination(visibleCount) {
    const pageInfo = document.querySelector('.page-info');
    const prevBtn = document.querySelector('.page-btn:first-child');
    const nextBtn = document.querySelector('.page-btn:last-child');
    
    if (pageInfo) {
        if (visibleCount === 0) {
            pageInfo.textContent = '0 отзыв';
        } else {
            pageInfo.textContent = `${visibleCount} отзыв`;
        }
    }
    
    // Батырмаларды әрқашан белсенді еместеу (бізде 1 бет ғана бар)
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
}

// Пікірлерді сұрыптау
function sortReviews() {
    const sortValue = document.getElementById('sort').value;
    const container = document.querySelector('.reviews-container');
    const reviews = Array.from(container.querySelectorAll('.review'));
    
    reviews.sort((a, b) => {
        switch(sortValue) {
            case 'rating-high':
                return parseInt(b.dataset.rating) - parseInt(a.dataset.rating);
            case 'rating-low':
                return parseInt(a.dataset.rating) - parseInt(b.dataset.rating);
            case 'newest':
                return b.dataset.date ? 1 : -1;
            case 'oldest':
                return a.dataset.date ? 1 : -1;
            case 'helpful':
                return b.dataset.helpful ? 1 : -1;
            default:
                return 0;
        }
    });
    
    // Сұрыпталған пікірлерді қайта орналастыру
    reviews.forEach(review => container.appendChild(review));
}

// Пагинация
function changePage(direction) {
    const pageInfo = document.querySelector('.page-info');
    const prevBtn = document.querySelector('.page-btn:first-child');
    const nextBtn = document.querySelector('.page-btn:last-child');
    
    let currentPage = parseInt(pageInfo.textContent.match(/\d+/)[0]);
    const totalPages = 5;
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    pageInfo.textContent = `${currentPage} бет / ${totalPages} бет`;
    
    // Батырмаларды белсенді/белсенді еместеу
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    // Бетті өзгерту эффектісі
    const container = document.querySelector('.reviews-container');
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.opacity = '1';
    }, 300);
}

// Пікірлерге дауыс беру
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('helpful-btn')) {
        const button = e.target;
        const isHelpful = button.textContent.includes('Пайдалы');
        const currentCount = parseInt(button.textContent.match(/\d+/)[0]);
        
        if (!button.disabled) {
            button.textContent = button.textContent.replace(/\d+/, currentCount + 1);
            button.disabled = true;
            button.style.opacity = '0.6';
            
            // Қарсы батырманы белсенді еместеу
            const siblingBtn = button.parentElement.querySelector('.helpful-btn:not(:disabled)');
            if (siblingBtn) {
                siblingBtn.disabled = true;
                siblingBtn.style.opacity = '0.6';
            }
        }
    }
});

// Галерея элементтеріне клик әрекеті
document.addEventListener('click', function(e) {
    if (e.target.closest('.gallery-item')) {
        const item = e.target.closest('.gallery-item');
        // Просто подсвечиваем элемент без сообщений
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 300);
    }
    
    if (e.target.closest('.video-item')) {
        const item = e.target.closest('.video-item');
        // Просто подсвечиваем элемент без сообщений
        item.style.transform = 'scale(1.05)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 300);
    }
});

// Суреттерге клик әрекеті
document.querySelectorAll('.gallery-container img').forEach(img => {
    img.addEventListener('click', function() {
        // Просто подсвечиваем изображение без сообщений
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        }, 300);
    });
});

// Бағалау таңдауын өзгерту
document.getElementById('rating').addEventListener('change', function() {
    const rating = this.value;
    const ratingText = {
        '5': 'Өте жақсы ⭐⭐⭐⭐⭐',
        '4': 'Жақсы ⭐⭐⭐⭐',
        '3': 'Қанағаттанарлық ⭐⭐⭐',
        '2': 'Орташа ⭐⭐',
        '1': 'Жаман ⭐'
    };
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
});

// Форма өрістеріне фокус оқиғасы
document.querySelectorAll('#feedbackForm input, #feedbackForm textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.style.backgroundColor = '#e8f4f8';
    });
    
    field.addEventListener('blur', function() {
        this.style.backgroundColor = '';
    });
});

// Кесте жолдарына hover эффект
document.querySelectorAll('table tr').forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Фактілер тізіміне интерактивтілік
document.querySelectorAll('#facts li').forEach((fact, index) => {
    fact.addEventListener('click', function() {
        const facts = [
            'Бұл фильм реалити-шоулардың болашағын болжады!',
            'Әрбір камера жылына 1 миллион доллар тұрған!',
            'Джим Керри осы рөл үшін "Алтын глобус" алған!',
            'Фильм 125 миллион доллар жинады!',
            'Труман қаласы Калифорнияда орналасқан!'
        ];
        
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
    });
    
    fact.style.cursor = 'pointer';
    fact.style.transition = 'background-color 0.3s ease';
});

// Скролл барын өзгерту
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (scrolled > 100) {
        header.style.backgroundColor = '#1a252f';
        header.style.transition = 'background-color 0.3s ease';
    } else {
        header.style.backgroundColor = '#2c3e50';
    }
});

// Уақытты көрсету функциясы
function showTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('kk-KZ');
    
    // Егер уақыт элементі жоқ болса, жасау
    if (!document.getElementById('clock')) {
        const clockDiv = document.createElement('div');
        clockDiv.id = 'clock';
        clockDiv.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            z-index: 1000;
        `;
        document.body.appendChild(clockDiv);
    }
    
    document.getElementById('clock').textContent = 'Қазіргі уақыт: ' + timeString;
}

// Әр секунд сайын уақытты жаңарту
setInterval(showTime, 1000);
showTime(); // Бірден көрсету
