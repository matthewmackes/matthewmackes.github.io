# Mackes Audio Platform Site

This repository publishes the one-page GitHub Pages site for Mackes Audio Platform.

## Purpose

The site presents MAP2 as:

- an educational Linux audio platform
- a practical reference for musicians and audio developers
- an honest overview of current features, architecture, and use cases

## Primary links

- Site: `https://matthewmackes.github.io`
- Nightly builds: `https://github.com/matthewmackes/MAP2-RELEASES/tree/main/nightly`
- Platform source: `https://github.com/matthewmackes/map2-audio`
- LinkedIn: `https://www.linkedin.com/in/matthewmackes/`

## Structure

- `index.html`: one-page site markup
- `entries/*.txt`: plain text update entries that generate the homepage updates section
- `scripts/build_entries.py`: regenerates the updates section in `index.html`
- `assets/css/style.css`: Carbon-inspired dark theme and layout
- `assets/map2-hero-icon.svg`: MAP2 icon used throughout the site

## Deployment

The repo uses GitHub Pages with the static deployment workflow in `.github/workflows/deploy-static-site.yml`.
That workflow runs `python3 scripts/build_entries.py`, so adding a new `entries/*.txt` file and pushing to `main` is enough to publish a new homepage update.
