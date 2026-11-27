# New Themes & Features — Implementation Specs
**Portfolio:** `github.com/KhannaSparsh0001/me`  
**Author:** Sparsh Khanna — Systems & AI Engineer  
**Purpose:** This document is a complete, self-contained implementation brief.  
Any AI model (Claude, Gemini, GPT-4) should be able to build any item here  
from scratch using only this document + the existing codebase structure.

---

## EXISTING CODEBASE CONTEXT (read this first)

```
me/
├── index.html              ← Win95 OS theme (MAIN, 144KB monolith)
├── space-theme.html        ← Orbital space observatory
├── modern-fintech.html     ← HFT trading terminal dark
├── isometric-studio.html   ← 2.5D cozy pixel night studio
├── obsidian-codex.html     ← 16-bit RPG dialogue box
├── interstellar-transit-hud.html ← Warp cockpit HUD (best experimental)
├── pcb-schematic.html      ← EDA PCB board viewer
├── shokkenki.html          ← Japanese vending machine
├── jyotish-ephemeris.html  ← Vedic astrology chart
├── shared/
│   ├── system.js           ← SystemAPI (uptime, visitor count, volume)
│   ├── windowManager.js    ← Draggable windows for Win95
│   ├── dimensionalAudio.js ← Spatial audio layer
│   └── playlist.json       ← Winamp track list
├── apps/
│   ├── guestbook/          ← GitHub Issues-backed real guestbook
│   ├── quake/              ← WebQuake (WASD works, pak0 loaded)
│   ├── doom/               ← js-dos Doom
│   └── wolf3d/             ← Wolfenstein 3D
├── services/
│   └── guestbook/github.js ← GuestbookService: fetches GitHub Issues
│                              with label 'guestbook' from repo KhannaSparsh0001/me
├── style.css, fintech.css, space.css  ← Per-theme stylesheets
└── docs/
    └── Sparsh_khanna_Resume_gndu-18.pdf
```

**Tech stack:** Pure HTML/CSS/JS. No framework, no bundler, no npm. Everything runs client-side. Deployed as static files.

**Data:** `pfp.png` is the profile photo in root. Resume is at `docs/Sparsh_khanna_Resume_gndu-18.pdf`.

---

---

# ══════════════════════════════════════════
# NEW THEMES
# ══════════════════════════════════════════

---

## THEME 1: `terminal.html` — Linux Fake Interactive Shell
**File to create:** `terminal.html`  
**Complexity:** High  
**Wow factor:** 🔥🔥🔥🔥🔥

### Visual Description
The entire viewport is a fullscreen terminal emulator. Pure black (`#0D1117`) background. Text is `#39D353` (GitHub-green) in `JetBrains Mono` or `Fira Code` monospace, 14px. A blinking block cursor (`█`) sits at the prompt. The terminal window has a macOS-style traffic light titlebar (red/yellow/green circles, decorative only) or alternatively a pure borderless tmux aesthetic. No other UI elements exist — the terminal IS the portfolio.

### Boot Sequence (plays on first load, skippable with any key)
```
BIOS v2.0.9 — SPARSH SYSTEMS INC.
Checking RAM....... 8192MB OK
Loading kernel...  [████████████████████] 100%
Mounting /home/sparsh ... done
Starting session manager ... done

sparsh@portfolio:~$ _
```
Each line types itself character by character at ~80 chars/sec. The BIOS lines flash fast (10ms/char), then the prompt appears and the cursor blinks, waiting.

### Available Commands (must implement all)
```bash
# IDENTITY
whoami          → prints name, role, one-liner
neofetch        → ASCII art logo left, stats right (OS: Portfolio OS, 
                   Uptime: X days since last commit, Shell: bash 5.2,
                   Languages: Python C++ JS, WM: WindowManager.js)
cat about.txt   → bio paragraph
man sparsh      → man-page formatted bio with SYNOPSIS, DESCRIPTION, OPTIONS

# SKILLS  
ls skills/      → lists: ai/ systems/ web/ embedded/ tools/
cat skills/ai   → LangGraph, Stateful RAG, MCP, Gemini API, OpenAI
cat skills/embedded → ESP32, C++, UART, I2C, FreeRTOS
tree skills/    → ASCII tree of all skill categories

# PROJECTS
ls projects/    → lists project dirs
cat projects/[name]/README  → project description, tech stack, link
cd projects/langgraph-agent → "cd: cannot cd into project, it's on GitHub. 
                               Try: open https://github.com/..."
open [url]      → prints "Opening [url]... (click to follow)" with anchor tag

# EXPERIENCE
cat experience.log  → chronological job entries, latest first
grep -i "ai" experience.log → filters lines matching AI

# CONTACT
cat contact.txt     → email, GitHub, LinkedIn
curl -X POST contact → "Error 418: I'm a teapot. Use email instead."
ssh sparsh@khanna.dev → "Permission denied (publickey). Try LinkedIn instead."

# GAMES / EASTER EGGS
./run doom       → opens Doom window (links to apps/doom/)
./run quake      → opens Quake
sl               → ASCII steam locomotive runs across the screen
cowsay hello     → ASCII cow says hello
fortune          → prints a random dev quote
sudo rm -rf /    → "Nice try. Permission denied. This is a portfolio, not prod."
ping google.com  → fake ping with realistic RTT jitter (45ms, 46ms, 44ms...)
ps aux           → shows fake process list including: "sparsh    1337  99.9  langgraph_agent"
top              → fake htop-style view, CPU spikes on AI-related "processes"

# META
help / --help / ?    → lists all commands with descriptions
clear / cls          → clears screen
history              → shows last 10 typed commands
theme [name]         → switches to another portfolio theme 
                       (window.location.href = name + '.html')
exit                 → "logout: There is no escape. Try again."
```

### Tab Completion
When user presses TAB after partial input:
- `ca` + TAB → suggests: `cat`, `cal`, `cargo` (fake)
- `cat sk` + TAB → autocompletes to `cat skills/`
- `ls pro` + TAB → `ls projects/`

### Implementation Notes
- Input: single `<input type="text">` at bottom, invisible border, same font/color as terminal text
- On Enter: parse command string, generate output HTML, append to terminal body, scroll to bottom
- Use `window.history.pushState` to track commands so browser back doesn't navigate away
- Store command history in `sessionStorage` for `history` command
- Output renders instantly (no typing animation for command output — only boot sequence animates)
- Unknown command: `bash: [cmd]: command not found. Type 'help' for available commands.`
- Color coding: errors in `#FF6B6B`, filenames in `#79C0FF`, directories in `#56D364`, prompts in `#39D353`

### Prompt Format
```
[sparsh@portfolio ~]$ _
```
After `cd`:
```
[sparsh@portfolio projects/langgraph-agent]$ _
```

---

## THEME 2: `arcade.html` — Synthwave Outrun Arcade Cabinet
**File to create:** `arcade.html`  
**Complexity:** High  
**Wow factor:** 🔥🔥🔥🔥

### Visual Description
The entire page is styled as a 1986 stand-up arcade cabinet, viewed slightly from the front. The outer cabinet body is rendered in CSS — dark purple/black sides with chrome trim strips (CSS `linear-gradient` silver lines). The cabinet screen is a CRT monitor inset into the cabinet face, with a visible bezel, a slight convex warp (CSS `border-radius` + `perspective` transform), scanlines overlay (repeating CSS gradient), and a faint green phosphor tint.

The background behind the cabinet is **Synthwave**: a purple-to-magenta sky, a chrome sun with horizontal stripe cutouts, a neon pink/cyan grid horizon stretching to vanishing point (pure CSS perspective grid or Canvas), and silhouetted palm tree silhouettes at the bottom corners.

Font everywhere: **Press Start 2P** (Google Fonts) — the definitive 8-bit arcade font.

### Cabinet Screen Content
The screen is the actual portfolio, rendered as a fake arcade game menu:

**ATTRACT MODE** (plays when no key pressed, loops):
```
╔══════════════════════════════╗
║   SPARSH KHANNA              ║
║   SYSTEMS & AI ENGINEER      ║
║                              ║
║   INSERT COIN TO CONTINUE    ║  ← blinks
║                              ║
║   © 2024 KHANNA SYSTEMS      ║
╚══════════════════════════════╝
```

**PRESS START** (any key / click):  
Coin drop SFX (Web Audio API, synthesized: short `220hz → 110hz` drop + metallic ring).
Game select screen appears:

```
SELECT YOUR STAGE:

  ► 1P STORY MODE    [ABOUT ME]
    2P BOSS RUSH     [EXPERIENCE]  
    HIGH SCORES      [SKILLS]
    STAGE SELECT     [PROJECTS]
    OPTIONS          [CONTACT]
    CREDITS          [BACK]
```

Arrow keys / WASD navigate the selection. Enter/Space selects.

### Section Designs

**ABOUT ME → "STAGE 1: ORIGIN STORY"**  
Pixel art portrait (the pfp.png, pixelated via CSS `image-rendering: pixelated`) with a health bar labeled "EXPERIENCE" that fills as you read down. Bio text in a dialogue box at the bottom, RPG-style with `▼` prompt to advance.

**SKILLS → "HIGH SCORE TABLE"**  
Classic arcade high score leaderboard:
```
RANK  SKILL           SCORE     GRADE
 1    PYTHON          98,400    AAA
 2    LANGGRAPH       97,100    AAA
 3    ESP32           94,800    AA
 4    FASTAPI         93,500    AA
 5    REACT           91,200    A
...
```
Each entry flickers in like a real arcade high score screen, top to bottom, 100ms delay between rows.

**EXPERIENCE → "BOSS RUSH"**  
Each job is a "BOSS" with a nameplate, HP bar (representing tenure duration), and attack name (responsibilities):
```
╔═══════════════════════════════════╗
║ BOSS: INTERNSHIP — GNDU           ║
║ HP: ████████████░░░░ [DEFEATED]   ║
║ SPECIAL ATTACK: +200% THROUGHPUT  ║
╚═══════════════════════════════════╝
```

**CONTACT → "CREDITS ROLL"**  
Classic scrolling credits over the Synthwave background:
```
DIRECTED BY
  Sparsh Khanna

SYSTEMS DESIGN
  ESP32 · LangGraph · FastAPI

SPECIAL THANKS
  GNDU · India Skills Competition

CONTACT THE DEVELOPER
  [EMAIL]   [GITHUB]   [LINKEDIN]
```

### Audio
Chiptune loop (synthesized via Web Audio API OscillatorNode — no audio files needed):
- Base: square wave at C4 (262Hz)
- Arpeggio: C4→E4→G4→C5, 150ms per note, loops
- Simple drum: white noise burst every 500ms for kick

Mute button in bottom-right corner of cabinet.

---

## THEME 3: `newspaper.html` — The Daily Khanna Broadsheet
**File to create:** `newspaper.html`  
**Complexity:** Medium  
**Wow factor:** 🔥🔥🔥🔥

### Visual Description
Full broadsheet newspaper layout. Paper texture background (CSS `background-image` with a subtle noise filter, or just cream/off-white `#F5EFE0` with grain via SVG `<feTurbulence>` filter). The page has a visible margin line on both sides like real newsprint.

Font: **Playfair Display** (serif, Google Fonts) for headlines. **Source Serif 4** for body copy. **Special Elite** (typewriter style) for bylines and captions. All in near-black `#1A1008`.

### Masthead (top of page, centered)
```
══════════════════════════════════════════════════════
            THE DAILY KHANNA
         "All The Code That's Fit To Ship"
  Vol. IV · Issue 2024          GNDU, Punjab, India
══════════════════════════════════════════════════════
   Est. 2020  |  sparshkhanna.dev  |  Price: Free
```
The date is real: `new Date().toLocaleDateString('en-US', {weekday:'long', year:'numeric', month:'long', day:'numeric'})`.

### Front Page Layout (CSS Grid, 6-column newspaper grid)
**Column spans mimic a real broadsheet:**

**LEAD STORY — spans 4 cols:**
```
SYSTEMS ENGINEER ARCHITECTS STATEFUL AI
THAT THINKS — LANDMARK LANGGRAPH AGENT
COMPLETES ALL 12 OBJECTIVES

By Staff Correspondent, Chandigarh Bureau

Sparsh Khanna, 22, a final-year student at Guru Nanak
Dev University, has successfully deployed a multi-agent 
LangGraph system capable of...
```
Real project description in newspaper prose style. Ends with `[Continued on Page A4]` (fake, decorative).

**RIGHT COLUMN — spans 2 cols:**
```
BREAKING
━━━━━━━━
ISC 2024: LOCAL
BOY WINS STATE
CHAMPIONSHIP

India Skills Competition 
crowns Khanna state winner
in IT Software Solutions...
```

**Below fold — 3 columns:**
- Left col: `SKILLS MARKET REPORT — Tech Stack Analysis` (table of skills, up/down arrows like market data)
- Center col: `EDITORIAL — Why Agentic AI is the Next Frontier` (bio/philosophy paragraph)
- Right col: `CLASSIFIEDS — AVAILABLE FOR HIRE` (contact info styled as classified ads)

### Interactive Elements
- **Top ticker strip** (below masthead): real scrolling marquee of skills, like AP wire ticker: `BREAKING: Python expertise confirmed at 98.4% proficiency... | LangGraph agent clears 12-step reasoning chain... | ESP32 achieves 94ms UART response...`
- **Weather box** (top right corner): Real weather API (`wttr.in/{city}?format=3`) showing actual Chandigarh/Amritsar weather. Styled as newspaper weather box.
- **Page turning animation**: clicking to next section slides in a CSS page-turn transform.
- **Print button**: `window.print()` with a print-specific CSS that removes all chrome and prints a clean resume-like layout.

### Color Palette
- Background: `#F5EFE0` (aged newsprint)
- Text: `#1A1008` (near-black ink)
- Accent rules: `#000000` (column dividers)  
- Pull quotes background: `#EDE0C8`
- Photo borders: 2px solid `#1A1008`

---

## THEME 4: `hacker-news.html` — Ask HN: Should I Hire This Guy?
**File to create:** `hacker-news.html`  
**Complexity:** Medium  
**Wow factor:** 🔥🔥🔥 (highest with tech audience)

### Visual Description
Pixel-perfect clone of Hacker News (news.ycombinator.com) but the entire portfolio content IS a fake HN post and its comment thread. Use the **exact** HN orange (`#FF6600`), exact font (`Verdana, Geneva, sans-serif`, 10pt), exact nav bar, exact point-and-vote layout.

### The Post
```
Hacker News  |  new | past | comments | ask | show | jobs | submit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
▲ Ask HN: Should I hire this guy? (sparsh-k.dev)
  847 points by sparsh_k 6 hours ago | 312 comments
```

### The Comments Thread (fake, pre-written, brilliant)
Comments are styled **exactly** like HN comments — indented with `│` pipe characters, grey text, timestamps, usernames. Some have [replies] that expand. Write these comments to be genuinely funny and also reveal portfolio content:

```
throckmorton_j 5 hours ago | parent | prev | next
Skimmed the GitHub. The LangGraph stateful agent is legitimately impressive. 
Not many people implement proper graph-based state machines correctly. 
The checkpointing is clean.
  312 points
  
  ├── dang 5 hours ago
  │   Please keep comments civil. Though I agree, this is good work.
  │   48 points
  │
  └── naysayer_9000 4 hours ago
      Or he just used the LangGraph tutorial and called it "architecting"
      -4 points
      
      └── sparsh_k 4 hours ago [OP]
          Fair criticism. Here's the actual state machine diagram: [link]
          The checkpointing is custom — standard tutorial doesn't do this.
          89 points

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

pg_burner 4 hours ago | parent | prev | next  
The ESP32 work is the kind of physical computing that actually ships, 
not just "IoT hobby project." 94ms UART response under interrupt load is solid.
  201 points

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

contrarian_42 3 hours ago | parent | prev | next
Classic GNDU grad, will accept stock options in a startup that pivots 
to blockchain. Hard pass.
  -12 points
  
  └── sparsh_k 3 hours ago [OP]
      I'll be sure to add "no blockchain" to the resume. Thanks for the tip.
      447 points [most upvoted comment]
```

Each "section" of the portfolio (Skills, Experience, Projects, Contact) is revealed through comment threads going deeper.

### Interactive Elements
- **Vote buttons are real** — clicking ▲ increments a `localStorage` counter and the number updates live (fake persistence, real dopamine)
- **[Toggle] links** collapse/expand comment subtrees exactly like HN
- **Search bar** filters comments by keyword (actually filters sections of the portfolio)
- **Dark mode toggle**: switches between HN classic (white) and a fan-made HN dark mode (dark `#1C1C1C` bg, same orange accent) — stored in localStorage

---

## THEME 5: `neural.html` — AI Brain / Neural Network Visualization
**File to create:** `neural.html`  
**Complexity:** High  
**Wow factor:** 🔥🔥🔥🔥 (most on-brand for the AI specialization)

### Visual Description
Full dark canvas (`#060810`) with a living, pulsing neural network graph rendered on HTML5 `<canvas>`. The graph IS the portfolio — nodes are skills and projects, edges are relationships between them.

**Node Types (visually distinct):**
- **Core Identity Node** (center, largest, `#7AA8FF` glow): `SPARSH KHANNA` — pulsing slowly like a heartbeat
- **Skill Cluster Nodes** (medium, color-coded by category):
  - `#39D353` green: AI/ML nodes (LangGraph, RAG, Gemini, MCP)
  - `#79C0FF` blue: Systems nodes (Linux, ESP32, C++, UART)  
  - `#FFA657` amber: Web nodes (Python, FastAPI, React, Django)
  - `#FF7B72` red: Tools nodes (Git, Docker, PowerBI, N8N)
- **Project Nodes** (small hexagons, `#E8A85A`): Each project is a hexagon
- **Experience Nodes** (rectangular chips, white outline): Each job/role

**Edges:**
- Thin animated lines between connected nodes
- Line brightness pulses: when a node is "active", its edges glow brighter for 500ms
- Edge thickness = strength of relationship (used this skill heavily in that project)
- Signal packets (small bright dots) travel along edges randomly, like neural firing

**Physics:**
- Nodes repel each other (Barnes-Hut approximation or simple n-body)
- Connected nodes attract slightly
- Nodes slowly drift and settle — the graph is never completely still
- Clicking a node freezes the physics and snaps it to center
- Mouse hover repels nearby nodes gently, parting the graph like magnets

### Interaction
**Click any node → panel slides in from right:**
```
╔═══════════════════════════════╗
║ ● LANGGRAPH              [×] ║
║ Category: AI/ML               ║
║ Proficiency: ████████░░ 85%   ║
║                               ║
║ Used in:                      ║
║  → Stateful RAG Agent         ║
║  → Multi-step Planner         ║
║                               ║
║ Description:                  ║
║ Graph-based state machine...  ║
╚═══════════════════════════════╝
```
Panel slides in from right with a `transform: translateX` animation. Close button or click elsewhere dismisses it.

**Search bar** (top center, translucent): type a skill/project name, matching nodes glow and all others dim. Live filter.

**Zoom:** mouse wheel zooms the canvas (scale the ctx transform). Double-click zooms to a node.

### Background
Animated gradient: slowly shifts between `#060810` → `#0A0F1E` → `#06080F`. Like deep space or a generative model's latent space. Very subtle.

A faint grid overlay (1px lines at 60px intervals, `rgba(255,255,255,0.03)`) gives a data-center/AI chip aesthetic.

### Data Structure (hardcode in JS)
```javascript
const nodes = [
  { id: 'sparsh', label: 'SPARSH KHANNA', type: 'identity', x: 500, y: 400 },
  { id: 'langgraph', label: 'LangGraph', type: 'ai', x: 300, y: 250 },
  { id: 'rag', label: 'Stateful RAG', type: 'ai', x: 350, y: 180 },
  { id: 'esp32', label: 'ESP32', type: 'systems', x: 650, y: 200 },
  // ... all skills and projects
];
const edges = [
  { from: 'sparsh', to: 'langgraph', weight: 0.9 },
  { from: 'langgraph', to: 'rag', weight: 0.85 },
  // ...
];
```

---

---

# ══════════════════════════════════════════
# NEW FEATURES (add to existing themes)
# ══════════════════════════════════════════

---

## FEATURE 1: `shared/themeSwitcher.js` — Global Theme Dial Widget
**Add to:** ALL pages  
**Priority:** CRITICAL

### What it is
A floating circular widget (bottom-right corner, `position: fixed; bottom: 24px; right: 24px`) that lets visitors switch between all themes without navigating away.

### Visual
Small collapsed state: a glowing circular button showing the current theme icon (8×8 pixel icon for each theme, defined as inline SVG). Clicking it expands a radial menu of all themes (like a pie chart opening up), each sector labeled with the theme name and icon.

### Implementation
```javascript
// shared/themeSwitcher.js
const THEMES = [
  { id: 'win95',      label: 'Win95 OS',    file: 'index.html',                icon: '⊞' },
  { id: 'space',      label: 'Orbital',     file: 'space-theme.html',           icon: '✦' },
  { id: 'fintech',    label: 'HFT Term',    file: 'modern-fintech.html',         icon: '▲' },
  { id: 'isometric',  label: 'Studio',      file: 'isometric-studio.html',       icon: '⬡' },
  { id: 'codex',      label: 'RPG Codex',   file: 'obsidian-codex.html',         icon: '⚔' },
  { id: 'hud',        label: 'Warp HUD',    file: 'interstellar-transit-hud.html', icon: '◈' },
  { id: 'terminal',   label: 'Terminal',    file: 'terminal.html',               icon: '$' },
  { id: 'arcade',     label: 'Arcade',      file: 'arcade.html',                 icon: '🕹' },
  { id: 'newspaper',  label: 'Press',       file: 'newspaper.html',              icon: '📰' },
  { id: 'neural',     label: 'Neural',      file: 'neural.html',                 icon: '◉' },
];
```

Add `<script src="shared/themeSwitcher.js"></script>` to the `</body>` of every HTML page.

---

## FEATURE 2: Konami Code Easter Egg — Secret 11th Theme
**Add to:** `index.html` (triggers globally)  
**Priority:** High (viral factor)

### Sequence
`↑ ↑ ↓ ↓ ← → ← → B A`

### What happens
1. Screen flashes white 3 times
2. A fake BIOS screen appears: `"KHANNA BIOS v0.0.1 — SECRET BOOT SEQUENCE DETECTED"`
3. After 2 seconds, navigates to `secret.html`

### `secret.html` — Vaporwave / MS-DOS Mashup
Pure black background. Neon pink (`#FF71CE`) and cyan (`#01CDFE`) only.
```
A E S T H E T I C    P O R T F O L I O
 ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
 
     S P A R S H . E X E  vaporwave 
     
     ✦ you found the secret ✦
     
   ┌────────────────────────────────┐
   │  thanks for going this deep   │
   │  in someone's portfolio       │
   │                                │
   │  you clearly have good taste  │
   └────────────────────────────────┘
   
   >> email: [email address]
   >> the actual portfolio: index.html
```
Text CRT-flickers. A `A E S T H E T I C` marquee scrolls in Vaporwave pink at the top.  
Font: **VT323** (Google Fonts).  
Background: animated diagonal stripe pattern in purple/pink shifting slowly.

---

## FEATURE 3: Live GitHub Contributions Heat Map
**Add to:** `index.html` as a new Win95 window (and adaptable to other themes)  
**Priority:** High

### What it is
A real, live GitHub contributions graph fetched via GitHub's public API and rendered in the Win95 pixel style.

### Implementation
```
Endpoint: https://api.github.com/users/KhannaSparsh0001/events?per_page=100
```
Parse events, build a week×day contribution grid, render as a Win95-era pixel grid:
- Each cell is a 10×10px box
- Color scale: `#161b22` → `#0e4429` → `#006d32` → `#26a641` → `#39d353` (GitHub green scale)
- Hover on a cell: tooltip "3 commits on Nov 14"
- Rendered inside a draggable Win95 window titled: `📊 Contributions — KhannaSparsh0001`

---

## FEATURE 4: "Now Playing / Now Building" Live Status Badge
**Add to:** ALL themes (injected via `shared/nowPlaying.js`)  
**Priority:** Medium

### What it is
A tiny translucent badge (bottom-left, `position: fixed`) that shows what you're currently doing.

Data source: a tiny JSON file in the repo `shared/now.json`:
```json
{
  "building": "LangGraph stateful planner v2",
  "learning": "Rust ownership model",
  "reading": "Designing Data-Intensive Applications",
  "listening": "lo-fi hip hop",
  "updated": "2024-11-20"
}
```

You update `now.json` manually whenever you want. The badge fetches it via raw GitHub CDN:
```
https://raw.githubusercontent.com/KhannaSparsh0001/me/main/shared/now.json
```

### Display
```
╔═══════════════════════════════╗
║ ▶ NOW                         ║
║   building: LangGraph v2      ║
║   learning: Rust              ║
╚═══════════════════════════════╝
```
Click to expand full `now.json` contents. Collapses on click away. Badge auto-dismisses after 8 seconds and shows as a small pulsing dot.

---

## FEATURE 5: Guestbook Enhancement — Theme Tracking
**Current state:** GitHub Issues backend ✅ already works (uses label `guestbook` on repo `KhannaSparsh0001/me`)  
**Enhancement:** When a visitor submits a guestbook entry, also record which theme they were viewing.

The guestbook form (in `apps/guestbook/`) already has a `theme` field parsed from issue body. Enhancement:
1. Auto-populate the `theme` field with `document.referrer` or `sessionStorage.getItem('lastTheme')` so you know which theme converts visitors into message-senders.
2. Display a "Top theme for guestbook entries: Isometric Studio 🏆" stat at the top of the guestbook.
3. Show a mini theme icon next to each entry (the same icons from the theme switcher).

---

## FEATURE 6: `prefers-reduced-motion` + Accessibility Pass
**Add to:** `interstellar-transit-hud.html`, `space-theme.html`, `isometric-studio.html`  
**Priority:** High (accessibility + legal)

Add to every animated theme's CSS:
```css
@media (prefers-reduced-motion: reduce) {
  #warp-canvas,
  #cosmos-canvas,
  .rain-container,
  .orbit-satellite,
  .ticker-track {
    animation: none !important;
    transition: none !important;
  }
  #warp-canvas { display: none; }
}
```

---

## NOTES FOR ANY AI IMPLEMENTING THESE

1. **No frameworks.** Pure HTML/CSS/JS only. If you're tempted to `npm install`, don't.
2. **Google Fonts are fine** — load via `<link>` from `fonts.googleapis.com`.
3. **Canvas for animations** — use `requestAnimationFrame`, always cancel on `visibilitychange` to prevent background tab drain.
4. **Resume PDF path:** `docs/Sparsh_khanna_Resume_gndu-18.pdf` (relative path from root).
5. **Profile photo:** `pfp.png` (root directory).
6. **Guestbook backend:** GitHub Issues API, no auth needed to read. POST new entries by linking to `https://github.com/KhannaSparsh0001/me/issues/new?template=guestbook.md` — the user logs in with their own GitHub account. Zero backend cost.
7. **Theme switching:** always use `window.location.href = '../' + filename` — all theme files are in root.
8. **Existing shared JS:** import `<script src="shared/system.js">` to get `SystemAPI.getUptime()`, `SystemAPI.getVisitorCount()`.
9. **Commit message convention:** `feat(theme): [theme name]` or `feat(feature): [feature name]`.
10. **Branch:** work on `themes` branch, PR into `main`.
