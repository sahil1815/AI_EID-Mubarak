// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const backgroundAudio = new Audio('https://assets.mixkit.co/music/preview/mixkit-happy-eid-1156.mp3');
    const fireworkAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3');
    const eidTakbirAudio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

    // Set initial volumes
    backgroundAudio.volume = 0.3;
    fireworkAudio.volume = 0.5;
    eidTakbirAudio.volume = 0.7;

    // Sound control state
    let isSoundOn = true;
    const soundControl = document.getElementById('soundControl');
    const celebrateBtn = document.getElementById('celebrateBtn');

    // Verify elements exist before adding event listeners
    if (soundControl) {
        soundControl.addEventListener('click', function() {
            isSoundOn = !isSoundOn;

            if (isSoundOn) {
                soundControl.innerHTML = '<i class="fas fa-volume-up"></i>';
                backgroundAudio.play().catch(e => console.log("Audio play error:", e));
            } else {
                soundControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
                backgroundAudio.pause();
                fireworkAudio.pause();
                eidTakbirAudio.pause();
            }
        });
    }

    // Create stars
    function createStars() {
        const count = 50;
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = `${Math.random() * 3 + 1}px`;
            star.style.height = star.style.width;
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(star);
        }
    }

    // Create lanterns
    function createLanterns() {
        const count = 8;
        for (let i = 0; i < count; i++) {
            const lantern = document.createElement('div');
            lantern.className = 'lantern';
            lantern.style.left = `${Math.random() * 90}vw`;
            lantern.style.top = `${Math.random() * 30 + 60}vh`;
            lantern.style.animationDelay = `${Math.random() * 3}s`;
            document.body.appendChild(lantern);
        }
    }

    // Create fireworks
    function createFirework(x, y) {
        const colors = ['#ffbe76', '#f6e58d', '#ff7979', '#badc58', '#7ed6df'];
        const particleCount = 30;

        if (isSoundOn) {
            fireworkAudio.currentTime = 0;
            fireworkAudio.play().catch(e => console.log("Firework sound error:", e));
        }

        for (let i = 0; i < particleCount; i++) {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${x}px`;
            firework.style.top = `${y}px`;
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 50;
            const duration = Math.random() * 0.5 + 0.5;

            firework.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            firework.style.animationDuration = `${duration}s`;

            document.body.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, duration * 1000);
        }
    }

    // Initialize elements
    createStars();
    createLanterns();

    if (celebrateBtn) {
        celebrateBtn.addEventListener('click', function() {
            const btn = this;
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            if (isSoundOn) {
                eidTakbirAudio.currentTime = 0;
                eidTakbirAudio.play().catch(e => console.log("Takbir sound error:", e));
            }

            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    createFirework(
                        centerX + (Math.random() - 0.5) * 100,
                        centerY + (Math.random() - 0.5) * 100
                    );
                }, i * 300);
            }

            btn.textContent = 'Eid Mubarak!';
            setTimeout(() => {
                btn.textContent = 'Celebrate!';
            }, 2000);
        });
    }

    // Try to play background audio if sound is on
    if (isSoundOn) {
        backgroundAudio.play().catch(e => {
            console.log("Autoplay prevented. Will play after user interaction.");
        });
    }

    // Random fireworks occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight * 0.7
            );
        }
    }, 2000);

    // Enable audio after any user interaction
    document.body.addEventListener('click', function initAudio() {
        if (isSoundOn && backgroundAudio.paused) {
            backgroundAudio.play().catch(e => console.log("Initial play error:", e));
        }
        document.body.removeEventListener('click', initAudio);
    });
});