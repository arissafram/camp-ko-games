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
├── index.html           home page
├── schedule.html        5-day schedule
├── lessons.html         8 concept lessons (reference)
├── team.html            team name + values
├── templates.html       game template cards + download instructions
├── examples.html        5 interactive demos
├── cheat-sheets.html    quick-reference syntax cards
├── challenges.html      tiered bonus tasks
├── styles.css           shared styles
├── site.js              shared JS (nav, today widget)
├── games/               5 finished games (instructor reference)
├── templates/           starter / guided / finished per game
├── examples/            standalone demo mini-apps
├── cheat-sheets/        printable reference cards
├── challenges/          challenge prompts by tier
└── scratchpad/          blank canvas for Day 1 experimentation
```
