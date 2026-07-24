# Toddler TTS voice & phrases (age ~2)

## Goal

Make Web Speech TTS sound more kid-like and use very short, easy phrases for a ~2-year-old. Scope is spoken feedback only — on-screen UI copy and riddles stay as-is.

## Approach

In-place tweak: adjust `speak()` in `src/utils/audio.js`, update inline `speak(...)` strings in game components. No new phrase module or helper abstraction.

## Voice (`src/utils/audio.js`)

- `pitch`: ~1.4 (higher, kid-like)
- `rate`: ~0.75 (slower so a 2-year-old can follow)
- Prefer a female `vi-VN` / `en-US` voice from `speechSynthesis.getVoices()` when available; otherwise keep the browser default
- Existing `soundEnabled` gate and `cancel()` before speak remain unchanged

## Spoken phrases (TTS only)

| Context | Vietnamese | English |
|---------|------------|---------|
| Wrong (match / sort) | `Sai rồi!` | `Oops!` |
| Correct (quiz) | `Đúng rồi!` + fruit name | `Yes!` + fruit name |
| Ripe (garden) | fruit name + ` chín rồi!` | fruit name + ` ready!` |
| Harvest (garden) | `Hái ` + fruit name + `!` | `Got ` + fruit name + `!` |
| Correct (match / sort / memory / spelling / etc.) | fruit name only | fruit name only |

## Out of scope

- On-screen hints, victory modals, riddle text in `fruits.js`
- New audio libraries or recorded voice assets
- Changing non-TTS UI strings

## Files to touch

- `src/utils/audio.js` — voice params + optional female-voice pick
- `src/components/MatchGame.js` — wrong phrase
- `src/components/SortingGame.js` — wrong phrase
- `src/components/GardenGame.js` — ripe / harvest phrases
- `src/components/QuizGame.js` — correct phrase

## Success check

- Wrong answers say a 1–2 word toddler phrase
- Correct name learning still speaks the fruit name
- Speech is slower and higher-pitched than before
- App still works when no female voice is installed
