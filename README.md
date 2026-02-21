# Elison World

Cinematic digital hub for the Elison universe — where music, technology, and creator infrastructure intersect.

**Live Site:** [https://elisonworld.com](https://elisonworld.com)

## Overview

This is a single-page cinematic experience that serves as a narrative gateway to the Elison ecosystem:

- **OneTime Studio** — Creative sanctuary for artists
- **SongSplit** — Transparent music rights management
- **DevHouse AI** — Intelligent automation for creators

## Tech Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript
- GSAP + ScrollTrigger for animations
- Google Fonts (Playfair Display, Inter)

## Deployment

This site is configured for **GitHub Pages** deployment via the `elisonworld/elisonworld.github.io` repository.

### Deploy Steps

1. Create repository `elisonworld/elisonworld.github.io` on GitHub
2. Push these files to the `main` branch
3. GitHub Pages will auto-deploy to `https://elisonworld.github.io`
4. The CNAME file routes `elisonworld.com` to the GitHub Pages site

### DNS Configuration

In your domain registrar, add:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | elisonworld.github.io |

## Local Development

Open `index.html` in any modern browser — no build step required.

## License

© 2026 Elison. All rights reserved.
