const videosHighDopamine = [
    {
        name: "Cocomelon",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        name: "Baby Shark",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    },
    {
        name: "Galinha Pintadinha",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
    },
    {
        name: "Patrulha Canina",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    },
    {
        name: "Pocoyo",
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
    }
];

const videoGrid = document.getElementById('videoGrid');
let isTransformed = false;

function createVideoPair(video) {
    const pair = document.createElement('div');
    pair.className = 'video-pair';
    pair.innerHTML = `
        <h3>${video.name}</h3>
        <div class="video-row">
            <div class="video-container high-dopamine">
                <video muted loop autoplay>
                    <source src="${video.src}" type="video/mp4">
                </video>
                <div class="video-label high-label">HIGH DOPAMINE 🚨</div>
            </div>
            <div class="video-container low-dopamine">
                <video muted loop autoplay>
                    <source src="${video.src}" type="video/mp4">
                </video>
                <div class="video-label low-label">LOW DOPAMINE ✅</div>
            </div>
        </div>
    `;
    return pair;
}

// Carrega comparação ANTES/DEPOIS
videosHighDopamine.forEach(video => {
    const pair = createVideoPair(video);
    videoGrid.appendChild(pair);
});

// Botões de controle
document.getElementById('transformAll').addEventListener('click', () => {
    isTransformed = true;
    document.querySelectorAll('.video-container').forEach((container, index) => {
        setTimeout(() => {
            container.classList.add('low-dopamine');
            container.classList.remove('high-dopamine');
            container.querySelector('.video-label').textContent = 'LOW DOPAMINE ✅';
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
            container.querySelector('.video-label').textContent = 'HIGH DOPAMINE 🚨';
            container.querySelector('.video-label').className = 'video-label high-label';
        }, index * 200);
    });
});

// Demo automática a cada 8 segundos
setInterval(() => {
    if (!isTransformed) {
        document.getElementById('transformAll').click();
        setTimeout(() => {
            document.getElementById('resetAll').click();
        }, 4000);
    }
}, 8000);