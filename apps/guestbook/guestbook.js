document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entries-container');
    const signBtn = document.getElementById('sign-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    
    // Dialog elements
    const dialogOverlay = document.getElementById('dialog-overlay');
    const formDialog = document.getElementById('form-dialog');
    const networkDialog = document.getElementById('network-dialog');
    const errorDialog = document.getElementById('error-dialog');
    const submitFormBtn = document.getElementById('submit-form-btn');
    
    const networkStatus = document.getElementById('network-status');
    const progressBar = document.getElementById('progress-bar');
    const errorMessage = document.getElementById('error-message');

    // Make closeDialogs available globally for onclick handlers
    window.closeDialogs = function() {
        dialogOverlay.style.display = 'none';
        if (formDialog) formDialog.style.display = 'none';
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
            const entries = await GuestbookService.listEntries(true);
            
            if (entries.length === 0) {
                entriesContainer.innerHTML = '<div style="text-align: center; color: #7b7b7b; margin-top: 20px;">No entries yet. Be the first to sign!</div>';
                return;
            }

            entriesContainer.innerHTML = '';
            
            entries.forEach(entry => {
                const card = document.createElement('div');
                card.className = 'entry-card';
                if (entry.theme) {
                    card.classList.add(`theme-${entry.theme}`);
                }
                
                let tagsHtml = '';
                if (entry.mood || entry.location) {
                    tagsHtml += '<div class="entry-tags">';
                    if (entry.mood) tagsHtml += `<span class="entry-tag">Mood: ${entry.mood}</span>`;
                    if (entry.location) tagsHtml += `<span class="entry-tag">Location: ${entry.location}</span>`;
                    tagsHtml += '</div>';
                }

                let nameHtml = entry.username;
                if (entry.visitorName) {
                    nameHtml = `${entry.visitorName} (@${entry.username})`;
                }

                let websiteHtml = '';
                if (entry.website) {
                    const cleanUrl = entry.website.startsWith('http') ? entry.website : `https://${entry.website}`;
                    websiteHtml = `<a href="${cleanUrl}" target="_blank" class="entry-website">${entry.website}</a>`;
                }

                card.innerHTML = `
                    <div class="entry-header">
                        <img src="${entry.avatar}" class="entry-avatar" alt="Avatar">
                        <div class="entry-meta">
                            <a href="${entry.profileUrl}" target="_blank" class="entry-username">${nameHtml}</a>
                            <span class="entry-date">${entry.date}</span>
                        </div>
                    </div>
                    <div class="entry-message">
                        ${tagsHtml}
                        ${websiteHtml ? websiteHtml + '<br><br>' : ''}
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
        
        // Reset form
        document.getElementById('gb-name').value = '';
        document.getElementById('gb-website').value = '';
        document.getElementById('gb-location').value = '';
        document.getElementById('gb-theme').value = '';
        document.getElementById('gb-mood').value = '';
        document.getElementById('gb-message').value = '';

        dialogOverlay.style.display = 'flex';
        formDialog.style.display = 'block';
    });

    refreshBtn.addEventListener('click', () => {
        if (window.top.SystemAPI && window.top.SystemAPI.playSound) {
            window.top.SystemAPI.playSound('click');
        }
        loadEntries();
    });

    submitFormBtn.addEventListener('click', () => {
        if (window.top.SystemAPI && window.top.SystemAPI.playSound) {
            window.top.SystemAPI.playSound('click');
        }
        
        const name = document.getElementById('gb-name').value.trim();
        const website = document.getElementById('gb-website').value.trim();
        const location = document.getElementById('gb-location').value.trim();
        const theme = document.getElementById('gb-theme').value;
        const mood = document.getElementById('gb-mood').value;
        const message = document.getElementById('gb-message').value.trim();

        if (!name) {
            alert('Name is required.');
            return;
        }
        
        if (!message) {
            alert('Message is required.');
            return;
        }

        const formData = { name, website, location, mood, theme, message };

        // Hide form, show network sequence
        formDialog.style.display = 'none';
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
                    window.open(GuestbookService.getSigningUrl(formData), '_blank');
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
