/**
 * "BLINKY" CLIENT-SIDE AGENTIC DAEMON // SPARSH KHANNA PORTFOLIO
 * A deterministic finite state machine (FSM) companion that observes visitor focus,
 * analyzes page dwell time, offers contextual engineering telemetry, and bridges universes.
 */

const BlinkyDaemon = (function() {
    let state = 'IDLE'; // IDLE | OBSERVING | INTERVENING | RESONATING
    let dwellTimer = null;
    let visitCount = parseInt(localStorage.getItem('multiverse_visit_count') || '0') + 1;
    localStorage.setItem('multiverse_visit_count', visitCount);

    const INSIGHTS = {
        general: [
            "Systems nominal. I am Blinky, Sparsh's autonomous client-side agent daemon.",
            "Exploring the multiverse? Use the radio tuner at the bottom-right to shift frequencies.",
            "State Winner at India Skill Competition 2024. Tap me anytime for engineering dossiers."
        ],
        gndu: "Placement telemetry verified: +200% student throughput surge achieved across 10+ corporate recruitment drives (TCS, KPMG, Nagarro).",
        esp32: "ESP32 firmware active: 94ms UART sensor fusion response with FreeRTOS task prioritization.",
        langgraph: "LangGraph state machine active: Directed Acyclic Graph with memory checkpoint rollback loops.",
        secret: "Detecting anomalous frequency harmonics. Have you entered the Konami code (↑↑↓↓←→←→BA) yet?"
    };

    function renderUI() {
        if (document.querySelector('.blinky-daemon-anchor')) return;

        const anchor = document.createElement('div');
        anchor.className = 'blinky-daemon-anchor';

        anchor.innerHTML = `
            <div class="blinky-orb" id="blinky-orb" title="Blinky (Agentic Daemon) - Click for telemetry" onclick="BlinkyDaemon.handleClick()">
                AI
            </div>
            <div class="blinky-speech-bubble" id="blinky-bubble">
                <span id="blinky-text">...</span>
            </div>
        `;

        document.body.appendChild(anchor);
    }

    function say(text, duration = 6500) {
        renderUI();
        const bubble = document.getElementById('blinky-bubble');
        const textElem = document.getElementById('blinky-text');
        if (bubble && textElem) {
            textElem.innerText = text;
            bubble.classList.add('show');
            if (dwellTimer) clearTimeout(dwellTimer);
            dwellTimer = setTimeout(() => {
                bubble.classList.remove('show');
            }, duration);
        }
    }

    function handleClick() {
        if (visitCount > 3) {
            say(INSIGHTS.secret);
        } else {
            const randomMsg = INSIGHTS.general[Math.floor(Math.random() * INSIGHTS.general.length)];
            say(randomMsg);
        }
    }

    // Telemetry observation observer
    function observePageContext() {
        renderUI();

        // Welcome trigger based on visit count
        setTimeout(() => {
            if (visitCount === 1) {
                say("Welcome to Sparsh's living portfolio multiverse! I am Blinky, your autonomous client daemon.", 6000);
            } else if (visitCount === 5) {
                say("5 universe transitions logged. Dimensional coherence anchor holding steady at 98.4%.", 5000);
            }
        }, 1200);

        // Hover listeners on tech keywords
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('[data-cat], .tech-chip, code, .tag');
            if (target) {
                const text = target.innerText.toLowerCase();
                if (text.includes('esp32') || text.includes('iot')) {
                    say(INSIGHTS.esp32, 4500);
                } else if (text.includes('langgraph') || text.includes('rag') || text.includes('agent')) {
                    say(INSIGHTS.langgraph, 4500);
                } else if (text.includes('placement') || text.includes('gndu')) {
                    say(INSIGHTS.gndu, 4500);
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observePageContext);
    } else {
        observePageContext();
    }

    const api = {
        say: say,
        handleClick: handleClick
    };

    if (typeof window !== 'undefined') {
        window.BlinkyDaemon = api;
    }

    return api;
})();

if (typeof window !== 'undefined') {
    window.BlinkyDaemon = BlinkyDaemon;
}
