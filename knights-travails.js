let Move = (cell, predecessor = null) => {
  return { cell, predecessor };
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

  const getCell = (cell) => {
    return document.querySelector(`.cell[data-row="${cell[0]}"][data-col="${cell[1]}"]`);
  };

  const setCurrentCell = (cell) => {
    getCell(cell).classList.add('current');
  };

  const setTargetCells = (cells) => {
    cells.forEach((cell) => {
      getCell(cell).classList.add('target');
    });
  };

  buildBoard();

  return { setCurrentCell, setTargetCells };
};

const Knight = (startRow = 0, startCol = 0) => {
  const row = startRow;
  const col = startCol;
  const movement = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];
  const currentCell = () => [row, col];

  const possibleMoves = (origin = [row, col]) => {
    const moves = movement
      .map((move) => [origin[0] + move[0], origin[1] + move[1]])
      .filter((move) => move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8);
    return moves;
  };

  const knightMoves = (end, start = [row, col]) => {
    const queue = [Move(start)];
    let moves;
    for (let i = 0; i < 5; i++) {
      let current = queue.shift();
      const options = possibleMoves(current.cell);
      moves = options
        .filter((option) => {
          if (!current.predecessor) return true;
          return option.toString() !== current.predecessor.toString();
        })
        .map((cell) => Move(cell, current.cell));
      queue.push(...moves);
    }
    console.log(queue);
  };

  return { row, col, possibleMoves, currentCell, knightMoves };
};

const board = Board(8);
const knight = Knight(4, 4);
board.setCurrentCell(knight.currentCell());
board.setTargetCells(knight.possibleMoves());

knight.knightMoves([5, 5]);
