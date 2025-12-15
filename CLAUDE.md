# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A suite of whimsical text transformations (Oodle, Wibble, Snorfle, Bloop, Zazzle, Flumph) with text-to-speech and sharing. The production site runs at oodle.online.

## Development

This is a vanilla JavaScript/HTML/CSS project with no build process. All dependencies are vendored.

**To run locally:** Serve `/code/public/` with any HTTP server (e.g., `python -m http.server 8000` from that directory).

**To run tests:**
```bash
npm install   # First time only
npm test
```

## Architecture

```
code/public/
├── index.html                    # Landing page with links to all transformations
├── {oodle,wibble,...}/index.html # Individual transformation pages
└── assets/
    ├── js/
    │   ├── transformations.js    # Pure transformation functions (testable)
    │   ├── app.js                # Shared UI logic (speech, sharing, events)
    │   └── vendor/               # Vendored libraries
    └── css/styles.css
test/
└── transformations.test.js
```

## Key Files

**transformations.js** - Pure functions for each transformation:
- `oodleText(text)` - Vowels → "oodle"
- `wibbleText(text)` - Consonants + "ib"
- `snorfleText(text)` - Words + "snorf"
- `bloopText(text)` - Vowels + "oop"
- `zazzleText(text)` - s/z → "zazzle"
- `flumphText(text)` - Labials + "lumph"

**app.js** - Shared app logic:
- `WhimsicalApp.init({ transformationType })` - Initializes a transformation page
- Handles text-to-speech, sharing, URL parameters, and events

## Adding a New Transformation

1. Add the transformation function to `transformations.js`
2. Add it to the `transformations` registry object
3. Create a new directory and `index.html` (copy from existing)
4. Add a card to the landing page `index.html`
5. Add tests to `test/transformations.test.js`
