import { FRUITS } from '../data/fruits.js';
import { getFruitImg, UI_ICONS } from '../utils/icons.js';
import { playWaterSound, playSuccess, playClick, playVictory, speakClip } from '../utils/audio.js';
import confetti from 'canvas-confetti';

export class GardenGame {
  constructor(container, options = {}) {
    this.container = container;
    this.lang = options.lang || 'vi';
    this.onAwardStar = options.onAwardStar || (() => {});
    this.onUnlockFruit = options.onUnlockFruit || (() => {});

    const starter = [...FRUITS].sort(() => 0.5 - Math.random()).slice(0, 3);
    this.plots = starter.map((fruit, id) => ({ id, fruit, stage: 0 }));

    this.init();
  }

  setLang(lang) {
    this.lang = lang;
    this.render();
  }

  init() {
    this.render();
  }

  render() {
    const isVi = this.lang === 'vi';

    this.container.innerHTML = `
      <div class="garden-container game-panel animate-fade-in">
        <div class="game-title-row">
          <h2>${isVi ? 'Khu vườn của Sonic' : 'Sonic\'s Garden'}</h2>
        </div>
        <p class="hint-line">${isVi ? 'Tưới nước chăm cây → Cây ra quả thật → Hái vào giỏ!' : 'Water the plant → Grow fruit → Harvest!'}</p>

        <div class="garden-plots-grid">
          ${this.plots
            .map(
              (plot) => `
            <div class="plot-card stage-${plot.stage}" data-plot-id="${plot.id}">
              <span class="plot-title">${isVi ? plot.fruit.name : plot.fruit.nameEn}</span>
              <div class="plot-visual">${this.renderPlantStageGraphic(plot, isVi)}</div>
              <div class="plot-action-area">
                ${
                  plot.stage < 3
                    ? `<button class="btn-water" data-water-id="${plot.id}" type="button">💧 ${isVi ? 'Tưới nước' : 'Water'}</button>`
                    : `<button class="btn-harvest animate-bounce" data-harvest-id="${plot.id}" type="button">🧺 ${isVi ? 'Hái quả!' : 'Harvest!'}</button>`
                }
              </div>
            </div>`
            )
            .join('')}
        </div>
      </div>
    `;

    this.container.querySelectorAll('[data-water-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.waterPlot(parseInt(btn.getAttribute('data-water-id'), 10));
      });
    });

    this.container.querySelectorAll('[data-harvest-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.harvestPlot(parseInt(btn.getAttribute('data-harvest-id'), 10));
      });
    });
  }

  renderPlantStageGraphic(plot, isVi) {
    switch (plot.stage) {
      case 0:
        return `<div class="plant-stage seed">${UI_ICONS.seedStage}<br><span>${isVi ? '🌱 Hạt giống' : '🌱 Seed'}</span></div>`;
      case 1:
        return `<div class="plant-stage sprout">${UI_ICONS.sproutStage}<br><span>${isVi ? '🌿 Cây non' : '🌿 Sprout'}</span></div>`;
      case 2:
        return `<div class="plant-stage flowering">${UI_ICONS.flowerStage}<br><span>${isVi ? '🌸 Đơm hoa' : '🌸 Bloom'}</span></div>`;
      case 3:
        return `
          <div class="plant-stage ready animate-bounce" style="width:110px;height:110px;">
            ${getFruitImg(plot.fruit.id, 'garden-harvest-photo')}
          </div>`;
      default:
        return `<div class="plant-stage seed">${UI_ICONS.seedStage}</div>`;
    }
  }

  waterPlot(plotId) {
    const plot = this.plots.find((p) => p.id === plotId);
    if (!plot || plot.stage >= 3) return;

    playWaterSound();
    playClick();
    plot.stage += 1;
    this.render();

    if (plot.stage === 3) {
      speakClip(`${plot.fruit.id}_ripe`, `${plot.fruit.nameEn} ready!`, this.lang);
    }
  }

  harvestPlot(plotId) {
    const plot = this.plots.find((p) => p.id === plotId);
    if (!plot || plot.stage < 3) return;

    playSuccess();
    playVictory();
    this.onAwardStar();
    this.onUnlockFruit(plot.fruit.id);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

    const isVi = this.lang === 'vi';
    speakClip(`${plot.fruit.id}_harvest`, `Got ${plot.fruit.nameEn}!`, this.lang);

    const others = FRUITS.filter((f) => f.id !== plot.fruit.id);
    plot.fruit = others[Math.floor(Math.random() * others.length)];
    plot.stage = 0;
    this.render();
  }
}
