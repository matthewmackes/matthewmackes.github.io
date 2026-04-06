# Site Updates

Add a new `.txt` file in this directory to publish an update on the homepage.

## Format

```txt
Title: Your update title
Date: 2026-04-06
Link: https://example.com/optional
---
First paragraph of the update.

Second paragraph of the update.
```

## Rules

- `Title` is required.
- `Date` is required and must use `YYYY-MM-DD`.
- `Link` is optional.
- Put the body below `---`.
- Separate paragraphs with a blank line.

## Build

The deploy workflow runs `python3 scripts/build_entries.py` automatically before publishing GitHub Pages.
