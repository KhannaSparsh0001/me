// system.js

if (!window.top.SystemAPI) {
    const bootTime = Date.now();
    let visitorCount = "Unavailable";
    
    // Fetch visitor count and store it globally
    fetch("https://api.counterapi.dev/v1/sparshkhanna/retroresume")
        .then(r => r.json())
        .then(data => {
            if (data && data.count) {
                visitorCount = data.count;
            } else {
                visitorCount = "Error";
            }
        })
        .catch(() => {
            visitorCount = "Error";
        });

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
