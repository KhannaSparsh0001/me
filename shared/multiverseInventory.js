/**
 * MULTIVERSE INVENTORY & CROSS-WORLD ARG ENGINE // SPARSH KHANNA PORTFOLIO
 * Tracks artifacts collected across dimensions and enables cross-universe interaction.
 */

const MultiverseInventory = (function() {
    const DEFAULT_ITEMS = [
        { id: 'press_badge', name: 'Press Pass', icon: '📰', desc: 'Accredited correspondent badge from The Daily Khanna.' },
        { id: 'arcade_token', name: '25¢ Token', icon: '🪙', desc: 'Solid brass token minted for the 1986 Outrun cabinet.' }
    ];

    function getItems() {
        try {
            const raw = localStorage.getItem('multiverse_inventory');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) return parsed;
            }
            return JSON.parse(JSON.stringify(DEFAULT_ITEMS));
        } catch (e) {
            return JSON.parse(JSON.stringify(DEFAULT_ITEMS));
        }
    }

    function saveItems(items) {
        try {
            localStorage.setItem('multiverse_inventory', JSON.stringify(items));
        } catch (e) {
            console.warn('MultiverseInventory: storage failed', e);
        }
    }

    function addItem(item) {
        const items = getItems();
        if (!items.some(i => i.id === item.id)) {
            items.push(item);
            saveItems(items);
            if (typeof BlinkyDaemon !== 'undefined' && BlinkyDaemon.say) {
                BlinkyDaemon.say(`🎒 Item Acquired: ${item.name} (${item.icon})`);
            } else if (typeof window !== 'undefined' && window.BlinkyDaemon && window.BlinkyDaemon.say) {
                window.BlinkyDaemon.say(`🎒 Item Acquired: ${item.name} (${item.icon})`);
            }
            return true;
        }
        return false;
    }

    function hasItem(id) {
        return getItems().some(i => i.id === id);
    }

    function renderModal() {
        let modal = document.getElementById('multiverse-inventory-modal');
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.className = 'inventory-modal';
        modal.id = 'multiverse-inventory-modal';

        const items = getItems();
        const slotsHTML = [];

        // Render 8 inventory grid slots
        for (let i = 0; i < 8; i++) {
            const item = items[i];
            if (item) {
                slotsHTML.push(`
                    <div class="inv-slot" onclick="alert('${item.name}: ${item.desc}')">
                        <span class="inv-slot-icon">${item.icon}</span>
                        <span class="inv-slot-label">${item.name}</span>
                    </div>
                `);
            } else {
                slotsHTML.push(`
                    <div class="inv-slot" style="opacity: 0.3;">
                        <span class="inv-slot-icon">·</span>
                        <span class="inv-slot-label">EMPTY</span>
                    </div>
                `);
            }
        }

        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #30363d; padding-bottom:8px;">
                <span style="font-weight:700; color:#58a6ff;">🎒 MULTIVERSE BACKPACK</span>
                <button onclick="MultiverseInventory.closeModal()" style="background:transparent; border:none; color:#8b949e; cursor:pointer; font-size:16px;">✕</button>
            </div>
            <div class="inventory-grid">
                ${slotsHTML.join('')}
            </div>
            <div style="font-size:10px; color:#8b949e; text-align:center;">
                Artifacts collected across dimensions persist in your global memory.
            </div>
        `;

        document.body.appendChild(modal);
    }

    function openModal() {
        renderModal();
        const modal = document.getElementById('multiverse-inventory-modal');
        if (modal) modal.classList.add('open');
    }

    function closeModal() {
        const modal = document.getElementById('multiverse-inventory-modal');
        if (modal) modal.classList.remove('open');
    }

    const api = {
        getItems: getItems,
        addItem: addItem,
        hasItem: hasItem,
        openModal: openModal,
        closeModal: closeModal
    };

    if (typeof window !== 'undefined') {
        window.MultiverseInventory = api;
    }

    return api;
})();

if (typeof window !== 'undefined') {
    window.MultiverseInventory = MultiverseInventory;
}
