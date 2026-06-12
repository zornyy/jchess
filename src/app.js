import { start_board } from './core/board.js';
import { calc_moves } from './core/moves.js';
import {
  createBoard,
  renderBoard,
  highlightMoves,
  clearHighlights,
  setSelected
} from './ui/board-view.js';

const boardState = start_board;
let selectedCell = null;

/**
 * Handle a click on a board cell. Depending on the current state this
 * either selects a piece (highlighting its moves) or moves the
 * previously selected piece to the clicked cell, then re-renders.
 *
 * @param {number} row - Row of the clicked cell
 * @param {number} col - Column of the clicked cell
 * @param {MouseEvent} e - The click event
 */
function onCellClick(row, col, e) {
  if (!boardState[row][col] && !selectedCell) return;

  clearHighlights();
  const cell = e.currentTarget;

  if (selectedCell) {
    movePiece(row, col);
  } else {
    selectPiece(cell, row, col);
  }

  renderBoard(boardState);
}

/**
 * Move the currently selected piece to the target square and clear
 * the selection. If the target is the piece's own square, nothing
 * changes other than deselecting.
 *
 * @param {number} row - Destination row
 * @param {number} col - Destination column
 */
function movePiece(row, col) {
  const [fromRow, fromCol] = selectedCell.coords;

  if (fromRow !== row || fromCol !== col) {
    boardState[row][col] = boardState[fromRow][fromCol];
    boardState[fromRow][fromCol] = "";
  }

  setSelected(selectedCell.cell, false);
  selectedCell = null;
}

/**
 * Select the piece on the given cell, mark it as selected, and
 * highlight all of its currently available moves.
 *
 * @param {HTMLElement} cell - The cell element containing the piece
 * @param {number} row - Row of the selected piece
 * @param {number} col - Column of the selected piece
 */
function selectPiece(cell, row, col) {
  selectedCell = { cell, coords: [row, col] };
  setSelected(cell, true);

  const { moves } = calc_moves(boardState, boardState[row][col], row, col);
  highlightMoves(moves);
}

createBoard(document.getElementById('board'), onCellClick);
renderBoard(boardState);