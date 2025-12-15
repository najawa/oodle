# Whimsical Text Transformations

A suite of silly text transformations that mangle your words in fun ways and read them aloud.

**Live site:** [oodle.online](http://oodle.online)

## Transformations

| Name | What it does | Example |
|------|--------------|---------|
| **Oodle** | Replaces vowels with "oodle" | Hello → Hoodlelloodle |
| **Wibble** | Adds "ib" after consonants | Hello → Hibeliblibo |
| **Snorfle** | Adds "snorf" to each word | Hello → Hellosnorf |
| **Bloop** | Adds "oop" after vowels | Hello → Heoopllooop |
| **Zazzle** | Replaces s/z with "zazzle" | Suzy → Zazzleuzazzley |
| **Flumph** | Adds "lumph" after lip sounds | Bob → Blumphoblumph |

Each transformation:
- Speaks the result aloud using text-to-speech
- Generates a shareable link
- Works on mobile and desktop

## Development

This is a vanilla JavaScript application with no build process.

### Running locally

Serve the `code/public/` directory with any HTTP server:

```bash
cd code/public
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Running tests

```bash
npm install
npm test
```

## Project Structure

```
code/public/
├── index.html                    # Landing page
├── {oodle,wibble,...}/index.html # Individual transformation pages
└── assets/
    ├── js/
    │   ├── transformations.js    # All transformation functions
    │   ├── app.js                # Shared app logic
    │   └── vendor/               # Third-party libraries
    └── css/
        └── styles.css            # Styling
test/
└── transformations.test.js       # Unit tests
```

## Dependencies

- [jQuery 2.2.4](https://jquery.com/) - DOM manipulation (CDN)
- [Typed.js](https://mattboldt.com/demos/typed-js/) - Typing animation
- [SweetAlert](https://sweetalert.js.org/) - Modal dialogs
- [Font Awesome](https://fontawesome.com/) - Icons

## License

Copyright Nathaniel Waddell
