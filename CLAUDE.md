# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Junk Away We Go Demolition Inc.**, a junk removal and demolition business in Poway, CA. Six standalone HTML pages with no build system, no bundler, no server — just open in a browser.

## Running Locally

```bash
open index.html
# or use any static server:
python3 -m http.server 8000
```

No npm, no dependencies, no build step.

## Architecture

### Pages
- `index.html` — Homepage (entry point)
- `about.html` — About Us
- `services.html` — Services offered
- `pricing.html` — Pricing tiers
- `contact.html` — Contact form (Formspree POST)
- `blog.html` — Blog listing (static mockup, no individual post pages)

### Tech Stack
- **Tailwind CSS** via CDN play script (`cdn.tailwindcss.com?plugins=forms,container-queries`) — no local Tailwind build
- **Google Fonts**: Plus Jakarta Sans (headlines, `font-headline`), Work Sans (body, `font-body`)
- **Google Material Symbols Outlined** (icon font)
- All images hosted externally on `lh3.googleusercontent.com/aida-public/`

### Tailwind Config
The Tailwind config is **duplicated inline in every HTML file's `<head>`** via a `<script id="tailwind-config">` block. It uses a Material Design 3 tonal color system with 40+ custom tokens (e.g., `surface-container-low`, `on-primary-container`, `tertiary-fixed-dim`). When modifying color tokens, you must update all 6 files.

### Shared Components (copy-pasted, not templated)
The nav and footer are **identical markup copy-pasted across all 6 pages** — there is no component system or includes. The only difference per page is which nav/footer link gets the "active" style:
- **Nav active:** `text-sky-700 font-bold border-b-2 border-sky-700 pb-1` (desktop), `text-sky-700 font-bold` (mobile)
- **Footer active:** `text-white font-semibold` (instead of `text-slate-400`)

When changing the nav or footer, apply the same edit to all 6 files.

### Contact Form
The contact form in `contact.html` uses Formspree (`action="https://formspree.io/f/xplaceholder"` with `method="POST"`). The placeholder form ID needs to be replaced with a real Formspree endpoint before deployment.

## Design System

Full design documentation is in `design/DESIGN.md`. Key rules:
- **No 1px solid borders** for section dividers — use background color shifts instead
- **Accent orange (#fc610f)** is reserved strictly for urgent CTAs / "Book Now" buttons
- **Tonal layering** for depth (surface → surface-container-low → surface-container-lowest), not drop shadows
- **Asymmetric layouts** preferred over centered grids for editorial feel
- Reference screenshots for each page are in `design/*.png`
