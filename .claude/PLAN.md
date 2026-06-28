# Camp KO — Interactive Web Apps: Build Plan

## Summary

A 5-day JavaScript game development camp for 12 students ages 10–14, run at Kingswood Oxford (Camp KO).
Students learn core web concepts by building browser games — no installations, no frameworks, no hosting.
Just HTML, CSS, and JavaScript opened locally in a browser.

This repo (`camp-ko-games`) is the full course infrastructure: a public GitHub-hosted website for students
and parents to reference, plus all game templates, code examples, cheat sheets, and challenge prompts.
The site deploys via GitHub Pages from the root of `main`.

**Course name:** Interactive Web Apps
**Camp:** Camp KO — Kingswood Oxford (https://www.kingswoodoxford.org/camp-ko/)
**Dates:** August 3–7, 2026
**Students:** 12, ages 10–14, complete beginners
**Instructor:** Arissa (senior engineer, volunteering)
**GitHub:** https://github.com/arissafram/camp-ko-games
**Live site:** https://arissafram.github.io/camp-ko-games/

---

## Repo Structure

```
camp-ko-games/
├── index.html              ← home page (today widget, quick links, how to get started)
├── schedule.html           ← full 5-day schedule, current day highlighted
├── lessons.html            ← all 8 concept lessons inline (reference, not teaching vehicle)
├── team.html               ← team name + values (Arissa edits HTML and redeploys)
├── templates.html          ← game template cards, download instructions, barebone previews
├── examples.html           ← 5 small interactive demos, one concept each
├── challenges.html         ← tiered bonus tasks (easy / medium / creative / mystery)
├── cheat-sheets.html       ← quick-reference syntax cards
├── styles.css              ← shared site stylesheet
├── site.js                 ← shared site JS (nav, hamburger, today widget, anchor scroll)
│
├── games/                  ← fully working finished games (reviewed first)
│   ├── clicker/
│   ├── quiz/
│   ├── whack-a-mole/
│   ├── memory/
│   └── racing/
│
├── templates/              ← stripped-back versions for students (built after games approved)
│   ├── clicker-game/
│   │   ├── starter/        ← HTML structure, empty JS with TODO comments
│   │   ├── guided/         ← ~50% JS written, blanks with step hints
│   │   └── finished/       ← copy of working game (teacher reference)
│   ├── quiz-game/
│   ├── whack-a-mole/
│   ├── memory-game/
│   └── racing-game/
│
├── examples/
│   ├── counter/
│   ├── keyboard-movement/
│   ├── random-generator/
│   ├── timer/
│   └── animation-basics/
│
├── cheat-sheets/           ← standalone printable HTML reference cards
├── challenges/             ← challenge prompt files by tier
│
└── scratchpad/             ← blank boilerplate for free experimentation during lessons
    ├── index.html          ← basic HTML structure, links styles.css + script.js
    ├── styles.css          ← empty, ready to write in
    └── script.js           ← empty, ready to write in
```

---

## GitHub Pages Deployment

- Deploys from root of `main` branch
- Enable in: repo Settings → Pages → Source: Deploy from branch → main → / (root)
- No build step, no GitHub Actions needed
- URL: `https://arissafram.github.io/camp-ko-games/`

---

## Design System

**Font:** Inter (Google Fonts)
**Palette:** Black / white / `#f2f2f2` surface, `#e5e5e5` borders — clean and minimal base
**Accent colors (crayon strokes only):** blue `#4A6CF7`, red `#E8433A`, yellow `#F5C400`, green `#3DAA6E` — used sparingly as decoration, never for text or UI chrome
**Border-radius:** 2px max (sharp, not bubbly)
**Buttons:** Black bg, white text, hover → dark grey
**Code blocks:** Monospace, `#f8f8f8` bg, 1px border
**Nav:** Top bar, hamburger on mobile — course name left, page links right, active page underlined
**Mobile-first:** 350px min, 1100px max content width, `min-width` breakpoints only

**Crayon stroke decorations:**
- Short diagonal tick marks at corners of cards and section headings — like hand-drawn crayon strokes
- Implemented with `::before` / `::after` pseudo-elements: rotated `div`-like bars, ~24–40px long, 4–6px thick
- Rough hand-drawn edge via SVG filter (`feTurbulence` + `feDisplacementMap`) applied as a CSS filter
- Sparse placement — not on every element, just here and there. One or two strokes per card max
- Accent colors above, varied — no two adjacent elements share the same color stroke
- Strokes appear at outer corners only (top-left, top-right, bottom-right etc.), angled ~30–45° outward
- A utility class `.corner-mark` + modifier classes (`.corner-mark--blue`, `--red`, `--yellow`, `--green`, `--top-left`, `--bottom-right` etc.) so they can be placed deliberately in HTML

---

## Tone

Serious, plain, no puns. ELI5 — short sentences, real code immediately after every concept.

Example (What is a variable?):
> A variable is a name that stores a value.
> `let score = 0;`
> Now `score` holds the number `0`. Change what's inside it whenever you need to.

---

## Website Pages

| Page | Purpose |
|---|---|
| **Home** | Camp KO branding, today widget (auto-shows Aug 3–7 day), quick-link grid, how-to-download instructions |
| **Schedule** | All 5 days, morning / afternoon / final block per day, current day highlighted, goals + vocab per day |
| **Lessons** | 8 concepts inline, long scroll grouped by day, 4-piece format per concept. Reference only — Arissa teaches live. |
| **Team** | Team name + values. Static page styled like an inline editor; Arissa edits HTML and redeploys. |
| **Templates** | Cards for all 5 games, download instructions (GitHub ZIP), starter/guided/finished version links |
| **Examples** | 5 embedded interactive demos, each demonstrating exactly one concept |
| **Cheat Sheets** | 9 cards: first is bones/skin/action mental model, then 8 syntax reference cards. Printable. |
| **Challenges** | Tiered bonus tasks for students who finish early — see below |

---

## Challenges

Optional extension tasks for students who finish early. No grades, no pressure.

| Tier | Description | Example |
|---|---|---|
| **Easy** | Single small change, confidence builder | "Make your score start at 10 instead of 0" |
| **Medium** | Add a small feature to an existing template | "Add a reset button that sets score back to 0" |
| **Creative** | Open-ended, no single right answer | "Add a theme — change colors and text to match something you love" |
| **Mystery** | Instructor-revealed surprise tasks mid-week | Written as options; Arissa picks which to reveal |

---

## Game Templates

Build order: finished games first (Arissa reviews), then strip back into starter/guided.

| Game | Core mechanic | Concepts |
|---|---|---|
| Clicker | Click → score increases | Variables, events, functions |
| Quiz | Answer questions → track score | Arrays, objects, conditionals |
| Whack-a-Mole | Click randomly appearing targets | Timers, randomness, events |
| Memory | Flip and match card pairs | Arrays, state tracking, loops |
| Racing (2-player) | Q key vs P key, first to finish | Keyboard input, conditionals, DOM |

**Starter:** HTML done, JS has variable stubs + TODO comments
**Guided:** ~50% of JS written, step-by-step hints for the rest
**Finished:** Fully working, minimal styling (black/white/grey, functional)

---

## Examples (one concept each)

1. Click counter — events + variables
2. Keyboard movement — arrow keys move a box
3. Random color generator — Math.random → hex color
4. Countdown timer — setInterval, updates display
5. CSS animation trigger — classList toggle starts/stops animation

---

## Curriculum Overview (for reference — not built here)

| Day | Theme | Concepts | Build |
|---|---|---|---|
| 1 | Web Foundations + JavaScript Makes Things Happen | HTML/CSS/JS overview, variables, functions, events | Scratchpad, then clicker game |
| 2 | Games Need Decisions | Arrays, objects, conditionals | Quiz game |
| 3 | Movement + Randomness | Math.random, timers, keyboard input | Start final project |
| 4 | Build Day | Debugging, iteration | Final project |
| 5 | Pizzazz + Showcase | Polish, sound, animation | Arcade showcase for parents |

### Day 1 — Web Foundations Block (before JavaScript)

**Format:** Interactive board session led by Arissa, kids suggest, Arissa types live.

**Flow:**
1. "HTML is the bones" — Arissa writes a `div`, kids suggest what to add next (`h1`, `p`, a button, etc.)
2. "CSS is the style" — Arissa adds a `<style>` block, makes things red, bordered, bigger, centered
3. "JS is the action" — one button click that does something visible (alert, color change)
4. Kids turn to their machines, open the **scratchpad**, and try it themselves
5. Class shares screens / looks at each other's experiments

**Scratchpad** (`scratchpad/`) is what students use here — blank canvas, no game scaffolding.

---

## Build Sequence

See `.claude/IMPLEMENTATION.md` for the full 23-step plan with per-step commit messages.

High-level order:
1. Foundation: styles.css + site.js (mobile-first, hamburger nav, crayon stroke system)
2. Content pages: home, schedule, team, lessons
3. 5 finished games — Arissa reviews before templates are built
4. 5 × 3-tier templates (starter / guided / finished)
5. Scratchpad boilerplate
6. 5 code examples
7. Site pages: templates, examples, cheat sheets, challenges
8. README
