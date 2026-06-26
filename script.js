// ==================== DADOS DO PROJETO ====================
const curiosities = [
    "A cevada é um dos grãos cultivados há mais tempo pela humanidade e segue tendo grande importância econômica e alimentar.",
    "O malte é produzido através de um processo chamado malteação, que envolve embebição, germinação e secagem da cevada.",
    "Guarapuava é conhecida como a 'Capital do Malte' no Brasil, sendo um dos maiores produtores de cevada do país.",
    "A sustentabilidade na produção de cevada envolve práticas como rotação de culturas, manejo do solo e uso consciente de água.",
    "O malte é utilizado não apenas em bebidas, mas também na indústria alimentícia e farmacêutica.",
    "A cadeia produtiva do malte gera milhares de empregos diretos e indiretos na região de Guarapuava.",
    "A tecnologia moderna permite aumentar a produtividade mantendo o respeito ao meio ambiente.",
    "O campo e a cidade estão conectados através da cadeia produtiva, mostrando interdependência econômica."
];

const carouselData = [
    {
        image: './img/Campo.png',
        title: 'Campo de cevada',
        description: 'O início da jornada acontece no campo, onde o cultivo da cevada depende de planejamento, clima favorável e cuidado com os recursos naturais.'
    },
    {
        image: './img/Malte.png',
        title: 'Transformação em malte',
        description: 'Após a colheita, o grão passa por processos técnicos que unem agro, indústria e tecnologia para gerar valor e qualidade.'
    },
    {
        image: './img/Cidade.png',
        title: 'Campo e cidade conectados',
        description: 'O malte conecta produção, economia e consumo, mostrando como o campo impacta diretamente a vida urbana e o desenvolvimento sustentável.'
    }
];

// ==================== VARIÁVEIS GLOBAIS ====================
let currentCarouselIndex = 0;
let usedCuriosities = new Set();
let fontSizeMultiplier = 1;
let isHighContrast = false;

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeAccessibility();
    initializeCarousel();
    initializeCuriosities();
    initializeQuiz();
    initializeAccordion();
    loadAccessibilitySettings();
});

// ==================== NAVEGAÇÃO ====================
function initializeNavigation() {
    const navMoreBtn = document.getElementById('nav-more-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuLinks = navMenu.querySelectorAll('a');

    navMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('hidden');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.add('hidden');
        });
    });

    document.addEventListener('click', (e) => {
        if (!navMoreBtn.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.add('hidden');
        }
    });
}

// ==================== ACESSIBILIDADE ====================
function initializeAccessibility() {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    const accessibilityMenu = document.getElementById('accessibility-menu');
    const fontIncreaseBtn = document.getElementById('font-increase');
    const fontDecreaseBtn = document.getElementById('font-decrease');
    const contrastToggleBtn = document.getElementById('contrast-toggle');

    accessibilityBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        accessibilityMenu.classList.toggle('hidden');
    });

    fontIncreaseBtn.addEventListener('click', () => {
        fontSizeMultiplier = Math.min(fontSizeMultiplier + 0.1, 1.5);
        applyFontSize();
        saveAccessibilitySettings();
    });

    fontDecreaseBtn.addEventListener('click', () => {
        fontSizeMultiplier = Math.max(fontSizeMultiplier - 0.1, 0.8);
        applyFontSize();
        saveAccessibilitySettings();
    });

    contrastToggleBtn.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        applyContrast();
        saveAccessibilitySettings();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            accessibilityMenu.classList.add('hidden');
        }
    });

    document.addEventListener('click', (e) => {
        if (!accessibilityBtn.contains(e.target) && !accessibilityMenu.contains(e.target)) {
            accessibilityMenu.classList.add('hidden');
        }
    });
}

function applyFontSize() {
    const baseFontSize = 16;
    document.body.style.fontSize = (baseFontSize * fontSizeMultiplier) + 'px';
}

function applyContrast() {
    if (isHighContrast) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}

function saveAccessibilitySettings() {
    localStorage.setItem('fontSizeMultiplier', fontSizeMultiplier);
    localStorage.setItem('isHighContrast', isHighContrast);
}

function loadAccessibilitySettings() {
    const savedFontSize = localStorage.getItem('fontSizeMultiplier');
    const savedContrast = localStorage.getItem('isHighContrast');

    if (savedFontSize) {
        fontSizeMultiplier = parseFloat(savedFontSize);
        applyFontSize();
    }

    if (savedContrast === 'true') {
        isHighContrast = true;
        applyContrast();
    }
}

// ==================== CAROUSEL ====================
function initializeCarousel() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicators = document.querySelectorAll('.indicator');

    prevBtn.addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselData.length) % carouselData.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselData.length;
        updateCarousel();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentCarouselIndex = index;
            updateCarousel();
        });
    });

    // Auto-rotate carousel every 5 seconds
    setInterval(() => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselData.length;
        updateCarousel();
    }, 5000);

    updateCarousel();
}

function updateCarousel() {
    const data = carouselData[currentCarouselIndex];
    const image = document.getElementById('carousel-image');
    const title = document.getElementById('carousel-title');
    const description = document.getElementById('carousel-description');
    const indicators = document.querySelectorAll('.indicator');

    image.src = data.image;
    image.alt = data.title;
    title.textContent = data.title;
    description.textContent = data.description;

    indicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// ==================== CURIOSIDADES ====================
function initializeCuriosities() {
    const factBtn = document.getElementById('fact-btn');
    factBtn.addEventListener('click', showRandomCuriosity);
    showRandomCuriosity();
}

function showRandomCuriosity() {
    if (usedCuriosities.size === curiosities.length) {
        usedCuriosities.clear();
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * curiosities.length);
    } while (usedCuriosities.has(randomIndex));

    usedCuriosities.add(randomIndex);
    const factText = document.getElementById('fact-text');
    factText.textContent = curiosities[randomIndex];
}

// ==================== QUIZ ====================
function initializeQuiz() {
    const quizSubmitBtn = document.getElementById('quiz-submit');
    const quizRestartBtn = document.getElementById('quiz-restart');

    quizSubmitBtn.addEventListener('click', submitQuiz);
    quizRestartBtn.addEventListener('click', restartQuiz);
}

function submitQuiz() {
    const form = document.getElementById('quiz-form');
    const questions = form.querySelectorAll('.quiz-question');
    let correctAnswers = 0;

    questions.forEach((question, index) => {
        const selectedOption = question.querySelector('input[type="radio"]:checked');
        if (selectedOption && selectedOption.value === 'certo') {
            correctAnswers++;
        }
    });

    const totalQuestions = questions.length;
    const percentage = (correctAnswers / totalQuestions) * 100;

    const resultDiv = document.getElementById('quiz-result');
    const scoreText = document.getElementById('result-score');
    const messageText = document.getElementById('result-message');

    scoreText.textContent = `Você acertou ${correctAnswers} de ${totalQuestions} questões (${percentage.toFixed(0)}%)`;

    if (percentage === 100) {
        messageText.textContent = '🌟 Parabéns! Você é um especialista na cadeia produtiva do malte!';
    } else if (percentage >= 80) {
        messageText.textContent = '🎉 Excelente! Você compreendeu muito bem o tema!';
    } else if (percentage >= 60) {
        messageText.textContent = '👍 Bom trabalho! Você tem uma boa compreensão do tema.';
    } else if (percentage >= 40) {
        messageText.textContent = '📚 Continue estudando! Há mais para aprender sobre o tema.';
    } else {
        messageText.textContent = '💪 Não desista! Releia o conteúdo e tente novamente.';
    }

    form.classList.add('hidden');
    resultDiv.classList.remove('hidden');
    window.scrollTo({ top: resultDiv.offsetTop - 100, behavior: 'smooth' });
}

function restartQuiz() {
    const form = document.getElementById('quiz-form');
    const resultDiv = document.getElementById('quiz-result');
    const inputs = form.querySelectorAll('input[type="radio"]');

    inputs.forEach(input => {
        input.checked = false;
    });

    form.classList.remove('hidden');
    resultDiv.classList.add('hidden');
    window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
}

// ==================== ACCORDION ====================
function initializeAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isHidden = content.classList.contains('hidden');

            // Close all other accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.add('hidden');
            });

            // Open the clicked item if it was closed
            if (isHidden) {
                content.classList.remove('hidden');
            }
        });
    });
}

// ==================== UTILITÁRIOS ====================
function hideElement(element) {
    element.classList.add('hidden');
}

function showElement(element) {
    element.classList.remove('hidden');
}

// ==================== EVENT LISTENERS ADICIONAIS ====================
// Sincronizar acessibilidade com HQ incorporada
window.addEventListener('message', (event) => {
    if (event.data.type === 'accessibility-sync') {
        // Sincronizar configurações com a HQ
        const hqFrame = document.querySelector('.hq-iframe');
        if (hqFrame) {
            hqFrame.contentWindow.postMessage({
                type: 'apply-accessibility',
                fontSizeMultiplier: fontSizeMultiplier,
                isHighContrast: isHighContrast
            }, '*');
        }
    }
});

const carouselData = [
    {
        image: './Campo.png',
        title: 'Campo de cevada',
        description: 'O início da jornada acontece no campo...'
    },
    {
        image: './Malte.png',
        title: 'Transformação em malte',
        description: 'Após a colheita, o grão passa por processos...'
    },
    {
        image: './Cidade.png',
        title: 'Campo e cidade conectados',
        description: 'O malte conecta produção, economia e consumo...'
    }
];

