// import { Node, Tree } from './binary-search';

let Node = (value) => {
  return { data: value, left: null, right: null };
};

const Board = (boardSize = 8) => {
  const size = boardSize;

  const buildBoard = () => {
    const boardWrapper = document.createElement('div');
    boardWrapper.setAttribute('id', 'board');
    document.body.appendChild(boardWrapper);

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        (row % 2 === 0 && col % 2 === 1) || (row % 2 === 1 && col % 2 === 0)
          ? cell.classList.add('black')
          : cell.classList.add('white');
        cell.classList.add('cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);
        boardWrapper.appendChild(cell);
      }
    }
  };

  const targetCell = (cell) => {
    const target = document.querySelector(`.cell[data-row="${cell[0]}"][data-col="${cell[1]}"]`);
    target.classList.add('target');
  };

  buildBoard();

  return { targetCell };
};

const Knight = (startRow = 0, startCol = 0) => {
  const row = startRow;
  const col = startCol;

  const possibleMoves = () => {
    const options = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    const moves = options
      .map((move) => [row + move[0], col + move[1]])
      .filter((move) => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8);
    console.table(moves);
    return moves;
  };

  return { row, col, possibleMoves };
};

const board = Board(8);
board.targetCell([1, 3]);
const knight = Knight(1, 3);
knight.possibleMoves();
