# Easter Egg Roadmap

This note captures the research and direction for future hidden features in the Netscape-style resume website.

## Direction

Keep the main website as a fake Netscape resume page. Add hidden playful features through the existing tab/menu system so the resume stays usable while the site rewards curious visitors.

Potential menu placements:

- `Directory > Games`
- `Window > Music Player`
- `Options > Disco Mode`
- `Help > About This Computer`

## Game Strategy

Use browser-friendly games that can run as static files on Vercel. Preferred structure:

```text
website/
  index.html
  games/
    index.html
    2048/
    tangram/
    mah/
    hidden-rpg/
  music/
    player.html
```

The fake Netscape menu can open games in a new tab or a fake in-page window:

```html
<a href="games/index.html" target="_blank">Games</a>
```

## Vercel-Friendly Game Candidates

Best low-friction options:

- 2048: simple, instantly understandable, static HTML/CSS/JS.
- Tangram: relaxing puzzle game, static browser app.
- Mah: Mahjong solitaire style, calm and resume-break friendly.
- Azerdle: Wordle-style browser puzzle, likely static/Godot HTML export.
- Penny Farthing: solitaire-style browser game/app.

Possible but more annoying:

- Sandspiel: excellent relaxing pixel physics sandbox, but Rust/WASM/WebGL builds may need care. Best if using a prebuilt static output.
- HexGL: WebGL racing game, deployable but asset paths and WebGL files can be fussy.
- A Dark Room: strong hidden-game candidate, atmospheric and mostly static, but repo setup may need some care.

Avoid for Vercel:

- Freeciv-Web: too backend-heavy for this portfolio. Needs server components and is not a clean static deploy.
- BrowserQuest: classic browser RPG, but multiplayer/server parts make it awkward on Vercel unless linking to an existing hosted version or using a heavily simplified fork.

## RPG Notes

Do not force the RPG to be resume-themed. If added, it should be a relaxation/easter egg feature, not another portfolio explainer.

Better approaches:

- Use a tiny static RPG or adventure game in `games/hidden-rpg/`.
- Use a Godot HTML5 export if actual character movement/maps are desired.
- Use A Dark Room or a similar text/adventure game for low-maintenance atmosphere.
- Save progress with `localStorage` first.
- Add export/import save later if needed.
- Google account / Drive save should be a later phase only, because OAuth, permissions, scopes, and deployment complexity are not worth it until the game feature is actually valuable.

## Music Player Idea

Add a hidden retro music player:

- Menu location: `Window > Music Player`
- Use an embedded YouTube playlist or individual YouTube video iframe.
- For richer controls, use the YouTube IFrame API later.
- Keep UI like a small old media player window.
- Possible controls: playlist selector, play/pause, current track label, close/minimize.

Important limitation:

- YouTube embeds do not allow full custom control over everything unless using the YouTube IFrame API.

## Disco Mode Idea

Add `Options > Disco Mode`.

Potential effects:

- Toggle CSS class on `body`.
- Swap the Netscape gray palette into a louder color mode.
- Add subtle flashing title bar or chrome.
- Add scanline/color cycling on the document background.
- Keep text readable and avoid destroying resume usability.

Suggested implementation:

```js
document.body.classList.toggle('disco-mode');
localStorage.setItem('discoMode', document.body.classList.contains('disco-mode'));
```

## Future Build Order

1. Add a hidden `Directory` dropdown.
2. Add `Directory > Games` launcher.
3. Create `games/index.html` as a simple game library page.
4. Add one small static game first.
5. Add `Window > Music Player`.
6. Add `Options > Disco Mode`.
7. Add localStorage for preferences/progress.
8. Consider Google Drive sync much later.

