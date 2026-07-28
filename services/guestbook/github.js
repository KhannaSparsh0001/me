const GuestbookService = (function() {
    const OWNER = 'KhannaSparsh0001';
    const REPO = 'me';
    const LABEL = 'guestbook';

    // In-memory cache for the session to avoid rate limits on reload
    let cache = null;

    async function listEntries(forceRefresh = false) {
        if (forceRefresh) {
            cache = null;
        }

        if (cache) {
            return cache;
        }

        const url = `https://api.github.com/repos/${OWNER}/${REPO}/issues?labels=${LABEL}&state=all&t=${Date.now()}`;
        
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
            
            const entries = issues.map(issue => {
                const parsed = parseBody(issue.body);
                return {
                    id: issue.id,
                    username: issue.user.login,
                    avatar: issue.user.avatar_url,
                    profileUrl: issue.user.html_url,
                    date: new Date(issue.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    }),
                    message: parsed.message,
                    visitorName: parsed.name || '',
                    website: parsed.website || '',
                    mood: parsed.mood || '',
                    location: parsed.location || '',
                    theme: parsed.theme || ''
                };
            });

            cache = entries;
            return entries;

        } catch (error) {
            console.error('Failed to fetch guestbook entries:', error);
            throw error;
        }
    }

    function getSigningUrl(formData) {
        const title = encodeURIComponent('Guestbook Entry');
        
        let md = `---
schema: guestbook-v1
theme: windows95
portfolio: sparshkhanna
created_from: portfolio
---

# Guestbook Entry

## Visitor

Name:
${formData.name}
`;

        if (formData.website) md += `\nWebsite:\n${formData.website}\n`;
        if (formData.mood) md += `\nMood:\n${formData.mood}\n`;
        if (formData.location) md += `\nLocation:\n${formData.location}\n`;
        if (formData.theme) md += `\nTheme:\n${formData.theme}\n`;

        md += `\n---\n\n## Message\n\n${formData.message}\n`;

        const body = encodeURIComponent(md);
        return `https://github.com/${OWNER}/${REPO}/issues/new?labels=${LABEL}&title=${title}&body=${body}`;
    }

    function parseBody(body) {
        if (!body) return { message: "No message." };
        
        const escapeHtml = (unsafe) => {
            if (!unsafe) return '';
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        const result = {
            name: '',
            website: '',
            mood: '',
            location: '',
            theme: '',
            message: ''
        };

        // Check for YAML frontmatter block
        const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
        const match = body.match(yamlRegex);
        
        if (match) {
            // It's a structured entry
            // Extract Message
            const messageMatch = body.match(/## Message\n+([\s\S]*)$/);
            if (messageMatch) {
                result.message = escapeHtml(messageMatch[1].trim()).replace(/\n/g, '<br>');
            }

            // Extract Name
            const nameMatch = body.match(/Name:\n([^\n]+)/);
            if (nameMatch) result.name = escapeHtml(nameMatch[1].trim());

            // Extract Website
            const websiteMatch = body.match(/Website:\n([^\n]+)/);
            if (websiteMatch) result.website = escapeHtml(websiteMatch[1].trim());

            // Extract Mood
            const moodMatch = body.match(/Mood:\n([^\n]+)/);
            if (moodMatch) result.mood = escapeHtml(moodMatch[1].trim());

            // Extract Location
            const locationMatch = body.match(/Location:\n([^\n]+)/);
            if (locationMatch) result.location = escapeHtml(locationMatch[1].trim());

            // Extract Theme
            const themeMatch = body.match(/Theme:\n([^\n]+)/);
            if (themeMatch) result.theme = escapeHtml(themeMatch[1].trim());

        } else {
            // Legacy entry fallback
            let cleaned = body.replace(/## Guestbook Message/g, '').trim();
            cleaned = cleaned.replace(/Please write your message below\./g, '').trim();
            result.message = escapeHtml(cleaned).replace(/\n/g, '<br>');
        }

        return result;
    }

    return {
        listEntries,
        getSigningUrl
    };
})();
