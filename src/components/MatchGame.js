import { FRUITS } from '../data/fruits.js';
import { LEVELS, MATCH_COUNTS } from '../data/levels.js';
import { getFruitImg, UI_ICONS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, speakClip, speakFruit, stopAllAudio } from '../utils/audio.js';
import { prepareRoundedDragImage, setRoundedDragImage } from '../utils/dragPreview.js';
import confetti from 'canvas-confetti';

export class MatchGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.slots = [];
    this.tray = [];
    this.levelIndex = 0;
    this.selectedTrayId = null;
    this.done = false;

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    const picks = [...FRUITS]
      .sort(() => 0.5 - Math.random())
      .slice(0, MATCH_COUNTS[this.levelIndex]);
    this.slots = picks.map((f) => ({ fruitId: f.id, fruit: f, filled: false }));
    this.tray = picks
      .map((f) => ({ id: f.id, fruit: f, placed: false }))
      .sort(() => 0.5 - Math.random());
    this.selectedTrayId = null;
    this.done = false;
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';
    const filled = this.slots.filter((s) => s.filled).length;

    this.container.innerHTML = `
      <div class="match-container game-panel level-${LEVELS[this.levelIndex].id} animate-fade-in">
        <div class="game-title-row">
          <h2>${isVi ? 'Ghép hình' : 'Match'}</h2>
          <span class="star-badge" style="min-height:36px;font-size:0.95rem;">${filled}/${this.slots.length}</span>
        </div>
        <p class="hint-line">${isVi ? 'Chạm hoặc kéo trái cây vào bóng đúng' : 'Tap or drag fruit onto the matching shadow'}</p>

        <div class="difficulty-picker level-picker">
          ${LEVELS.map((level, index) => `
            <button class="diff-btn ${index === this.levelIndex ? 'active' : ''}" data-level="${index}" type="button">
              ${isVi ? level.nameVi : level.nameEn}
            </button>`).join('')}
        </div>

        <div class="match-board match-board-toddler">
          ${this.slots
            .map(
              (slot, idx) => `
            <div class="match-slot ${slot.filled ? 'filled' : ''}" data-slot="${idx}" data-fruit-id="${slot.fruitId}">
              ${
                slot.filled
                  ? `<div class="placed-fruit animate-bounce">${getFruitImg(slot.fruitId)}</div>`
                  : `<div class="silhouette">${getFruitImg(slot.fruitId, '', true)}</div>`
              }
            </div>`
            )
            .join('')}
        </div>

        <div class="match-tray match-tray-toddler">
          ${this.tray
            .map(
              (item) => `
            <div class="match-fruit ${item.placed ? 'placed-away' : ''} ${this.selectedTrayId === item.id ? 'selected' : ''}"
                 data-tray-id="${item.id}"
                 draggable="${!item.placed}">
              ${getFruitImg(item.id)}
            </div>`
            )
            .join('')}
        </div>

        <div id="match-victory" class="victory-overlay hidden"></div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    this.container.querySelectorAll('[data-level]').forEach((button) => {
      button.addEventListener('click', () => {
        playClick();
        this.levelIndex = Number(button.getAttribute('data-level'));
        this.init();
      });
    });

    const trayItems = this.container.querySelectorAll('.match-fruit:not(.placed-away)');
    trayItems.forEach((el) => {
      prepareRoundedDragImage(el);

      el.addEventListener('click', () => {
        const id = el.getAttribute('data-tray-id');
        playClick();
        this.selectedTrayId = this.selectedTrayId === id ? null : id;
        this.highlightSelection();
      });

      el.addEventListener('dragstart', (e) => {
        const id = el.getAttribute('data-tray-id');
        this.selectedTrayId = id;
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
        setRoundedDragImage(e, el);
      });
    });

    const slots = this.container.querySelectorAll('.match-slot');
    slots.forEach((slotEl) => {
      slotEl.addEventListener('click', () => {
        if (!this.selectedTrayId) return;
        this.tryPlace(this.selectedTrayId, parseInt(slotEl.getAttribute('data-slot'), 10), slotEl);
      });

      slotEl.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!slotEl.classList.contains('filled')) slotEl.classList.add('target-hint');
      });

      slotEl.addEventListener('dragleave', () => slotEl.classList.remove('target-hint'));

      slotEl.addEventListener('drop', (e) => {
        e.preventDefault();
        slotEl.classList.remove('target-hint');
        const id = e.dataTransfer.getData('text/plain') || this.selectedTrayId;
        if (!id) return;
        this.tryPlace(id, parseInt(slotEl.getAttribute('data-slot'), 10), slotEl);
      });
    });
  }

  highlightSelection() {
    this.container.querySelectorAll('.match-fruit').forEach((el) => {
      el.classList.toggle('selected', el.getAttribute('data-tray-id') === this.selectedTrayId);
    });
  }

  tryPlace(trayId, slotIndex, slotEl) {
    if (this.done) return;
    const slot = this.slots[slotIndex];
    const trayItem = this.tray.find((t) => t.id === trayId);
    if (!slot || slot.filled || !trayItem || trayItem.placed) return;

    const isVi = this.lang === 'vi';
    const fruit = trayItem.fruit;

    if (trayId !== slot.fruitId) {
      playError();
      slotEl.classList.add('shake-red');
      setTimeout(() => slotEl.classList.remove('shake-red'), 500);
      speakClip('khen_lai', 'Not that one!', this.lang);
      return;
    }

    playSuccess();
    slot.filled = true;
    trayItem.placed = true;
    this.selectedTrayId = null;
    speakFruit(fruit, this.lang);
    this.render();

    if (this.slots.every((s) => s.filled)) {
      this.done = true;
      setTimeout(() => this.showVictory(), 400);
    }
  }

  showVictory() {
    playVictory();
    this.onAwardStar();
    const unlockId = this.slots[0]?.fruitId;
    if (unlockId) this.onUnlockFruit(unlockId);

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 } });

    const isVi = this.lang === 'vi';
    const victoryEl = this.container.querySelector('#match-victory');
    if (!victoryEl) return;

    victoryEl.className = 'victory-overlay animate-pop-in';
    victoryEl.innerHTML = `
      <div class="victory-modal">
        <div class="victory-icon">${UI_ICONS.trophy || UI_ICONS.star}</div>
        <h2>${isVi ? `Sonic xong màn ${this.levelIndex + 1}!` : `Level ${this.levelIndex + 1} complete!`}</h2>
        <p>${isVi ? 'Bé nhận được 1 ngôi sao vàng' : 'You earned a gold star'}</p>
        <div class="victory-actions">
          <button class="btn-primary" id="btn-match-again" type="button">
            ${this.levelIndex < LEVELS.length - 1
              ? (isVi ? 'Màn tiếp theo' : 'Next level')
              : (isVi ? 'Chơi lại từ đầu' : 'Play from start')}
          </button>
        </div>
      </div>
    `;

    victoryEl.querySelector('#btn-match-again')?.addEventListener('click', () => {
      playClick();
      this.levelIndex = this.levelIndex < LEVELS.length - 1 ? this.levelIndex + 1 : 0;
      this.init();
    });
  }

  destroy() {
    stopAllAudio();
  }
}

