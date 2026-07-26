// processManager.js

let topScope = window;
try {
    if (window.top && window.top.document) {
        topScope = window.top;
    }
} catch (e) {
    // Cross-origin blocked
}

if (!topScope.ProcessManager) {
    const processes = new Set();
    topScope.ProcessManager = {
        register: function(processName) {
            processes.add(processName);
        },
        unregister: function(processName) {
            processes.delete(processName);
        },
        getProcesses: function() {
            return Array.from(processes);
        }
    };
}

window.ProcessManager = topScope.ProcessManager;
