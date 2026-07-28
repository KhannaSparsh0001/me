**Deployed:** [SparshKhanna.xyz](https://www.sparshkhanna.xyz/)

---

# Building a Windows 95 Operating System Inside a Browser


> *"Every project starts with a simple idea. This one somehow ended with me trying to make DOOM run inside a browser."*

---

## The Idea
This repository didn't begin as a portfolio.

It began as an experiment.

I wanted something that didn't feel like every other developer portfolio on the internet. Instead of another scrolling landing page filled with glassmorphism cards and endless animations, I wanted visitors to feel like they had just booted an actual operating system.

Not a simulation.

Not a video.

A desktop.

Every icon should launch a real application.
Every window should behave like a native Win95 window.
Everything should run entirely inside the browser.
And somehow...

...all of it should still deploy as a completely static website.

That constraint shaped almost every engineering decision in this repository.
---
# Phase 1 — Building the Desktop
The first milestone was creating a functional desktop environment.
Instead of treating every page as a route, everything became an application.

```
Desktop
│
├── My Computer
├── Terminal
├── Projects
├── Resume
├── About Me
├── Music Player
├── Guestbook
├── Settings
└── DOOM (work in progress)
```
Every application lives in its own isolated environment and is managed by a central window manager.

Applications can be:
- opened
- minimized
- maximized
- dragged
- focused
- restored

just like a real desktop operating system.
---
# Phase 2 — Preserving the Illusion

One of the biggest problems early on was that many applications still looked like web pages.
The window manager had a title bar.
The applications had another title bar.
The result looked like a browser embedding another browser.
That completely broke the illusion.


So every application was redesigned to behave like native software.
We removed redundant borders, duplicate window chrome and unnecessary padding.
Applications now occupy their entire client area and allow the operating system itself to provide the surrounding window decorations.

It seems like a tiny detail.
It completely changed how the project feels.

---
# Phase 3 — The Guestbook

This became one of my favourite architectural decisions.
Originally the "Sign Guestbook" button simply redirected visitors to GitHub Issues.

Technically it worked.
User experience wise...

...it was awful.
Visitors immediately left the desktop and landed on GitHub.
That wasn't acceptable.
So the architecture changed.

Instead of GitHub being the interface...
GitHub became the database.
Visitors now write their entire guestbook entry inside a native Windows 95 application.


The application collects:
- name
- website
- mood
- optional metadata
- message

Everything is then converted into structured Markdown with versioned YAML frontmatter before opening GitHub's "New Issue" page.

GitHub is now used only for:
- authentication
- spam protection
- persistence
- moderation

The visitor spends almost the entire interaction inside the operating system.
Exactly as intended.
---

# Phase 4 — Going Fully Static


One rule never changed.
No backend.
No serverless functions.
No database.
No secrets.
No authentication server.

Everything needed to work on a completely static Vercel deployment.
This forced some surprisingly interesting solutions.
Instead of introducing infrastructure, existing services were repurposed.
GitHub Issues became a database.
GitHub authentication became the login system.
The GitHub REST API became the backend.
The entire project remained deployable with zero server-side code.

---
# Phase 5 — Making It Responsive

Making an operating system responsive is...


interesting.
Traditional websites simply stack content vertically.

Operating systems don't.
Windows overlap.
Applications resize.
Taskbars exist.
Launchers exist.
Desktop icons exist.

Getting all of that to work on smaller screens required redesigning several components.
The dock was reorganized.
Desktop applications now scale correctly.
Complex layouts collapse intelligently without breaking the desktop metaphor.
The goal wasn't simply "mobile support."
The goal was making **it still feel like Windows.**

---
# Phase 6 — The Resume

The portfolio isn't only an operating system.
It's also meant to represent me professionally.
The resume section went through multiple revisions.
Projects were rewritten using measurable engineering outcomes.

Descriptions became more concise.
Technical depth increased.


The emphasis shifted toward:
- Agentic AI
- Multi-agent systems
- LangGraph
- ESP32 development
- Edge AI
- Systems engineering

The result is something that reflects both the projects themselves and the engineering behind them.

---

# Phase 7 — Repository Cleanup

As the project grew, so did the repository.
Development artifacts started piling up.
Unused archives.
Temporary scripts.
Large dependency folders.
Old experiments.

...**Everything was audited** and unnecessary files were removed to keep deployments lean and the repository maintainable.

---

# Current Expedition — DOOM

[Learn More](https://github.com/KhannaSparsh0001/freedoom_implementation)

Because apparently building a desktop operating system wasn't enough. 😭🤣🫠
The current experiment is integrating Chocolate DOOM directly into the portfolio.
The goal is ambitious:
Launch DOOM as if it were another native desktop application.


### Current progress:
- ✅ Chocolate DOOM compiles successfully with Emscripten.
- ✅ JavaScript is generated.
- ✅ WebAssembly is generated.
- ✅ FreeDoom assets load correctly.
- ✅ The virtual filesystem initializes.
- ✅ The engine starts.

Current blocker:

```
I\_Init: Setting up machine state.
```

Execution hangs immediately afterwards.
The build pipeline is working.
The runtime isn't.

**This experiment remains unfinished.**


## For now.

---

# Philosophy

This project has never been about recreating Windows 95.
It's about creating software that feels tangible.
Modern websites often feel disposable.
I wanted something visitors could explore.
**Something that rewards curiosity.**
Something where opening an application feels different from opening another browser tab.
**If you find yourself clicking around for longer than you intended...**
**...then I probably achieved exactly what I set out to build.**

---

_**"Still under construction.**
**Just like every good operating system."**_
