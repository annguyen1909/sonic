import { FRUITS } from '../data/fruits.js';
import { FRUIT_SVGS, UI_ICONS } from '../utils/icons.js';
import { playFlip, playSuccess, playError, playVictory, playClick, speak } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class MemoryGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.difficulty = 'easy';
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.totalPairs = 4;
    this.moves = 0;
    this.isLockBoard = false;

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.totalPairs = this.difficulty === 'easy' ? 4 : (this.difficulty === 'medium' ? 6 : 8);
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
      <div class="memory-container animate-fade-in">
        <div class="memory-controls">
          <div class="difficulty-picker">
            <button class="diff-btn ${this.difficulty === 'easy' ? 'active' : ''}" data-diff="easy">
              ${isVi ? 'Dễ (4 cặp)' : 'Easy (4 pairs)'}
            </button>
            <button class="diff-btn ${this.difficulty === 'medium' ? 'active' : ''}" data-diff="medium">
              ${isVi ? 'Vừa (6 cặp)' : 'Medium (6 pairs)'}
            </button>
            <button class="diff-btn ${this.difficulty === 'hard' ? 'active' : ''}" data-diff="hard">
              ${isVi ? 'Khó (8 cặp)' : 'Hard (8 pairs)'}
            </button>
          </div>

          <div class="memory-stats">
            <span class="badge">${isVi ? 'Số lần lật:' : 'Moves:'} <strong>${this.moves}</strong></span>
            <span class="badge badge-star">${UI_ICONS.star} ${isVi ? 'Đã tìm:' : 'Matched:'} <strong>${this.matchedPairs}/${this.totalPairs}</strong></span>
          </div>
        </div>

        <div class="memory-grid memory-grid-${this.difficulty}">
          ${this.cards.map((card, idx) => `
            <div class="memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}" data-index="${idx}">
              <div class="card-inner">
                <div class="card-front">
                  <span>?</span>
                </div>
                <div class="card-back" style="border-color: ${card.fruit.color}">
                  <div class="card-icon-wrapper">${FRUIT_SVGS[card.fruit.id]}</div>
                  <span class="card-name">${isVi ? card.fruit.name : card.fruit.nameEn}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div id="memory-victory" class="victory-overlay hidden"></div>
      </div>
    `;

    const diffBtns = this.container.querySelectorAll('.diff-btn');
    diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        playClick();
        this.difficulty = btn.getAttribute('data-diff');
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

      speak(isVi ? item1.card.fruit.name : item1.card.fruit.nameEn, this.lang);

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
    const statsEl = this.container.querySelector('.memory-stats');
    const isVi = this.lang === 'vi';
    if (statsEl) {
      statsEl.innerHTML = `
        <span class="badge">${isVi ? 'Số lần lật:' : 'Moves:'} <strong>${this.moves}</strong></span>
        <span class="badge badge-star">${UI_ICONS.star} ${isVi ? 'Đã tìm:' : 'Matched:'} <strong>${this.matchedPairs}/${this.totalPairs}</strong></span>
      `;
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
        <div class="victory-icon">${UI_ICONS.trophy}</div>
        <h2>${isVi ? 'Tuyệt Vời! Bé Đã Tìm Được Hết Cặp Trái Cây!' : 'Awesome Job! All Matches Found!'}</h2>
        <p>${isVi ? `Bé hoàn thành trong <strong>${this.moves}</strong> lần lật.` : `You completed in <strong>${this.moves}</strong> moves.`}</p>

        <div class="victory-actions">
          <button class="btn-primary" id="btn-memory-play-again">
            ${isVi ? 'Chơi lại' : 'Play Again'}
          </button>
        </div>
      </div>
    `;

    const playAgainBtn = victoryEl.querySelector('#btn-memory-play-again');
    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        playClick();
        this.init();
      });
    }
  }
}
