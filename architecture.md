# Project Architecture: Retro OS Portfolio

## Overview
This project is built as a single-page Windows 95 emulation environment using pure HTML, CSS (with React95 stylesheets), and Vanilla JavaScript. It uses a **Singleton Architecture** where the main window (`index.html`) acts as the OS kernel, and all applications run inside sandboxed `iframes`.

## Core Components

### 1. The OS Shell (`index.html`)
- **Role**: The main desktop environment.
- **Responsibilities**: Renders the desktop background, taskbar, start menu, quick launch icons, and the main resume document. It also contains the `window-container` where all app windows are injected. It exposes the `openGameModal` / `openApp` global functions used to spawn new window instances.

### 2. Global Services (`shared/` directory)
These scripts are loaded by `index.html` and expose APIs globally via `window.top` to bypass cross-origin restrictions between the desktop and the iframes.
- **`shared/windowManager.js`**: Manages the lifecycle of window frames. Handles focusing (z-index ordering), minimizing to the taskbar, and restoring windows. Exposes `window.top.WindowManager`.
- **`shared/system.js`**: Provides core OS functionalities, such as spawning global draggable dialogs (e.g., the "About" dialog) and playing base64-encoded system audio effects (clicks, errors, window opens). Exposes `window.top.SystemAPI`.
- **`shared/processManager.js`**: A lightweight mock registry that tracks active applications (`.exe` processes) and updates their status. This data is actively read by the System Monitor app. Exposes `window.top.ProcessManager`.

### 3. Applications (`apps/` and `games_Dev/`)
- **Role**: Self-contained mini web-apps loaded via iframes.
- **How they work**: Each app (e.g., `apps/winamp/index.html`, `apps/notepad/index.html`) is completely independent. When launched, the OS wrapper injects a draggable `.game-window` div with a title bar, and sets its `<iframe>` `src` to the app's HTML file. The app then calls `window.top.ProcessManager.register()` on load to announce itself to the OS.

---

## The Winamp 95 Audio System

To answer your second question: **Yes!**

Winamp is built to dynamically fetch music directly from the local file structure. If you look at `apps/winamp/index.html`, it runs a `fetch('../../assets/playlist.json')` on initialization.

**To add music to Winamp permanently:**
1. Place your `.mp3` or `.wav` files into the `assets/` folder in the repository.
2. Update the `assets/playlist.json` file to include the track name and the relative path (e.g., `"url": "../../assets/my-track.mp3"`).

Alternatively, you (or your visitors) can use the **"ADD LOCAL FILE(S)"** button in the Winamp UI to temporarily load and play music directly from your computer without needing to modify the codebase at all!
