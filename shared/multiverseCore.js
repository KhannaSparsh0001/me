/**
 * MULTIVERSE CORE MASTER BUS // SPARSH KHANNA PORTFOLIO
 * Coordinates global persona tuning, cross-universe inventory synchronization,
 * Konami code reality glitch detection, and automatic resource injection.
 */

const Multiverse = (function() {
    let persona = localStorage.getItem('multiverse_persona') || 'explorer';

    // Automatically ensure multiverse.css is linked
    function ensureStyles() {
        if (!document.querySelector('link[href*="multiverse.css"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'shared/multiverse.css';
            document.head.appendChild(link);
        }
    }

    // Persona tuning
    function setPersona(newPersona) {
        persona = newPersona;
        localStorage.setItem('multiverse_persona', persona);
        document.documentElement.setAttribute('data-persona', persona);

        // Notify daemon
        if (window.BlinkyDaemon) {
            BlinkyDaemon.say(`Persona calibrated to: ${persona.toUpperCase()} mode.`);
        }
    }

    function getPersona() {
        return persona;
    }

    // Konami Code Detector: ↑ ↑ ↓ ↓ ← → ← → B A
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let konamiIndex = 0;

    function handleKeydown(e) {
        const key = e.key;
        if (key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
            konamiIndex++;
            if (konamiIndex === konamiSequence.length) {
                konamiIndex = 0;
                triggerRealityGlitch();
            }
        } else {
            konamiIndex = 0;
        }
    }

    // Reality Glitch: screen tearing, audio distortion, warp to secret.html
    function triggerRealityGlitch() {
        if (window.MultiverseRadio) {
            MultiverseRadio.tune('secret.html');
        } else {
            window.location.href = 'secret.html';
        }
    }

    // Auto-init on script load
    ensureStyles();
    document.documentElement.setAttribute('data-persona', persona);
    window.addEventListener('keydown', handleKeydown);

    const api = {
        setPersona: setPersona,
        getPersona: getPersona,
        glitch: triggerRealityGlitch
    };

    if (typeof window !== 'undefined') {
        window.Multiverse = api;
    }

    return api;
})();

if (typeof window !== 'undefined') {
    window.Multiverse = Multiverse;
}
