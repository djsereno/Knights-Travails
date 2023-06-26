// let Move = (cell, predecessor = null) => {
//   return { cell, predecessor };
// };

const Board = (boardSize = 8) => {
  const size = boardSize;
  const boardWrapper = document.createElement('div');
  let currentCell;

  const buildBoard = () => {
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
        cell.addEventListener('click', handleClick);
        boardWrapper.appendChild(cell);
      }
    }
  };

  const handleClick = (event) => {
    const row = event.currentTarget.getAttribute('data-row');
    const col = event.currentTarget.getAttribute('data-col');
    setCurrentCell([row, col]);
  };

  const getCell = (cell) => {
    return document.querySelector(`.cell[data-row="${cell[0]}"][data-col="${cell[1]}"]`);
  };

  const setCurrentCell = (cell) => {
    if (currentCell) currentCell.classList.remove('current');
    currentCell = getCell(cell);
    currentCell.classList.add('current');
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
      .filter((move) => checkValidMove(move));
    return moves;
  };

  const knightMoves = (start = [row, col], end) => {
    if (!checkValidMove(start) || !checkValidMove(end)) return null;

    const queue = [start];
    const visited = new Map();
    visited.set(start.toString(), 'ORIGIN');
    // let i = 0;
    while (!visited.has(end.toString())) {
      let current = queue.shift();
      const moves = possibleMoves(current).filter((cell) => !visited.has(cell.toString()));
      moves.forEach((cell) => visited.set(cell.toString(), current.toString()));
      queue.push(...moves);
      // i++;
      // if (i > 50) return;
    }

    // console.log(queue, visited);

    let path = `[${end.toString()}]`;
    let current = end.toString();
    while (current !== start.toString()) {
      path = `[${visited.get(current)}] -> ${path}`;
      current = visited.get(current);
    }
    console.log(path);
  };

  return { row, col, possibleMoves, currentCell, knightMoves };
};

const checkValidMove = (move) => {
  const row = move[0];
  const col = move[1];
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

const board = Board(8);
const knight = Knight(5, 5);
board.setCurrentCell(knight.currentCell());
board.setTargetCells(knight.possibleMoves());

knight.knightMoves([5, 5], [5, 4]);
