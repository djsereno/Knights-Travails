// let Move = (cell, predecessor = null) => {
//   return { cell, predecessor };
// };

const Board = (boardSize = 8) => {
  const size = boardSize;
  const boardWrapper = document.createElement('div');
  let originElem;
  let targetElem;
  let stepElems = [];

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
        cell.addEventListener('contextmenu', handleClick);
        boardWrapper.appendChild(cell);
      }
    }
  };

  const getCell = (cell) => {
    let row, col;
    if (typeof cell === 'object') [row, col] = cell;
    if (typeof cell === 'string') [row, col] = cell.split(',').map((i) => +i);
    return document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  };

  const setCurrentCell = (cell) => {
    if (originElem) originElem.classList.remove('current');
    originElem = getCell(cell);
    originElem.classList.add('current');
  };

  const setTargetCell = (cell) => {
    if (targetElem) targetElem.classList.remove('target');
    targetElem = getCell(cell);
    targetElem.classList.add('target');
  };

  const setStepCells = (cells) => {
    stepElems.forEach((cell) => {
      cell.classList.remove('step');
      cell.innerText = '';
    });
    stepElems = cells.map(getCell);
    stepElems.forEach((cell, i) => {
      cell.innerText = i;
      if (cell.classList.contains('current') || cell.classList.contains('target')) return;
      cell.classList.add('step');
    });
  };

  buildBoard();

  return { setCurrentCell, setTargetCell, setStepCells };
};

const Knight = () => {
  let originRow, originCol;
  let targetRow, targetCol;

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

  const setOrigin = (row, col) => ([originRow, originCol] = [row, col]);
  const setTarget = (row, col) => ([targetRow, targetCol] = [row, col]);
  const getOrigin = () => {
    if (originRow === undefined || originCol === undefined) return null;
    return [originRow, originCol];
  };
  const getTarget = () => {
    if (targetRow === undefined || targetCol === undefined) return null;
    return [targetRow, targetCol];
  };

  const possibleMoves = (origin = [originRow, originCol]) => {
    const moves = movement
      .map((move) => [origin[0] + move[0], origin[1] + move[1]])
      .filter((move) => checkValidMove(move));
    return moves;
  };

  const knightMoves = (start = [originRow, originCol], end = [targetRow, targetCol]) => {
    if (!checkValidMove(start) || !checkValidMove(end)) return [];

    const queue = [start];
    const visited = new Map();
    visited.set(start.toString(), 'ORIGIN');
    while (!visited.has(end.toString())) {
      let current = queue.shift();
      const moves = possibleMoves(current).filter((cell) => !visited.has(cell.toString()));
      moves.forEach((cell) => visited.set(cell.toString(), current.toString()));
      queue.push(...moves);
    }

    let path = [end.toString()];
    let current = end.toString();
    while (current !== start.toString()) {
      path.unshift(visited.get(current));
      current = visited.get(current);
    }
    console.log(`You made it in ${path.length} moves!  Here's your path:`);
    path.forEach((cell) => console.log(`[${cell}]`));

    return path;
  };

  return { setOrigin, setTarget, getOrigin, getTarget, possibleMoves, knightMoves };
};

function checkValidMove(move) {
  const row = move[0];
  const col = move[1];
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function handleClick(event) {
  event.preventDefault();
  const row = +event.currentTarget.getAttribute('data-row');
  const col = +event.currentTarget.getAttribute('data-col');

  if (event.button === 0) {
    board.setCurrentCell([row, col]);
    knight.setOrigin(row, col);
  } else if (event.button === 2) {
    board.setTargetCell([row, col]);
    knight.setTarget(row, col);
  }

  if (knight.getOrigin() && knight.getTarget()) {
    const moves = knight.knightMoves();
    board.setStepCells(moves);
  }
}

const board = Board(8);
const knight = Knight(5, 5);
