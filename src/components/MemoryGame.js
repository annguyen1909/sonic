import { FRUITS } from '../data/fruits.js';
import { LEVELS, MEMORY_PAIRS } from '../data/levels.js';
import { getFruitImg, UI_ICONS } from '../utils/icons.js';
import { playFlip, playSuccess, playError, playVictory, playClick, speakFruit, stopAllAudio } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class MemoryGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.levelIndex = 0;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 2;
    this.moves = 0;
    this.isLockBoard = false;

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.totalPairs = MEMORY_PAIRS[this.levelIndex];
    this.matchedPairs = 0;
    this.moves = 0;
    this.flippedCards = [];
    this.isLockBoard = false;

    const selectedFruits = [...FRUITS].sort(() => 0.5 - Math.random()).slice(0, this.totalPairs);
    
    const cardDeck = [];
    selectedFruits.forEach(fruit => {
      cardDeck.push({ id: fruit.id + '-1', fruitId: fruit.id, fruit, isFlipped: false, isMatched: false });
      cardDeck.push({ id: fruit.id + '-2', fruitId: fruit.id, fruit, isFlipped: false, isMatched: false });
    });

    this.cards = cardDeck.sort(() => 0.5 - Math.random());
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';

    this.container.innerHTML = `
      <div class="memory-container game-panel level-${LEVELS[this.levelIndex].id} animate-fade-in">
        <div class="game-title-row">
          <h2>${isVi ? 'Lật thẻ đôi' : 'Baby Memory'}</h2>
          <span class="star-badge" style="min-height:36px;font-size:0.95rem;">${this.matchedPairs}/${this.totalPairs}</span>
        </div>
        <p class="hint-line">${isVi ? 'Lật mở 2 thẻ giống nhau để ghi điểm nhé' : 'Flip open matching pairs of fruits'}</p>

        <div class="memory-controls" style="margin-bottom: 12px;">
          <div class="difficulty-picker">
            ${LEVELS.map((level, index) => `
              <button class="diff-btn ${index === this.levelIndex ? 'active' : ''}" data-level="${index}" type="button">
                ${isVi ? level.nameVi : level.nameEn}
              </button>`).join('')}
          </div>
        </div>

        <div class="memory-grid memory-grid-${LEVELS[this.levelIndex].id}">
          ${this.cards.map((card, idx) => `
            <div class="memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}" data-index="${idx}">
              <div class="card-inner">
                <div class="card-front">
                  <span>?</span>
                </div>
                <div class="card-back" style="border-color: ${card.fruit.color}">
                  <div class="card-icon-wrapper">${getFruitImg(card.fruit.id)}</div>
                  <span class="card-name">${isVi ? card.fruit.name : card.fruit.nameEn}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="memory-victory" class="victory-overlay hidden"></div>
      </div>
    `;

    const diffBtns = this.container.querySelectorAll('[data-level]');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playClick();
        this.levelIndex = Number(btn.getAttribute('data-level'));
        this.init();
      });
    });

    const cardElements = this.container.querySelectorAll('.memory-card');
    cardElements.forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const idx = parseInt(cardEl.getAttribute('data-index'), 10);
        this.handleCardClick(idx, cardEl);
      });
    });
  }

  handleCardClick(index, element) {
    if (this.isLockBoard) return;
    const card = this.cards[index];

    if (card.isFlipped || card.isMatched) return;

    playFlip();
    card.isFlipped = true;
    element.classList.add('flipped');
    this.flippedCards.push({ card, element });

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.isLockBoard = true;
      this.checkMatch();
    }
  }

  checkMatch() {
    const [item1, item2] = this.flippedCards;
    const isMatch = item1.card.fruitId === item2.card.fruitId;
    const isVi = this.lang === 'vi';

    if (isMatch) {
      playSuccess();
      item1.card.isMatched = true;
      item2.card.isMatched = true;
      item1.element.classList.add('matched', 'pulse-green');
      item2.element.classList.add('matched', 'pulse-green');

      this.matchedPairs++;
      this.onAwardStar();
      this.onUnlockFruit(item1.card.fruit.id);

      speakFruit(item1.card.fruit, this.lang);

      this.flippedCards = [];
      this.isLockBoard = false;

      this.updateStatsDisplay();

      if (this.matchedPairs === this.totalPairs) {
        setTimeout(() => this.showVictory(), 600);
      }
    } else {
      playError();
      item1.element.classList.add('shake-red');
      item2.element.classList.add('shake-red');

      setTimeout(() => {
        item1.card.isFlipped = false;
        item2.card.isFlipped = false;
        item1.element.classList.remove('flipped', 'shake-red');
        item2.element.classList.remove('flipped', 'shake-red');
        this.flippedCards = [];
        this.isLockBoard = false;
        this.updateStatsDisplay();
      }, 900);
    }
  }

  updateStatsDisplay() {
    const badgeEl = this.container.querySelector('.star-badge');
    if (badgeEl) {
      badgeEl.textContent = `${this.matchedPairs}/${this.totalPairs}`;
    }
  }

  showVictory() {
    playVictory();
    const isVi = this.lang === 'vi';

    confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });

    const victoryEl = this.container.querySelector('#memory-victory');
    if (!victoryEl) return;

    victoryEl.className = 'victory-overlay animate-pop-in';
    victoryEl.innerHTML = `
      <div class="victory-modal">
        <div class="victory-icon">${UI_ICONS.trophy || UI_ICONS.star}</div>
        <h2>${isVi ? `Sonic xong màn ${this.levelIndex + 1}!` : `Level ${this.levelIndex + 1} complete!`}</h2>
        <p>${isVi ? 'Sonic đã tìm thấy tất cả các cặp trái cây!' : 'All fruit pairs matched!'}</p>

        <div class="victory-actions">
          <button class="btn-primary" id="btn-memory-play-again">
            ${this.levelIndex < LEVELS.length - 1
              ? (isVi ? 'Màn tiếp theo' : 'Next level')
              : (isVi ? 'Chơi lại từ đầu' : 'Play from start')}
          </button>
        </div>
      </div>
    `;

    const playAgainBtn = victoryEl.querySelector('#btn-memory-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        playClick();
        this.levelIndex = this.levelIndex < LEVELS.length - 1 ? this.levelIndex + 1 : 0;
        this.init();
      });
    }
  }

  destroy() {
    stopAllAudio();
  }
}

