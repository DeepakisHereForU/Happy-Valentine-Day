document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const boyCharacter = document.getElementById('boyCharacter');
    const girlCharacter = document.getElementById('girlCharacter');
    const boySpeech = document.getElementById('boySpeech');
    const girlSpeech = document.getElementById('girlSpeech');
    const proposalBox = document.getElementById('proposalBox');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const openGiftBtn = document.getElementById('openGift');
    const giftMessage = document.getElementById('giftMessage');
    const progressFill = document.getElementById('progressFill');
    const celebrationArea = document.getElementById('celebrationArea');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musicBtn = document.getElementById('musicBtn');
    const animateBtn = document.getElementById('animateBtn');
    const bgMusic = document.getElementById('bgMusic');
    const heartSound = document.getElementById('heartSound');
    const celebrationSound = document.getElementById('celebrationSound');
    
    // Variables
    let currentStep = 1;
    let totalSteps = 4;
    let isMusicPlaying = false;
    let partnerName = getParameterByName('name') || 'Deepika';
    
    // Update partner name in speech bubble
    document.querySelector('.partner-name').textContent = partnerName;
    
    // Initialize
    init();
    
    function init() {
        // Start the story
        setTimeout(startStory, 1000);
        
        // Setup event listeners
        setupEventListeners();
        
        // Create animated hearts
        createFloatingHearts();
        
        // Setup progress bar
        updateProgressBar();
    }
    
    function startStory() {
        // Boy character speaks first
        setTimeout(() => {
            boySpeech.classList.add('show');
            playHeartSound();
            
            // Girl responds
            setTimeout(() => {
                girlSpeech.classList.add('show');
                
                // Show proposal box
                setTimeout(() => {
                    boySpeech.classList.remove('show');
                    girlSpeech.classList.remove('show');
                    setTimeout(() => {
                        proposalBox.style.display = 'block';
                        animateCharactersToCenter();
                        updateStep(3);
                    }, 500);
                }, 2000);
            }, 1500);
        }, 1000);
    }
    
    function animateCharactersToCenter() {
        // Move characters to center
        boyCharacter.style.left = '35%';
        boyCharacter.style.bottom = '150px';
        boyCharacter.style.transform = 'scale(1.2)';
        
        girlCharacter.style.right = '35%';
        girlCharacter.style.bottom = '150px';
        girlCharacter.style.transform = 'scale(1.2)';
        
        // Add floating hearts between them
        createLoveHearts();
    }
    
    function setupEventListeners() {
        // Yes button
        yesBtn.addEventListener('click', handleYesClick);
        
        // No button (fun interaction)
        noBtn.addEventListener('click', handleNoClick);
        
        // Gift box
        openGiftBtn.addEventListener('click', openGift);
        
        // Navigation buttons
        prevBtn.addEventListener('click', goToPreviousStep);
        nextBtn.addEventListener('click', goToNextStep);
        
        // Music button
        musicBtn.addEventListener('click', toggleMusic);
        
        // Animate button
        animateBtn.addEventListener('click', triggerSpecialAnimation);
        
        // Make no button move on hover
        noBtn.addEventListener('mouseenter', () => {
            const x = Math.random() * 100 - 50;
            const y = Math.random() * 100 - 50;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
    
    function handleYesClick() {
        // Celebration!
        celebrationArea.classList.remove('hidden');
        proposalBox.style.display = 'none';
        
        // Play celebration sound
        celebrationSound.play().catch(e => console.log("Audio error:", e));
        
        // Start celebration animations
        startCelebration();
        
        // Update progress
        updateStep(4);
        
        // Create fireworks
        createFireworks();
        createConfetti();
        
        // Animate characters dancing
        animateDancingCharacters();
    }
    
    function handleNoClick() {
        const messages = [
            "Are you sure? 🥺",
            "But I really like you! 💕",
            "Give me a chance! 😢",
            "My heart is breaking... 💔",
            "Please? 🥺",
            "OK, I'll ask nicer... 💖"
        ];
        
        staticNoClicks = staticNoClicks || 0;
        
        if (staticNoClicks < messages.length) {
            const proposalText = document.querySelector('.proposal-text');
            proposalText.textContent = messages[staticNoClicks];
            staticNoClicks++;
            
            // Make yes button bigger
            const currentScale = 1 + staticNoClicks * 0.1;
            yesBtn.style.transform = `scale(${currentScale})`;
            
            // Make no button jump
            noBtn.style.animation = 'none';
            setTimeout(() => {
                noBtn.style.animation = 'bounce 0.5s';
            }, 10);
        } else {
            // Reset after all messages
            staticNoClicks = 0;
            document.querySelector('.proposal-text').textContent = 
                "I want to make every day feel like Valentine's with you!";
            yesBtn.style.transform = 'scale(1)';
        }
        
        playHeartSound();
    }
    
    let staticNoClicks = 0;
    
    function openGift() {
        // Animate gift opening
        const giftBox = document.getElementById('giftBox');
        const giftLid = document.querySelector('.gift-lid');
        
        giftLid.style.transform = 'rotateX(-90deg) translateY(-60px)';
        giftLid.style.transition = 'transform 0.5s ease';
        
        // Show gift message
        setTimeout(() => {
            giftMessage.classList.remove('hidden');
            openGiftBtn.style.display = 'none';
            
            // Animate gift contents
            const hearts = document.querySelectorAll('.gift-heart');
            hearts.forEach((heart, index) => {
                setTimeout(() => {
                    heart.style.animation = 'floatUp 1s ease-out forwards';
                    setTimeout(() => {
                        heart.style.opacity = '0';
                    }, 1000);
                }, index * 300);
            });
        }, 500);
        
        playHeartSound();
    }
    
    function startCelebration() {
        // Animate celebration text
        const celebrationText = document.querySelector('.celebration-text');
        celebrationText.style.animation = 'colorChange 2s infinite alternate';
        
        // Make characters dance
        const dancers = document.querySelectorAll('.dancer');
        dancers.forEach(dancer => {
            dancer.style.animation = 'dance 0.5s infinite alternate';
        });
    }
    
    function createFireworks() {
        const fireworks = document.querySelector('.fireworks');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.style.position = 'absolute';
                firework.style.left = Math.random() * 100 + '%';
                firework.style.top = Math.random() * 100 + '%';
                firework.style.width = '4px';
                firework.style.height = '4px';
                firework.style.background = getRandomColor();
                firework.style.borderRadius = '50%';
                firework.style.boxShadow = '0 0 10px currentColor';
                fireworks.appendChild(firework);
                
                // Animate
                const explosion = firework.animate([
                    { transform: 'scale(0)', opacity: 0 },
                    { transform: 'scale(1)', opacity: 1 },
                    { transform: 'scale(3)', opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out'
                });
                
                explosion.onfinish = () => firework.remove();
            }, i * 100);
        }
    }
    
    function createConfetti() {
        const confettiArea = document.querySelector('.confetti');
        const confettiColors = ['#ff3366', '#ff6b8b', '#ff8e9e', '#4a69bd', '#6a89cc'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'absolute';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
                confetti.style.borderRadius = '2px';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                confettiArea.appendChild(confetti);
                
                // Animate falling
                const fall = confetti.animate([
                    { transform: `translateY(-100px) rotate(0deg)`, opacity: 0 },
                    { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 2000 + 1000,
                    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                });
                
                fall.onfinish = () => confetti.remove();
            }, i * 30);
        }
    }
    
    function animateDancingCharacters() {
        // Make original characters dance
        boyCharacter.style.animation = 'dance 0.5s infinite alternate';
        girlCharacter.style.animation = 'dance 0.5s infinite alternate 0.25s';
        
        // Move them closer
        boyCharacter.style.left = '40%';
        girlCharacter.style.right = '40%';
    }
    
    function createFloatingHearts() {
        const container = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💕', '💖', '💘', '💝'][Math.floor(Math.random() * 5)];
            heart.style.position = 'absolute';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.opacity = '0.7';
            heart.style.zIndex = '0';
            heart.style.pointerEvents = 'none';
            container.appendChild(heart);
            
            // Animate
            const animation = heart.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 0 },
                { transform: 'translateY(-20px) rotate(180deg)', opacity: 1 },
                { transform: 'translateY(-40px) rotate(360deg)', opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                delay: i * 300,
                iterations: Infinity
            });
        }
    }
    
    function createLoveHearts() {
        const interval = setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.left = '45%';
            heart.style.bottom = '180px';
            heart.style.fontSize = '20px';
            heart.style.zIndex = '10';
            heart.style.pointerEvents = 'none';
            document.querySelector('.character-scene').appendChild(heart);
            
            // Animate heart floating up
            const animation = heart.animate([
                { transform: 'translateY(0) scale(1)', opacity: 1 },
                { transform: 'translateY(-100px) scale(1.5)', opacity: 0 }
            ], {
                duration: 2000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            animation.onfinish = () => heart.remove();
        }, 800);
        
        // Store interval ID for cleanup
        window.loveHeartsInterval = interval;
    }
    
    function playHeartSound() {
        heartSound.currentTime = 0;
        heartSound.play().catch(e => console.log("Audio error:", e));
    }
    
    function toggleMusic() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i> Play Music';
        } else {
            bgMusic.volume = 0.3;
            bgMusic.play().catch(e => {
                console.log("Autoplay prevented:", e);
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Click to Play';
            });
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i> Pause Music';
        }
        isMusicPlaying = !isMusicPlaying;
    }
    
    function triggerSpecialAnimation() {
        // Create special heart explosion
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'fixed';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.fontSize = '30px';
                heart.style.zIndex = '1000';
                heart.style.pointerEvents = 'none';
                document.body.appendChild(heart);
                
                const angle = (i / 50) * Math.PI * 2;
                const distance = 200;
                
                const animation = heart.animate([
                    { 
                        transform: 'translate(-50%, -50%) scale(1)',
                        opacity: 1
                    },
                    { 
                        transform: `translate(
                            calc(-50% + ${Math.cos(angle) * distance}px),
                            calc(-50% + ${Math.sin(angle) * distance}px)
                        ) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 1500,
                    easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
                });
                
                animation.onfinish = () => heart.remove();
            }, i * 30);
        }
        
        playHeartSound();
    }
    
    function updateStep(step) {
        currentStep = step;
        updateProgressBar();
        updateStepIndicators();
    }
    
    function goToPreviousStep() {
        if (currentStep > 1) {
            updateStep(currentStep - 1);
            // Add step-specific logic here
        }
    }
    
    function goToNextStep() {
        if (currentStep < totalSteps) {
            updateStep(currentStep + 1);
            // Add step-specific logic here
        }
    }
    
    function updateProgressBar() {
        const percentage = (currentStep / totalSteps) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    function updateStepIndicators() {
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    function getRandomColor() {
        const colors = ['#ff3366', '#ff6b8b', '#ff8e9e', '#4a69bd', '#6a89cc', '#f8b400'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    function getParameterByName(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }
    
    // Easter egg: secret message in console
    console.log(`💝 Dear ${partnerName}, you make every day special! 💝`);
    console.log(`🎮 Pro tip: Try hovering over the "No" button!`);
});
