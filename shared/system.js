// system.js

if (!window.top.SystemAPI) {
    const bootTime = Date.now();
    let visitorCount = "Unavailable";
    
    // Free APIs are hanging/broken. We sync with the instant simulated retro counter in localStorage.
    let count = localStorage.getItem("retro_visitor_count");
    if (count) {
        visitorCount = String(count).padStart(6, "0");
    } else {
        visitorCount = "Error";
    }

    window.top.SystemAPI = {
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

window.SystemAPI = window.top.SystemAPI;
