function createVideoPair(video) {
    const pair = document.createElement('div');
    pair.className = 'video-pair';
    pair.innerHTML = `
        <h3>${video.name}</h3>
        <div class="video-row">
            <div class="video-container high-dopamine">
                <video muted loop autoplay playsinline controls width="300">
                    <source src="${video.src}" type="video/mp4">
                </video>
                <div class="video-label high-label">HIGH DOPAMINE 🚨</div>
            </div>
            <div class="video-container low-dopamine">
                <video muted loop autoplay playsinline controls width="300">
                    <source src="${video.src}" type="video/mp4">
                </video>
                <div class="video-label low-label">LOW DOPAMINE ✅</div>
            </div>
        </div>
    `;
    return pair;
}