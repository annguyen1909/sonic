let audioCtx = null;
let soundEnabled = true;

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

function pickKidVoice(langCode) {
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const prefix = langCode.toLowerCase().slice(0, 2);
  const langVoices = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
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
