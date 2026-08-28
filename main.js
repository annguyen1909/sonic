import { LearnGame } from './src/components/LearnGame.js';
import { MatchGame } from './src/components/MatchGame.js';
import { SortingGame } from './src/components/SortingGame.js';
import { MemoryGame } from './src/components/MemoryGame.js';
import { toggleSound, playClick } from './src/utils/audio.js';
import { getFruitImg, UI_ICONS } from './src/utils/icons.js';

const I18N = {
  vi: {
    app_title: 'Thế Giới Vui Học',
    app_subtitle: 'Góc chơi vui của bé Sonic',
    nav_learn: 'Học Vui',
    nav_match: 'Ghép Hình',
    nav_sorting: 'Xếp Màu',
    nav_memory: 'Lật Thẻ',
    sticker_unlock: 'Đã mở khóa huy hiệu mới!'
  },
  en: {
    app_title: 'Sonic Learning Land',
    app_subtitle: 'Fun & Learn for Sonic',
    nav_learn: 'Learn',
    nav_match: 'Match',
    nav_sorting: 'Sort',
    nav_memory: 'Memory',
    sticker_unlock: 'New badge unlocked!'
  }
};

class App {
  constructor() {
    this.lang = localStorage.getItem('fw_lang') || 'vi';
    this.soundEnabled = true;
    this.totalStars = parseInt(localStorage.getItem('fw_stars') || '0', 10);

    const savedUnlocked = localStorage.getItem('fw_unlocked');
    this.unlockedFruitIds = savedUnlocked
      ? new Set(JSON.parse(savedUnlocked))
      : new Set(['banana', 'watermelon', 'apple']);

    this.activeMode = 'learn';
    this.currentComponent = null;
    this.container = document.getElementById('game-view-container');
    this.toastTimer = null;

    this.init();
  }

  init() {
    const logoEl = document.getElementById('brand-svg-logo');
    if (logoEl) logoEl.innerHTML = `<img src="/images/animals/duck.jpg" alt="Logo" class="brand-logo-img" />`;

    const starIconEl = document.getElementById('star-icon-container');
    if (starIconEl) starIconEl.innerHTML = UI_ICONS.star;

    const learnTabIcon = document.getElementById('tab-icon-learn');
    if (learnTabIcon) learnTabIcon.innerHTML = UI_ICONS.navLearn;

    const matchTabIcon = document.getElementById('tab-icon-match');
    if (matchTabIcon) matchTabIcon.innerHTML = UI_ICONS.navMatch;

    const sortingTabIcon = document.getElementById('tab-icon-sorting');
    if (sortingTabIcon) sortingTabIcon.innerHTML = UI_ICONS.navSorting;

    const memoryTabIcon = document.getElementById('tab-icon-memory');
    if (memoryTabIcon) memoryTabIcon.innerHTML = UI_ICONS.navMemory;

    this.updateHeaderUI();
    this.bindEvents();
    this.switchMode(this.activeMode);
  }

  bindEvents() {
    document.querySelectorAll('.dock-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const mode = tab.getAttribute('data-mode');
        playClick();
        this.switchMode(mode);
      });
    });

    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.soundEnabled = toggleSound();
        soundBtn.innerHTML = this.soundEnabled ? UI_ICONS.soundOn : UI_ICONS.soundOff;
      });
    }

    const langBtn = document.getElementById('btn-toggle-lang');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        playClick();
        this.lang = this.lang === 'vi' ? 'en' : 'vi';
        localStorage.setItem('fw_lang', this.lang);
        this.updateHeaderUI();
        if (this.currentComponent?.setLang) {
          this.currentComponent.setLang(this.lang);
        }
      });
    }
  }

  updateHeaderUI() {
    const isVi = this.lang === 'vi';
    const dict = I18N[this.lang];

    const langBtn = document.getElementById('btn-toggle-lang');
    if (langBtn) {
      langBtn.innerHTML = `<span class="lang-text-badge">${isVi ? 'VI' : 'EN'}</span>`;
    }

    const soundBtn = document.getElementById('btn-toggle-sound');
    if (soundBtn) {
      soundBtn.innerHTML = this.soundEnabled ? UI_ICONS.soundOn : UI_ICONS.soundOff;
    }

    const starCountEl = document.getElementById('global-star-count');
    if (starCountEl) starCountEl.textContent = this.totalStars;

    const titleEl = document.getElementById('app-title-text');
    if (titleEl) titleEl.textContent = dict.app_title;

    const subtitleEl = document.getElementById('app-subtitle-text');
    if (subtitleEl) subtitleEl.textContent = dict.app_subtitle;

    document.querySelectorAll('.tab-label').forEach((el) => {
      const key = el.getAttribute('data-key');
      if (dict[key]) el.textContent = dict[key];
    });
  }

  addStar() {
    this.totalStars += 1;
    localStorage.setItem('fw_stars', String(this.totalStars));
    const starCountEl = document.getElementById('global-star-count');
    if (starCountEl) {
      starCountEl.textContent = this.totalStars;
      starCountEl.parentElement?.classList.add('animate-bounce');
      setTimeout(() => starCountEl.parentElement?.classList.remove('animate-bounce'), 600);
    }
  }

  unlockFruit(fruitId) {
    if (this.unlockedFruitIds.has(fruitId)) return;
    this.unlockedFruitIds.add(fruitId);
    localStorage.setItem('fw_unlocked', JSON.stringify([...this.unlockedFruitIds]));
    this.showStickerReward(fruitId);
  }

  showStickerReward(fruitId) {
    const toast = document.getElementById('sticker-toast');
    if (!toast) return;

    const dict = I18N[this.lang];
    toast.innerHTML = `
      <div class="toast-fruit">${getFruitImg(fruitId, 'toast-photo')}</div>
      <span>${dict.sticker_unlock}</span>
      <span>${UI_ICONS.star}</span>
    `;
    toast.classList.remove('hidden');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.add('hidden'), 2200);
  }

  switchMode(mode) {
    this.activeMode = mode;

    document.querySelectorAll('.dock-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.getAttribute('data-mode') === mode);
    });

    const commonOptions = {
      lang: this.lang,
      onAwardStar: () => this.addStar(),
      onUnlockFruit: (id) => this.unlockFruit(id)
    };

    switch (mode) {
      case 'learn':
        this.currentComponent = new LearnGame(this.container, commonOptions);
        break;
      case 'match':
        this.currentComponent = new MatchGame(this.container, commonOptions);
        break;
      case 'sorting':
        this.currentComponent = new SortingGame(this.container, commonOptions);
        break;
      case 'memory':
        this.currentComponent = new MemoryGame(this.container, commonOptions);
        break;
      default:
        this.currentComponent = new LearnGame(this.container, commonOptions);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
