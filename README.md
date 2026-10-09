# Cre8x 3.0 — Olympus Command

A responsive four-page redesign of the Cre8x registration desk with a black-and-gold Greek technology art direction.

## Live demo

- Website: https://codejedix.github.io/cre8x-registration-desk/
- Source: https://github.com/CodeJediX/cre8x-registration-desk

## Pages

- `index.html` — live event overview
- `checkin.html` — delegate attendance and team confirmation
- `teams.html` — searchable finalist gallery
- `reports.html` — operational reporting and export

## Included behavior

- Local attendance and check-in state persistence
- Delegate replacement workflow
- Team desk notes
- Global roster search (`Ctrl/Cmd + K`)
- CSV export
- Responsive desktop, tablet, and mobile layouts
- Reduced-motion and keyboard-friendly states
- Cre8x 3.0 official artwork integrated locally
- Cinematic glitch, orbital HUD, particle, scanline, and live-progress preloader
- Page-specific Olympian character compositions
- Password-gated reset for all teams or one selected team on the dashboard and Reports page (`16672`)
- Shared Supabase persistence with automatic local-storage fallback
- Visible live/syncing/offline backend status in the sidebar
- Native full-screen command with responsive expand/exit controls on every page
- Centered, accessible delegate manifest with background blur, focus trapping, internal scrolling, and responsive layouts

Lunch preference fields, meal controls, and meal reporting have been removed.

## Backend

The deployed classroom demo uses the existing **CreateX 3.0** Supabase project in the Mumbai region. The browser uses only a public publishable key; no secret or service-role key is included in this project.

The `registration_state` table stores one shared live event record. Row Level Security is enabled and the demo policy permits the public registration desk to read and update that single row. The interface loads the shared state on startup, saves changes after each desk action, checks for updates every eight seconds, and falls back to the local browser cache if the network is unavailable.

This deliberately simple public-desk policy is appropriate for the lecture demonstration. Before using the application for a real event, add Supabase Auth and restrict writes to authenticated event staff.

The reproducible table and policy definition is in `supabase/schema.sql`.

## Preview

Serve the directory with any static web server. For example:

```powershell
python -m http.server 4173 --directory .
```

Then open `http://127.0.0.1:4173/`.

## Deploy to Vercel

Deploy this folder as a static project with no build command and `.` as the output directory. `vercel.json` contains the static hosting and cache configuration.
