document.addEventListener('DOMContentLoaded', () => {
    // Feature accordion
    const features = document.querySelectorAll('.feature-detail');
    features.forEach(feature => {
        const title = feature.querySelector('h3');
        if(title) {
            title.style.cursor = 'pointer';
            title.addEventListener('click', () => {
                const content = feature.querySelector('p');
                if(content) {
                    content.style.display = content.style.display === 'none' ? 'block' : 'none';
                }
            });
        }
    });
    
    // Video play button
    const playBtn = document.querySelector('.play-demo');
    if(playBtn) {
        playBtn.addEventListener('click', () => {
            const videoContainer = document.querySelector('.video-container');
            if(videoContainer) {
                videoContainer.innerHTML = `
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            }
        });
    }
});