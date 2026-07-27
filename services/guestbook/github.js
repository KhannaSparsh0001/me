const GuestbookService = (function() {
    const OWNER = 'KhannaSparsh0001';
    const REPO = 'me';
    const LABEL = 'guestbook';

    // In-memory cache for the session to avoid rate limits on reload
    let cache = null;

    async function listEntries() {
        if (cache) {
            return cache;
        }

        const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues?labels=${LABEL}&state=all`;
        
        try {
            const response = await fetch(url, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (!response.ok) {
                throw new Error(`GitHub API returned status ${response.status}`);
            }

            const issues = await response.json();
            
            const entries = issues.map(issue => ({
                id: issue.id,
                username: issue.user.login,
                avatar: issue.user.avatar_url,
                profileUrl: issue.user.html_url,
                date: new Date(issue.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                }),
                message: parseBody(issue.body)
            }));

            cache = entries;
            return entries;

        } catch (error) {
            console.error('Failed to fetch guestbook entries:', error);
            throw error;
        }
    }

    function getSigningUrl() {
        const title = encodeURIComponent('Guestbook Entry');
        const body = encodeURIComponent('## Guestbook Message\n\nPlease write your message below.\n\n');
        return `https://github.com/${OWNER}/${REPO}/issues/new?labels=${LABEL}&title=${title}&body=${body}`;
    }

    // A very basic markdown to text parser to strip HTML/MD tags or keep it simple
    // For now we just sanitize and return basic text or simple paragraphs.
    function parseBody(body) {
        if (!body) return "No message.";
        
        // Remove the template header if present
        let cleaned = body.replace(/## Guestbook Message/g, '').trim();
        cleaned = cleaned.replace(/Please write your message below\./g, '').trim();

        // Basic HTML escape to prevent XSS if rendered via innerHTML
        const escapeHtml = (unsafe) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        return escapeHtml(cleaned).replace(/\n/g, '<br>');
    }

    return {
        listEntries,
        getSigningUrl
    };
})();
