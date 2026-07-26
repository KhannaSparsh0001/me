const $ = (id) => document.getElementById(id);

let cpu = 18;
let memory = 46;

const startTime = Date.now();

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

    const elapsed=Math.floor((Date.now()-startTime)/1000);

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

fetch("https://api.countapi.xyz/hit/sparsh-monitor/system")

.then(r=>r.json())

.then(data=>{

$("visitors").textContent=data.value;

})

.catch(()=>{

$("visitors").textContent="N/A";

});

}

/* ---------------------- CPU ---------------------- */

function animateCPU(){

    cpu += (Math.random()-0.5)*8;

    cpu=Math.max(4,Math.min(88,cpu));

    $("cpu").textContent=
        Math.round(cpu)+"%";

    $("cpuBar").style.width=
        cpu+"%";

}

/* ---------------------- Memory ---------------------- */

function animateMemory(){

    memory += (Math.random()-0.5)*3;

    memory=Math.max(25,Math.min(82,memory));

    $("memory").textContent=
        Math.round(memory)+"%";

    $("memoryBar").style.width=
        memory+"%";

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

animateCPU();

animateMemory();

},1000);