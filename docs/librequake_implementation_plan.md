# LibreQuake & Full Episode Support Implementation Plan

## 1. Context & Background
In standard id Software Quake (1996), **Shareware (`pak0.pak`)** includes Episode 1 (*Dimension of the Doomed*, `e1m1`–`e1m8`) and the central hub (`start.bsp`). Episodes 2, 3, and 4 were reserved for commercial registered copies (`pak1.pak`).

**LibreQuake** is an open-source, libre-asset replacement project aiming to provide a completely free, open-source equivalent for all episodes. However, LibreQuake relies on newer Quake engine extensions (FTEQW/Ironwail/Quakespasm features like enhanced QuakeC entity fields `__sunlight_color`, custom particle/sound defs, and dual pak files).

This document outlines the step-by-step technical plan to support LibreQuake (or custom multi-pak configurations) in WebQuake without crashing the web client.

---

## 2. Technical Gaps in Vanilla WebQuake
When loading modern LibreQuake assets (`pak0.pak` + `pak1.pak`), WebQuake fails on several fronts:

1. **Entity Definition Mismatches (QuakeC Progs):**
   - Modern QC progs reference fields not present in vanilla 1996 `progs.dat` (`mapversion`, `__sunlight_color`, custom weapon spawn functions).
   - Server parsing throws `Host_Error: ... is not a field` or `Invalid weapon`.
2. **Missing `pak1.pak` Support in Browser FS:**
   - WebQuake currently mounts a single file `id1/pak0.pak`. Multi-pak loading order (`pak0.pak` -> `pak1.pak` with filesystem overlay priority) needs to be initialized in `COM.InitFilesystem`.
3. **Asset Memory & Atlas Limits:**
   - High-density lightmaps and larger BSP textures overflow vanilla buffers (`AllocBlock: full`).
4. **WAV Audio Format Extensions:**
   - Modern tooling generates WAV files with extra metadata headers (`LIST`, `INFO`, `cue`) or non-standard sample rates that trigger parser range exceptions in WebQuake's `S.LoadSound`.

---

## 3. Implementation Phases (Roadmap)

### Phase 1: Dual-Pak / Multi-Pak Virtual Filesystem
* **File Target:** `apps/quake/WebQuake/COM.js` & `Sys.js`
* **Changes:**
  - Update `COM.InitFilesystem` to support an array of packs (`pak0.pak`, `pak1.pak`, etc.).
  - Search packs in reverse order (highest index first) so `pak1.pak` overrides `pak0.pak` according to Quake standards.
  - Implement streaming/progressive fetch or chunked IndexedDB caching for both `pak0.pak` (~18MB) and `pak1.pak` (~30MB+).

### Phase 2: Engine Tolerant Entity & QC Parser
* **File Target:** `apps/quake/WebQuake/PR.js` & `SV.js`
* **Changes:**
  - Relax entity field lookup: when an entity dictionary contains unknown modern fields (e.g., `__sunlight_color`, `mapversion`), log a warning rather than triggering a fatal `Sys.Error` / `Host_Error`.
  - Handle fallback spawn functions for non-standard entities or newer weapon indices to prevent server disconnects.

### Phase 3: Texture & Lightmap Scalability
* **File Target:** `apps/quake/WebQuake/R.js` & `GL.js`
* **Changes:**
  - Keep lightmap allocation dynamic or at 4096×4096 texture dimensions (already stabilized in recent patch).
  - Add mipmap handling and fallback white/checker textures for missing or modern animated texture lumps.

### Phase 4: Audio Robustness
* **File Target:** `apps/quake/WebQuake/S.js`
* **Changes:**
  - Retain defensive chunk-parsing with bounds validation for RIFF/WAV chunks so metadata-heavy modern audio tracks don't fail `requestAnimationFrame`.

### Phase 5: UI Episode Switcher & Mode Selector
* **File Target:** `apps/quake/index.html`
* **Changes:**
  - Add an in-menu dropdown or toggle:
    - **Classic 1996 Shareware** (Fast 18MB download, authentic id Software Episode 1).
    - **LibreQuake Full** (Open source 4-episode campaign).
    - **Custom User Pak** (Drag-and-drop local `pak0.pak`/`pak1.pak` via HTML5 File API).

---

## 4. Current Status
* **Status:** Prepared / On Hold (Awaiting user decision to implement).
* **Current Running Engine:** Authentic 1996 id Software Shareware (`pak0.pak`, Episode 1).
