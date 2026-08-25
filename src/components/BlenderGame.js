import { FRUITS } from '../data/fruits.js';
import { getFruitImg, UI_ICONS } from '../utils/icons.js';
import { playBlenderSound, playSuccess, playClick, playVictory, speakClipSequence, speakFruit } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class BlenderGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    this.selectedFruits = [];
    this.isBlending = false;

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.selectedFruits = [];
    this.isBlending = false;
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';
    const blendColor = this.selectedFruits.length > 0
      ? this.selectedFruits[this.selectedFruits.length - 1].color
      : '#ff8c1a';

    this.container.innerHTML = `
      <div class="blender-container game-panel animate-fade-in">
        <div class="game-title-row">
          <h2>${isVi ? 'Quầy ép sinh tố' : 'Juice Blender'}</h2>
          <span class="star-badge" style="min-height:36px;font-size:0.95rem;">${this.selectedFruits.length}/3</span>
        </div>
        <p class="hint-line">${isVi ? 'Chạm 1–3 quả ngon lành rồi bấm nút ÉP!' : 'Tap 1–3 fruits then press BLEND!'}</p>

        <div class="blender-workspace">
          <div class="blender-machine ${this.isBlending ? 'blending-active' : ''}">
            <div class="blender-lid"></div>
            <div class="blender-jar" id="blender-jar-container">
              <div class="blender-liquid" style="height: ${this.selectedFruits.length * 32}%; background: ${blendColor}; opacity: 0.85;"></div>
              <div class="blender-contents">
                ${this.selectedFruits
                  .map(
                    (fruit) => `
                  <div class="blender-dropped-fruit animate-bounce">${getFruitImg(fruit.id)}</div>`
                  )
                  .join('')}
              </div>
            </div>
            <div class="blender-base">
              <button class="blend-action-btn ${this.selectedFruits.length >= 1 ? 'ready' : ''}"
                      id="btn-blend-now" type="button"
                      ${this.selectedFruits.length < 1 || this.isBlending ? 'disabled' : ''}>
                ${this.isBlending ? (isVi ? 'ĐANG XAY...' : 'BLENDING...') : (isVi ? 'ÉP NGAY!' : 'BLEND!')}
              </button>
            </div>
          </div>

          <div class="blender-controls-side">
            <div class="selected-pills">
              ${
                this.selectedFruits.length === 0
                  ? `<span class="empty-tip">${isVi ? '👇 Chạm trái cây bên dưới' : '👇 Tap fruits below'}</span>`
                  : this.selectedFruits
                      .map(
                        (f, idx) => `
                <div class="ingredient-pill animate-pop-in">
                  <div class="pill-icon">${getFruitImg(f.id, 'pill-photo')}</div>
                  <span class="pill-name">${isVi ? f.name : f.nameEn}</span>
                  <button class="pill-remove-btn" data-remove-index="${idx}" type="button" title="Bỏ">✕</button>
                </div>`
                      )
                      .join('')
              }
            </div>

            <div class="shelf-grid">
              ${FRUITS.slice(0, 8).map(
                (fruit) => `
                <button class="shelf-fruit-card" data-fruit-id="${fruit.id}" type="button">
                  <div class="shelf-icon">${getFruitImg(fruit.id)}</div>
                  <span class="shelf-title">${isVi ? fruit.name : fruit.nameEn}</span>
                </button>`
              ).join('')}
            </div>
          </div>
        </div>

        <div id="blender-result" class="victory-overlay hidden"></div>
      </div>
    `;

    this.container.querySelectorAll('.shelf-fruit-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.selectedFruits.length >= 3 || this.isBlending) return;
        const fruit = FRUITS.find((f) => f.id === btn.getAttribute('data-fruit-id'));
        if (!fruit) return;
        playClick();
        this.selectedFruits.push(fruit);
        speakFruit(fruit, this.lang);
        this.render();
      });
    });

    this.container.querySelectorAll('.pill-remove-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-remove-index'), 10);
        playClick();
        this.selectedFruits.splice(idx, 1);
        this.render();
      });
    });

    this.container.querySelector('#btn-blend-now')?.addEventListener('click', () => this.startBlending());
  }

  startBlending() {
    if (this.selectedFruits.length < 1 || this.isBlending) return;
    this.isBlending = true;
    playBlenderSound();
    this.render();

    setTimeout(() => {
      this.isBlending = false;
      this.finishBlending();
    }, 1400);
  }

  finishBlending() {
    playSuccess();
    playVictory();
    this.onAwardStar();
    if (this.selectedFruits[0]) this.onUnlockFruit(this.selectedFruits[0].id);

    confetti({ particleCount: 90, spread: 75, origin: { y: 0.55 } });

    const isVi = this.lang === 'vi';
    const names = this.selectedFruits.map((f) => (isVi ? f.name : f.nameEn)).join(' + ');
    speakClipSequence(this.selectedFruits.map((fruit) => fruit.id), `Yummy ${names} juice!`, this.lang);

    const resultEl = this.container.querySelector('#blender-result');
    if (!resultEl) return;

    resultEl.className = 'victory-overlay animate-pop-in';
    resultEl.innerHTML = `
      <div class="victory-modal">
        <div class="victory-icon">${UI_ICONS.trophy || UI_ICONS.star}</div>
        <h2>${isVi ? 'Sinh Tố Siêu Ngon!' : 'Yummy Smoothie!'}</h2>
        <p><strong>${names}</strong></p>
        <p style="color:#059669;font-weight:700;">${isVi ? 'Ực ực... Bé uống hết ly sinh tố thơm mát!' : 'Slurp! Delicious fresh fruit juice!'}</p>
        <div class="victory-actions">
          <button class="btn-primary" id="btn-blend-again" type="button">
            ${isVi ? 'Làm ly khác' : 'Make another'}
          </button>
        </div>
      </div>
    `;

    resultEl.querySelector('#btn-blend-again')?.addEventListener('click', () => {
      playClick();
      this.init();
    });
  }
}
