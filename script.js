import { calc_moves } from './src/moves.js';

const pieces = ["K", "Q", "R", "B", "N", "P", "k", "q", "r", "b", "n", "p"]
const boardState = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"]
]

let selectedCell = null

function generateBoard() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.createElement('div');
      const isLight = (row + col) % 2 === 0;
      cell.classList.add('cell', isLight ? 'light' : 'dark');
      cell.id = `cell-${row}-${col}`;

      if (row === 7) {
        const fileLabel = document.createElement('span');
        fileLabel.classList.add('label', 'file-label');
        fileLabel.textContent = files[col];
        cell.appendChild(fileLabel);
      }

      if (col === 7) {
        const rankLabel = document.createElement('span');
        rankLabel.classList.add('label', 'rank-label');
        rankLabel.textContent = 8 - row;
        cell.appendChild(rankLabel);
      }

      cell.addEventListener('click', (e) => onCellClick(row, col, e));
      board.appendChild(cell);
    }
  }
}

function onCellClick(row, col, e) {
  clearHighlights()
  if (!boardState[row][col] && !selectedCell) return;
  
  const cell = e.currentTarget;
  if (selectedCell) {
    if (selectedCell.coords[0] == row && selectedCell.coords[1] == col ) return
    boardState[row][col] = boardState[selectedCell.coords[0]][selectedCell.coords[1]];
    boardState[selectedCell.coords[0]][selectedCell.coords[1]] = ""
    selectedCell.cell.classList.remove('selected');
    selectedCell = null;
  } else {
    selectedCell = {"cell": cell, "coords": [row, col]};
    cell.classList.add('selected');
    let options = calc_moves(boardState, boardState[row][col], row, col)
    options.moves.forEach(move => {
      const optionCell = document.getElementById(`cell-${move.row}-${move.col}`);
      optionCell.classList.add('available');
    });
  }
  renderBoard()
}

/**
 * Reads boardState and re-renders all pieces on the board.
 * Call this after any changes to boardState.
 */
function renderBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      const existing = cell.querySelector('.piece');
      if (existing) existing.remove();

      if (boardState[row][col]) {
        const img = document.createElement('img');
        img.src = `./img/${boardState[row][col]}.svg`;
        img.alt = boardState[row][col];
        img.classList.add('piece');
        cell.appendChild(img);
      }
    }
  }
}

/**
 * Reads the current board state and validates wether the provided position is available
 * Returns true if the position does not conflict with other pieces, otherwise, return false
 */
function check_position(row, col) {
    let diagonal_1 = row - col
    let diagonal_2 = row + col
    for (let i = 0; i < boardState.length; i++) {
        for (let j = 0; j < boardState[i].length; j++) {
            if (boardState[i][j] === 1) {
                if (i - j == diagonal_1 || i + j == diagonal_2) return false // Diagonals
                if (i === row || j === col) return false // row and cols
            }
        }
    }

    return true
}

function clearHighlights() {
  document.querySelectorAll('.cell.available').forEach(c => c.classList.remove('available'));
}

generateBoard();

renderBoard();