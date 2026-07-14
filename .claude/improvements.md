# Camp KO Games — Site Improvements

## 1. Anchor scroll offset on pages with sub-nav

**Problem:** Pages with a `.page-nav` (lessons, cheat-sheets, etc.) load in a visually scrolled position when a URL hash is present. The browser scrolls the anchor target to the top of the viewport, but the two sticky bars (`.site-nav` 56px + `.page-nav` 44px = 100px total) cover it.

The `history.replaceState` call in the scroll handler also writes the current hash into the URL on every scroll, so refreshing or sharing a link reproduces the bug.

**Fix:** Add `scroll-margin-top: 100px` to `.page-section` in `styles.css`. This tells the browser to account for the sticky headers when scrolling to an anchor target.

```css
.page-section {
  scroll-margin-top: 100px;
}
```

No changes needed to the JS — `scroll-margin-top` is handled natively by the browser.

**Alternative fix — content swapping (preferred):** Replace the scroll-based approach with a tab-style content swap in vanilla JS. Only one `.page-section` is visible at a time; clicking a page-nav link hides the current section and shows the target one. URL hash is updated via `history.pushState` so deep links and refresh still work. On page load, read the hash to determine which section to show, defaulting to the first.

- Eliminates the scroll offset problem entirely (no scrolling involved)
- Removes the need for the scroll listener in `site.js`
- Feels more app-like — suits pages like lessons/cheat-sheets where you look up one day at a time
- Tradeoff: loses continuous scrolling through all content

---

## 2. Rogue crayon line on home page

**Problem:** A red crayon stroke appears floating near the left edge of the home page. It's the `corner-mark--red corner-mark--bottom-left` span inside the cheat-sheets `.quick-link-card`. `.quick-link-card` has no `position: relative`, so the `position: absolute` corner marks have no containing block and drift to a positioned ancestor higher up the tree.

**Fix:** Add `position: relative` to `.quick-link-card` in `styles.css`.

```css
.quick-link-card {
  position: relative;
  /* existing styles... */
}
```

---

## 3. Global border-radius increase to 6px

**Problem:** All bordered elements use `--radius: 2px`, which is very sharp. Should be softer.

**Fix:** Update the CSS variable in `styles.css`.

```css
:root {
  --radius: 6px;
}
```

Nearly all `border-radius` declarations use `var(--radius)` so this propagates everywhere automatically. The two hardcoded exceptions (`3px` on `.corner-mark`, `50%` on the circular element) are intentional and stay unchanged.

---

## 4. Pizzazz — color, typography, spacing

**Goal:** Keep the site clean and readable but make it feel like camp, not a corporate docs site.

### Color palette
Replace the current neutral accent colors with this palette from colorhunt.co/palette/3852b45e7ac4f3be7af08d39:

| Variable | Old | New | Role |
|---|---|---|---|
| `--camp-navy` | — | `#3852b4` | Primary dark blue — nav, headings, bold accents |
| `--camp-blue` | — | `#5e7ac4` | Secondary blue — links, sub-accents, page-nav active |
| `--camp-peach` | — | `#f3be7a` | Warm mid-tone — card tints, highlights |
| `--camp-orange` | — | `#f08d39` | Bright orange — CTAs, corner marks, emphasis |

Background: change `body` background from pure white `#ffffff` to a warm off-white `#fffdf5`. Makes the palette pop and feels less clinical.

### Typography
Add a display font for headings. Suggestion: **Baloo 2** (Google Fonts, free) — rounded, energetic, clearly legible. Use it for `h1` and `h2` only; keep Inter for body text, nav, and labels.

```html
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

```css
:root {
  --font-display: 'Baloo 2', system-ui, sans-serif;
}
h1, h2 { font-family: var(--font-display); }
```

### Tinted cards
Each quick-link card already has a corner-mark in one accent color. Give each card a matching very-light tint background so the color system reads as intentional:

- Schedule (blue corner) → `#3852b4` at ~6% opacity background
- Lessons (green corner) → keep or remap to `--camp-peach` tint
- Templates (yellow corner) → `--camp-orange` tint
- Cheat Sheets (red corner) → remap corner to `--camp-orange`, tint to match

### Apply crayon filter to h1
The `#crayon-rough` SVG filter already exists. Apply it to the page `h1` so it reads like a chalk/crayon headline rather than a print headline.

```css
h1 {
  filter: url(#crayon-rough);
}
```

### Spacing
- Page header: bump padding from `3rem 0 2rem` to `4.5rem 0 3rem`
- Section gaps: increase `margin-bottom` on section titles and between grid cards
- Container: consider narrowing max-width slightly (e.g., `960px`) so content doesn't stretch too wide on large screens

### Nav brand
Color the nav brand text with `--camp-navy` and use the display font, so it reads as a logo rather than a label.
