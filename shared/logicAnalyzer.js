/**
 * LIVE ESP32 LOGIC ANALYZER // SPARSH KHANNA PORTFOLIO
 * Real-time 60fps digital logic oscilloscope simulating hardware UART & SPI traces
 * with live MPU6050 collision interrupt decoding.
 */

const LogicAnalyzer = (function() {
    let isRunning = true;
    let baudRate = 115200;
    let shockActive = false;
    let timeStep = 0;

    function renderModal() {
        let modal = document.getElementById('logic-analyzer-modal');
        if (modal) return;

        modal = document.createElement('div');
        modal.id = 'logic-analyzer-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 92vw;
            max-width: 780px;
            background: #090d14;
            border: 2px solid #56f0e0;
            border-radius: 12px;
            padding: 18px;
            z-index: 999996;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(86, 240, 224, 0.3);
            font-family: 'JetBrains Mono', monospace;
            color: #e6edf3;
            flex-direction: column;
            gap: 12px;
        `;

        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #30363d; padding-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="color:#56f0e0; font-weight:700;">⚡ ESP32 LOGIC ANALYZER</span>
                    <span style="font-size:11px; color:#8b949e;">[Sigrok / PulseView Mode]</span>
                </div>
                <button onclick="LogicAnalyzer.close()" style="background:transparent; border:none; color:#8b949e; cursor:pointer; font-size:18px;">✕</button>
            </div>

            <canvas id="la-canvas" width="740" height="220" style="background:#04070c; border:1px solid #21262d; border-radius:6px; width:100%; height:220px;"></canvas>

            <div style="display:flex; justify-content:space-between; align-items:center; background:#161b22; padding:8px 12px; border-radius:6px; font-size:11px;">
                <div>
                    <span style="color:#8b949e">DECODED PROTOCOL:</span>
                    <span id="la-decoded" style="color:#39d353; font-weight:700; margin-left:6px;">UART: [0x53, 0x4B, 0x2D, 0x4F, 0x4B] "SK-OK"</span>
                </div>
                <div style="color:#f2cc60;">
                    LATENCY: <strong>94 ms</strong> (ISR TRIGGER)
                </div>
            </div>

            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between;">
                <div style="display:flex; gap:8px;">
                    <button id="la-trigger-btn" onclick="LogicAnalyzer.triggerShock()" style="background:rgba(255,42,133,0.2); border:1px solid #ff2a85; color:#ff2a85; font-family:inherit; font-size:11px; padding:6px 12px; border-radius:4px; cursor:pointer; font-weight:700;">
                        💥 TRIGGER COLLISION SHOCK
                    </button>
                    <button onclick="LogicAnalyzer.toggleRun()" style="background:#21262d; border:1px solid #30363d; color:#e6edf3; font-family:inherit; font-size:11px; padding:6px 12px; border-radius:4px; cursor:pointer;">
                        ⏯ PAUSE / RUN
                    </button>
                </div>
                <div style="font-size:11px; color:#8b949e;">
                    BAUD: <strong style="color:#56f0e0">115200 8N1</strong>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        initCanvas();
    }

    function initCanvas() {
        const canvas = document.getElementById('la-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        function drawWaveform() {
            if (!isRunning) {
                requestAnimationFrame(drawWaveform);
                return;
            }

            timeStep += 2;
            const w = canvas.width;
            const h = canvas.height;

            ctx.clearRect(0, 0, w, h);

            // Channel definitions
            const channels = [
                { name: 'CH0: UART_TX', color: '#56f0e0', y: 35 },
                { name: 'CH1: UART_RX', color: '#39d353', y: 85 },
                { name: 'CH2: INT_SHOCK', color: '#ff2a85', y: 135 },
                { name: 'CH3: SPI_CLK', color: '#f2cc60', y: 185 }
            ];

            // Draw grid & channels
            channels.forEach((ch, cIdx) => {
                ctx.fillStyle = '#8b949e';
                ctx.font = '10px monospace';
                ctx.fillText(ch.name, 10, ch.y - 12);

                // Baseline
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                ctx.beginPath();
                ctx.moveTo(80, ch.y);
                ctx.lineTo(w, ch.y);
                ctx.stroke();

                // Digital Trace
                ctx.strokeStyle = ch.color;
                ctx.lineWidth = 1.8;
                ctx.beginPath();

                for (let x = 80; x < w; x += 6) {
                    let high = false;
                    const phase = (x + timeStep) * 0.05;

                    if (cIdx === 0) {
                        // UART TX data stream
                        high = Math.sin(phase) > 0.1 || Math.cos(phase * 1.5) > 0.3;
                    } else if (cIdx === 1) {
                        // UART RX ack
                        high = Math.sin(phase * 0.8) > 0.4;
                    } else if (cIdx === 2) {
                        // Shock interrupt (Normally HIGH, drops LOW on impact)
                        high = shockActive ? (Math.random() > 0.7) : true;
                    } else if (cIdx === 3) {
                        // SPI Clock
                        high = ((x + timeStep) % 12) < 6;
                    }

                    const waveY = high ? ch.y - 14 : ch.y;
                    if (x === 80) {
                        ctx.moveTo(x, waveY);
                    } else {
                        ctx.lineTo(x, waveY);
                    }
                }
                ctx.stroke();
            });

            requestAnimationFrame(drawWaveform);
        }

        requestAnimationFrame(drawWaveform);
    }

    function triggerShock() {
        shockActive = true;
        const decodedElem = document.getElementById('la-decoded');
        if (decodedElem) {
            decodedElem.innerText = 'UART: [0x53, 0x4B, 0x2D, 0x53, 0x4F, 0x53] "SK-SOS" // EMERGENCY PACKET DISPATCHED!';
            decodedElem.style.color = '#ff2a85';
        }
        if (window.BlinkyDaemon) {
            BlinkyDaemon.say('💥 MPU6050 Collision interrupt tripped! Automated SOS packet streaming over UART.');
        }

        setTimeout(() => {
            shockActive = false;
            if (decodedElem) {
                decodedElem.innerText = 'UART: [0x53, 0x4B, 0x2D, 0x4F, 0x4B] "SK-OK"';
                decodedElem.style.color = '#39d353';
            }
        }, 3200);
    }

    function toggleRun() {
        isRunning = !isRunning;
    }

    function openModal() {
        renderModal();
        const m = document.getElementById('logic-analyzer-modal');
        if (m) m.style.display = 'flex';
    }

    function closeModal() {
        const m = document.getElementById('logic-analyzer-modal');
        if (m) m.style.display = 'none';
    }

    const api = {
        open: openModal,
        close: closeModal,
        triggerShock: triggerShock,
        toggleRun: toggleRun
    };

    if (typeof window !== 'undefined') {
        window.LogicAnalyzer = api;
    }

    return api;
})();

if (typeof window !== 'undefined') {
    window.LogicAnalyzer = LogicAnalyzer;
}
