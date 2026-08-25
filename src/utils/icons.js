// Real Fruit Photography & Vector UI Graphics System

export function getFruitImg(fruitId, className = '', isSilhouette = false) {
  const silClass = isSilhouette ? 'fruit-silhouette' : '';
  const src = isSilhouette
    ? `/images/silhouettes/${fruitId}.png`
    : `/images/fruits/${fruitId}.jpg`;
  return `<img src="${src}" alt="${fruitId}" class="fruit-real-img ${silClass} ${className}" loading="lazy" draggable="false" />`;
}

// Proxy to dynamically provide real photo images for all fruit ids
export const FRUIT_SVGS = new Proxy({}, {
  get(target, prop) {
    if (typeof prop === 'string') {
      return `<img src="/images/fruits/${prop}.jpg" alt="${prop}" class="fruit-real-img" loading="lazy" draggable="false" />`;
    }
    return '';
  }
});

export const UI_ICONS = {
  soundOn: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  soundOff: `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M23 9l-6 6M17 9l6 6"></path></svg>`,
  star: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#ffb703" stroke="#f59e0b" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  trophy: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#f59e0b" stroke-width="2.2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" fill="#ffb703"></path></svg>`,
  speaker: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="#64748b" stroke-width="2" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="#cbd5e1"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,

  // Dock Navigation Icons
  navMatch: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="7" height="7" rx="2" stroke-dasharray="3 2"></rect><rect x="14" y="3" width="7" height="7" rx="2" fill="#ffb703"></rect><rect x="3" y="14" width="7" height="7" rx="2" fill="#ff4d6d"></rect><rect x="14" y="14" width="7" height="7" rx="2" stroke-dasharray="3 2"></rect></svg>`,
  navSorting: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 6h18l-2 13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L3 6z"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="16"></line><line x1="14" y1="11" x2="14" y2="16"></line></svg>`,
  navBlender: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 3h12l1 8a6 6 0 0 1-6 6h-2a6 6 0 0 1-6-6L6 3z"></path><path d="M9 21h6"></path><path d="M12 17v4"></path><line x1="6" y1="3" x2="18" y2="3" stroke-width="3"></line></svg>`,
  navGarden: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22v-9"></path><path d="M12 13C8 13 5 9 5 5c4 0 7 3 7 8z" fill="#52b788"></path><path d="M12 13c4 0 7-4 7-8-4 0-7 4-7 8z" fill="#74c69d"></path></svg>`,
  navMemory: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="8" height="10" rx="2" fill="#ffedd5"></rect><rect x="13" y="11" width="8" height="10" rx="2" fill="#fef08a"></rect><circle cx="7" cy="8" r="1.5" fill="#f97316"></circle><circle cx="17" cy="16" r="1.5" fill="#eab308"></circle></svg>`,

  // Garden Plant Stages
  seedStage: `<svg viewBox="0 0 60 60" width="55" height="55"><ellipse cx="30" cy="46" rx="20" ry="6" fill="#6c584c" opacity="0.6"/><ellipse cx="30" cy="42" rx="7" ry="6" fill="#8d5b4c"/><path d="M 30 38 Q 28 26 22 20 Q 32 24 30 38 Z" fill="#52b788"/><circle cx="30" cy="42" r="3" fill="#582f0e"/></svg>`,
  sproutStage: `<svg viewBox="0 0 60 60" width="65" height="65"><ellipse cx="30" cy="48" rx="22" ry="6" fill="#6c584c" opacity="0.6"/><path d="M 30 46 Q 30 24 30 16" stroke="#40916c" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M 30 28 Q 16 14 10 24 Q 24 28 30 28 Z" fill="#74c69d"/><path d="M 30 20 Q 44 8 50 18 Q 36 22 30 20 Z" fill="#52b788"/></svg>`,
  flowerStage: `<svg viewBox="0 0 60 60" width="65" height="65"><ellipse cx="30" cy="50" rx="22" ry="5" fill="#6c584c" opacity="0.6"/><path d="M 30 48 L 30 14" stroke="#2d6a4f" stroke-width="4" fill="none"/><circle cx="20" cy="18" r="7" fill="#ff70a6"/><circle cx="40" cy="18" r="7" fill="#ff70a6"/><circle cx="30" cy="8" r="7" fill="#ff70a6"/><circle cx="30" cy="28" r="7" fill="#ff70a6"/><circle cx="30" cy="18" r="7" fill="#ffb703"/></svg>`
};
