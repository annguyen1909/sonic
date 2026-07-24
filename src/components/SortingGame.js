import { FRUITS, SORT_CATEGORIES } from '../data/fruits.js';
import { FRUIT_SVGS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, speak } from '../utils/audio.js';
import { attachRoundedDragGhost } from '../utils/dragGhost.js';
import confetti from 'canvas-confetti';

const SORT_GROUPS = ['red', 'yellow', 'green'];

export class SortingGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.activeFruitIndex = null;
    this.fruitsToSort = [];
    this.sortedCount = 0;
    this.basketItems = { red: [], yellow: [], green: [] };

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.activeFruitIndex = null;
    this.sortedCount = 0;
    this.basketItems = { red: [], yellow: [], green: [] };
    const pool = FRUITS.filter((f) => SORT_GROUPS.includes(f.colorGroup));
    this.fruitsToSort = [...pool]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((f) => ({ ...f, isSorted: false }));
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';

    this.container.innerHTML = `
      <div class="sorting-container game-panel animate-fade-in">
        <div class="game-title-row">
          <h2>${isVi ? 'Xếp màu' : 'Sort'}</h2>
          <span class="star-badge" style="min-height:36px;font-size:0.95rem;">${this.sortedCount}/${this.fruitsToSort.length}</span>
        </div>
        <p class="hint-line">${isVi ? 'Cho trái cây vào giỏ cùng màu' : 'Put each fruit in the matching color basket'}</p>

        <div class="baskets-grid">
          ${SORT_GROUPS.map((catKey) => {
            const cat = SORT_CATEGORIES[catKey];
            return `
              <div class="basket-card" data-group="${catKey}" style="border-color: ${cat.color}">
                <div class="basket-swatch" style="background:${cat.color}"></div>
                <span class="basket-title" style="color: ${cat.color}">
                  ${isVi ? (catKey === 'red' ? 'Đỏ' : catKey === 'yellow' ? 'Vàng' : 'Xanh') : (catKey === 'red' ? 'Red' : catKey === 'yellow' ? 'Yellow' : 'Green')}
                </span>
                <div class="basket-contents">
                  ${(this.basketItems[catKey] || [])
                    .map((id) => `<div class="basket-item-pill">${FRUIT_SVGS[id] || ''}</div>`)
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
              <div class="fruit-icon-box">${FRUIT_SVGS[fruit.id] || ''}</div>
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
        attachRoundedDragGhost(e, item);
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
      speak(isVi ? 'Sai rồi!' : 'Oops!', this.lang);
      return;
    }

    playSuccess();
    fruit.isSorted = true;
    this.sortedCount += 1;
    this.activeFruitIndex = null;
    this.basketItems[basketGroup].push(fruit.id);
    this.onUnlockFruit(fruit.id);
    speak(isVi ? fruit.name : fruit.nameEn, this.lang);
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
        <h2>${isVi ? 'Xếp xong!' : 'All sorted!'}</h2>
        <p>${isVi ? 'Bé nhận 1 sao' : 'You earned a star'}</p>
        <div class="victory-actions">
          <button class="btn-primary" id="btn-sorting-play-again" type="button">
            ${isVi ? 'Chơi tiếp' : 'Play again'}
          </button>
        </div>
      </div>
    `;

    victoryEl.querySelector('#btn-sorting-play-again')?.addEventListener('click', () => {
      playClick();
      this.init();
    });
  }
}
