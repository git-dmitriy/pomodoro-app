# Pomodoro Timer

A web app for working in Pomodoro intervals with a timer and task list. You can run the timer with focus, short break, and long rest phases, set durations and the number of sessions per cycle, and manage tasks: add, edit, complete, and remove finished ones. It includes sound alerts and system notifications for session changes and cycle completion. Settings and tasks are validated and stored in `localStorage`; the app can be installed as a PWA, used offline, and stays in sync across tabs (config, tasks, and timer state). If all tabs were closed while the timer was running, reopening the app restores the last time and session but shows the timer as paused.

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **Redux Toolkit** (slices + listener middleware)
- **styled-components**, **react-hot-toast**, **react-icons**
- **PWA**: vite-plugin-pwa (Workbox), service worker, web app manifest

## Getting started

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Lint
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

## Scripts

| Script    | Description                    |
| --------- | ------------------------------ |
| `npm run dev`    | Start dev server (default: http://localhost:5173) |
| `npm run build`  | Type-check and build for production                |
| `npm run lint`   | Run ESLint                                       |
| `npm run preview`| Serve the production build locally                |

## Features

- **Timer**: focus / short break / long rest; configurable durations (5–60 min) and sessions per cycle (2–4); circular progress; tick driven by a Web Worker
- **Tasks**: add, edit, complete, remove; remove all completed; toggle task panel
- **Settings**: time per phase, sessions count, sound on/off, system notifications; validation and safe defaults
- **Sync**: config and tasks sync via `localStorage` storage events; timer state syncs via BroadcastChannel; new tabs restore timer from storage (paused)
- **PWA**: installable, offline support, precached assets
