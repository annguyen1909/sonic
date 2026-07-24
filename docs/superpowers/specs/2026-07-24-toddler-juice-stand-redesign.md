# Thế Giới Trái Cây — Toddler Juice-Stand UI/UX Redesign

**Date:** 2026-07-24  
**Status:** Approved for planning  
**Approach:** Toddler rebuild of shell + game loops (not CSS-only reskin)

## Goal

Rebuild the app shell and game experiences for ages **3–5** with a **fresh juice-stand** look that does **not** read as generic AI kids-UI (no purple gradients, glassmorphism, pastel confetti backgrounds, or pill-heavy chrome).

Success looks like: a toddler can pick a game from the dock, play by drag/tap with almost no reading, hear fruit names spoken, and get short celebrations + sticker rewards.

## Audience & principles

- Primary: preschoolers (3–5); parents assist with language toggle only
- Icon-first; minimal on-screen text; TTS speaks fruit / action names
- Huge tap targets; drag **and** tap-to-select-then-tap-slot (drag not required)
- Short loops; clear success / gentle fail (shake + return, no harsh punishment)
- Bilingual VI/EN kept for titles and spoken labels where useful

## Visual system — “Citrus stall”

| Token | Direction |
|-------|-----------|
| Palette | Warm yellow / orange / cream; accent coral-red and leaf green for success only |
| Type | Display: **Baloo 2**; UI/body: **Be Vietnam Pro** (VI diacritics). Do not use Nunito. |
| Surfaces | Solid cream/yellow panels, bold 2–3px borders; **no** backdrop-blur glass cards |
| Depth | One soft shadow max; prefer border + fill over multi-layer elevation |
| Motion | 2–3 intentional motions: dock press, fruit drop settle, harvest/blend celebrate — not endless float/wiggle wallpaper |
| Anti-patterns banned | Purple-on-white / purple gradients, cream+terracotta newspaper look, glow stacks, rounded-full pill clusters, floating bg fruit confetti |

## App shell

```
┌─────────────────────────────┐
│ Brand   ★ stars   🔊  VI    │  thin top bar
├─────────────────────────────┤
│                             │
│        active game          │
│                             │
├─────────────────────────────┤
│ Ghép │ Xếp │ Ép │ Vườn     │  bottom dock (4 huge tabs)
└─────────────────────────────┘
```

- **Bottom dock** always visible: Match · Sort · Blender · Garden
- Active tab: filled citrus highlight + thicker border (not floating card lift)
- Sound + language stay in the top bar
- Footer marketing line **removed**

## Game roster

### Keep / rebuild

1. **Ghép (Match)** — NEW  
   - Full board of ~6 empty fruit silhouettes  
   - Fruit tray below (or side on wide screens)  
   - Drag fruit onto matching silhouette **or** tap fruit then tap slot  
   - Correct: snap + speak name  
   - Wrong: gentle shake, fruit returns to tray  
   - Board complete → +1 star + sticker unlock popup  

2. **Xếp (Sort)** — rebuild current SortingGame  
   - Baskets: **Đỏ / Vàng / Xanh** only (reuse existing `colorGroup`)  
   - Round fruit pool: only `red` / `yellow` / `green` fruits — **exclude `purple`** in v1  
   - Drag or tap-to-place fruits into baskets  
   - Round complete → short confetti + +1 star + sticker unlock chance  

3. **Ép (Blender)** — simplify  
   - Large fruit picker (2–3 fruits), big blend button, short blend animation, celebrate  
   - Drop long instructional paragraphs; one icon cue is enough  

4. **Vườn (Garden)** — simplify  
   - Fewer, larger plots; tap to water → grow stages → harvest  
   - Harvest awards star / unlocks sticker  

### Reward (not a dock mode)

- **Stickers** unlock on wins; show a brief reward popup (sticker + star), not a seventh nav item  
- Persist unlocks + stars in `localStorage` (existing keys can be reused / renamed carefully)

### Remove from product

- Quiz (riddle text too heavy)  
- Memory  
- Spelling  
- Sticker Album as a primary mode/tab  

## Architecture

Keep **Vite + vanilla JS** modules. No new framework.

```
main.js                 App shell, dock, i18n, stars, sound
style.css               Citrus design system + layouts
src/components/
  MatchGame.js          NEW silhouette match
  SortingGame.js        Color baskets (toddler)
  BlenderGame.js        Simplified blend loop
  GardenGame.js         Simplified grow/harvest
src/data/fruits.js      Reuse existing `colorGroup` (no schema change required)
src/utils/audio.js      Existing TTS / SFX
src/utils/icons.js      SVGs; add silhouette (filled-shape) variants for Match
```

### Data flow

- `App` owns `lang`, `totalStars`, `unlockedFruitIds`, `activeMode`  
- Switching dock tab destroys/replaces current component in `#game-view-container`  
- Games call `onAwardStar` / `onUnlockFruit` → App persists + optional sticker toast  

### Interaction contract (all drag games)

- Pointer events work for mouse + touch  
- Hit targets ≥ ~56–64px  
- Fail path never removes progress silently  

### Error / empty states

- If fruit SVG missing: solid color blob + letter fallback (no broken icon)  
- Audio fail: silent fail; UI still works  

## Out of scope (v1)

- Parent settings / profiles  
- New unlock progression map beyond stickers/stars  
- Rewriting fruit riddle content  
- Native apps / PWA packaging  

## Testing

- Manual: dock switches all 4 modes; Match drag + tap paths; Sort color correctness; Blender/Garden short loops; VI↔EN; sound toggle; mobile width ~390px and tablet ~768px  
- Smoke: `npm run build` succeeds after component removals  

## Open decisions resolved in brainstorm

| Topic | Choice |
|-------|--------|
| Vibe | A — Fresh juice stand |
| Age | A — Toddlers 3–5 |
| Roster | B — Match, Sort, Blender, Garden + stickers reward |
| Nav | B — Bottom dock |
| Approach | #2 — Toddler rebuild |
| Look | A — Citrus stall |
| Match layout | C — Full board (~6) |
| Sort rule | A — By color |
