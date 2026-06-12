const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/**
 * Build the empty 8x8 board grid in the DOM, adding rank/file labels
 * on the edge cells and wiring up a click handler for every cell.
 *
 * @param {HTMLElement} container - Element to render the board into
 * @param {Function} onCellClick - Callback invoked with (row, col, event) when a cell is clicked
 */
export function createBoard(container, onCellClick) {
  container.innerHTML = '';

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      const isLight = (row + col) % 2 === 0;
      cell.classList.add('cell', isLight ? 'light' : 'dark');
      cell.id = `cell-${row}-${col}`;

      if (row === 7) {
        cell.appendChild(createLabel('file-label', FILES[col]));
      }
      if (col === 7) {
        cell.appendChild(createLabel('rank-label', 8 - row));
      }

      cell.addEventListener('click', (e) => onCellClick(row, col, e));
      container.appendChild(cell);
    }
  }
}

/**
 * Create a small text label span used for rank/file annotations.
 *
 * @param {string} type - CSS class identifying the label type ('file-label' or 'rank-label')
 * @param {string|number} text - Text content of the label
 * @returns {HTMLElement} - The created span element
 */
function createLabel(type, text) {
  const label = document.createElement('span');
  label.classList.add('label', type);
  label.textContent = text;
  return label;
}

/**
 * Re-render every piece on the board to match the current board state.
 * Removes any existing piece images before placing the new ones.
 *
 * @param {Array} boardState - 8x8 matrix representing the board
 */
export function renderBoard(boardState) {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      const existing = cell.querySelector('.piece');
      if (existing) existing.remove();

      const piece = boardState[row][col];
      if (piece) {
        const img = document.createElement('img');
        img.src = `./img/${piece}.svg`;
        img.alt = piece;
        img.classList.add('piece');
        cell.appendChild(img);
      }
    }
  }
}

/**
 * Highlight a set of cells as available move destinations.
 *
 * @param {Array} moves - Array of [row, col] coordinates to highlight
 */
export function highlightMoves(moves) {
  moves.forEach(([row, col]) => {
    const cell = document.getElementById(`cell-${row}-${col}`);
    cell.classList.add('available');
  });
}

/**
 * Remove the 'available' highlight from every cell on the board.
 */
export function clearHighlights() {
  document.querySelectorAll('.cell.available').forEach(c => c.classList.remove('available'));
}

/**
 * Toggle the 'selected' highlight class on a given cell.
 *
 * @param {HTMLElement} cell - The cell element to update
 * @param {boolean} isSelected - Whether the cell should be shown as selected
 */
export function setSelected(cell, isSelected) {
  cell.classList.toggle('selected', isSelected);
}