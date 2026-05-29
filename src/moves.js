

/**
 * Return different possible moves for a piece
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {String} piece - Name of the piece ("k", "n", "B" etc.)
 * @param {number} row - Row position of the piece
 * @param {number} col - Column position of the piece
 * @returns {Object} An object containing arrays of positions for moves with/without captures
 */
export function calc_moves(board, piece, row, col) {
    const pieceCalculators = {
      k: calc_king,
      q: calc_queen,
      b: calc_bishop,
      n: calc_knight,
      r: calc_rook,
      p: calc_pawn,
      K: calc_king,
      Q: calc_queen,
      B: calc_bishop,
      N: calc_knight,
      R: calc_rook,
      P: calc_pawn
    };
  
    const calculator = pieceCalculators[piece];
    if (!calculator) {
      throw new Error(`Unknown piece: ${piece}`);
    }
  
    const isWhite = piece === piece.toLowerCase();
    return calculator(board, row, col, isWhite);
}
  

/**
 * Calculate the different moves possible for a king
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {number} row - On what row is the king 
 * @param {number} col - On what column is the king
 * @param {boolean} color - True -> white piece, False -> black piece
 * @returns {JSON} - An object containing an array of position you can move to with and without taking a piece
 */
function calc_king(board, row, col, color) {
  let moves = [] // List of possible moves without taking a piece
  let takes = [] // List of possible moves taking a piece
  
  if (row + 1 < 8) {        
    if (!board[row+1][col]) moves.push([row + 1, col])
  }
  if (row - 1 >= 0) {
    if (!board[row-1][col]) moves.push([row - 1, col])
  }
  if (col + 1 < 8) {
    if (!board[row][col+1]) moves.push([row, col + 1])
  }
  if (col - 1 >= 0) {
    if (!board[row][col-1]) moves.push([row, col - 1])
  }
  
    
  if (row + 1 < 8 && col + 1 < 8) {
    if (!board[row+1][col+1]) moves.push([row + 1, col + 1])
  }
  if (row + 1 < 8 && col - 1 >= 0) {
    if (!board[row+1][col-1]) moves.push([row + 1, col - 1])
  }
  if (row - 1 >= 0 && col + 1 < 8) {
    if (!board[row-1][col+1]) moves.push([row - 1, col + 1])
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (!board[row-1][col-1]) moves.push([row - 1, col - 1])
  }

  return {"moves": moves, "takes": takes}
}

/**
 * Calculate the different moves possible for a queen
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {number} row - On what row is the queen 
 * @param {number} col - On what column is the queen
 * @param {boolean} color - True -> white piece, False -> black piece
 * @returns {JSON} - An object containing an array of position you can move to with and without taking a piece
 */
function calc_queen(board, row, col, color) {
  let moves = [] // List of possible moves without taking a piece
  let takes = [] // List of possible moves taking a piece

  for (let i = 1; i < 8; i++) {
    if (row + i < 8) {
      if (!board[row+i][col]) moves.push([row + i, col])
    }
    if (row - i >= 0) {
      if (!board[row-i][col]) moves.push([row - i, col])
    }
    if (col + i < 8) {
      if (!board[row][col+i]) moves.push([row, col + i])
    }
    if (col - i >= 0) {
      if (!board[row][col-i]) moves.push([row, col - i])
    }

    if (row + i < 8 && col + i < 8) {
      if (!board[row+i][col+i]) moves.push([row + i, col + i])
    }
    if (row + i < 8 && col - i >= 0) {
      if (!board[row+i][col-i]) moves.push([row + i, col - i])
    }
    if (row - i >= 0 && col + i < 8) {
      if (!board[row-i][col+i]) moves.push([row-i, col + i])
    }
    if (row - i >= 0 && col - i >= 0) {
      if (!board[row-i][col-i]) moves.push([row - i, col - i])
    }
  }

  return {"moves": moves, "takes": takes}
}

/**
 * Calculate the different moves possible for a bishop
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {number} row - On what row is the bishop 
 * @param {number} col - On what column is the bishop
 * @param {boolean} color - True -> white piece, False -> black piece
 * @returns {JSON} - An object containing an array of position you can move to with and without taking a piece
 */
function calc_bishop(board, row, col, color) {
  let moves = [] // List of possible moves without taking a piece
  let takes = [] // List of possible moves taking a piece

  for (let i = 1; i < 8; i++) {
    if (row + i < 8 && col + i < 8) {
      if (!board[row+i][col+i]) moves.push([row + i, col + i])
    }
    if (row + i < 8 && col - i >= 0) {
      if (!board[row+i][col-i]) moves.push([row + i, col - i])
    }
    if (row - i >= 0 && col + i < 8) {
      if (!board[row-i][col+i]) moves.push([row-i, col + i])
    }
    if (row - i >= 0 && col - i >= 0) {
      if (!board[row-i][col-i]) moves.push([row - i, col - i])
    }
  }

  return {"moves": moves, "takes": takes}
}

/**
 * Calculate the different moves possible for a knight
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {number} row - On what row is the knight 
 * @param {number} col - On what column is the knight
 * @param {boolean} color - True -> white piece, False -> black piece
 * @returns {JSON} - An object containing an array of position you can move to with and without taking a piece
 */
function calc_knight(board, row, col, color) {
  let moves = [] // List of possible moves without taking a piece
  let takes = [] // List of possible moves taking a piece

  if (row + 2 < 8) {
    if (col + 1 < 8 && !board[row+2][col+1]) moves.push([row+2, col+1])
    if (col - 1 >= 0 && !board[row+2][col-1]) moves.push([row+2, col-1])
  }

  if (row - 2 >= 0) {
    if (col + 1 < 8 && !board[row-2][col+1]) moves.push([row-2, col+1])
    if (col - 1 >= 0 && !board[row-2][col-1]) moves.push([row-2, col-1])
  }

  if (col + 2 < 8) {
    if (row + 1 < 8 && !board[row+1][col+2]) moves.push([row+1, col+2])
    if (row - 1 >= 0 && !board[row-1][col+2]) moves.push([row-1, col+2])
  }

  if (col - 2 >= 0) {
    if (row + 1 < 8 && !board[row+1][col-2]) moves.push([row+1, col-2])
    if (row - 1 >= 0 && !board[row-1][col-2]) moves.push([row-1, col-2])
  }

  return {"moves": moves, "takes": takes}
}

/**
 * Calculate the different moves possible for a rook
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {number} row - On what row is the rook 
 * @param {number} col - On what column is the rook
 * @param {boolean} color - True -> white piece, False -> black piece
 * @returns {JSON} - An object containing an array of position you can move to with and without taking a piece
 */
function calc_rook(board, row, col, color) {
  let moves = [] // List of possible moves without taking a piece
  let takes = [] // List of possible moves taking a piece

  for (let i = 1; i < 8; i++) {
    if (row + i < 8) {
      if (!board[row+i][col]) moves.push([row + i, col])
    }
    if (row - i >= 0) {
      if (!board[row-i][col]) moves.push([row - i, col])
    }
    if (col + i < 8) {
      if (!board[row][col+i]) moves.push([row, col + i])
    }
    if (col - i >= 0) {
      if (!board[row][col-i]) moves.push([row, col - i])
    }
  }

  return {"moves": moves, "takes": takes}
}

/**
 * Calculate the different moves possible for a pawns
 *
 * @param {Array} board - 8x8 matrix representing the board
 * @param {number} row - On what row is the pawns 
 * @param {number} col - On what column is the pawns
 * @param {boolean} color - True -> white piece, False -> black piece
 * @returns {JSON} - An object containing an array of position you can move to with and without taking a piece
 */
function calc_pawn(board, row, col, color) {
  let moves = [] // List of possible moves without taking a piece
  let takes = [] // List of possible moves taking a piece

  if (color && row - 1 >= 0) {
    if (!board[row-1][col]) moves.push([row-1, col])
    if (row == 6 && !board[row-2][col]) moves.push([row-2, col])
  } else if (row + 1 < 8) {
    if (!board[row+1][col]) moves.push([row+1, col])
    if (row == 1 && !board[row+2][col]) moves.push([row+2, col])
  }

  return {"moves": moves, "takes": takes}
}

