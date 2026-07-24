import { FRUITS } from '../data/fruits.js';
import { FRUIT_SVGS, UI_ICONS } from '../utils/icons.js';
import { playClick, speak } from '../utils/audio.js';

export class StickerAlbum {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.unlockedFruitIds = options.unlockedFruitIds || new Set(['watermelon', 'lemon', 'apple']);

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  unlockFruit(fruitId) {
    this.unlockedFruitIds.add(fruitId);
    this.render();
  }

  init() {
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';
    const totalCount = FRUITS.length;
    const unlockedCount = this.unlockedFruitIds.size;

    this.container.innerHTML = `
      <div class="album-container animate-fade-in">
        <div class="album-header">
          <div>
            <h2>${isVi ? 'Album Bộ Sưu Tập Trái Cây' : 'Fruit Sticker Album'}</h2>
            <p>${isVi ? 'Chơi các trò chơi để mở khóa đủ bộ Sticker nhé!' : 'Play games to unlock all stickers!'}</p>
          </div>
          <div class="album-badge-progress">
            <span>${UI_ICONS.trophy} ${unlockedCount}/${totalCount} ${isVi ? 'Sticker' : 'Stickers'}</span>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${(unlockedCount / totalCount) * 100}%"></div>
            </div>
          </div>
        </div>

        <div class="sticker-grid">
          ${FRUITS.map(fruit => {
            const isUnlocked = this.unlockedFruitIds.has(fruit.id);
            return `
              <div class="sticker-card ${isUnlocked ? 'unlocked' : 'locked'}" data-fruit-id="${fruit.id}">
                <div class="sticker-badge-status">
                  ${isUnlocked ? UI_ICONS.star : UI_ICONS.lock}
                </div>
                <div class="sticker-icon-wrapper">${FRUIT_SVGS[fruit.id]}</div>
                <div class="sticker-title">${isVi ? fruit.name : fruit.nameEn}</div>
                <div class="sticker-subtitle">${isUnlocked ? (isVi ? 'Đã sưu tầm' : 'Unlocked') : (isVi ? 'Chưa mở' : 'Locked')}</div>
              </div>
            `;
          }).join('')}
        </div>

        <dialog id="fruit-modal" class="fruit-dialog">
          <div class="dialog-content">
            <button class="dialog-close" id="modal-close-btn">✖</button>
            <div id="modal-body"></div>
          </div>
        </dialog>
      </div>
    `;

    const stickerCards = this.container.querySelectorAll('.sticker-card');
    stickerCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-fruit-id');
        this.openFruitModal(id);
      });
    });

    const dialog = this.container.querySelector('#fruit-modal');
    const closeBtn = this.container.querySelector('#modal-close-btn');
    if (closeBtn && dialog) {
      closeBtn.addEventListener('click', () => {
        playClick();
        dialog.close();
      });
    }
  }

  openFruitModal(fruitId) {
    const fruit = FRUITS.find(f => f.id === fruitId);
    if (!fruit) return;

    const isVi = this.lang === 'vi';
    const isUnlocked = this.unlockedFruitIds.has(fruit.id);
    const dialog = this.container.querySelector('#fruit-modal');
    const modalBody = this.container.querySelector('#modal-body');

    playClick();

    if (!isUnlocked) {
      modalBody.innerHTML = `
        <div class="modal-locked-view animate-shake" style="text-align: center;">
          <div style="width: 80px; height: 80px; margin: 0 auto 12px; filter: grayscale(1);">${FRUIT_SVGS[fruit.id]}</div>
          <h2>${isVi ? 'Sticker Chưa Mở Khóa' : 'Sticker Locked'}</h2>
          <p>${isVi ? `Hãy tham gia trò chơi Trắc nghiệm hoặc Ghép hình để mở khóa <strong>${fruit.name}</strong> nhé!` : `Play Quiz or Memory match to unlock <strong>${fruit.nameEn}</strong>!`}</p>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <div class="modal-unlocked-view animate-pop-in">
          <div class="modal-fruit-hero" style="background: ${fruit.color}22; border-color: ${fruit.color}">
            <div class="modal-icon-hero">${FRUIT_SVGS[fruit.id]}</div>
            <h2>${isVi ? fruit.name : fruit.nameEn} (${fruit.nameEn})</h2>
            <button class="btn-audio-speak" id="btn-modal-speak">
              ${UI_ICONS.speaker} ${isVi ? 'Nghe phát âm' : 'Pronounce'}
            </button>
          </div>

          <div class="modal-info-section">
            <div class="info-block">
              <h4>${isVi ? 'Sự thật thú vị & Dinh dưỡng' : 'Fun Fact & Nutrition'}</h4>
              <p>${isVi ? fruit.funFact : fruit.funFactEn}</p>
            </div>

            <div class="info-block">
              <h4>${isVi ? 'Câu đố dân gian' : 'Riddle'}</h4>
              <p>"${isVi ? fruit.riddle : fruit.riddleEn}"</p>
            </div>
          </div>
        </div>
      `;

      const speakBtn = modalBody.querySelector('#btn-modal-speak');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => {
          playClick();
          speak(isVi ? fruit.name : fruit.nameEn, this.lang);
        });
      }
    }

    dialog.showModal();
  }
}
