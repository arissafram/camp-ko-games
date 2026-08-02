# Camp KO — Interactive Web Apps

Course website for a 5-day JavaScript game development camp at Kingswood Oxford (August 3–7, 2026). Students build browser games using plain HTML, CSS, and JavaScript — no frameworks, no installations.

Live site: [arissafram.github.io/camp-ko-games](https://arissafram.github.io/camp-ko-games/)

---

## Running locally

No build step. Open any file directly in a browser.

```
open index.html
```

Or use a local server to avoid iframe restrictions on the examples page:

```
npx serve .
```

Then visit `http://localhost:3000`.

---

## Deploying

The site deploys automatically from the `main` branch via GitHub Pages.

1. Push changes to `main`
2. GitHub Pages rebuilds in ~30 seconds
3. Changes are live at the URL above

To enable Pages on a fresh fork: **Settings → Pages → Deploy from branch → main → / (root)**

---

## Repo structure

```
camp-ko-games/
├── index.html            home page (must stay at repo root for GitHub Pages)
└── web-app/
    ├── schedule.html      5-day schedule
    ├── concepts.html      core concept reference
    ├── build-together.html  in-class shared build
    ├── games.html         more games to build
    ├── styles.css         shared styles
    ├── script.js          shared JS (nav, page-nav, today widget)
    ├── favicon.png
    ├── games/             finished games (instructor reference)
    └── templates/         starter templates per game
```
