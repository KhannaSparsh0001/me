const $ = (id) => document.getElementById(id);

// Register process
window.ProcessManager.register("Monitor.exe");
window.addEventListener("unload", () => {
    window.ProcessManager.unregister("Monitor.exe");
});

/* ---------------------- Browser ---------------------- */

function detectBrowser() {

    const ua = navigator.userAgent;

    if (ua.includes("Firefox"))
        return "Firefox " + ua.match(/Firefox\/([\d.]+)/)[1];

    if (ua.includes("Edg"))
        return "Edge " + ua.match(/Edg\/([\d.]+)/)[1];

    if (ua.includes("Chrome"))
        return "Chrome " + ua.match(/Chrome\/([\d.]+)/)[1];

    if (ua.includes("Safari"))
        return "Safari";

    return "Unknown";

}

/* ---------------------- OS ---------------------- */

function detectOS() {

    const ua = navigator.userAgent;

    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone")) return "iOS";

    return "Unknown";

}

/* ---------------------- System ---------------------- */

function updateSystem(){

    $("browser").textContent=detectBrowser();

    $("os").textContent=detectOS();

    $("cores").textContent=navigator.hardwareConcurrency||"Unknown";

    $("ram").textContent=
        navigator.deviceMemory
        ? navigator.deviceMemory+" GB"
        : "Unknown";

    $("language").textContent=navigator.language;

    $("timezone").textContent=
        Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone;

}

/* ---------------------- Display ---------------------- */

function updateDisplay(){

    $("resolution").textContent=
        `${screen.width} × ${screen.height}`;

    $("viewport").textContent=
        `${innerWidth} × ${innerHeight}`;

    $("depth").textContent=
        screen.colorDepth+" bit";

    $("ratio").textContent=
        window.devicePixelRatio.toFixed(2);

}

/* ---------------------- Network ---------------------- */

function updateNetwork(){

    $("online").textContent=
        navigator.onLine ? "Online":"Offline";

    const led=$("led");

    if(navigator.onLine){

        led.style.background="#00ff00";
        led.style.boxShadow="0 0 8px lime";

        $("statusText").textContent="System Healthy";

    }else{

        led.style.background="red";
        led.style.boxShadow="0 0 8px red";

        $("statusText").textContent="Offline";

    }

    const c=navigator.connection||
            navigator.mozConnection||
            navigator.webkitConnection;

    if(c){

        $("connection").textContent=
            c.effectiveType||"Unknown";

        $("speed").textContent=
            c.downlink
            ? c.downlink+" Mbps"
            :"Unknown";

        $("ping").textContent=
            c.rtt
            ? c.rtt+" ms"
            :"Unknown";

    }

}

/* ---------------------- Battery ---------------------- */

async function updateBattery(){

    if(!navigator.getBattery){

        $("battery").textContent="Unavailable";
        return;

    }

    const b=await navigator.getBattery();

    const pct=Math.round(b.level*100);

    const txt=b.charging
        ?"Charging"
        :"Discharging";

    $("battery").textContent=
        `${pct}% (${txt})`;

}

/* ---------------------- Clock ---------------------- */

function updateClock(){

    $("clock").textContent=
        new Date().toLocaleTimeString();

}

/* ---------------------- Uptime ---------------------- */

function updateUptime(){
    
    if (!window.SystemAPI) return;

    const elapsed = window.SystemAPI.getUptime();

    const h=Math.floor(elapsed/3600);
    const m=Math.floor((elapsed%3600)/60);
    const s=elapsed%60;

    $("uptime").textContent=
        `${String(h).padStart(2,"0")}:`+
        `${String(m).padStart(2,"0")}:`+
        `${String(s).padStart(2,"0")}`;
}

/* ---------------------- Visitors ---------------------- */

function updateVisitors(){
    if (window.SystemAPI) {
        $("visitors").textContent = window.SystemAPI.getVisitorCount();
    } else {
        $("visitors").textContent = "Unavailable";
    }
}

function updateManagers(){
    if (window.ProcessManager) {
        const processes = window.ProcessManager.getProcesses();
        const el = $("processesCount");
        if (el) el.textContent = processes.length;
    }
    
    if (window.WindowManager) {
        const windows = window.WindowManager.getWindows();
        const el = $("windowsCount");
        if (el) el.textContent = windows.length;
    }

    if (window.SystemAPI) {
        const el = $("versionText");
        if (el) el.textContent = "Portfolio v" + window.SystemAPI.getVersion();
    }
}

/* ---------------------- CPU & Memory ---------------------- */

function animateCPU(){
    const usage = Math.floor(Math.random() * 20) + 2; // 2% to 21%
    const el = $("cpu");
    if(el) el.textContent = usage + "%";
    const bar = $("cpuBar");
    if(bar) bar.style.width = usage + "%";
}

function animateMemory(){
    const usage = Math.floor(Math.random() * 5) + 32; // 32% to 36%
    const el = $("memory");
    if(el) el.textContent = usage + "%";
    const bar = $("memoryBar");
    if(bar) bar.style.width = usage + "%";
}

/* ---------------------- Init ---------------------- */

function init(){

updateSystem();

updateDisplay();

updateNetwork();

updateBattery();

updateVisitors();

updateClock();
updateUptime();
updateManagers();

animateCPU();
animateMemory();

}

init();

/* ---------------------- Live Updates ---------------------- */

setInterval(()=>{
    updateClock();
    updateDisplay();
    updateNetwork();
    updateUptime();
    updateVisitors();
    updateManagers();
    animateCPU();
    animateMemory();
},1000);