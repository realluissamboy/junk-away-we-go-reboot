#!/usr/bin/env node
/**
 * Generates src/assets/og-default.png (1200×630, sRGB, <200 KB)
 * for Junk Away We Go Demolition Inc.
 *
 * Requires: sharp  (npm install --no-save sharp)
 * Run:      node scripts/build-og.js
 *
 * Design intent:
 *  - Deep charcoal (#1b1c1c) to primary-dark (#003a56) horizontal gradient — editorial,
 *    matches the "Refined Industrialist" north star in design/DESIGN.md.
 *  - Accent orange (#fc610f) used only as a left-edge bar (4 px) and one small
 *    decorative rule — reserved for urgency per DESIGN.md, not flooded.
 *  - Typography rendered as embedded SVG text: Plus Jakarta Sans via font metrics
 *    (we cannot embed a web font in SVG+sharp, so we fall back to a system sans-serif
 *    at rendering time; the visual is still correct for an OG image).
 *  - No clipart, no emoji.
 */

'use strict';

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

const W = 1200;
const H = 630;

// Brand tokens (from inline Tailwind config in every .html file)
const COLOR = {
  bg_dark:    '#1b1c1c',   // on-surface — deep charcoal
  bg_mid:     '#003a56',   // deep primary (derived: primary #006493 darkened)
  primary:    '#006493',
  orange:     '#fc610f',   // accent — reserved for urgency
  white:      '#ffffff',
  subtext:    '#cae6ff',   // primary-fixed — muted but legible on dark
  surface_lo: '#f5f3f3',   // surface-container-low
};

// --- SVG card -----------------------------------------------------------
// We build the entire card as an SVG, then rasterize via sharp.
// Font fallback chain starts with "Plus Jakarta Sans" — if the system has it
// (Google Fonts downloaded to OS), sharp's librsvg will pick it up.
// Otherwise it falls to generic-sans. Either way legible at OG size.

const svg = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${W}" height="${H}"
  viewBox="0 0 ${W} ${H}"
>
  <defs>
    <!-- Background gradient: charcoal → deep primary -->
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="${COLOR.bg_dark}" />
      <stop offset="100%" stop-color="${COLOR.bg_mid}"  />
    </linearGradient>

    <!-- Subtle radial highlight, upper-right — "glass" feel -->
    <radialGradient id="glow" cx="85%" cy="15%" r="45%">
      <stop offset="0%"   stop-color="${COLOR.primary}" stop-opacity="0.28" />
      <stop offset="100%" stop-color="${COLOR.primary}" stop-opacity="0"    />
    </radialGradient>

    <!-- Clip for the whole card -->
    <clipPath id="card-clip">
      <rect width="${W}" height="${H}" rx="0" ry="0" />
    </clipPath>
  </defs>

  <!-- ── Background layer ─────────────────────────────────── -->
  <rect width="${W}" height="${H}" fill="url(#bg)" clip-path="url(#card-clip)" />
  <rect width="${W}" height="${H}" fill="url(#glow)" clip-path="url(#card-clip)" />

  <!-- ── Accent orange left-edge bar (4 px) ───────────────── -->
  <!-- Orange reserved per DESIGN.md — used minimally as an urgency signal -->
  <rect x="0" y="0" width="6" height="${H}" fill="${COLOR.orange}" />

  <!-- ── Decorative horizontal rule, accent orange, 40% opacity ─ -->
  <!-- Sits between wordmark and tagline; tiny, editorial -->
  <rect x="72" y="286" width="180" height="3" fill="${COLOR.orange}" opacity="0.75" rx="1.5" />

  <!-- ── Large background "J" monogram — watermark depth ──── -->
  <!-- Very low opacity; adds editorial texture without clipart -->
  <text
    x="980" y="660"
    font-family="'Plus Jakarta Sans', 'Work Sans', Arial, sans-serif"
    font-weight="800"
    font-size="680"
    fill="${COLOR.primary}"
    opacity="0.07"
    text-anchor="middle"
  >J</text>

  <!-- ── Wordmark: JUNK AWAY WE GO ────────────────────────── -->
  <text
    x="72" y="232"
    font-family="'Plus Jakarta Sans', 'Work Sans', Arial, sans-serif"
    font-weight="800"
    font-size="88"
    letter-spacing="-1"
    fill="${COLOR.white}"
  >JUNK AWAY WE GO</text>

  <!-- ── Tagline ───────────────────────────────────────────── -->
  <text
    x="72" y="354"
    font-family="'Work Sans', Arial, sans-serif"
    font-weight="400"
    font-size="36"
    letter-spacing="0.5"
    fill="${COLOR.subtext}"
  >Junk Removal &amp; Demolition</text>

  <!-- ── Location pill ─────────────────────────────────────── -->
  <!-- Pill background: primary at low opacity -->
  <rect x="72" y="392" width="216" height="48" rx="24"
        fill="${COLOR.primary}" opacity="0.35" />
  <rect x="72" y="392" width="216" height="48" rx="24"
        fill="none" stroke="${COLOR.primary}" stroke-width="1.5" opacity="0.6" />
  <text
    x="180" y="424"
    font-family="'Work Sans', Arial, sans-serif"
    font-weight="600"
    font-size="22"
    fill="${COLOR.white}"
    text-anchor="middle"
  >Poway, CA</text>

  <!-- ── Bottom-right license note ────────────────────────── -->
  <text
    x="${W - 56}" y="${H - 36}"
    font-family="'Work Sans', Arial, sans-serif"
    font-weight="400"
    font-size="18"
    fill="${COLOR.white}"
    opacity="0.35"
    text-anchor="end"
  >CA Lic #1128050</text>

  <!-- ── Bottom-left domain ───────────────────────────────── -->
  <text
    x="72" y="${H - 36}"
    font-family="'Work Sans', Arial, sans-serif"
    font-weight="400"
    font-size="18"
    fill="${COLOR.white}"
    opacity="0.35"
  >junkawaywego.com</text>

</svg>`;

// --- Rasterize ----------------------------------------------------------
const outDir  = path.resolve(__dirname, '../src/assets');
const outFile = path.join(outDir, 'og-default.png');

fs.mkdirSync(outDir, { recursive: true });

sharp(Buffer.from(svg))
  .resize(W, H)                     // librsvg renders at native size; resize is a no-op safety net
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .withMetadata({ icc: 'srgb' })    // sRGB profile per spec requirement
  .toFile(outFile)
  .then(info => {
    const kb = (fs.statSync(outFile).size / 1024).toFixed(1);
    console.log(`\nOG card written: ${outFile}`);
    console.log(`Dimensions:      ${info.width} × ${info.height} px`);
    console.log(`File size:       ${kb} KB`);
    console.log(`Format:          PNG / sRGB`);
  })
  .catch(err => {
    console.error('build-og.js failed:', err.message);
    process.exit(1);
  });
