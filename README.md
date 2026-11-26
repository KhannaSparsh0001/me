# Sparsh Khanna — Interactive Portfolio

A Windows 95-inspired personal portfolio that turns a developer website into an explorable desktop experience.

**Live site:** [khannasparsh.cv](https://khannasparsh.cv)

## Overview

This project explores a simple idea: opening a portfolio should feel as interesting as opening an application.

Instead of a conventional scrolling landing page, the site presents a desktop interface with:

- draggable and resizable application windows
- desktop shortcuts and taskbar navigation
- native-style menus and dialogs
- games and interactive applications
- a terminal, resume, projects, guestbook, and music player
- responsive layouts for desktop and smaller screens

The portfolio is designed to feel tactile and intentional, while remaining a fully static deployment.

## Featured Sections

- **My Computer** — system and repository information
- **Terminal** — command-style exploration
- **Projects** — selected engineering work
- **Resume** — professional and technical background
- **About Me** — personal introduction
- **Music Player** — an interactive listening experience
- **Guestbook** — visitor entries powered through GitHub Issues
- **DOOM** — an in-browser desktop experiment

## Technology

- HTML
- CSS
- JavaScript
- C and C++ experiments
- static assets and shell tooling

The main site requires no server-side application framework or database.

## Run Locally

Because the portfolio is largely static, any local web server is sufficient.

```bash
git clone https://github.com/KhannaSparsh0001/me.git
cd me
python3 -m http.server 4173
```

Open `http://localhost:4173` in your browser.

## Project Structure

```text
apps/        Desktop applications and interactive features
docs/        Project documentation and supporting material
shared/      Shared styles, scripts, and components
games_Dev/   Game-development experiments
assets/      Images and other static resources
icons/       Desktop and application icons
index.html   Main portfolio entry point
style.css    Primary desktop styling
```

## Architecture

The repository uses independent static pages and applications connected through a shared visual system. Application windows manage their own content, while the desktop shell provides navigation, window behavior, sound effects, and responsive presentation.

The guestbook uses GitHub Issues as its data and moderation layer, allowing the website to remain deployable without a conventional backend.

## Deployment

The site is a static website and can be hosted by platforms such as GitHub Pages or Vercel.

## Author

**Sparsh Khanna**

- Website: [khannasparsh.cv](https://khannasparsh.cv)
- GitHub: [@KhannaSparsh0001](https://github.com/KhannaSparsh0001)

---

*Still under construction — just like every good operating system.*
