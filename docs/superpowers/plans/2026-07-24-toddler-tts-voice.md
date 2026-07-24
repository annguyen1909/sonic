# Toddler TTS Voice Implementation Plan

> **For agentic workers:** Execute task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Web Speech TTS higher/slower (kid-like) and use 1–3 word phrases suitable for a ~2-year-old.

**Architecture:** Tweak `speak()` in `audio.js` (pitch, rate, prefer female voice). Update inline wrong/correct/garden phrases in four game components. No new modules.

**Tech Stack:** Vite, vanilla ES modules, Web Speech API (`SpeechSynthesisUtterance`)

## Global Constraints

- Phrases must stay 1–3 words for age ~2
- Do not change on-screen UI copy or riddle text in `fruits.js`
- Prefer female `vi-VN` / `en-US` voice when available; fallback to default
- Keep existing `soundEnabled` gate and `cancel()` before speak

---

### Task 1: Kid voice in `speak()`

**Files:**
- Modify: `src/utils/audio.js` (`speak` function)

**Interfaces:**
- Consumes: `soundEnabled`, `window.speechSynthesis`
- Produces: `speak(text, lang)` with `pitch` 1.4, `rate` 0.75, optional female voice

- [x] **Step 1: Replace `speak` with kid settings + female voice pick**

```js
function pickKidVoice(langCode) {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(langCode.toLowerCase().slice(0, 2)));
  const pool = langVoices.length ? langVoices : voices;
  return (
    pool.find((v) => /female|woman|girl|nữ|linh|my/i.test(`${v.name} ${v.voiceURI}`)) ||
    pool.find((v) => !/male|man|boy|nam/i.test(`${v.name} ${v.voiceURI}`)) ||
    pool[0] ||
    null
  );
}

export function speak(text, lang = 'vi-VN') {
  if (!soundEnabled) return;
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const langCode = lang === 'en' ? 'en-US' : 'vi-VN';
  utterance.lang = langCode;
  utterance.rate = 0.75;
  utterance.pitch = 1.4;

  const voice = pickKidVoice(langCode);
  if (voice) utterance.voice = voice;

  window.speechSynthesis.speak(utterance);
}
```

- [x] **Step 2: Manual check** — call `speak('Sai rồi!', 'vi')` in browser; speech should sound slower and higher.

---

### Task 2: Toddler phrases in games

**Files:**
- Modify: `src/components/MatchGame.js` (wrong phrase)
- Modify: `src/components/SortingGame.js` (wrong phrase)
- Modify: `src/components/GardenGame.js` (ripe + harvest)
- Modify: `src/components/QuizGame.js` (correct phrase)

- [x] **Step 1: MatchGame wrong**

```js
speak(isVi ? 'Sai rồi!' : 'Oops!', this.lang);
```

- [x] **Step 2: SortingGame wrong**

```js
speak(isVi ? 'Sai rồi!' : 'Oops!', this.lang);
```

- [x] **Step 3: GardenGame ripe + harvest**

```js
speak(isVi ? `${plot.fruit.name} chín rồi!` : `${plot.fruit.nameEn} ready!`, this.lang);
// ...
speak(isVi ? `Hái ${plot.fruit.name}!` : `Got ${plot.fruit.nameEn}!`, this.lang);
```

- [x] **Step 4: QuizGame correct**

```js
speak(isVi ? `Đúng rồi! ${fruitName}` : `Yes! ${fruitName}`, this.lang);
```

- [x] **Step 5: Manual check** — wrong match/sort says `Sai rồi!` / `Oops!`; quiz correct says `Đúng rồi!` + name; garden ripe/harvest match table above; fruit-name-only paths unchanged.

---

### Task 3: Commit

- [x] **Step 1: Commit voice + phrase changes only** (do not include unrelated dragGhost / CSS work)

```bash
git add src/utils/audio.js src/components/MatchGame.js src/components/SortingGame.js src/components/GardenGame.js src/components/QuizGame.js docs/superpowers/plans/2026-07-24-toddler-tts-voice.md
git commit -m "Make TTS kid-like with short toddler phrases."
```
