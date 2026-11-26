# Sparsh Khanna — Interactive Developer Portfolio

A tactile, multi-paradigm developer portfolio that reimagines the personal website as an explorable operating system and interactive hardware/retro software playground.

**Live Site:** [khannasparsh.cv](https://khannasparsh.cv) • **Primary OS:** [Windows 95 Web Desktop](https://khannasparsh.cv/index.html)

---

## Overview

Most portfolio websites are passive scrolling landing pages. This repository explores a different philosophy: **visiting a portfolio should feel like booting an application.**

The primary experience is a fully functional, browser-based Windows 95 desktop environment featuring draggable/resizable windows, process management, retro sound design, a command-line terminal, and authentic in-browser ports of classic games—all running as a zero-framework, static deployment.

---

## 🖥️ Flagship Experiences (Stable & Recommended)

### 1. Windows 95 Desktop OS (`index.html`)
The main entry point to the portfolio:
- **Window Manager:** Draggable, resizable retro windows with z-index stacking and focus management.
- **Classic Games:** Native in-browser WebGL & WASM execution of:
  - **Quake (1996):** Native WebGL 3D port with WASD movement, fluid mouselook, and dedicated mobile touch controls.
  - **DOOM & Wolfenstein 3D:** JS-DOS engine ports with responsive mobile overlays.
  - **Minesweeper, 2048, Mahjong:** Classic desktop mini-games.
- **Productivity Apps:** Interactive Terminal, Notepad, Paint, System Monitor, and Winamp music player.
- **Guestbook:** Live visitor message board powered serverlessly via GitHub Issues API.

### 2. Executive Minimal Resume (`resume.html`)
- An ATS-friendly, distraction-free, print-optimized technical resume designed for rapid scanning by recruiters and engineering managers.

---

## 🧪 Experimental Alternative Themes

> [!WARNING]
> **Work In Progress / Experimental Disclaimer**
> The themes listed below are creative engineering experiments and visual UI explorations. **They are experimental, largely untested across diverse viewports/devices, and will contain bugs, visual glitches, or audio quirks.** They are shared publicly for design experimentation and feedback.

| Theme File | Concept & Architecture | Status |
|---|---|---|
| [`blueprint-pcb.html`](blueprint-pcb.html) | **Hardware EDA Schematic:** Deep PCB green solder-mask (`#072418`), millimeter rulers, QFP-64 MCU heatspreader, orthogonal 45° copper traces, and live oscilloscope waveforms. | ⚠️ Experimental |
| [`obsidian-codex.html`](obsidian-codex.html) | **16-Bit Dark-Medieval RPG:** Retro character sheet & inventory dashboard, Web Audio chiptune synthesizer, dynamic stat modifiers, and interactive "Bug Slayer" combat mini-game. | ⚠️ Experimental |
| [`interstellar-transit-hud.html`](interstellar-transit-hud.html) | **3D Interstellar Avionics HUD:** Radial warp starfield canvas, cockpit avionics audio drone, flight throttle, CRT scanlines, and traveling ship telemetry. | ⚠️ Experimental |
| [`isometric-studio.html`](isometric-studio.html) | **Isometric Pixel Diorama:** Coffee Talk-inspired pixel art developer studio with procedural synth chord loop, synthesized rain audio, sleeping studio cat, and day/night lighting. | ⚠️ Experimental |
| [`shokkenki.html`](shokkenki.html) | **Japanese Ticket Vending Machine:** Mechanical push-button simulation with physics coin slot and 1-bit dithered thermal receipt dispenser. | ⚠️ Experimental |
| [`jyotish-ephemeris.html`](jyotish-ephemeris.html) | **Vedic Ephemeris & Jyotish Engine:** Mathematical planetary positions, 12-house Kundali chart SVG, and Dasha timeline calculations. | ⚠️ Experimental |

---

## 🛠️ Technology Stack

- **Frontend Core:** Pure Semantic HTML5, CSS3 (CSS Grid, Flexbox, CRT scanline shaders, SVG filters), Vanilla JavaScript (ES6+).
- **Graphics & 3D:** WebGL 1.0 (WebQuake), HTML5 Canvas 2D, SVG Isometric geometry.
- **Audio Engineering:** Native **Web Audio API** (polyphonic procedural chiptune synthesizers, noise generators, lo-fi chord progressions, ambient rain generators).
- **Emulation & Runtime:** JS-DOS (v6.22 WASM), WebQuake WASM/WebGL engine.
- **Backend / Persistence:** GitHub Issues REST API (serverless guestbook), IndexedDB asset caching, LocalStorage/SessionStorage.

---

## 🚀 Run Locally

The site requires no compilation, build pipelines, or heavy dependencies:

```bash
# 1. Clone the repository
git clone https://github.com/KhannaSparsh0001/me.git
cd me

# 2. Start any local static HTTP server
python3 -m http.server 4173
# or: npx serve .
```

Navigate to `http://localhost:4173` in your browser.

---

## 📁 Project Structure

```text
├── index.html                  # Windows 95 Desktop OS (Main Flagship)
├── resume.html                 # Executive Minimal Resume
├── style.css                   # Primary Win95 OS Stylesheet
│
├── apps/                       # Desktop Applications
│   ├── quake/                  # WebGL Quake 1 Engine & Assets
│   ├── doom/                   # JS-DOS DOOM Runner
│   ├── wolf3d/                 # JS-DOS Wolfenstein 3D Runner
│   ├── notepad/                # Retro Text Editor
│   ├── paint/                  # In-Browser Canvas Paint App
│   ├── winamp/                 # Nostalgic Music Player
│   └── guestbook/              # GitHub Issues-Powered Guestbook
│
├── shared/                     # OS Window Manager & Audio Systems
│   ├── windowManager.js        # Window Lifecycle & Z-Index Stacking
│   ├── processManager.js       # Background Process Simulation
│   └── dimensionalAudio.js     # Sound Effects & Audio Driver
│
├── [Experimental Themes]
│   ├── blueprint-pcb.html      # Hardware EDA Circuit Blueprint
│   ├── obsidian-codex.html     # 16-Bit RPG Character Sheet & Codex
│   ├── interstellar-transit-hud.html # Space Cockpit Transit HUD
│   ├── isometric-studio.html   # Lo-Fi Isometric Pixel Studio
│   ├── shokkenki.html          # Japanese Ticket Vending Machine
│   └── jyotish-ephemeris.html  # Vedic Planetary Ephemeris
│
└── docs/                       # Implementation Plans & Documentation
```

---

## 👤 Author

**Sparsh Khanna**  
*Systems & AI Engineer*

- **Website:** [khannasparsh.cv](https://khannasparsh.cv)
- **GitHub:** [@KhannaSparsh0001](https://github.com/KhannaSparsh0001)

---

*Still under construction — just like every good operating system.*
