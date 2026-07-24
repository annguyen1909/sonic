// Browser HTML5 drag ghosts ignore border-radius — hide them and follow with a rounded clone.
let ghost = null;
let offsetX = 0;
let offsetY = 0;

function blankDragImage() {
  const c = document.createElement('canvas');
  c.width = 1;
  c.height = 1;
  return c;
}

function onDragOver(e) {
  if (!ghost) return;
  ghost.style.left = `${e.clientX - offsetX}px`;
  ghost.style.top = `${e.clientY - offsetY}px`;
}

function cleanup(sourceEl) {
  document.removeEventListener('dragover', onDragOver);
  ghost?.remove();
  ghost = null;
  sourceEl?.classList.remove('is-dragging');
}

/** Call from dragstart after setData. */
export function attachRoundedDragGhost(e, sourceEl) {
  cleanup(sourceEl);

  e.dataTransfer.setDragImage(blankDragImage(), 0, 0);

  const rect = sourceEl.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  ghost = sourceEl.cloneNode(true);
  ghost.removeAttribute('draggable');
  ghost.classList.add('drag-ghost');
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.style.left = `${rect.left}px`;
  ghost.style.top = `${rect.top}px`;
  document.body.appendChild(ghost);

  sourceEl.classList.add('is-dragging');
  document.addEventListener('dragover', onDragOver);

  const end = () => {
    cleanup(sourceEl);
    sourceEl.removeEventListener('dragend', end);
  };
  sourceEl.addEventListener('dragend', end);
}
