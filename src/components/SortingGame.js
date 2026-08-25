import { FRUITS, SORT_CATEGORIES } from '../data/fruits.js';
import { LEVELS, SORT_LEVELS } from '../data/levels.js';
import { getFruitImg, UI_ICONS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, speakClip, speakFruit } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class SortingGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.activeFruitIndex = null;
    this.levelIndex = 0;
    this.activeGroups = [];
    this.fruitsToSort = [];
    this.sortedCount = 0;
    this.basketItems = {};

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.activeFruitIndex = null;
    this.sortedCount = 0;
    const level = SORT_LEVELS[this.levelIndex];
    this.activeGroups = level.groups;
    this.basketItems = Object.fromEntries(this.activeGroups.map((group) => [group, []]));

    const pool = FRUITS.filter((fruit) => this.activeGroups.includes(fruit.colorGroup));
    const starters = this.activeGroups.map((group) => {
      const groupFruits = pool.filter((fruit) => fruit.colorGroup === group);
      return groupFruits[Math.floor(Math.random() * groupFruits.length)];
    });
    const rest = pool
      .filter((fruit) => !starters.some((starter) => starter.id === fruit.id))
      .sort(() => 0.5 - Math.random());

    this.fruitsToSort = [...starters, ...rest]
      .slice(0, level.count)
      .sort(() => 0.5 - Math.random())
      .map((f) => ({ ...f, isSorted: false }));
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';

    this.container.innerHTML = `
      <div class="sorting-container game-panel level-${LEVELS[this.levelIndex].id} animate-fade-in">
        <div class="game-title-row">
          <h2>${isVi ? 'Xếp màu' : 'Sort'}</h2>
          <span class="star-badge" style="min-height:36px;font-size:0.95rem;">${this.sortedCount}/${this.fruitsToSort.length}</span>
        </div>
        <p class="hint-line">${isVi ? 'Bé hãy cho trái cây vào giỏ cùng màu nhé' : 'Put each fruit in the matching color basket'}</p>

        <div class="difficulty-picker level-picker">
          ${LEVELS.map((level, index) => `
            <button class="diff-btn ${index === this.levelIndex ? 'active' : ''}" data-level="${index}" type="button">
              ${isVi ? level.nameVi : level.nameEn}
            </button>`).join('')}
        </div>

        <div class="baskets-grid" style="--basket-count:${this.activeGroups.length}">
          ${this.activeGroups.map((catKey) => {
            const cat = SORT_CATEGORIES[catKey];
            return `
              <div class="basket-card" data-group="${catKey}" style="border-color: ${cat.color}">
                <div class="basket-swatch" style="background:${cat.color}"></div>
                <span class="basket-title" style="color: ${cat.color}">
                  ${isVi ? (catKey === 'red' ? 'Giỏ Đỏ' : catKey === 'yellow' ? 'Giỏ Vàng' : 'Giỏ Xanh') : (catKey === 'red' ? 'Red' : catKey === 'yellow' ? 'Yellow' : 'Green')}
                </span>
                <div class="basket-contents">
                  ${(this.basketItems[catKey] || [])
                    .map((id) => `<div class="basket-item-pill animate-pop-in">${getFruitImg(id, 'pill-fruit-photo')}</div>`)
                    .join('')}
                </div>
              </div>`;
          }).join('')}
        </div>

        <div class="sorting-tray">
          ${this.fruitsToSort
            .map(
              (fruit, idx) => `
            <div class="sorting-fruit-item ${fruit.isSorted ? 'sorted-away' : ''} ${this.activeFruitIndex === idx ? 'selected-fruit' : ''}"
                 data-index="${idx}"
                 draggable="${!fruit.isSorted}">
              <div class="fruit-icon-box">${getFruitImg(fruit.id)}</div>
            </div>`
            )
            .join('')}
        </div>

        <div id="sorting-victory" class="victory-overlay hidden"></div>
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

    this.container.querySelectorAll('.sorting-fruit-item').forEach((item) => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        if (this.fruitsToSort[idx].isSorted) return;
        playClick();
        this.activeFruitIndex = idx;
        this.highlightActiveFruit();
      });

      item.addEventListener('dragstart', (e) => {
        const idx = parseInt(item.getAttribute('data-index'), 10);
        this.activeFruitIndex = idx;
        e.dataTransfer.setData('text/plain', String(idx));
      });
    });

    this.container.querySelectorAll('.basket-card').forEach((basket) => {
      basket.addEventListener('click', () => {
        if (this.activeFruitIndex === null) return;
        this.handleSortAttempt(this.activeFruitIndex, basket.getAttribute('data-group'), basket);
      });

      basket.addEventListener('dragover', (e) => {
        e.preventDefault();
        basket.classList.add('drag-over');
      });
      basket.addEventListener('dragleave', () => basket.classList.remove('drag-over'));
      basket.addEventListener('drop', (e) => {
        e.preventDefault();
        basket.classList.remove('drag-over');
        const idx = parseInt(e.dataTransfer.getData('text/plain') || this.activeFruitIndex, 10);
        if (Number.isNaN(idx)) return;
        this.handleSortAttempt(idx, basket.getAttribute('data-group'), basket);
      });
    });
  }

  highlightActiveFruit() {
    this.container.querySelectorAll('.sorting-fruit-item').forEach((item, idx) => {
      item.classList.toggle('selected-fruit', idx === this.activeFruitIndex);
    });
  }

  handleSortAttempt(fruitIdx, basketGroup, basketEl) {
    const fruit = this.fruitsToSort[fruitIdx];
    if (!fruit || fruit.isSorted) return;

    const isVi = this.lang === 'vi';

    if (fruit.colorGroup !== basketGroup) {
      playError();
      basketEl.classList.add('shake-red');
      setTimeout(() => basketEl.classList.remove('shake-red'), 500);
      speakClip('khen_lai', 'Not that one!', this.lang);
      return;
    }

    playSuccess();
    fruit.isSorted = true;
    this.sortedCount += 1;
    this.activeFruitIndex = null;
    this.basketItems[basketGroup].push(fruit.id);
    this.onUnlockFruit(fruit.id);
    speakFruit(fruit, this.lang);
    this.render();

    if (this.sortedCount === this.fruitsToSort.length) {
      setTimeout(() => this.showVictory(), 400);
    }
  }

  showVictory() {
    playVictory();
    this.onAwardStar();
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.55 } });

    const isVi = this.lang === 'vi';
    const victoryEl = this.container.querySelector('#sorting-victory');
    if (!victoryEl) return;

    victoryEl.className = 'victory-overlay animate-pop-in';
    victoryEl.innerHTML = `
      <div class="victory-modal">
        <div class="victory-icon">${UI_ICONS.trophy || UI_ICONS.star}</div>
        <h2>${isVi ? `Sonic xong màn ${this.levelIndex + 1}!` : `Level ${this.levelIndex + 1} complete!`}</h2>
        <p>${isVi ? 'Bé nhận thêm 1 ngôi sao' : 'You earned a star'}</p>
        <div class="victory-actions">
          <button class="btn-primary" id="btn-sorting-play-again" type="button">
            ${this.levelIndex < LEVELS.length - 1
              ? (isVi ? 'Màn tiếp theo' : 'Next level')
              : (isVi ? 'Chơi lại từ đầu' : 'Play from start')}
          </button>
        </div>
      </div>
    `;

    victoryEl.querySelector('#btn-sorting-play-again')?.addEventListener('click', () => {
      playClick();
      this.levelIndex = this.levelIndex < LEVELS.length - 1 ? this.levelIndex + 1 : 0;
      this.init();
    });
  }
}
