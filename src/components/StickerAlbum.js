import { FRUITS } from '../data/fruits.js';
import { getFruitImg, UI_ICONS } from '../utils/icons.js';
import { playClick, speakFruit } from '../utils/audio.js';

export class StickerAlbum {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.unlockedFruitIds = options.unlockedFruitIds || new Set(['banana', 'watermelon', 'apple']);

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
      <div class="album-container game-panel animate-fade-in">
        <div class="album-header">
          <div>
            <h2>${isVi ? 'Bộ Sưu Tập Của Sonic' : 'Sonic\'s Sticker Album'}</h2>
            <p class="hint-line">${isVi ? 'Chơi các trò chơi để mở khóa đủ bộ ảnh trái cây thật nhé!' : 'Play games to unlock all fruit photos!'}</p>
          </div>
          <div class="album-badge-progress">
            <span>${UI_ICONS.trophy} ${unlockedCount}/${totalCount}</span>
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
                <div class="sticker-icon-wrapper">
                  ${isUnlocked ? getFruitImg(fruit.id) : getFruitImg(fruit.id, '', true)}
                </div>
                <div class="sticker-title">${isVi ? fruit.name : fruit.nameEn}</div>
                <div class="sticker-subtitle">${isUnlocked ? (isVi ? 'Đã có' : 'Unlocked') : (isVi ? 'Chưa mở' : 'Locked')}</div>
              </div>
            `;
          }).join('')}
        </div>

        <dialog id="fruit-modal" class="fruit-dialog">
          <div class="dialog-content">
            <button class="dialog-close" id="modal-close-btn" type="button">✖</button>
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
          <div style="width: 100px; height: 100px; margin: 0 auto 12px;">${getFruitImg(fruit.id, '', true)}</div>
          <h2>${isVi ? 'Chưa mở khóa' : 'Locked'}</h2>
          <p>${isVi ? `Bé hãy chơi Ghép hình hoặc Xếp màu để mở khóa <strong>${fruit.name}</strong> nhé!` : `Play Match or Sort game to unlock <strong>${fruit.nameEn}</strong>!`}</p>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <div class="modal-unlocked-view animate-pop-in">
          <div class="modal-fruit-hero" style="background: ${fruit.color}18; border-color: ${fruit.color}">
            <div class="modal-icon-hero">${getFruitImg(fruit.id)}</div>
            <h2>${isVi ? fruit.name : fruit.nameEn}</h2>
            <button class="btn-audio-speak" id="btn-modal-speak" type="button">
              ${UI_ICONS.speaker} ${isVi ? 'Nghe phát âm' : 'Listen'}
            </button>
          </div>

          <div class="modal-info-section">
            <div class="info-block">
              <h4>${isVi ? 'Dinh dưỡng cho bé' : 'Good for you'}</h4>
              <p>${isVi ? fruit.funFact : fruit.funFactEn}</p>
            </div>
          </div>
        </div>
      `;

      const speakBtn = modalBody.querySelector('#btn-modal-speak');
      if (speakBtn) {
        speakBtn.addEventListener('click', () => {
          playClick();
          speakFruit(fruit, this.lang);
        });
      }
    }

    dialog.showModal();
  }
}
