import { FRUITS } from '../data/fruits.js';
import { FRUIT_SVGS, UI_ICONS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, speak } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class SpellingGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.currentIndex = 0;
    this.fruits = [];
    this.currentFruit = null;
    this.targetLetters = [];
    this.userSlots = [];
    this.availableTiles = [];
    this.stars = 0;

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.fruits = [...FRUITS].sort(() => 0.5 - Math.random());
    this.currentIndex = 0;
    this.stars = 0;
    this.setupQuestion();
  }

  setupQuestion() {
    if (this.currentIndex >= this.fruits.length) {
      this.renderVictory();
      return;
    }

    this.currentFruit = this.fruits[this.currentIndex];
    const isVi = this.lang === 'vi';
    const nameStr = isVi ? this.currentFruit.name.toUpperCase() : this.currentFruit.nameEn.toUpperCase();

    this.targetLetters = nameStr.split('');
    this.userSlots = this.targetLetters.map(ch => ch === ' ' ? ' ' : '');

    const lettersToScramble = this.targetLetters.filter(ch => ch !== ' ');
    const extraDistractors = ['A', 'E', 'O', 'I', 'U', 'N', 'T', 'S'];
    for (let i = 0; i < 2; i++) {
      lettersToScramble.push(extraDistractors[Math.floor(Math.random() * extraDistractors.length)]);
    }

    this.availableTiles = lettersToScramble.sort(() => 0.5 - Math.random()).map((char, id) => ({
      id: `tile-${id}`,
      char,
      used: false
    }));

    this.render();
  }

  render() {
    if (this.currentIndex >= this.fruits.length) {
      this.renderVictory();
      return;
    }

    const isVi = this.lang === 'vi';
    const fruit = this.currentFruit;

    this.container.innerHTML = `
      <div class="spelling-container animate-fade-in">
        <div class="spelling-header">
          <span class="badge">${isVi ? 'Câu' : 'Question'} ${this.currentIndex + 1}/${this.fruits.length}</span>
          <span class="badge badge-star">${UI_ICONS.star} ${this.stars} ${isVi ? 'Sao' : 'Stars'}</span>
        </div>

        <div class="spelling-fruit-card">
          <div class="spelling-svg-hero">${FRUIT_SVGS[fruit.id]}</div>
          <button class="btn-audio-speak" id="btn-spelling-audio">
            ${UI_ICONS.speaker} ${isVi ? 'Nghe phát âm' : 'Listen'}
          </button>
        </div>

        <div class="spelling-slots-wrapper">
          <h3>${isVi ? 'Ghép các chữ cái thành tên đúng' : 'Spell the fruit name'}</h3>
          <div class="spelling-slots">
            ${this.userSlots.map((letter, idx) => {
              if (this.targetLetters[idx] === ' ') {
                return `<div class="slot-space"></div>`;
              }
              return `
                <div class="slot-box ${letter ? 'filled' : ''}" data-slot-index="${idx}">
                  ${letter}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="spelling-tiles-wrapper">
          <div class="spelling-tiles">
            ${this.availableTiles.map(tile => `
              <button class="tile-btn ${tile.used ? 'used' : ''}" data-tile-id="${tile.id}">
                ${tile.char}
              </button>
            `).join('')}
          </div>
        </div>

        <div class="spelling-actions">
          <button class="btn-secondary" id="btn-spelling-reset">
            ${isVi ? 'Làm lại' : 'Reset'}
          </button>
          <button class="btn-primary" id="btn-spelling-check">
            ${isVi ? 'Kiểm tra' : 'Check'}
          </button>
        </div>

        <div id="spelling-feedback" class="feedback-area hidden"></div>
      </div>
    `;

    const audioBtn = this.container.querySelector('#btn-spelling-audio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        playClick();
        speak(isVi ? fruit.name : fruit.nameEn, this.lang);
      });
    }

    const tileBtns = this.container.querySelectorAll('.tile-btn');
    tileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tile-id');
        this.handleTileClick(id);
      });
    });

    const slotBoxes = this.container.querySelectorAll('.slot-box');
    slotBoxes.forEach(box => {
      box.addEventListener('click', () => {
        const idx = parseInt(box.getAttribute('data-slot-index'), 10);
        this.handleSlotClick(idx);
      });
    });

    const resetBtn = this.container.querySelector('#btn-spelling-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        playClick();
        this.resetUserSlots();
      });
    }

    const checkBtn = this.container.querySelector('#btn-spelling-check');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        this.checkSpelling();
      });
    }
  }

  handleTileClick(tileId) {
    const tile = this.availableTiles.find(t => t.id === tileId);
    if (!tile || tile.used) return;

    const emptySlotIndex = this.userSlots.findIndex((val, idx) => this.targetLetters[idx] !== ' ' && val === '');

    if (emptySlotIndex !== -1) {
      playClick();
      tile.used = true;
      this.userSlots[emptySlotIndex] = tile.char;
      this.render();

      const isAllFilled = this.userSlots.every((val, idx) => this.targetLetters[idx] === ' ' || val !== '');
      if (isAllFilled) {
        this.checkSpelling();
      }
    }
  }

  handleSlotClick(slotIdx) {
    const char = this.userSlots[slotIdx];
    if (!char || this.targetLetters[slotIdx] === ' ') return;

    playClick();
    this.userSlots[slotIdx] = '';

    const tile = this.availableTiles.find(t => t.char === char && t.used);
    if (tile) {
      tile.used = false;
    }
    this.render();
  }

  resetUserSlots() {
    this.userSlots = this.targetLetters.map(ch => ch === ' ' ? ' ' : '');
    this.availableTiles.forEach(t => t.used = false);
    this.render();
  }

  checkSpelling() {
    const isVi = this.lang === 'vi';
    const userString = this.userSlots.join('');
    const targetString = this.targetLetters.join('');
    const feedbackEl = this.container.querySelector('#spelling-feedback');
    if (!feedbackEl) return;

    if (userString === targetString) {
      playSuccess();
      this.stars += 1;
      this.onAwardStar();
      this.onUnlockFruit(this.currentFruit.id);

      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });

      const fruitName = isVi ? this.currentFruit.name : this.currentFruit.nameEn;
      speak(fruitName, this.lang);

      feedbackEl.className = 'feedback-area feedback-success animate-bounce';
      feedbackEl.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-icon-box">${FRUIT_SVGS[this.currentFruit.id]}</div>
          <div>
            <h3>${isVi ? 'Đánh vần chính xác rồi!' : 'Perfect Spelling!'}</h3>
            <p>${isVi ? `Bé đã đánh vần đúng từ <strong>${fruitName}</strong>` : `You spelled <strong>${fruitName}</strong> correctly!`}</p>
          </div>
        </div>
        <button class="btn-primary btn-next" id="btn-spelling-next">
          ${isVi ? 'Từ tiếp theo' : 'Next Word'}
        </button>
      `;
      feedbackEl.classList.remove('hidden');

      const nextBtn = feedbackEl.querySelector('#btn-spelling-next');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          playClick();
          this.currentIndex++;
          this.setupQuestion();
        });
      }
    } else {
      playError();
      feedbackEl.className = 'feedback-area feedback-error animate-shake';
      feedbackEl.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-icon-box"></div>
          <div>
            <h3>${isVi ? 'Thử lại nhé bé ơi!' : 'Try again!'}</h3>
            <p>${isVi ? 'Bé hãy kiểm tra lại các chữ cái đã xếp nhé.' : 'Check the letters order and try again.'}</p>
          </div>
        </div>
      `;
      feedbackEl.classList.remove('hidden');
      setTimeout(() => {
        feedbackEl.classList.add('hidden');
      }, 2000);
    }
  }

  renderVictory() {
    playVictory();
    const isVi = this.lang === 'vi';

    confetti({ particleCount: 110, spread: 90, origin: { y: 0.5 } });

    this.container.innerHTML = `
      <div class="completion-card animate-pop-in">
        <div class="completion-icon">${UI_ICONS.trophy}</div>
        <h2>${isVi ? 'Bé Là Vua Đánh Vần Trái Cây!' : 'Master Speller!'}</h2>
        <p>${isVi ? 'Bé đã hoàn thành xuất sắc trò chơi ghép chữ!' : 'You have completed all fruit word puzzles!'}</p>

        <div class="stats-summary">
          <div class="stat-box">
            <span class="stat-value">${UI_ICONS.star} ${this.stars}</span>
            <span class="stat-label">${isVi ? 'Sao tích lũy' : 'Stars Earned'}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-primary" id="btn-spelling-restart">
            ${isVi ? 'Chơi lại từ đầu' : 'Play Again'}
          </button>
        </div>
      </div>
    `;

    const restartBtn = this.container.querySelector('#btn-spelling-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        playClick();
        this.init();
      });
    }
  }
}
