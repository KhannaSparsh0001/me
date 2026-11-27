/**
 * MULTIVERSE ANALOG RADIO & WARP ENGINE
 * Synthesizes dynamic procedural static and frequency sweeping via Web Audio API,
 * manages rotary dial rotation, and executes physical CRT desync warp transitions.
 */

const MultiverseRadio = (function () {
    let audioCtx = null;
    let isMuted = localStorage.getItem('multiverse_muted') === 'true';

    const CHANNELS = [
        { id: 'win95', freq: '95.4 MHz', name: 'Windows 95 OS', file: 'index.html', icon: '⊞' },
        { id: 'terminal', freq: '101.3 MHz', name: 'Linux Bash Shell', file: 'terminal.html', icon: '$' },
        { id: 'arcade', freq: '86.0 MHz', name: '1986 Arcade Cabinet', file: 'arcade.html', icon: '🕹' },
        { id: 'newspaper', freq: '19.24 MHz', name: 'The Daily Khanna', file: 'newspaper.html', icon: '📰' },
        { id: 'neural', freq: '432.0 MHz', name: 'Neural Latent Space', file: 'neural.html', icon: '🧠' },
        { id: 'hn', freq: '133.7 MHz', name: 'Ask HN Community', file: 'hacker-news.html', icon: 'Y' },
        { id: 'fintech', freq: '500.0 MHz', name: 'HFT Trading Terminal', file: 'modern-fintech.html', icon: '▲' },
        { id: 'space', freq: '108.0 MHz', name: 'Orbital Observatory', file: 'space-theme.html', icon: '✦' },
        { id: 'studio', freq: '88.5 MHz', name: 'Isometric Studio', file: 'isometric-studio.html', icon: '⬡' },
        { id: 'codex', freq: '33.3 MHz', name: '16-Bit Obsidian RPG', file: 'obsidian-codex.html', icon: '⚔' }
    ];

    function initAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    }

    // Synthesize authentic radio static noise & carrier burst
    function playRadioSweep() {
        if (isMuted) return;
        initAudio();

        const now = audioCtx.currentTime;
        const duration = 0.32;

        // 1. White & Brown Noise Buffer
        const bufferSize = audioCtx.sampleRate * duration;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02; // Brown noise filter
            lastOut = data[i];
            data[i] += (Math.random() - 0.5) * 0.15; // Mixed burst
        }

        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(800, now);
        noiseFilter.frequency.exponentialRampToValueAtTime(3200, now + duration * 0.6);
        noiseFilter.frequency.exponentialRampToValueAtTime(400, now + duration);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.08, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioCtx.destination);
        noiseNode.start(now);
        noiseNode.stop(now + duration);

        // 2. High-Frequency Carrier Squeal / Tuning Chirp
        const carrierOsc = audioCtx.createOscillator();
        const carrierGain = audioCtx.createGain();
        carrierOsc.type = 'sawtooth';
        carrierOsc.frequency.setValueAtTime(1800, now);
        carrierOsc.frequency.exponentialRampToValueAtTime(350, now + duration);

        carrierGain.gain.setValueAtTime(0.03, now);
        carrierGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        carrierOsc.connect(carrierGain);
        carrierGain.connect(audioCtx.destination);
        carrierOsc.start(now);
        carrierOsc.stop(now + duration);
    }

    // Detect current channel from window.location
    function getCurrentChannel() {
        const path = window.location.pathname;
        const currentFile = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return CHANNELS.find(c => c.file === currentFile) || CHANNELS[0];
    }

    function tuneTo(targetFile) {
        const targetChannel = CHANNELS.find(c => c.file === targetFile);
        if (targetChannel) {
            localStorage.setItem('multiverse_last_channel', targetChannel.id);
        }

        playRadioSweep();

        // Trigger CRT Desync Wipe
        const overlay = document.getElementById('multiverse-warp-overlay');
        if (overlay) {
            overlay.classList.add('active');
        }

        setTimeout(() => {
            window.location.href = targetFile;
        }, 260);
    }

    function warpRandom() {
        const current = getCurrentChannel();
        const pool = CHANNELS.filter(c => c.file !== current.file);
        const randomTarget = pool[Math.floor(Math.random() * pool.length)];
        tuneTo(randomTarget.file);
    }

    function toggleMute() {
        isMuted = !isMuted;
        localStorage.setItem('multiverse_muted', isMuted);
        const btn = document.getElementById('radio-mute-btn');
        if (btn) btn.innerText = isMuted ? '🔇 MUTED' : '🔊 AUDIO';
    }

    function renderUI() {
        if (document.querySelector('.multiverse-radio-anchor')) return;

        const current = getCurrentChannel();

        // 1. Warp Transition Overlay
        let overlay = document.getElementById('multiverse-warp-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'multiverse-warp-overlay';
            document.body.appendChild(overlay);
        }

        // 2. Rotary Dial Anchor
        const container = document.createElement('div');
        container.className = 'multiverse-radio-anchor';

        const channelItemsHTML = CHANNELS.map(c => `
            <div class="channel-item ${c.id === current.id ? 'active' : ''}" onclick="MultiverseRadio.tune('${c.file}')">
                <span>${c.icon} ${c.name}</span>
                <span class="channel-freq">${c.freq}</span>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="frequency-aperture-panel" id="radio-aperture">
                <div class="aperture-header">
                    <span>MULTIVERSE TUNER</span>
                    <span>TUNE FREQUENCY</span>
                </div>
                <div class="frequency-display-bar">
                    <span id="current-tuning-freq">${current.freq}</span>
                    <span id="current-tuning-name" style="font-size:11px; color:#58a6ff">${current.name}</span>
                </div>
                <div class="channel-list">
                    ${channelItemsHTML}
                </div>
                <div class="aperture-footer">
                    <button class="aperture-btn" id="radio-mute-btn" onclick="MultiverseRadio.toggleMute()">
                        ${isMuted ? '🔇 MUTED' : '🔊 AUDIO'}
                    </button>
                    <button class="aperture-btn" onclick="MultiverseRadio.warpRandom()">
                        ⚡ WARP
                    </button>
                    <button class="aperture-btn" onclick="MultiverseInventory.openModal()">
                        🎒 BACKPACK
                    </button>
                </div>
            </div>

            <div class="radio-dial-knob" id="radio-dial-btn" title="Tune Multiverse (Click to expand)" onclick="MultiverseRadio.toggleAperture()">
                <div class="dial-ridges"></div>
                <div class="dial-needle" id="radio-dial-needle"></div>
                <div class="dial-center-badge">${current.icon}</div>
            </div>
        `;

        document.body.appendChild(container);
    }

    function toggleAperture() {
        const panel = document.getElementById('radio-aperture');
        const needle = document.getElementById('radio-dial-needle');
        if (panel) {
            const isOpen = panel.classList.toggle('open');
            if (needle) {
                needle.style.transform = isOpen ? 'rotate(45deg)' : 'rotate(0deg)';
            }
        }
    }

    // Auto-init on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderUI);
    } else {
        renderUI();
    }

    const api = {
        tune: tuneTo,
        warpRandom: warpRandom,
        toggleMute: toggleMute,
        toggleAperture: toggleAperture,
        channels: CHANNELS
    };

    if (typeof window !== 'undefined') {
        window.MultiverseRadio = api;
    }

    return api;
})();

if (typeof window !== 'undefined') {
    window.MultiverseRadio = MultiverseRadio;
}
