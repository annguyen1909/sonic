import { COUNTING_QUIZZES, LETTER_QUIZZES, SHAPE_QUIZZES, COLOR_QUIZZES, VEHICLES_DATA, VEHICLE_QUIZZES, ANIMAL_SOUND_QUIZZES } from '../data/learningData.js';
import { UI_ICONS } from '../utils/icons.js';
import { playSuccess, playError, playClick, playVictory, playAudioClip, playAudioClipSequence, stopAllAudio } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class LearnGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});

    this.activeTab = 'vehicle'; // 'vehicle' | 'animal_sound' | 'count' | 'letter' | 'shape' | 'color'
    this.vehicleMode = 'quiz'; // 'quiz' | 'explore'
    this.quizIndex = 0;
    this.isAnswered = false;

    this.speakTimer = null;
    this.transitionTimer = null;

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
      case 'vehicle':
        return VEHICLE_QUIZZES;
      case 'animal_sound':
        return ANIMAL_SOUND_QUIZZES;
      case 'count':
        return COUNTING_QUIZZES;
      case 'letter':
        return LETTER_QUIZZES;
      case 'shape':
        return SHAPE_QUIZZES;
      case 'color':
        return COLOR_QUIZZES;
      default:
        return VEHICLE_QUIZZES;
    }
  }

  clearTimers() {
    if (this.speakTimer) {
      clearTimeout(this.speakTimer);
      this.speakTimer = null;
    }
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
  }

  destroy() {
    this.clearTimers();
    stopAllAudio();
  }

  speakCurrentQuestion() {
    this.clearTimers();

    if (this.activeTab === 'vehicle' && this.vehicleMode === 'explore') {
      return;
    }

    const list = this.getCurrentQuizList();
    const current = list[this.quizIndex % list.length];
    if (!current) return;
    const isVi = this.lang === 'vi';

    this.speakTimer = setTimeout(() => {
      this.speakTimer = null;
      if (this.activeTab === 'animal_sound') {
        // Sequence: Play authentic animal sound first, then Hoài My voice question!
        playAudioClipSequence([current.sfx, current.audioPromptKey], isVi ? current.question : current.questionEn, this.lang);
      } else if (this.activeTab === 'vehicle') {
        // Sequence: Play siren first, then Hoài My question!
        playAudioClipSequence([current.sfx, current.audioPromptKey], isVi ? current.question : current.questionEn, this.lang);
      } else {
        const text = isVi ? (current.audioPrompt || current.question) : (current.audioPromptEn || current.questionEn);
        playAudioClip(current.audioKey, text, this.lang);
      }
    }, 180);
  }

  render() {
    const isVi = this.lang === 'vi';
    const list = this.getCurrentQuizList();
    const current = list[this.quizIndex % list.length];

    this.container.innerHTML = `
      <div class="learn-container game-panel animate-fade-in">
        <div class="learn-header-row">
          <div class="learn-category-tabs">
            <button class="learn-tab-btn ${this.activeTab === 'vehicle' ? 'active' : ''}" data-tab="vehicle" type="button">
              🚗 ${isVi ? 'Xe Cộ & Còi Hú' : 'Vehicles'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'animal_sound' ? 'active' : ''}" data-tab="animal_sound" type="button">
              🔊 ${isVi ? 'Đoán Tiếng Kêu' : 'Animal Sounds'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'count' ? 'active' : ''}" data-tab="count" type="button">
              🦆 ${isVi ? 'Đếm Con Vật' : 'Count'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'letter' ? 'active' : ''}" data-tab="letter" type="button">
              🔤 ${isVi ? 'Chữ Cái' : 'Letters'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'shape' ? 'active' : ''}" data-tab="shape" type="button">
              🔺 ${isVi ? 'Hình Khối' : 'Shapes'}
            </button>
            <button class="learn-tab-btn ${this.activeTab === 'color' ? 'active' : ''}" data-tab="color" type="button">
              🎨 ${isVi ? 'Màu Sắc' : 'Colors'}
            </button>
          </div>
        </div>

        ${this.renderMainArea(current, isVi)}

        <div id="learn-feedback-overlay" class="learn-feedback-toast hidden"></div>
      </div>
    `;

    this.bindEvents(current, isVi);
  }

  renderMainArea(current, isVi) {
    if (this.activeTab === 'vehicle') {
      return this.renderVehicleArea(current, isVi);
    }
    if (this.activeTab === 'animal_sound') {
      return this.renderAnimalSoundArea(current, isVi);
    }

    return `
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
    `;
  }

  renderVehicleArea(current, isVi) {
    return `
      <div class="vehicle-sub-header">
        <div class="vehicle-mode-toggle">
          <button class="vehicle-mode-btn ${this.vehicleMode === 'quiz' ? 'active' : ''}" id="btn-vehicle-mode-quiz" type="button">
            🎯 ${isVi ? 'Đố Tiếng Còi' : 'Siren Quiz'}
          </button>
          <button class="vehicle-mode-btn ${this.vehicleMode === 'explore' ? 'active' : ''}" id="btn-vehicle-mode-explore" type="button">
            🎺 ${isVi ? 'Bấm Còi Tự Do' : 'Explore Sirens'}
          </button>
        </div>
      </div>

      ${
        this.vehicleMode === 'quiz'
          ? `
            <div class="quiz-hero-card">
              <div class="quiz-question-bar">
                <button class="btn-repeat-voice" id="btn-repeat-voice" type="button" title="Nghe lại">
                  ${UI_ICONS.speaker}
                </button>
                <span class="quiz-question-text">
                  ${isVi ? current.question : current.questionEn}
                </span>
              </div>

              <div class="vehicle-quiz-siren-box animate-pop-in" id="vehicle-siren-beacon">
                <div class="siren-beacon-icon">🚨</div>
                <div class="siren-beacon-pulse"></div>
                <span class="siren-instruction">${isVi ? 'Bé nghe tiếng còi hú rồi chọn xe nhé!' : 'Listen to siren and pick the vehicle!'}</span>
              </div>

              <div class="vehicle-quiz-options-grid">
                ${current.options.map((vehId) => {
                  const veh = VEHICLES_DATA.find((v) => v.id === vehId);
                  if (!veh) return '';
                  const isCorrectAnswer = vehId === current.correctVehicleId;
                  return `
                    <button class="btn-vehicle-card ${this.isAnswered && isCorrectAnswer ? 'correct' : ''}" data-vehicle-id="${veh.id}" type="button">
                      <div class="vehicle-card-img-wrap">
                        <img src="${veh.image}" alt="${veh.name}" class="vehicle-card-img" />
                      </div>
                      <span class="vehicle-card-name">${isVi ? veh.name : veh.nameEn}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `
          : `
            <div class="vehicle-explore-grid animate-fade-in">
              ${VEHICLES_DATA.map((veh) => `
                <div class="vehicle-explore-card" data-vehicle-id="${veh.id}" style="border-top: 5px solid ${veh.color};">
                  <div class="vehicle-explore-img-wrap">
                    <img src="${veh.image}" alt="${veh.name}" class="vehicle-explore-img" />
                  </div>
                  <div class="vehicle-explore-info">
                    <h3 class="vehicle-explore-title">${isVi ? veh.name : veh.nameEn}</h3>
                    <p class="vehicle-explore-desc">${isVi ? veh.description : veh.descriptionEn}</p>
                    <button class="btn-honk-horn" type="button">
                      🔊 ${isVi ? 'Bấm Còi Hú' : 'Sound Siren'}
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `
      }
    `;
  }

  renderAnimalSoundArea(current, isVi) {
    return `
      <div class="quiz-hero-card">
        <div class="quiz-question-bar">
          <button class="btn-repeat-voice" id="btn-repeat-voice" type="button" title="Nghe lại">
            ${UI_ICONS.speaker}
          </button>
          <span class="quiz-question-text">
            ${isVi ? current.question : current.questionEn}
          </span>
        </div>

        <div class="animal-sound-hero-box animate-pop-in" id="animal-sound-hero">
          <div class="sound-wave-icon">🎵 🐶 🐱 🦆</div>
          <div class="sound-wave-label">${isVi ? 'Bé hãy lắng nghe tiếng kêu thật kỹ nhé!' : 'Listen to the animal sound!'}</div>
        </div>

        <div class="animal-sound-options-grid">
          ${current.options.map((opt) => {
            const isCorrect = opt.id === current.correctAnimalId;
            return `
              <button class="btn-animal-sound-card ${this.isAnswered && isCorrect ? 'correct' : ''}" data-animal-id="${opt.id}" type="button">
                <div class="animal-sound-img-wrap">
                  <img src="${opt.image}" alt="${opt.name}" class="animal-sound-img" />
                </div>
                <span class="animal-sound-name">${isVi ? opt.name : opt.nameEn}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>
    `;
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
    // Switch main tabs
    this.container.querySelectorAll('.learn-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        if (tab === this.activeTab) return;
        playClick();
        this.clearTimers();
        stopAllAudio();
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
      this.clearTimers();
      stopAllAudio();
      this.speakCurrentQuestion();
    });

    // Vehicle mode toggle
    const btnQuiz = this.container.querySelector('#btn-vehicle-mode-quiz');
    const btnExplore = this.container.querySelector('#btn-vehicle-mode-explore');
    if (btnQuiz && btnExplore) {
      btnQuiz.addEventListener('click', () => {
        playClick();
        this.clearTimers();
        stopAllAudio();
        this.vehicleMode = 'quiz';
        this.isAnswered = false;
        this.render();
        this.speakCurrentQuestion();
      });
      btnExplore.addEventListener('click', () => {
        playClick();
        this.clearTimers();
        stopAllAudio();
        this.vehicleMode = 'explore';
        this.render();
      });
    }

    // Vehicle explore click to honk & speak
    if (this.activeTab === 'vehicle' && this.vehicleMode === 'explore') {
      this.container.querySelectorAll('.vehicle-explore-card').forEach((card) => {
        card.addEventListener('click', () => {
          const vehId = card.getAttribute('data-vehicle-id');
          const veh = VEHICLES_DATA.find((v) => v.id === vehId);
          if (!veh) return;
          this.clearTimers();
          stopAllAudio();
          card.classList.add('animate-bounce');
          setTimeout(() => card.classList.remove('animate-bounce'), 600);
          playAudioClipSequence([veh.sfx, veh.voiceIntro], isVi ? veh.name : veh.nameEn, this.lang);
        });
      });
    }

    // Vehicle quiz answer selection
    if (this.activeTab === 'vehicle' && this.vehicleMode === 'quiz') {
      this.container.querySelectorAll('.btn-vehicle-card').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const vehId = btn.getAttribute('data-vehicle-id');
          const isCorrect = vehId === current.correctVehicleId;
          this.handleVehicleAnswer(isCorrect, current, isVi, btn);
        });
      });
    }

    // Animal sound quiz answer selection
    if (this.activeTab === 'animal_sound') {
      this.container.querySelectorAll('.btn-animal-sound-card').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const animalId = btn.getAttribute('data-animal-id');
          const isCorrect = animalId === current.correctAnimalId;
          this.handleAnimalSoundAnswer(isCorrect, current, isVi, btn);
        });
      });
    }

    // Tap letter card or photo for playful bounce
    const letterCard = this.container.querySelector('#quiz-letter-card');
    if (letterCard) {
      letterCard.addEventListener('click', () => {
        playClick();
        this.clearTimers();
        stopAllAudio();
        letterCard.classList.add('animate-bounce');
        playAudioClip(`${current.audioKey}_name`, `Chữ ${current.targetLetter}`, this.lang);
        setTimeout(() => letterCard.classList.remove('animate-bounce'), 600);
      });
    }

    const photoEl = this.container.querySelector('#quiz-photo-img');
    if (photoEl) {
      photoEl.addEventListener('click', () => {
        playClick();
        this.clearTimers();
        stopAllAudio();
        photoEl.classList.add('animate-bounce');
        if (this.activeTab === 'shape') {
          playAudioClip(`${current.audioKey}_name`, current.correctAnswer, this.lang);
        } else {
          this.speakCurrentQuestion();
        }
        setTimeout(() => photoEl.classList.remove('animate-bounce'), 600);
      });
    }

    // Answer buttons based on remaining active tabs
    if (this.activeTab === 'count') {
      this.container.querySelectorAll('.btn-count-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const val = parseInt(btn.getAttribute('data-value'), 10);
          this.handleStandardAnswer(val === current.count, current, isVi);
        });
      });
    } else if (this.activeTab === 'letter') {
      this.container.querySelectorAll('.btn-letter-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const letter = btn.getAttribute('data-letter');
          this.handleStandardAnswer(letter === current.correctLetter, current, isVi);
        });
      });
    } else if (this.activeTab === 'shape') {
      this.container.querySelectorAll('.btn-shape-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const shape = btn.getAttribute('data-shape');
          this.handleStandardAnswer(shape === current.correctAnswer, current, isVi);
        });
      });
    } else if (this.activeTab === 'color') {
      this.container.querySelectorAll('.btn-color-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (this.isAnswered) return;
          const colorName = btn.getAttribute('data-color-name');
          this.handleStandardAnswer(colorName === current.correctColorName, current, isVi);
        });
      });
    }
  }

  handleVehicleAnswer(isCorrect, current, isVi, clickedBtn) {
    this.clearTimers();
    if (isCorrect) {
      playSuccess();
      playVictory();
      this.onAwardStar();
      this.isAnswered = true;

      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      clickedBtn.classList.add('animate-bounce');

      this.render();

      // Sequence: Siren plays proudly -> Hoài My praise -> buffer 500ms -> next question!
      playAudioClipSequence([current.sfx, current.praiseKey], 'Sonic giỏi quá!', this.lang, () => {
        this.transitionTimer = setTimeout(() => {
          this.transitionTimer = null;
          this.nextQuestion();
        }, 500);
      });
    } else {
      playError();
      clickedBtn.classList.add('shake-red');
      setTimeout(() => clickedBtn.classList.remove('shake-red'), 500);

      playAudioClip('khen_thu_lai', isVi ? 'Bé Sonic thử lại nhé!' : 'Try again!', this.lang);
    }
  }

  handleAnimalSoundAnswer(isCorrect, current, isVi, clickedBtn) {
    this.clearTimers();
    if (isCorrect) {
      playSuccess();
      playVictory();
      this.onAwardStar();
      this.isAnswered = true;

      confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      clickedBtn.classList.add('animate-bounce');

      this.render();

      // Sequence: Animal makes sound proudly -> Hoài My praise -> buffer 500ms -> next question!
      playAudioClipSequence([current.sfx, current.praiseKey], 'Bé Sonic giỏi quá!', this.lang, () => {
        this.transitionTimer = setTimeout(() => {
          this.transitionTimer = null;
          this.nextQuestion();
        }, 500);
      });
    } else {
      playError();
      clickedBtn.classList.add('shake-red');
      setTimeout(() => clickedBtn.classList.remove('shake-red'), 500);

      playAudioClip('khen_thu_lai', isVi ? 'Bé Sonic thử lại nhé!' : 'Try again!', this.lang);
    }
  }

  handleStandardAnswer(isCorrect, current, isVi) {
    this.clearTimers();
    if (isCorrect) {
      playSuccess();
      playVictory();
      this.onAwardStar();
      this.isAnswered = true;

      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });

      const praiseText = isVi ? (current.praise || 'Bé Sonic giỏi quá!') : (current.praiseEn || 'Awesome job!');
      this.render();

      playAudioClip(`${current.audioKey}_praise`, praiseText, this.lang, () => {
        this.transitionTimer = setTimeout(() => {
          this.transitionTimer = null;
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
    this.clearTimers();
    const list = this.getCurrentQuizList();
    this.quizIndex = (this.quizIndex + 1) % list.length;
    this.isAnswered = false;
    this.render();
    this.speakCurrentQuestion();
  }
}
