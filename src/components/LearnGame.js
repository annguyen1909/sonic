import { COUNTING_QUIZZES, LETTER_QUIZZES, SHAPE_QUIZZES, COLOR_QUIZZES } from '../data/learningData.js';
import { UI_ICONS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, playAudioClip } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class LearnGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});

    this.activeTab = 'count'; // 'count' | 'letter' | 'shape' | 'color'
    this.quizIndex = 0;
    this.isAnswered = false;

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.quizIndex = 0;
    this.isAnswered = false;
    this.render();
    this.speakCurrentQuestion();
  }

  getCurrentQuizList() {
    switch (this.activeTab) {
      case 'count':
        return COUNTING_QUIZZES;
      case 'letter':
        return LETTER_QUIZZES;
      case 'shape':
        return SHAPE_QUIZZES;
      case 'color':
        return COLOR_QUIZZES;
      default:
        return COUNTING_QUIZZES;
    }
  }

  speakCurrentQuestion() {
    const list = this.getCurrentQuizList();
    const current = list[this.quizIndex % list.length];
    if (!current) return;
    const isVi = this.lang === 'vi';
    const text = isVi ? (current.audioPrompt || current.question) : (current.audioPromptEn || current.questionEn);
    setTimeout(() => {
      playAudioClip(current.audioKey, text, this.lang);
    }, 200);
  }

  render() {
    const isVi = this.lang === 'vi';
    const list = this.getCurrentQuizList();
    const current = list[this.quizIndex % list.length];

    this.container.innerHTML = `
      <div class="learn-container game-panel animate-fade-in">
        <div class="learn-header-row">
          <div class="learn-category-tabs">
            <button class="learn-tab-btn ${this.activeTab === 'count' ? 'active' : ''}" data-tab="count" type="button">
              ${isVi ? 'Đếm Con Vật' : 'Count'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'letter' ? 'active' : ''}" data-tab="letter" type="button">
              ${isVi ? 'Chữ Cái' : 'Letters'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'shape' ? 'active' : ''}" data-tab="shape" type="button">
              ${isVi ? 'Hình Khối' : 'Shapes'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'color' ? 'active' : ''}" data-tab="color" type="button">
              ${isVi ? 'Màu Sắc' : 'Colors'}
            </button>
          </div>
        </div>

        <div class="quiz-hero-card">
          <div class="quiz-question-bar">
            <button class="btn-repeat-voice" id="btn-repeat-voice" type="button" title="Nghe lại">
              ${UI_ICONS.speaker}
            </button>
            <span class="quiz-question-text">
              ${isVi ? current.question : current.questionEn}
            </span>
          </div>

          ${
            this.activeTab === 'letter'
              ? `
                <div class="quiz-letter-wrapper animate-pop-in" id="quiz-letter-card">
                  <div class="letter-display-box" style="border-color: ${current.color}; background: ${current.color}14;">
                    <span class="letter-giant-text" style="color: ${current.color};">${current.targetLetter}</span>
                  </div>
                </div>
              `
              : `
                <div class="quiz-photo-wrapper animate-pop-in" id="quiz-photo-container">
                  <img src="${current.image}" alt="Quiz Photo" class="quiz-real-photo" id="quiz-photo-img" />
                </div>
              `
          }

          ${this.renderAnswerArea(current, isVi)}
        </div>

        <div id="learn-feedback-overlay" class="learn-feedback-toast hidden"></div>
      </div>
    `;

    this.bindEvents(current, isVi);
  }

  renderAnswerArea(current, isVi) {
    switch (this.activeTab) {
      case 'count':
        return `
          <div class="count-options-grid">
            ${current.options.map((opt) => `
              <button class="btn-count-opt ${this.isAnswered && opt === current.count ? 'correct' : ''}" data-value="${opt}" type="button">
                ${opt}
              </button>
            `).join('')}
          </div>
        `;
      case 'letter':
        return `
          <div class="letter-options-grid">
            ${current.options.map((letter) => `
              <button class="btn-letter-opt ${this.isAnswered && letter === current.correctLetter ? 'correct' : ''}" data-letter="${letter}" type="button">
                ${letter}
              </button>
            `).join('')}
          </div>
        `;
      case 'shape':
        return `
          <div class="shape-options-grid">
            ${current.options.map((opt, idx) => `
              <button class="btn-shape-opt ${this.isAnswered && opt === current.correctAnswer ? 'correct' : ''}" data-shape="${opt}" type="button">
                ${isVi ? opt : current.optionsEn[idx]}
              </button>
            `).join('')}
          </div>
        `;
      case 'color':
        return `
          <div class="color-options-grid">
            ${current.options.map((opt) => `
              <button class="btn-color-opt ${this.isAnswered && opt.name === current.correctColorName ? 'correct' : ''}" data-color-name="${opt.name}" type="button">
                <span class="color-swatch-circle" style="background: ${opt.bg};"></span>
                <span class="color-label">${isVi ? opt.name : opt.nameEn}</span>
              </button>
            `).join('')}
          </div>
        `;
      default:
        return '';
    }
  }

  bindEvents(current, isVi) {
    // Switch learning sub-tabs
    this.container.querySelectorAll('.learn-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab === this.activeTab) return;
        playClick();
        this.activeTab = tab;
        this.quizIndex = 0;
        this.isAnswered = false;
        this.render();
        this.speakCurrentQuestion();
      });
    });

    // Voice repeat button
    this.container.querySelector('#btn-repeat-voice')?.addEventListener('click', () => {
      playClick();
      this.speakCurrentQuestion();
    });

    // Tap letter card or photo for playful bounce & voice encouragement
    const letterCard = this.container.querySelector('#quiz-letter-card');
    if (letterCard) {
      letterCard.addEventListener('click', () => {
        playClick();
        letterCard.classList.add('animate-bounce');
        playAudioClip(`${current.audioKey}_name`, `Chữ ${current.targetLetter}`, this.lang);
        setTimeout(() => letterCard.classList.remove('animate-bounce'), 600);
      });
    }

    const photoEl = this.container.querySelector('#quiz-photo-img');
    if (photoEl) {
      photoEl.addEventListener('click', () => {
        playClick();
        photoEl.classList.add('animate-bounce');
        if (this.activeTab === 'shape') {
          playAudioClip(`${current.audioKey}_name`, current.correctAnswer, this.lang);
        } else {
          this.speakCurrentQuestion();
        }
        setTimeout(() => photoEl.classList.remove('animate-bounce'), 600);
      });
    }

    // Answer buttons based on active tab
    if (this.activeTab === 'count') {
      this.container.querySelectorAll('.btn-count-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const val = parseInt(btn.getAttribute('data-value'), 10);
          this.handleAnswer(val === current.count, current, isVi);
        });
      });
    } else if (this.activeTab === 'letter') {
      this.container.querySelectorAll('.btn-letter-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const letter = btn.getAttribute('data-letter');
          this.handleAnswer(letter === current.correctLetter, current, isVi);
        });
      });
    } else if (this.activeTab === 'shape') {
      this.container.querySelectorAll('.btn-shape-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const shape = btn.getAttribute('data-shape');
          this.handleAnswer(shape === current.correctAnswer, current, isVi);
        });
      });
    } else if (this.activeTab === 'color') {
      this.container.querySelectorAll('.btn-color-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const colorName = btn.getAttribute('data-color-name');
          this.handleAnswer(colorName === current.correctColorName, current, isVi);
        });
      });
    }
  }

  handleAnswer(isCorrect, current, isVi) {
    if (isCorrect) {
      playSuccess();
      playVictory();
      this.onAwardStar();
      this.isAnswered = true;

      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const praiseText = isVi ? (current.praise || 'Bé Sonic giỏi quá!') : (current.praiseEn || 'Awesome job!');
      this.render();

      // Đợi cô giáo đọc xong 100% lời khen + đệm 500ms rồi mới chuyển sang câu hỏi mới (không bị ngắt lời)
      playAudioClip(`${current.audioKey}_praise`, praiseText, this.lang, () => {
        setTimeout(() => {
          this.nextQuestion();
        }, 500);
      });
    } else {
      playError();
      const card = this.container.querySelector('.quiz-hero-card');
      card?.classList.add('shake-red');
      setTimeout(() => card?.classList.remove('shake-red'), 500);

      playAudioClip('khen_thu_lai', isVi ? 'Bé Sonic thử lại nhé!' : 'Try again!', this.lang);
    }
  }

  nextQuestion() {
    const list = this.getCurrentQuizList();
    this.quizIndex = (this.quizIndex + 1) % list.length;
    this.isAnswered = false;
    this.render();
    this.speakCurrentQuestion();
  }
}
