// Pre-bake a rounded canvas for setDragImage (sync). Transparent drag images → Chrome globe icon.
const previews = new WeakMap();

function roundPath(ctx, w, h, r) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(0, 0, w, h, r);
  } else {
    ctx.moveTo(r, 0);
    ctx.arcTo(w, 0, w, h, r);
    ctx.arcTo(w, h, 0, h, r);
    ctx.arcTo(0, h, 0, 0, r);
    ctx.arcTo(0, 0, w, 0, r);
    ctx.closePath();
  }
}

/** Call after the tray item is in the DOM (e.g. from bindEvents). */
export function prepareRoundedDragImage(el, radius = 16) {
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  const svg = el.querySelector('svg');
  if (!w || !h || !svg) return;

  const clone = svg.cloneNode(true);
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }
  const inset = 9; // ~border 3 + padding 6
  const inner = Math.max(1, Math.min(w, h) - inset * 2);
  clone.setAttribute('width', String(inner));
  clone.setAttribute('height', String(inner));

  const svgData = new XMLSerializer().serializeToString(clone);
  const img = new Image();
  img.onload = () => {
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    roundPath(ctx, w, h, radius);
    ctx.save();
    ctx.clip();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.drawImage(img, inset, inset, w - inset * 2, h - inset * 2);
    ctx.restore();

    roundPath(ctx, w, h, radius);
    ctx.strokeStyle = '#e85d04';
    ctx.lineWidth = 3;
    ctx.stroke();

    previews.set(el, canvas);
  };
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
}

/** Call from dragstart after setData. No-op until preview is ready. */
export function setRoundedDragImage(e, el) {
  const canvas = previews.get(el);
  if (!canvas) return;

  // Safari wants the drag image node in the document
  if (!canvas.isConnected) {
    canvas.style.cssText =
      'position:fixed;left:-9999px;top:0;pointer-events:none;width:auto;height:auto;';
    document.body.appendChild(canvas);
  }

  const rect = el.getBoundingClientRect();
  e.dataTransfer.setDragImage(canvas, e.clientX - rect.left, e.clientY - rect.top);
}
