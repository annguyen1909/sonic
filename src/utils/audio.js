import { FRUITS } from '../data/fruits.js';

let audioCtx = null;
let soundEnabled = true;
let cachedVoices = [];
let activeVoiceAudio = null;

export const VOICE_SCRIPTS = Object.fromEntries([
  ...FRUITS.flatMap((fruit) => [
    [fruit.id, fruit.name],
    [`${fruit.id}_ripe`, `${fruit.name} chín rồi!`],
    [`${fruit.id}_harvest`, `Hái ${fruit.name}!`]
  ]),
  ['khen_dung', 'Đúng rồi!'],
  ['khen_lai', 'Sonic Đù!']
]);

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function toggleSound(enabled) {
  if (typeof enabled === 'boolean') {
    soundEnabled = enabled;
  } else {
    soundEnabled = !soundEnabled;
  }
  if (!soundEnabled) {
    stopAllAudio();
  }
  return soundEnabled;
}

export function playClick() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn(e);
  }
}

export function playFlip() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) {
    console.warn(e);
  }
}

export function playSuccess() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
    });
  } catch (e) {
    console.warn(e);
  }
}

export function playError() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  } catch (e) {
    console.warn(e);
  }
}

export function playVictory() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.12 },
      { f: 783.99, d: 0.12, t: 0.24 },
      { f: 1046.50, d: 0.35, t: 0.36 },
      { f: 880.00, d: 0.15, t: 0.72 },
      { f: 1046.50, d: 0.5, t: 0.88 }
    ];

    melody.forEach(({ f, d, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + t);

      gain.gain.setValueAtTime(0, ctx.currentTime + t);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + d);
    });
  } catch (e) {
    console.warn(e);
  }
}

// Blender whirring sound effect
export function playBlenderSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.4);
    osc.frequency.linearRampToValueAtTime(200, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  } catch (e) {
    console.warn(e);
  }
}

// Water sprinkler sound effect
export function playWaterSound() {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const bufferSize = ctx.sampleRate * 0.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 3;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(ctx.currentTime);
    noise.stop(ctx.currentTime + 0.5);
  } catch (e) {
    console.warn(e);
  }
}

// Pre-fetch and cache available voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const updateVoices = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
  updateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices;
  }
}

/**
 * Score voices to strictly prioritize young, warm, cheerful female preschool teacher voices
 */
function voiceScore(voice, langPrefix) {
  const label = `${voice.name} ${voice.voiceURI} ${voice.lang}`.toLowerCase();
  let score = 0;

  if (langPrefix === 'vi') {
    // Apple Siri Linh / Linh Enhanced / Linh Premium (Top Vietnamese female on Mac/iOS)
    if (/linh/i.test(label)) score += 40;
    // Microsoft Natural HoaiMy / Mai / Lan / Ngoc / Yen
    if (/hoaimy|hoài my|mai|lan|ngoc|ngọc|yen|yến/i.test(label)) score += 35;
    // Google Tiếng Việt Female
    if (/google/i.test(label) && /vi/i.test(label) && !/male|nam/i.test(label)) score += 25;
    // Any female indicators
    if (/female|nữ|woman|girl/i.test(label)) score += 20;
    if (/enhanced|premium|neural|natural/i.test(label)) score += 15;
  } else {
    // English preschool female teacher voices: Ava, Jenny, Samantha, Serena, Zoe, Allison
    if (/ava|jenny|samantha|serena|zoe|allison|karen|susan|victoria|moira/i.test(label)) score += 35;
    if (/female|woman|girl/i.test(label)) score += 20;
    if (/enhanced|premium|neural|natural|google/i.test(label)) score += 15;
  }

  // Heavy penalty for male voices
  if (/male|man|boy|nam|quang|minh|david|mark|guy|george|daniel|fred|alex/i.test(label)) {
    score -= 80;
  }

  return score;
}

function pickTeacherVoice(langCode) {
  const voices = cachedVoices.length ? cachedVoices : (window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
  if (!voices || !voices.length) return null;

  const prefix = langCode.toLowerCase().slice(0, 2);
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  const pool = langVoices.length ? langVoices : voices;

  const ranked = [...pool].sort((a, b) => voiceScore(b, prefix) - voiceScore(a, prefix));
  return ranked[0] || null;
}

/**
 * Cheerful, clear, warm young preschool teacher voice
 */
export function speak(text, lang = 'vi-VN', onEnded = null) {
  if (!soundEnabled) {
    if (onEnded) onEnded();
    return;
  }
  if (!('speechSynthesis' in window)) {
    if (onEnded) onEnded();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = lang === 'en' ? 'en-US' : 'vi-VN';
    utterance.lang = langCode;

    // Natural warm toddler pace — pitch 1.0 preserves natural vocal formants without robotic distortion
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const teacherVoice = pickTeacherVoice(langCode);
    if (teacherVoice) {
      utterance.voice = teacherVoice;
    }

    if (onEnded) {
      utterance.onend = () => onEnded();
      utterance.onerror = () => onEnded();
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
    if (onEnded) onEnded();
  }
}

let currentSequenceId = 0;

export function stopAllAudio() {
  currentSequenceId++;
  if (activeVoiceAudio) {
    try {
      activeVoiceAudio.pause();
      activeVoiceAudio.currentTime = 0;
      activeVoiceAudio.src = '';
    } catch (e) {}
    activeVoiceAudio = null;
  }
  if (window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

export function playAudioClip(clipId, fallbackText = '', lang = 'vi', onEnded = null) {
  if (!soundEnabled) {
    if (onEnded) onEnded();
    return;
  }

  stopAllAudio();
  const mySeqId = currentSequenceId;

  if (lang === 'vi') {
    const audio = new Audio(`/audio/${clipId}.mp3`);
    activeVoiceAudio = audio;

    let endedCalled = false;
    const triggerEnded = () => {
      if (mySeqId !== currentSequenceId) return;
      if (endedCalled) return;
      endedCalled = true;
      if (onEnded) onEnded();
    };

    audio.addEventListener('ended', triggerEnded, { once: true });
    audio.addEventListener('error', () => {
      if (mySeqId !== currentSequenceId) return;
      if (fallbackText) {
        speak(fallbackText, lang, triggerEnded);
      } else {
        triggerEnded();
      }
    }, { once: true });

    audio.play().catch(() => {
      if (mySeqId !== currentSequenceId) return;
      if (fallbackText) {
        speak(fallbackText, lang, triggerEnded);
      } else {
        triggerEnded();
      }
    });
  } else {
    if (fallbackText) {
      speak(fallbackText, lang, onEnded);
    } else if (onEnded) {
      onEnded();
    }
  }
}

export function speakClip(clipId, fallbackText = '', lang = 'vi') {
  playAudioClip(clipId, fallbackText, lang);
}

export function playAudioClipSequence(clipIds, fallbackText = '', lang = 'vi', onEnded = null) {
  if (!soundEnabled) {
    if (onEnded) onEnded();
    return;
  }

  const validIds = Array.isArray(clipIds) ? clipIds.filter(Boolean) : [clipIds];
  if (!validIds.length) {
    if (onEnded) onEnded();
    return;
  }

  stopAllAudio();
  const mySeqId = currentSequenceId;

  if (lang === 'en') {
    speak(fallbackText, lang, onEnded);
    return;
  }

  const playAt = (index) => {
    if (mySeqId !== currentSequenceId) return;

    if (index >= validIds.length) {
      if (onEnded) onEnded();
      return;
    }

    const clipId = validIds[index];
    const audio = new Audio(`/audio/${clipId}.mp3`);
    activeVoiceAudio = audio;

    audio.addEventListener('ended', () => {
      if (mySeqId !== currentSequenceId) return;
      playAt(index + 1);
    }, { once: true });

    audio.addEventListener('error', () => {
      if (mySeqId !== currentSequenceId) return;
      playAt(index + 1);
    }, { once: true });

    audio.play().catch(() => {
      if (mySeqId !== currentSequenceId) return;
      if (fallbackText && index === 0) {
        speak(fallbackText, lang, onEnded);
      } else {
        playAt(index + 1);
      }
    });
  };

  playAt(0);
}

export function speakClipSequence(clipIds, fallbackText = '', lang = 'vi') {
  playAudioClipSequence(clipIds, fallbackText, lang);
}

export function speakFruit(fruit, lang = 'vi') {
  speakClip(fruit.id, lang === 'vi' ? (VOICE_SCRIPTS[fruit.id] || fruit.name) : fruit.nameEn, lang);
}

