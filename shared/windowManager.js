// windowManager.js

let topScopeWindow = window;
try {
    if (window.top && window.top.document) {
        topScopeWindow = window.top;
    }
} catch (e) {
    // Cross-origin blocked
}

if (!topScopeWindow.WindowManager) {
    const windows = {};
    topScopeWindow.WindowManager = {
        open: function(id) {
            windows[id] = { id: id, state: 'open' };
        },
        close: function(id) {
            delete windows[id];
        },
        focus: function(id) {
            // Keep it simple as requested
            if (windows[id]) {
                for (let k in windows) {
                    windows[k].focused = false;
                }
                windows[id].focused = true;
            }
        },
        minimize: function(id) {
            if (windows[id]) {
                windows[id].state = 'minimized';
            }
        },
        restore: function(id) {
            if (windows[id]) {
                windows[id].state = 'open';
            }
        },
        getWindows: function() {
            return Object.values(windows);
        }
    };
}

window.WindowManager = topScopeWindow.WindowManager;
