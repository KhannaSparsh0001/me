// processManager.js

if (!window.top.ProcessManager) {
    const processes = new Set();
    window.top.ProcessManager = {
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

window.ProcessManager = window.top.ProcessManager;
