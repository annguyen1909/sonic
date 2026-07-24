import { MatchGame } from './src/components/MatchGame.js';
import { SortingGame } from './src/components/SortingGame.js';
import { BlenderGame } from './src/components/BlenderGame.js';
import { GardenGame } from './src/components/GardenGame.js';
import { toggleSound, playClick } from './src/utils/audio.js';
import { FRUIT_SVGS, UI_ICONS } from './src/utils/icons.js';

// ponytail: tạm tắt Ép + Vườn — xóa khỏi Set khi bật lại
const DISABLED_MODES = new Set(['blender', 'garden']);

const I18N = {
  vi: {
    app_title: 'Thế Giới Trái Cây',
    app_subtitle: 'Quầy nước ép vui',
    nav_match: 'Ghép',
    nav_sorting: 'Xếp',
    nav_blender: 'Ép',
    nav_garden: 'Vườn',
    sticker_unlock: 'Sticker mới!'
  },
  en: {
    app_title: 'Fruit Wonderland',
    app_subtitle: 'Juice stand fun',
    nav_match: 'Match',
    nav_sorting: 'Sort',
    nav_blender: 'Blend',
    nav_garden: 'Garden',
    sticker_unlock: 'New sticker!'
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
      : new Set(['watermelon', 'lemon', 'apple']);

    this.activeMode = 'match';
    this.currentComponent = null;
    this.container = document.getElementById('game-view-container');
    this.toastTimer = null;

    this.init();
  }

  init() {
    const logoEl = document.getElementById('brand-svg-logo');
    if (logoEl) logoEl.innerHTML = FRUIT_SVGS.watermelon;

    const starIconEl = document.getElementById('star-icon-container');
    if (starIconEl) starIconEl.innerHTML = UI_ICONS.star;

    document.getElementById('tab-icon-match').innerHTML = UI_ICONS.navMatch || UI_ICONS.navMemory;
    document.getElementById('tab-icon-sorting').innerHTML = UI_ICONS.navSorting;
    document.getElementById('tab-icon-blender').innerHTML = UI_ICONS.navBlender;
    document.getElementById('tab-icon-garden').innerHTML = UI_ICONS.navGarden;

    this.updateHeaderUI();
    this.bindEvents();
    this.switchMode(this.activeMode);
  }

  bindEvents() {
    document.querySelectorAll('.dock-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const mode = tab.getAttribute('data-mode');
        if (DISABLED_MODES.has(mode)) return;
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

    document.getElementById('app-title-text').textContent = dict.app_title;
    document.getElementById('app-subtitle-text').textContent = dict.app_subtitle;

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
      <div class="toast-fruit">${FRUIT_SVGS[fruitId] || ''}</div>
      <span>${dict.sticker_unlock}</span>
      <span>${UI_ICONS.star}</span>
    `;
    toast.classList.remove('hidden');

    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.add('hidden'), 2200);
  }

  switchMode(mode) {
    if (DISABLED_MODES.has(mode)) mode = 'match';
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
      case 'match':
        this.currentComponent = new MatchGame(this.container, commonOptions);
        break;
      case 'sorting':
        this.currentComponent = new SortingGame(this.container, commonOptions);
        break;
      case 'blender':
        this.currentComponent = new BlenderGame(this.container, commonOptions);
        break;
      case 'garden':
        this.currentComponent = new GardenGame(this.container, commonOptions);
        break;
      default:
        this.currentComponent = new MatchGame(this.container, commonOptions);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
