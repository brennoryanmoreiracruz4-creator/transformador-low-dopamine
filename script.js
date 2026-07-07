const defaultVideos = [
    {
        name: "Cocomelon",
        src: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        name: "Baby Shark",
        src: "https://www.w3schools.com/html/movie.mp4"
    },
    {
        name: "Galinha Pintadinha",
        src: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
        name: "Patrulha Canina",
        src: "https://www.w3schools.com/html/movie.mp4"
    },
    {
        name: "Pocoyo",
        src: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
];

let allVideos = [...defaultVideos];
let selectedVideos = [...defaultVideos];
let selectedSlots = {};
const videoGrid = document.getElementById('videoGrid');
let isTransformed = false;

// ============= CARREGAR DADOS SALVOS =============
function loadSavedData() {
    const savedAll = localStorage.getItem('allVideos');
    const savedSlots = localStorage.getItem('selectedSlots');
    
    if (savedAll) {
        try {
            allVideos = JSON.parse(savedAll);
        } catch (e) {
            console.error('Erro ao carregar vídeos salvos');
        }
    }
    
    if (savedSlots) {
        try {
            selectedSlots = JSON.parse(savedSlots);
        } catch (e) {
            console.error('Erro ao carregar slots salvos');
        }
    }
    
    updateSelectedVideos();
    renderVideos();
}

// ============= ATUALIZAR VÍDEOS SELECIONADOS =============
function updateSelectedVideos() {
    selectedVideos = [];
    for (let i = 0; i < 5; i++) {
        if (selectedSlots[i] !== undefined) {
            selectedVideos.push(allVideos[selectedSlots[i]]);
        } else {
            selectedVideos.push(allVideos[i] || defaultVideos[i]);
        }
    }
}

// ============= UPLOAD DE VÍDEOS =============
document.getElementById('addVideoBtn').addEventListener('click', () => {
    document.getElementById('videoInput').click();
});

document.getElementById('videoInput').addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const videoData = {
                name: file.name.replace(/\.[^/.]+$/, ''),
                src: event.target.result
            };
            allVideos.push(videoData);
            localStorage.setItem('allVideos', JSON.stringify(allVideos));
            renderVideoSelector();
        };
        reader.readAsDataURL(file);
    });
    
    e.target.value = '';
});

// ============= RENDERIZAR SELETOR DE VÍDEOS =============
function renderVideoSelector() {
    const selectorGrid = document.getElementById('videoSelectorGrid');
    selectorGrid.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
        const card = document.createElement('div');
        card.className = 'video-selector-card';
        
        let selectHTML = `
            <h3>Slot ${i + 1}</h3>
            <select onchange="selectVideoForSlot(${i}, this.value)">
                <option value="-1">-- Selecione um vídeo --</option>
        `;
        
        allVideos.forEach((video, index) => {
            const selected = selectedSlots[i] === index ? 'selected' : '';
            selectHTML += `<option value="${index}" ${selected}>${video.name}</option>`;
        });
        
        selectHTML += '</select>';
        card.innerHTML = selectHTML;
        selectorGrid.appendChild(card);
    }
}

// ============= SELECIONAR VÍDEO PARA SLOT =============
function selectVideoForSlot(slotIndex, videoIndex) {
    videoIndex = parseInt(videoIndex);
    
    if (videoIndex === -1) {
        delete selectedSlots[slotIndex];
    } else {
        selectedSlots[slotIndex] = videoIndex;
    }
    
    localStorage.setItem('selectedSlots', JSON.stringify(selectedSlots));
    updateSelectedVideos();
    renderVideos();
}

// ============= RENDERIZAR VÍDEOS =============
function renderVideos() {
    videoGrid.innerHTML = '';
    selectedVideos.forEach((video, index) => {
        const pair = createVideoPair(video, index);
        videoGrid.appendChild(pair);
    });
}

// ============= CRIAÇÃO DE VÍDEOS =============
function createVideoPair(video, index) {
    const pair = document.createElement('div');
    pair.className = 'video-pair';
    pair.innerHTML = `
        <h3>Slot ${index + 1}</h3>
        <div class="video-row">
            <div class="video-container high-dopamine">
                <video muted loop autoplay playsinline controls>
                    <source src="${video.src}" type="video/mp4">
                </video>
                <div class="video-label high-label">ALTA DOPAMINA 🚨</div>
            </div>
            <div class="video-container low-dopamine">
                <video muted loop autoplay playsinline controls>
                    <source src="${video.src}" type="video/mp4">
                </video>
                <div class="video-label low-label">BAIXA DOPAMINA ✅</div>
            </div>
        </div>
    `;
    return pair;
}

// Carregar dados ao iniciar
loadSavedData();

// ============= NAVEGAÇÃO ENTRE SEÇÕES =============
function hideAllSections() {
    document.getElementById('videoSection').classList.remove('section-active');
    document.getElementById('videoSection').classList.add('section-hidden');
    document.getElementById('configureSection').classList.remove('section-active');
    document.getElementById('configureSection').classList.add('section-hidden');
    document.getElementById('dashboardSection').classList.remove('section-active');
    document.getElementById('dashboardSection').classList.add('section-hidden');
    document.getElementById('focusTestSection').classList.remove('section-active');
    document.getElementById('focusTestSection').classList.add('section-hidden');
    document.getElementById('scienceSection').classList.remove('section-active');
    document.getElementById('scienceSection').classList.add('section-hidden');
}

document.getElementById('configureVideosBtn').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('configureSection').classList.add('section-active');
    document.getElementById('configureSection').classList.remove('section-hidden');
    renderVideoSelector();
});

document.getElementById('openDashboard').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('dashboardSection').classList.add('section-active');
    document.getElementById('dashboardSection').classList.remove('section-hidden');
    document.getElementById('scienceSection').classList.add('section-active');
    document.getElementById('scienceSection').classList.remove('section-hidden');
    initDashboardCharts();
});

document.getElementById('openFocusTest').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('focusTestSection').classList.add('section-active');
    document.getElementById('focusTestSection').classList.remove('section-hidden');
});

document.getElementById('backFromConfig').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('videoSection').classList.add('section-active');
    document.getElementById('videoSection').classList.remove('section-hidden');
    document.getElementById('scienceSection').classList.add('section-active');
    document.getElementById('scienceSection').classList.remove('section-hidden');
});

document.getElementById('backFromDashboard').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('videoSection').classList.add('section-active');
    document.getElementById('videoSection').classList.remove('section-hidden');
    document.getElementById('scienceSection').classList.add('section-active');
    document.getElementById('scienceSection').classList.remove('section-hidden');
});

document.getElementById('backFromTest').addEventListener('click', () => {
    hideAllSections();
    document.getElementById('videoSection').classList.add('section-active');
    document.getElementById('videoSection').classList.remove('section-hidden');
    document.getElementById('scienceSection').classList.add('section-active');
    document.getElementById('scienceSection').classList.remove('section-hidden');
});

// ============= CONTROLES DE VÍDEO =============
document.getElementById('transformAll').addEventListener('click', () => {
    isTransformed = true;
    document.querySelectorAll('.video-container').forEach((container, index) => {
        setTimeout(() => {
            container.classList.add('low-dopamine');
            container.classList.remove('high-dopamine');
            container.querySelector('.video-label').textContent = 'BAIXA DOPAMINA ✅';
            container.querySelector('.video-label').className = 'video-label low-label';
        }, index * 200);
    });
});

document.getElementById('resetAll').addEventListener('click', () => {
    isTransformed = false;
    document.querySelectorAll('.video-container').forEach((container, index) => {
        setTimeout(() => {
            container.classList.add('high-dopamine');
            container.classList.remove('low-dopamine');
            container.querySelector('.video-label').textContent = 'ALTA DOPAMINA 🚨';
            container.querySelector('.video-label').className = 'video-label high-label';
        }, index * 200);
    });
});

// ============= DASHBOARD COM CHARTS =============
let charts = {};

function initDashboardCharts() {
    if (Object.keys(charts).length > 0) return;

    const ctx1 = document.getElementById('saturationChart').getContext('2d');
    charts.saturation = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Alta Dopamina', 'Baixa Dopamina'],
            datasets: [{
                label: 'Saturação (%)',
                data: [200, 30],
                backgroundColor: ['#ff4444', '#44ff44'],
                borderColor: ['#ff0000', '#00ff00'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: 'white' } }
            },
            scales: {
                y: { ticks: { color: 'white' }, max: 250 }
            }
        }
    });

    const ctx2 = document.getElementById('contrastChart').getContext('2d');
    charts.contrast = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Alta Dopamina', 'Baixa Dopamina'],
            datasets: [{
                label: 'Contraste (%)',
                data: [130, 80],
                backgroundColor: ['#ff6666', '#66ff66'],
                borderColor: ['#ff0000', '#00ff00'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: 'white' } }
            },
            scales: {
                y: { ticks: { color: 'white' }, max: 150 }
            }
        }
    });

    const ctx3 = document.getElementById('brightnessChart').getContext('2d');
    charts.brightness = new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Alta Dopamina', 'Baixa Dopamina'],
            datasets: [{
                label: 'Brilho (%)',
                data: [110, 90],
                backgroundColor: ['#ffaa44', '#44aaff'],
                borderColor: ['#ff6600', '#0066ff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: 'white' } }
            },
            scales: {
                y: { ticks: { color: 'white' }, max: 130 }
            }
        }
    });

    const ctx4 = document.getElementById('cutsChart').getContext('2d');
    charts.cuts = new Chart(ctx4, {
        type: 'bar',
        data: {
            labels: ['Alta Dopamina', 'Baixa Dopamina'],
            datasets: [{
                label: 'Duração de Cortes (segundos)',
                data: [1.5, 7.5],
                backgroundColor: ['#ee82ee', '#90ee90'],
                borderColor: ['#ff00ff', '#00ff00'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { labels: { color: 'white' } }
            },
            scales: {
                y: { ticks: { color: 'white' }, max: 10 }
            }
        }
    });
}

// ============= TESTE DE FOCO =============
let focusTestActive = false;
let focusTestTime = 30;
let clicks1 = 0, clicks2 = 0;
let hits1 = 0, hits2 = 0;
let currentActiveTarget = null;
let targetIndex = 0;

function generateRandomPosition(container) {
    const containerRect = container.getBoundingClientRect();
    const x = Math.random() * (containerRect.width - 50);
    const y = Math.random() * (containerRect.height - 50);
    return { x, y };
}

function startFocusTest() {
    if (focusTestActive) return;
    focusTestActive = true;
    focusTestTime = 30;
    clicks1 = 0;
    clicks2 = 0;
    hits1 = 0;
    hits2 = 0;
    currentActiveTarget = null;
    targetIndex = 0;

    document.getElementById('startTest').disabled = true;
    document.getElementById('testResults').style.display = 'none';

    const target1 = document.getElementById('clickTarget1');
    const target2 = document.getElementById('clickTarget2');
    const container1 = document.querySelector('.high-dopamine-test video');
    const container2 = document.querySelector('.low-dopamine-test video');

    function showRandomTarget(target, container) {
        if (!focusTestActive) return;
        const pos = generateRandomPosition(container.parentElement);
        target.style.left = pos.x + 'px';
        target.style.top = pos.y + 'px';
        target.classList.add('active');
    }

    // Alternar entre alvos a cada 2 segundos (UM DE CADA VEZ)
    const targetInterval = setInterval(() => {
        if (focusTestActive) {
            // Esconder o alvo anterior
            if (currentActiveTarget) {
                currentActiveTarget.classList.remove('active');
            }
            
            // Mostrar o novo alvo alternadamente
            if (targetIndex % 2 === 0) {
                showRandomTarget(target1, container1);
                currentActiveTarget = target1;
            } else {
                showRandomTarget(target2, container2);
                currentActiveTarget = target2;
            }
            targetIndex++;
        }
    }, 2000);

    // Mostrar o primeiro alvo
    showRandomTarget(target1, container1);
    currentActiveTarget = target1;

    target1.addEventListener('click', () => {
        if (focusTestActive && target1.classList.contains('active')) {
            clicks1++;
            hits1++;
            document.getElementById('clicks1').textContent = clicks1;
            document.getElementById('accuracy1').textContent = Math.round((hits1 / clicks1) * 100) + '%';
            target1.classList.remove('active');
            currentActiveTarget = null;
        }
    });

    target2.addEventListener('click', () => {
        if (focusTestActive && target2.classList.contains('active')) {
            clicks2++;
            hits2++;
            document.getElementById('clicks2').textContent = clicks2;
            document.getElementById('accuracy2').textContent = Math.round((hits2 / clicks2) * 100) + '%';
            target2.classList.remove('active');
            currentActiveTarget = null;
        }
    });

    const countdownInterval = setInterval(() => {
        focusTestTime--;
        document.getElementById('startTest').textContent = `⏱️ ${focusTestTime}s`;

        if (focusTestTime <= 0) {
            focusTestActive = false;
            clearInterval(countdownInterval);
            clearInterval(targetInterval);
            target1.classList.remove('active');
            target2.classList.remove('active');

            const result1 = clicks1 > 0 ? Math.round((hits1 / clicks1) * 100) : 0;
            const result2 = clicks2 > 0 ? Math.round((hits2 / clicks2) * 100) : 0;

            const conclusion = result2 > result1 
                ? `✅ Você focou MELHOR na versão BAIXA DOPAMINA! (${result2}% vs ${result1}%)`
                : result1 > result2
                ? `⚠️ Você focou melhor na ALTA DOPAMINA, mas sinta-se hiperativado!`
                : `🤔 Foco semelhante nas duas versões!`;

            document.getElementById('testConclusion').textContent = conclusion;
            document.getElementById('testResults').style.display = 'block';
            document.getElementById('startTest').textContent = '▶️ Iniciar Teste (30s)';
            document.getElementById('startTest').disabled = false;
        }
    }, 1000);
}

document.getElementById('startTest').addEventListener('click', startFocusTest);
