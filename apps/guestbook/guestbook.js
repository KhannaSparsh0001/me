document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entries-container');
    const signBtn = document.getElementById('sign-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    
    // Dialog elements
    const dialogOverlay = document.getElementById('dialog-overlay');
    const infoDialog = document.getElementById('info-dialog');
    const networkDialog = document.getElementById('network-dialog');
    const errorDialog = document.getElementById('error-dialog');
    const continueBtn = document.getElementById('continue-btn');
    
    const networkStatus = document.getElementById('network-status');
    const progressBar = document.getElementById('progress-bar');
    const errorMessage = document.getElementById('error-message');

    // Make closeDialogs available globally for onclick handlers
    window.closeDialogs = function() {
        dialogOverlay.style.display = 'none';
        infoDialog.style.display = 'none';
        networkDialog.style.display = 'none';
        errorDialog.style.display = 'none';
    };

    function showError(msg) {
        window.closeDialogs();
        dialogOverlay.style.display = 'flex';
        errorDialog.style.display = 'block';
        if (msg) errorMessage.innerHTML = msg;
    }

    async function loadEntries() {
        entriesContainer.innerHTML = '<div style="text-align: center; color: #7b7b7b; margin-top: 20px;">Loading entries from GitHub...</div>';
        
        try {
            const entries = await GuestbookService.listEntries();
            
            if (entries.length === 0) {
                entriesContainer.innerHTML = '<div style="text-align: center; color: #7b7b7b; margin-top: 20px;">No entries yet. Be the first to sign!</div>';
                return;
            }

            entriesContainer.innerHTML = '';
            
            entries.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'entry-card';
                card.innerHTML = `
                    <div class="entry-header">
                        <img src="${entry.avatar}" class="entry-avatar" alt="Avatar">
                        <div class="entry-meta">
                            <a href="${entry.profileUrl}" target="_blank" class="entry-username">${entry.username}</a>
                            <span class="entry-date">${entry.date}</span>
                        </div>
                    </div>
                    <div class="entry-message">
                        ${entry.message}
                    </div>
                `;
                entriesContainer.appendChild(card);
            });
            
        } catch (error) {
            entriesContainer.innerHTML = '<div style="text-align: center; color: red; margin-top: 20px;">Failed to load entries.</div>';
            showError('Unable to contact GitHub.<br>The guest book is currently unavailable.');
        }
    }

    signBtn.addEventListener('click', () => {
        if (window.top.SystemAPI && window.top.SystemAPI.playSound) {
            window.top.SystemAPI.playSound('click');
        }
        window.closeDialogs();
        dialogOverlay.style.display = 'flex';
        infoDialog.style.display = 'block';
    });

    refreshBtn.addEventListener('click', () => {
        if (window.top.SystemAPI && window.top.SystemAPI.playSound) {
            window.top.SystemAPI.playSound('click');
        }
        loadEntries();
    });

    continueBtn.addEventListener('click', () => {
        if (window.top.SystemAPI && window.top.SystemAPI.playSound) {
            window.top.SystemAPI.playSound('click');
        }
        
        // Hide info, show network sequence
        infoDialog.style.display = 'none';
        networkDialog.style.display = 'block';
        
        networkStatus.innerText = "Dialing github.com...";
        progressBar.innerHTML = '';
        
        let blocks = 0;
        const maxBlocks = 20; // 20 blocks to fill
        
        const interval = setInterval(() => {
            if (blocks >= maxBlocks) {
                clearInterval(interval);
                networkStatus.innerText = "Connection established. Redirecting...";
                setTimeout(() => {
                    window.open(GuestbookService.getSigningUrl(), '_blank');
                    window.closeDialogs();
                }, 500);
                return;
            }
            
            const block = document.createElement('div');
            block.className = 'progress-block';
            progressBar.appendChild(block);
            blocks++;
            
            if (blocks === 10) {
                networkStatus.innerText = "Initializing secure connection...";
            }
            if (blocks === 15) {
                networkStatus.innerText = "Please wait...";
            }
        }, 150); // Fast retro fake load
    });

    // Register with ProcessManager if running inside the OS
    if (window.top && window.top.ProcessManager) {
        window.top.ProcessManager.register("GuestBook.exe");
        window.addEventListener("unload", () => {
            if (window.top && window.top.ProcessManager) {
                window.top.ProcessManager.unregister("GuestBook.exe");
            }
        });
    }

    // Initial load
    loadEntries();
});
