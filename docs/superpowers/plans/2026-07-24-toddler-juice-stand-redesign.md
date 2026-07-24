# Toddler Juice-Stand Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Thế Giới Trái Cây into a citrus juice-stand preschool app with bottom dock, Match / Sort / Blender / Garden only, and sticker rewards.

**Architecture:** Keep Vite + vanilla JS. Restyle shell in `index.html` + `style.css` + `main.js`. Add `MatchGame.js`. Toddler-simplify Sorting/Blender/Garden. Drop Quiz/Memory/Spelling/Album from the shell (files may remain unused). Silhouettes via CSS filter on existing fruit SVGs (no new SVG assets).

**Tech Stack:** Vite 5, vanilla ES modules, canvas-confetti, Web Speech API (existing audio utils)

## Global Constraints

- Ages 3–5: icon-first, minimal text, TTS fruit names
- Visual: citrus stall (yellow/orange/cream); fonts Baloo 2 + Be Vietnam Pro; no purple gradients, glass blur, floating bg decor
- Dock: Match · Sort · Blender · Garden only
- Sort: red/yellow/green baskets only; exclude purple fruits
- Match: ~6 silhouettes; drag + tap-to-place; +1 star + sticker on board complete
- Stickers: reward popup, not a dock tab
- No new npm dependencies
- No git commits unless user asks (repo may be uninitialized)

## File map

| File | Role |
|------|------|
| `index.html` | Shell: top bar, main, bottom dock; Baloo 2 + Be Vietnam Pro; no footer |
| `style.css` | Full citrus design system + match/sort/blender/garden/dock/toast |
| `main.js` | App: 4 modes, i18n, stars, sticker toast |
| `src/components/MatchGame.js` | NEW silhouette match |
| `src/components/SortingGame.js` | Color sort toddler rebuild |
| `src/components/BlenderGame.js` | Simplified blend loop |
| `src/components/GardenGame.js` | Bigger plots, less copy |
| `src/data/fruits.js` | Export `SORT_CATEGORIES` (no purple) |

---

### Task 1: Data + shell HTML

**Files:**
- Modify: `src/data/fruits.js`
- Modify: `index.html`

**Produces:** `SORT_CATEGORIES` without purple; dock DOM for 4 games

- [x] **Step 1:** Add after `CATEGORIES`:

```js
export const SORT_CATEGORIES = {
  red: CATEGORIES.red,
  yellow: CATEGORIES.yellow,
  green: CATEGORIES.green
};
```

- [ ] **Step 2:** Replace `index.html` body shell with citrus top bar + `#game-view-container` + bottom `.game-dock` tabs: `match`, `sorting`, `blender`, `garden`. Remove footer and floating bg decor. Fonts link: Baloo 2 + Be Vietnam Pro.

- [ ] **Step 3:** Verify: open `index.html` structure — 4 `data-mode` buttons, no quiz/memory/spelling/album/footer.

---

### Task 2: Citrus CSS system

**Files:**
- Modify: `style.css` (rewrite `:root` + layout; keep reusable game utilities; add match/dock/toast)

**Produces:** Visual system matching citrus stall spec

- [ ] **Step 1:** Replace `:root` tokens:

```css
:root {
  --citrus-yellow: #ffcc33;
  --citrus-orange: #ff8c1a;
  --citrus-cream: #fff8e7;
  --citrus-wood: #e85d04;
  --citrus-ink: #5c2e0a;
  --citrus-muted: #9a6412;
  --success-green: #3d9a5f;
  --danger-coral: #e85d4c;
  --panel: #fffaf0;
  --border: 3px solid #e85d04;
  --radius: 18px;
  --shadow: 0 4px 0 rgba(232, 93, 4, 0.18);
  --font-display: 'Baloo 2', 'Be Vietnam Pro', sans-serif;
  --font-body: 'Be Vietnam Pro', system-ui, sans-serif;
}
```

- [ ] **Step 2:** Layout: `.app-layout` full height; `.app-header` thin citrus bar; `.game-dock` fixed/sticky bottom with 4 huge tabs; `.app-main` padded above dock; remove glass/`backdrop-filter` and `.floating-bg-decor` styles.

- [ ] **Step 3:** Add Match styles (`.match-board`, `.match-slot`, `.match-slot.filled`, `.match-tray`, `.match-fruit`, `.silhouette` with `filter: brightness(0) opacity(0.28)`), sticker toast, toddler-sized sort/blender/garden panels.

- [ ] **Step 4:** Verify: `npm run build` still parses CSS (or run after Task 3 if HTML refs change).

---

### Task 3: MatchGame

**Files:**
- Create: `src/components/MatchGame.js`

**Produces:** `export class MatchGame` with `setLang(lang)`, board of 6, tray, drag + tap

- [ ] **Step 1:** Implement MatchGame:
  - Pick 6 random fruits; slots `{ fruitId, filled }`; tray copies of same 6 (unplaced)
  - Render silhouette slots + tray fruits
  - Pointer: select tray fruit → click slot; also HTML5 drag/drop
  - Correct: mark filled, speak name, remove from tray
  - Wrong: shake slot
  - All filled: `onAwardStar()`, `onUnlockFruit(firstMatchedId)`, confetti, play-again

- [ ] **Step 2:** Manual logic check: wrong fruit does not fill; completing board calls star once.

---

### Task 4: Rebuild Sort / simplify Blender & Garden

**Files:**
- Modify: `src/components/SortingGame.js`
- Modify: `src/components/BlenderGame.js`
- Modify: `src/components/GardenGame.js`

- [ ] **Step 1:** SortingGame — use `SORT_CATEGORIES`; pool only `colorGroup` in red/yellow/green; 6 fruits; short header (icon + one line); +1 star only on round complete (not per fruit); unlock fruit on correct place; victory play-again.

- [ ] **Step 2:** BlenderGame — drop long paragraphs; big shelf tiles; blend awards 1 star + unlock first selected fruit; shorter result modal.

- [ ] **Step 3:** GardenGame — 3 large plots; icon-led water/harvest; keep stage loop; harvest → star + unlock.

---

### Task 5: Wire App + sticker toast

**Files:**
- Modify: `main.js`

- [ ] **Step 1:** Import MatchGame, SortingGame, BlenderGame, GardenGame only. I18N keys: `nav_match`, `nav_sorting`, `nav_blender`, `nav_garden`, short subtitle. Default mode `match`.

- [ ] **Step 2:** `showStickerReward(fruitId)` — toast with fruit SVG + star for ~2s. Call from `unlockFruit` when newly unlocked.

- [ ] **Step 3:** `switchMode` cases: match/sorting/blender/garden only.

- [ ] **Step 4:** Bind dock `.nav-tab` / `.dock-tab` clicks; remove footer i18n.

---

### Task 6: Verify

- [ ] **Step 1:** Run `npm run build` — expect success
- [ ] **Step 2:** Run `npm run dev` — spot-check dock, Match, Sort colors, Blender, Garden, lang toggle
- [ ] **Step 3:** Mark plan tasks complete in this file checkboxes if desired

---

## Spec coverage

| Spec item | Task |
|-----------|------|
| Citrus visual | 2 |
| Bottom dock 4 games | 1, 5 |
| Match full board | 3 |
| Sort by color no purple | 1, 4 |
| Blender/Garden simplify | 4 |
| Stickers as reward | 5 |
| Remove quiz/memory/spelling/album | 1, 5 |
| Fonts Baloo 2 + Be Vietnam Pro | 1 |
| No footer | 1 |
