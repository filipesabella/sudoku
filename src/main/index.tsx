import { Cell, Game, ValidNumber } from './Game';
import { Timer } from './Timer';

const sudoku = require('sudoku');

// all this because of the way we're dealing with the Timer, in which we don't
// want to re-render the whole board every second just to update the timer, as
// it'd lag the game.
function initialRender(game: Game) {
  const root = document.getElementById('root')!
  root.innerHTML = '';
  root.appendChild(headerContainer(game));
  root.appendChild(boardContainer(game));
  root.appendChild(controlsContainer(game));
  root.appendChild(numpadContainer());

  Timer.start();

  const setCellSize = () => root.style.setProperty('--cell-size',
    Math.min((document.body.clientWidth / 9) - 3, 60) + 'px');
  window.addEventListener('resize', setCellSize);
  setCellSize();
}

function renderGame(game: Game) {
  const root = document.getElementById('root')!
  root.replaceChild(
    boardContainer(game),
    root.querySelector('.board')!);
  root.replaceChild(
    controlsContainer(game),
    root.querySelector('.controls')!);
}

function headerContainer(game: Game): HTMLElement {
  const header = document.createElement('div');
  header.className = 'header';

  const difficultyContainer = document.createElement('div');
  difficultyContainer.className = 'difficulty';
  difficultyContainer.innerHTML = `Difficulty: ${game.difficulty}`;
  header.appendChild(difficultyContainer);

  const timerContainer = document.createElement('div');
  timerContainer.id = 'timer';
  header.appendChild(timerContainer);

  return header;
}

function boardContainer(game: Game): HTMLElement {
  const board = document.createElement('table');
  board.className = 'board';

  if (game.won) {
    board.classList.add('win');
  }

  const selectedCell = game.selectedCell();

  if (selectedCell && selectedCell.shownNumber()) {
    board.classList.add('selected-' + selectedCell.shownNumber());
  }

  const rows = game.cells.reduce((trs, cell, index) => {
    const rowIndex = Math.floor(index / 9) + 1;
    const colIndex = Math.floor(index % 9) + 1;

    const cellContainer = document.createElement('td');
    cellContainer.className = 'cell';
    cellContainer.dataset.row = String(rowIndex);
    cellContainer.dataset.col = String(colIndex);

    if (cell.shownNumber()) {
      cellContainer.classList.add('number-' + cell.shownNumber());
    }

    // when a cell is selected, highlight the row a column
    if (selectedCell &&
      (
        rowIndex === selectedCell.rowIndex() ||
        colIndex === selectedCell.columnIndex()
      )) {
      cellContainer.classList.add('highlighted');
    }

    if (cell.valid === false) {
      cellContainer.classList.add('invalid');
    }

    if (cell.selected) {
      cellContainer.classList.add('selected');
    }

    if (cell.revealed) {
      cellContainer.classList.add('revealed');
      cellContainer.innerHTML = String(cell.realValue);
    } else if (cell.placeholders) {
      const placeholdersContainer = document.createElement('div');
      placeholdersContainer.classList.add('placeholders');

      cell.placeholders.forEach(p => {
        const placeholderContainer = document.createElement('div');
        placeholderContainer.style.gridArea = 'a' + String(p);
        placeholderContainer.innerHTML = String(p);
        placeholderContainer.classList.add('number-' + p);
        placeholdersContainer.appendChild(placeholderContainer);
      })
      cellContainer.appendChild(placeholdersContainer);
    } else if (cell.playerValue) {
      cellContainer.classList.add('player-value');
      cellContainer.innerHTML = String(cell.playerValue);
    }

    const tr = trs[trs.length - 1];
    tr.appendChild(cellContainer);

    const newRow = colIndex === 9;
    return newRow ? trs.concat(document.createElement('tr')) : trs;
  }, [document.createElement('tr')] as HTMLElement[]);

  rows.forEach(r => board.appendChild(r));

  return board;
}

function controlsContainer(game: Game): HTMLElement {
  const controls = document.createElement('div');
  controls.className = 'controls';

  const refreshButton = button(
    reload,
    `<svg viewBox="0 0 24 24">
      <path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698
        0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518
        2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4
        5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059
        5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443
        3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z"/>
    </svg>`
  );
  refreshButton.classList.add('refresh');
  controls.appendChild(refreshButton);

  controls.appendChild(button(
    undo,
    `<svg viewBox="0 0 30 31">
      <path d="M13.71 2.46a1 1 0 01.14 1.32l-.08.1-2.15 2.32 3.41.02a10 10 0
        11-10 10 1 1 0 112 0 8 8 0 108.25-8h-.25l-3.48-.02 2.28 2.53a1 1 0 01.01
        1.32l-.09.1a1 1 0 01-1.32 0l-.09-.08-3.76-4.18a1 1 0 01-.07-1.25l.08-.1
        3.7-4.02a1 1 0 011.42-.06z"></path>
    </svg>`
  ));

  const placeholderButton = button(
    togglePlaceholderMode,
    `<svg viewBox="0 0 30 31">
      <path d="M25.43 4.76a5.42 5.42 0 01.19 7.52l-.18.2-13.5
        13.48a.91.91 0 01-1.21.08l-.1-.08-5.07-5.08-.59 4.34 3.25-.44c.44-.05.84.2
        1 .58l.03.11.02.11c.06.47-.24.91-.7 1.03l-.1.02-4.45.6a.94.94 0
        01-.79-.27.92.92 0 01-.26-.65v-.13l1-7.4a.92.92 0 01.19-.44l.08-.09L17.71
        4.76a5.45 5.45 0 017.72 0zm.35 20.08a1 1 0 110 2h-8.7a1 1 0
        010-2h8.7zM21.4 10.18L9.43 22.13 11.3
        24l11.95-11.95-1.86-1.86zm-3.23-3.23L6.2 18.91l1.92 1.91L20.07
        8.86l-1.9-1.9zm3.42-1.93c-.69 0-1.35.2-1.92.56l-.15.1 5.01 5
        .1-.14c.33-.5.51-1.09.55-1.7l.01-.22a3.58 3.58 0 00-3.6-3.6z"></path>
  </svg>`);
  placeholderButton.classList.add(game.placeholderMode ? 'active' : 'a');
  controls.appendChild(placeholderButton);

  controls.appendChild(button(
    erase,
    `<svg viewBox="0 0 30 31">
      <path fill-rule="evenodd" d="M27.13 25.11a1 1 0 01.12
        2h-6.9a1 1 0 01-.11-2H27.13zM21.48 4.08l.17.14.16.15 3.76 3.76a4 4 0
        01.15 5.5l-.15.16-11.32 11.32h2.04a1 1 0 011 .89v.11a1 1 0 01-.88 1H6.52a3
        3 0 01-1.98-.74l-.14-.14-2.23-2.22a4 4 0 01-.15-5.5l.15-.16L16.15 4.37a4 4
        0 015.33-.29zm-11.52 9.3l-6.38 6.38a2 2 0 00-.11 2.7l.11.13 2.23 2.23a1 1
        0 00.58.28l.13.01h4.9l5.13-5.13-6.59-6.6zm7.87-7.82l-.14.1-.13.13-6.18
        6.18 6.59 6.6 6.19-6.2a2 2 0 00.11-2.7l-.11-.12-3.77-3.76a2 2 0
        00-2.56-.22z"></path>
  </svg>`));

  return controls;
}

function numpadContainer() {
  const container = document.createElement('div');
  container.className = 'numpad';

  [1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(n => {
    const numContainer = document.createElement('div');
    numContainer.innerHTML = String(n);
    numContainer.onclick = () => numberPressed(n as ValidNumber);
    container.appendChild(numContainer);
  });

  return container;
}

function button(action: () => void, svg: string): HTMLElement {
  const button = document.createElement('div');
  button.className = 'button';
  button.innerHTML = svg;
  button.onclick = action;
  return button;
}

function newGame(): Game {
  const puzzle = sudoku.makepuzzle() as number[];

  // 0 = easiest, 5 = hardest
  const difficulty = sudoku.ratepuzzle(puzzle, 4);

  // the library returns null | 0-8
  const solved = (sudoku.solvepuzzle(puzzle) as number[])
    .map(n => n + 1) as ValidNumber[];

  const cells = solved.map((n, i) =>
    new Cell(i, n, puzzle[i] !== null, null, null));
  return new Game(false, cells, false, difficulty, []);
}

let game = newGame();

document.onclick = e => {
  const findCell = (e: HTMLElement, selector: string) =>
    e.classList.contains('cell') && e.tagName === 'TD'
      ? e
      : e.parentElement
        ? findCell(e.parentElement, selector)
        : null;

  const cell = findCell(e.target as HTMLElement, 'cell');
  if (cell) {
    const { row, col } = cell.dataset;
    toggleSelectedCell(parseInt(row!), parseInt(col!));
  }
};

document.onkeyup = e => {
  if (e.key.match(/[1-9]/)) {
    numberPressed(parseInt(e.key) as ValidNumber);
  } else if (e.key.match(/^(1|2|3|q|w|e|a|s|d)$/) && !e.ctrlKey) {
    const m: { [key: string]: ValidNumber } = {
      '1': 1,
      '2': 2,
      '3': 3,
      'q': 4,
      'w': 5,
      'e': 6,
      'a': 7,
      's': 8,
      'd': 9,
    };

    const n = m[e.key];
    m && numberPressed(n);
  } else if (e.key === 'z') {
    undo();
  } else if (e.key === 'x') {
    togglePlaceholderMode();
  } else if (e.key === 'c') {
    erase();
  }
};

const numberPressed = (n: ValidNumber) => {
  game = game.numberPressed(n);
  renderGame(game);
};

const toggleSelectedCell = (row: number, col: number) => {
  game = game.toggleSelectedCell(row, col);
  renderGame(game);
};

const togglePlaceholderMode = () => {
  game = game.togglePlaceholderMode();
  renderGame(game);
}

const erase = () => {
  game = game.eraseSelected();
  renderGame(game);
}

const undo = () => {
  game = game.undo();
  renderGame(game);
}

const reload = () => {
  // avoid accidental taps
  const shouldNotConfirm = game.won || !game.hasBeenPlayed();
  if (shouldNotConfirm || confirm('Are you sure?')) {
    game = newGame();
    initialRender(game);
    renderGame(game);
  }
}

initialRender(game);

