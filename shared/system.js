// system.js

let topScopeSystem = window;
try {
    if (window.top && window.top.document) {
        topScopeSystem = window.top;
    }
} catch (e) {
    // Cross-origin blocked
}

if (!topScopeSystem.SystemAPI) {
    const bootTime = Date.now();
    let visitorCount = "Unavailable";
    
    // Fetch visitor count and store it globally
    fetch("https://api.countapi.xyz/hit/sparsh-monitor/system")
        .then(r => r.json())
        .then(data => {
            visitorCount = data.value;
        })
        .catch(() => {
            visitorCount = "N/A";
        });

    topScopeSystem.SystemAPI = {
        getBootTime: function() {
            return bootTime;
        },
        getUptime: function() {
            return Math.floor((Date.now() - bootTime) / 1000);
        },
        getVisitorCount: function() {
            return visitorCount;
        },
        getVersion: function() {
            return "1.0.0";
        }
    };
}

window.SystemAPI = topScopeSystem.SystemAPI;
