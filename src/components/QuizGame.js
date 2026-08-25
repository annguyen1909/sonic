import { FRUITS } from '../data/fruits.js';
import { FRUIT_SVGS, UI_ICONS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, speak, speakClipSequence } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class QuizGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.currentIndex = 0;
    this.score = 0;
    this.stars = 0;
    this.questions = [];
    this.answered = false;

    this.init();
  }

  init() {
    this.questions = [...FRUITS].sort(() => 0.5 - Math.random());
    this.currentIndex = 0;
    this.score = 0;
    this.stars = 0;
    this.answered = false;
    this.render();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  render() {
    if (this.currentIndex >= this.questions.length) {
      this.renderCompletion();
      return;
    }

    const currentFruit = this.questions[this.currentIndex];
    const isVi = this.lang === 'vi';
    const riddleText = isVi ? currentFruit.riddle : currentFruit.riddleEn;
    const optionsList = isVi ? currentFruit.options : currentFruit.optionsEn;

    this.container.innerHTML = `
      <div class="quiz-card animate-fade-in">
        <div class="quiz-header">
          <div class="quiz-progress">
            <span class="badge">${isVi ? 'Câu' : 'Question'} ${this.currentIndex + 1}/${this.questions.length}</span>
            <span class="badge badge-star">${UI_ICONS.star} ${this.stars} ${isVi ? 'Sao' : 'Stars'}</span>
          </div>
          <div class="quiz-score">${UI_ICONS.trophy} ${this.score} ${isVi ? 'Điểm' : 'Pts'}</div>
        </div>

        <div class="riddle-box">
          <div class="riddle-icon-wrapper">
            <div class="riddle-svg-container">${FRUIT_SVGS[currentFruit.id]}</div>
            <button class="btn-audio-speak" id="btn-speak-riddle">
              ${UI_ICONS.speaker} ${isVi ? 'Nghe đọc câu đố' : 'Listen to riddle'}
            </button>
          </div>
          <p class="riddle-text">"${riddleText}"</p>
        </div>

        <div class="options-grid">
          ${optionsList.map((opt, idx) => {
            const matchFruit = FRUITS.find(f => f.name === opt || f.nameEn === opt);
            const iconSvg = matchFruit && FRUIT_SVGS[matchFruit.id] ? FRUIT_SVGS[matchFruit.id] : '';
            return `
              <button class="option-btn" data-index="${idx}">
                <span class="opt-label">${String.fromCharCode(65 + idx)}</span>
                ${iconSvg ? `<div class="opt-fruit-icon">${iconSvg}</div>` : ''}
                <span class="opt-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div id="quiz-feedback" class="feedback-area hidden"></div>
      </div>
    `;

    const speakBtn = this.container.querySelector('#btn-speak-riddle');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        playClick();
        speak(riddleText, this.lang);
      });
    }

    const optionBtns = this.container.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.handleAnswer(idx, currentFruit);
      });
    });
  }

  handleAnswer(selectedIdx, fruit) {
    if (this.answered) return;
    this.answered = true;

    const isVi = this.lang === 'vi';
    const isCorrect = (selectedIdx === 0);
    const feedbackEl = this.container.querySelector('#quiz-feedback');

    const optionBtns = this.container.querySelectorAll('.option-btn');
    optionBtns.forEach((btn, i) => {
      btn.disabled = true;
      if (i === 0) {
        btn.classList.add('correct-answer');
      } else if (i === selectedIdx && !isCorrect) {
        btn.classList.add('wrong-answer');
      }
    });

    if (isCorrect) {
      playSuccess();
      this.score += 100;
      this.stars += 1;
      this.onAwardStar();
      this.onUnlockFruit(fruit.id);

      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });

      const fruitName = isVi ? fruit.name : fruit.nameEn;
      speakClipSequence(['khen_dung', fruit.id], `Yes! ${fruitName}`, this.lang);

      feedbackEl.className = 'feedback-area feedback-success animate-bounce';
      feedbackEl.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-icon-box">${FRUIT_SVGS[fruit.id]}</div>
          <div>
            <h3>${isVi ? 'Chính xác rồi! Tuyệt quá!' : 'Awesome! Correct!'}</h3>
            <p class="fun-fact">${isVi ? fruit.funFact : fruit.funFactEn}</p>
          </div>
        </div>
        <button class="btn-primary btn-next" id="btn-quiz-next">
          ${isVi ? 'Câu tiếp theo' : 'Next Question'}
        </button>
      `;
    } else {
      playError();
      feedbackEl.className = 'feedback-area feedback-error animate-shake';
      feedbackEl.innerHTML = `
        <div class="feedback-header">
          <div class="feedback-icon-box">${FRUIT_SVGS[fruit.id]}</div>
          <div>
            <h3>${isVi ? 'Chưa chính xác rồi bé ơi!' : 'Not quite right!'}</h3>
            <p>${isVi ? `Đáp án đúng là: <strong>${fruit.name}</strong>` : `The correct answer was: <strong>${fruit.nameEn}</strong>`}</p>
          </div>
        </div>
        <button class="btn-primary btn-next" id="btn-quiz-next">
          ${isVi ? 'Tiếp tục' : 'Continue'}
        </button>
      `;
    }

    feedbackEl.classList.remove('hidden');

    const nextBtn = feedbackEl.querySelector('#btn-quiz-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        playClick();
        this.currentIndex++;
        this.answered = false;
        this.render();
      });
    }
  }

  renderCompletion() {
    playVictory();
    const isVi = this.lang === 'vi';

    confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });

    this.container.innerHTML = `
      <div class="completion-card animate-pop-in">
        <div class="completion-icon">${UI_ICONS.trophy}</div>
        <h2>${isVi ? 'Chúc Mừng Bé Đã Hoàn Thành!' : 'Congratulations!'}</h2>
        <p class="completion-subtitle">${isVi ? 'Bé thật thông minh và am hiểu về trái cây!' : 'You did an amazing job learning fruits!'}</p>

        <div class="stats-summary">
          <div class="stat-box">
            <span class="stat-value">${UI_ICONS.star} ${this.stars}</span>
            <span class="stat-label">${isVi ? 'Sao tích lũy' : 'Stars Earned'}</span>
          </div>
          <div class="stat-box">
            <span class="stat-value">${UI_ICONS.trophy} ${this.score}</span>
            <span class="stat-label">${isVi ? 'Tổng điểm' : 'Total Score'}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-primary" id="btn-quiz-restart">
            ${isVi ? 'Chơi lại từ đầu' : 'Play Again'}
          </button>
        </div>
      </div>
    `;

    const restartBtn = this.container.querySelector('#btn-quiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        playClick();
        this.init();
      });
    }
  }
}
