# Camp KO — Interactive Web Apps

Course website for a 5-day JavaScript game development camp at Kingswood Oxford (August 3–7, 2026). Students build browser games using plain HTML, CSS, and JavaScript — no frameworks, no installations.

Live site: [arissafram.github.io/camp-ko-games](https://arissafram.github.io/camp-ko-games/)

## Pages

- **Home** (`index.html`) — team values and quick links into the rest of the site.
- **Schedule** (`schedule.html`) — day-by-day plan for Monday–Friday (goals, today's plan, vocab) plus the daily camp schedule.
- **Core Concepts** (`concepts.html`) — reference lookup for the JS concepts used all week: Getting Started, Remembering Things, Making Things Happen, Making Decisions, Working With Lists, Game Tricks, Thinking Like a Programmer.
- **Build Together** (`build-together.html`) — the shared in-class build. Everyone starts from the same Clicker game and makes it their own.
- **More Games** (`games.html`) — a "How do I start?" guide plus six playable examples (Magic 8 Ball, Hidden Treasure, Rock Paper Scissors, Race Cars, Impossible Game, Clicker), each with a starter template link.

Pages with more than one section (Schedule, Concepts, More Games) use a sticky sub-nav (`.page-nav`) that either jumps to an anchor or swaps between content sections depending on the page, and scrolls the clicked tab into view if it's partially offscreen.

## Games and templates

- `web-app/games/` — finished reference implementations (clicker, clicker-advanced, hidden-treasure, impossible-game, magic-8-ball, memory, race-cars, rock-paper-scissors), embedded via iframe on Build Together / More Games.
- `web-app/templates/` — matching starter files for students to fork, plus a blank `scratch-pad` template. All templates use `id` + `addEventListener` (no inline `onclick`), with setup code running inside the `window` `load` handler.

---

## Running locally

No build step. Open any file directly in a browser.

```
open index.html
```

Or use a local server to avoid iframe restrictions on the game/example pages:

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
