# Camp KO — Implementation Plan

Steps are ordered to build working things first (games before templates, foundation before pages).
Each step ends with a `git commit`. Check off steps as they're done.

---

## Step 1 — Repo setup
- [ ] `git init`, create GitHub repo `arissafram/camp-ko-games`, push
- [ ] Enable GitHub Pages: Settings → Pages → Deploy from branch → `main` → `/` (root)
- [ ] Confirm `https://arissafram.github.io/camp-ko-games/` resolves (may take a minute)
- **Commit:** `Init`

---

## Step 2 — Foundation: styles.css + site.js

**Mobile-first design system.** All CSS starts at 350px min and expands up. Content max-width 1100px, centered. No desktop-down media queries — only `min-width` breakpoints.

**styles.css**
- CSS reset (box-sizing, margin/padding 0)
- Inter font via Google Fonts
- CSS variables: `--black`, `--white`, `--surface` (#f2f2f2), `--border` (#e5e5e5), `--radius` (2px)
- Accent color variables: `--accent-blue` #4A6CF7, `--accent-red` #E8433A, `--accent-yellow` #F5C400, `--accent-green` #3DAA6E — used only for crayon stroke decorations, never for text or UI chrome
- `.container`: max-width 1100px, centered, horizontal padding for gutters
- Nav: hamburger menu on mobile (≤ 640px), full horizontal link bar on desktop — course name left, page links right, active page underlined
- Button: black bg, white text, hover → dark grey, 2px radius
- Code blocks: monospace, `#f8f8f8` bg, 1px border, padding
- Typography: h1/h2/h3 sizes, paragraph line-height
- Layout utilities: `.grid`, `.card`
- In-page nav: `.page-nav` — sticky or top-of-section anchor bar used on long pages (lessons, templates, examples, cheat sheets)
- Crayon stroke system: SVG filter (`feTurbulence` + `feDisplacementMap`) for rough hand-drawn edges; `.corner-mark` base class + color modifiers (`--blue`, `--red`, `--yellow`, `--green`) + position modifiers (`--top-left`, `--top-right`, `--bottom-left`, `--bottom-right`); each mark is a pseudo-element rotated bar ~24–40px × 5px angled outward ~30–45°; placed deliberately in HTML, not applied globally

**site.js**
- Hamburger menu toggle (open/close mobile nav)
- Nav active-page highlight: marks current page link underlined
- Anchor scroll handler: on scroll, updates `window.location.hash` to match the nearest visible section (drives URL-updating anchors on long pages)
- Today widget function: given Aug 3–7 2026, returns day number 1–5, `"before"`, or `"after"`

**index.html (shell only)**
- Full nav + hamburger, empty `<main>`, links styles.css + site.js
- Used to confirm nav + styles render correctly on mobile and desktop

- **Commit:** `Add shared styles, nav, and site JS`

---

## Step 3 — Home page (index.html)
Replace the shell with real content.

- Today widget: shows "Day N — [theme]" Aug 3–7, "Camp starts in X days" before, "See you next year" after
- Quick-link grid: cards for all 8 pages (Schedule, Lessons, Team, Templates, Examples, Cheat Sheets, Challenges) — label + one-line description
- How-to-download instructions: step-by-step for GitHub ZIP download (students don't use git)
- Camp KO branding header with dates + location

- **Commit:** `Add home page`

---

## Step 4 — Schedule page (schedule.html)
- 5-day layout: each day is a card or section (Day 1–5 with full date)
- Per day: Theme, Morning block, Afternoon block, Final block, Goals (bullet list), Vocab (inline tags)
- Current day auto-highlighted using today widget — CSS class added by site.js
- Day content pulled from PLAN.md curriculum table + Day 1 detail block
- In-page nav: Day 1 | Day 2 | Day 3 | Day 4 | Day 5 — anchors update the URL on scroll

- **Commit:** `Add schedule page`

---

## Step 5 — Team page (team.html)
Static page that looks like an inline editor. Arissa edits the HTML directly and redeploys to update between sessions — students never see the edit mechanism.

- Team name: large prominent field, styled like a contenteditable input (border-bottom, cursor text on hover) — plain `<h1>`, not actually editable in the browser
- Team values: list of values, each styled as an editable-looking row (same aesthetic)
- Edit button: present in HTML but hidden via `display: none` — no functionality
- Placeholder content pre-filled: `Team Name`, `Value 1`, `Value 2`, etc.

- **Commit:** `Add team page`

---

## Step 6 — Lessons page (lessons.html)
**This is a reference page, not a teaching vehicle.** Arissa teaches live; students look things up here while building.

Long scroll. In-page nav at the top groups concepts by day and updates the URL on scroll.

**In-page nav:** Day 1 | Day 2 | Day 3

**Day 1 — Variables, Functions, Events**
**Day 2 — Arrays, Objects, Conditionals**
**Day 3 — Loops, Randomness**

Each concept follows the same 4-piece structure:
1. One-line plain-English definition
2. Code block (minimal working example)
3. One sentence explaining what the code does
4. One "watch out" — the most common beginner mistake for that concept

- **Commit:** `Add lessons page`

---

## Step 7 — Clicker game (games/clicker/)
Files: `index.html`, `styles.css`, `script.js`

- Click button → score increments by 1
- Display: current score, clicks-per-second (rolling 1s window)
- High score persists in `localStorage`
- Reset button
- Clean black/white/grey styling — no special effects

- **Commit:** `Add clicker game`

---

## Step 8 — Quiz game (games/quiz/)
Files: `index.html`, `styles.css`, `script.js`

- Questions stored as array of objects `{ question, answers[], correct }`
- One question at a time, 4 answer buttons
- Correct/wrong feedback (color flash), then auto-advance after 1s
- Score display at end, replay button
- 10 JS-themed questions (concept-based, approachable for beginners)
- Clean black/white/grey styling

- **Commit:** `Add quiz game`

---

## Step 9 — Whack-a-Mole (games/whack-a-mole/)
Files: `index.html`, `styles.css`, `script.js`

- 3×3 grid of holes
- `setInterval` randomly shows a mole in one hole for ~800ms
- Click mole → score +1, mole disappears immediately
- 30-second countdown timer
- Game over screen with score + play again
- Clean black/white/grey styling

- **Commit:** `Add whack-a-mole game`

---

## Step 10 — Memory game (games/memory/)
Files: `index.html`, `styles.css`, `script.js`

- 4×4 grid (8 pairs) of face-down cards
- Click card → flip to reveal symbol/emoji
- Second card flipped: match → stay face-up, no match → flip back after 1s
- Track pairs matched, moves taken
- Win state when all pairs matched — shows moves count + play again
- Clean black/white/grey styling

- **Commit:** `Add memory game`

---

## Step 11 — Racing game (games/racing/)
Files: `index.html`, `styles.css`, `script.js`

- 2-player split layout
- Player 1: `Q` key, Player 2: `P` key
- Each keypress advances that player's progress bar by ~2%
- First to 100% wins — banner shown
- Play again resets both bars
- Clean black/white/grey styling

- **Commit:** `Add racing game`

---

## ⏸ Review checkpoint
**Arissa reviews all 5 finished games before templates are built.**
Templates are stripped-back versions of the finished games — don't strip until the games are approved.

---

## Step 12 — Clicker templates (templates/clicker-game/)

**starter/**
- `index.html`: full HTML structure (button, score display, all elements present)
- `script.js`: variable stubs declared, empty functions with `// TODO:` comments explaining each step
- `styles.css`: minimal functional styles

**guided/**
- `script.js`: ~50% written — score variable declared and displayed, click handler skeleton present, step hints like `// Step 2: add 1 to score, then call updateDisplay()`
- Same HTML as starter

**finished/**
- Copy of `games/clicker/`

- **Commit:** `Add clicker templates`

---

## Step 13 — Quiz templates (templates/quiz-game/)
Same three-tier structure. Guided version has questions array pre-written; student fills in answer-checking logic.

- **Commit:** `Add quiz templates`

---

## Step 14 — Whack-a-Mole templates (templates/whack-a-mole/)
Guided version has grid HTML + mole-show logic written; student fills in click handler + timer.

- **Commit:** `Add whack-a-mole templates`

---

## Step 15 — Memory templates (templates/memory-game/)
Guided version has card-flip animation written; student fills in match logic + win condition.

- **Commit:** `Add memory templates`

---

## Step 16 — Racing templates (templates/racing-game/)
Guided version has keyboard listener wired; student fills in progress update + win check.

- **Commit:** `Add racing templates`

---

## Step 17 — Scratchpad boilerplate (scratchpad/)
Blank canvas for Day 1 experimentation. Already exists as a directory — populate it.

- `index.html`: standard HTML5 boilerplate, links `styles.css` + `script.js`, one `<div id="app"></div>`
- `styles.css`: empty with `/* write your styles here */`
- `script.js`: empty with `/* write your JavaScript here */`

- **Commit:** `Add scratchpad boilerplate`

---

## Step 18 — Code examples (examples/)
5 self-contained mini-apps, one concept each. Each `index.html` has inline CSS + JS (no external files).

1. **counter/** — button increments/decrements count. Concepts: variables, events
2. **keyboard-movement/** — arrow keys move a box. Concepts: keydown events, DOM style
3. **random-generator/** — button generates a random hex color, sets background. Concepts: Math.random
4. **timer/** — user sets seconds, countdown runs, "Time's up!" at zero. Concepts: setInterval, clearInterval
5. **animation-basics/** — button toggles a CSS class that starts/stops a spinning animation. Concepts: classList.toggle

Each example: title, live interactive element, then full source in a `<pre><code>` block below so students can read it.

- **Commit:** `Add code examples`

---

## Step 19 — Templates page (templates.html)
- In-page nav: Clicker | Quiz | Whack-a-Mole | Memory | Racing — anchors update URL on scroll
- 5 game sections: name, one-line description, 3 buttons (Starter / Guided / Finished)
- Download = link to the GitHub folder (students download full repo as ZIP)
- Instructions block at top: how to download the repo ZIP, where to find templates/, how to open in browser

- **Commit:** `Add templates page`

---

## Step 20 — Examples page (examples.html)
- In-page nav: Counter | Keyboard Movement | Random Generator | Timer | Animation — anchors update URL
- 5 sections: concept label (e.g. "Events + Variables"), `<iframe>` of the live example, one-line note on what to notice

- **Commit:** `Add examples page`

---

## Step 21 — Cheat sheets (cheat-sheets/ + cheat-sheets.html)
Standalone printable reference cards, self-contained HTML with inline styles (no nav, print-friendly).

**First card — The Big Picture**
- HTML = Bones (structure, the elements that exist)
- CSS = Skin (what things look like)
- JS = Action (what things do)
- Which file to edit for which kind of change

**Remaining cards (one per topic):**
1. Variables & data types — `let`, `const`, string, number, boolean
2. Functions — declare, call, parameters, return
3. Events — `addEventListener` patterns, common event types
4. Arrays — create, read, push, length, loop
5. Objects — create, read, set, nested
6. Conditionals — if/else, comparison operators table
7. Loops — for loop anatomy, while loop, looping arrays
8. DOM manipulation — `getElementById`, `querySelector`, `.textContent`, `.style`, `.classList`

`cheat-sheets.html`: In-page nav across all 9 cards. Print button per card.

- **Commit:** `Add cheat sheets`

---

## Step 22 — Challenges (challenges/ + challenges.html)
**Easy (4–5 prompts):** One small concrete change per game. E.g., "Make your score start at 10 instead of 0."
**Medium (4–5 prompts):** Add a small feature. E.g., "Add a reset button that sets score back to 0."
**Creative (3–4 prompts):** Open-ended. E.g., "Add a theme — change all colors and text to match something you love."
**Mystery (3–4 options):** Written but hidden — Arissa reveals mid-week. Stored as `<details>` elements, closed by default.

`challenges.html`: Four tier sections with cards per prompt. Mystery section shows "Unlocked by your instructor" with closed `<details>`.

- **Commit:** `Add challenges page`

---

## Step 23 — README
- What this repo is + link to live site
- Folder structure overview (abbreviated)
- For instructors: how to fork + customize
- **Commit:** `Add README`

---

## Summary

| Steps | Area |
|---|---|
| 1 | Repo + Pages setup |
| 2 | Foundation: CSS, JS, mobile-first nav |
| 3–6 | 4 content pages: home, schedule, team, lessons |
| 7–11 | 5 finished games (bare bones styling) |
| ⏸ | Review checkpoint |
| 12–16 | 5 × 3-tier templates |
| 17 | Scratchpad boilerplate |
| 18 | 5 code examples |
| 19–22 | Site pages: templates, examples, cheat sheets, challenges |
| 23 | README |

**Total: 23 commits**
