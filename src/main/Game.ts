import { ImmutableSet } from "./ImmutableSet";

export type ValidNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Placeholders = ImmutableSet<ValidNumber>;

const validNumbers: ValidNumber[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export class Game {
  static newGame(cells: Cell[], difficulty: number): Game {
    const cellsWithPlaceholdes = cells.map(cell => {
      const neighbours = new Set(cells
        .filter(c => cell !== c
          && c.revealed && c.realValue
          && isRelevant(cell, c))
        .map(c => c.realValue));

      const placeholders = validNumbers.filter(
        n => !neighbours.has(n as ValidNumber))

      return cell.populatePlaceholders(new ImmutableSet(placeholders));
    });

    return new Game(false, cellsWithPlaceholdes, false, difficulty, []);
  }

  constructor(
    readonly won: boolean,
    readonly cells: Cell[],
    readonly placeholderMode: boolean,
    readonly difficulty: number,
    readonly previousStates: Game[]) {}

  toggleSelectedCell(row: number, col: number): Game {
    const index = --row * 9 + --col;
    return new Game(
      this.won,
      this.cells.map((c, i) => i === index
        ? c.toggleSelected()
        : c.deselect()),
      this.placeholderMode,
      this.difficulty,
      this.previousStates,
    );
  }

  numberPressed(n: ValidNumber): Game {
    if (!this.selectedCell()) return this;

    const cells = validate(
      clearUpPlaceholders(
        this.placeholderMode,
        this.cells.map(c => c.numberPressed(n, this.placeholderMode))
      ));

    const allFilledUp = () => !cells.find(c => !c.revealed && !c.playerValue);
    const allCellsValid = () => !cells.find(c => !c.valid);
    const won = allFilledUp() && allCellsValid();

    return new Game(
      won,
      cells,
      this.placeholderMode,
      this.difficulty,
      this.previousStates.concat(this),
    );
  }

  eraseSelected(): Game {
    return new Game(
      this.won,
      this.cells.map(c => c.selected ? c.erase() : c),
      this.placeholderMode,
      this.difficulty,
      this.previousStates.concat(this),
    );
  }

  togglePlaceholderMode(): Game {
    return new Game(
      this.won,
      this.cells,
      !this.placeholderMode,
      this.difficulty,
      this.previousStates,
    );
  }

  undo(): Game {
    if (this.previousStates.length > 0) {
      const previous = [...this.previousStates].pop()!; // mutation
      return previous;
    } else {
      return this;
    }
  }

  selectedCell(): Cell | null {
    return this.cells.find(c => c.selected) || null;
  }

  hasBeenPlayed(): boolean {
    return !!this.cells.find(c => c.playerValue !== null);
  }
}

// when placing a number on a cell, clear up placeholders with that
// number placed on the same row, col, and quadrant
function clearUpPlaceholders(placeholderMode: boolean, cellsToClearUp: Cell[])
  : Cell[] {
  if (placeholderMode) {
    return cellsToClearUp;
  }

  const selectedCell = cellsToClearUp.find(c => c.selected)!;

  return cellsToClearUp.map(cell =>
    isRelevant(selectedCell, cell)
      ? cell.removePlaceholder(selectedCell.playerValue!)
      : cell);
}

function validate(cellsToValidate: Cell[]): Cell[] {
  // assumes that the only change happened on the selected cell, instead
  // of sweeping and validating all cells
  const selectedCell = cellsToValidate.find(c => c.selected)!;

  return selectedCell.playerValue
    ? cellsToValidate.map(cell =>
      isRelevant(selectedCell, cell)
        ? new Cell(
          cell.index,
          cell.realValue,
          cell.revealed,
          cell.playerValue,
          cell.placeholders,
          cell.selected,
          cell.shownNumber() !== selectedCell.playerValue,
        )
        : cell)
    : cellsToValidate;
}

// returns if `other` is in the same line or quadrant as `target`
function isRelevant(target: Cell, other: Cell): boolean {
  return target.index !== other.index && (
    target.rowIndex() === other.rowIndex()
    || target.columnIndex() === other.columnIndex()
    || inSameQuadrant(target, other));
}

function inSameQuadrant(a: Cell, b: Cell): boolean {
  const aRowQuadrant = Math.ceil(a.rowIndex() / 3);
  const aColQuadrant = Math.ceil(a.columnIndex() / 3);

  const bRowQuadrant = Math.ceil(b.rowIndex() / 3);
  const bColQuadrant = Math.ceil(b.columnIndex() / 3);

  return aRowQuadrant === bRowQuadrant
    && aColQuadrant === bColQuadrant;
}

export class Cell {
  constructor(
    readonly index: number,
    readonly realValue: ValidNumber,
    readonly revealed: boolean,
    readonly playerValue: ValidNumber | null,
    readonly placeholders: Placeholders | null,
    readonly selected: boolean = false,
    readonly valid: boolean = true) { }

  toggleSelected(): Cell {
    return new Cell(
      this.index,
      this.realValue,
      this.revealed,
      this.playerValue,
      this.placeholders,
      !this.selected);
  }

  deselect(): Cell {
    return this.selected ? this.toggleSelected() : this;
  }

  populatePlaceholders(placeholders: Placeholders): Cell {
    return new Cell(
      this.index,
      this.realValue,
      this.revealed,
      null,
      placeholders,
      this.selected);
  }

  numberPressed(n: ValidNumber, placeholderMode: boolean): Cell {
    if (!this.selected || this.revealed) {
      return this;
    } else {
      if (placeholderMode) {
        return new Cell(
          this.index,
          this.realValue,
          this.revealed,
          null,
          (this.placeholders || new ImmutableSet([])).toggle(n),
          this.selected);
      } else {
        return new Cell(
          this.index,
          this.realValue,
          this.revealed,
          this.playerValue === n ? null : n,
          null,
          this.selected);
      }
    }
  }

  removePlaceholder(toRemove: ValidNumber): Cell {
    return new Cell(
      this.index,
      this.realValue,
      this.revealed,
      this.playerValue,
      this.placeholders ? this.placeholders.filter(n => n !== toRemove) : null,
      this.selected);
  }

  erase(): Cell {
    return new Cell(
      this.index,
      this.realValue,
      this.revealed,
      null,
      new ImmutableSet([]),
      this.selected);
  }

  shownNumber(): number | null {
    return this.playerValue
      ? this.playerValue
      : this.revealed
        ? this.realValue
        : null;
  }

  rowIndex(): number {
    return Math.floor(this.index / 9) + 1;
  }

  columnIndex(): number {
    return Math.floor(this.index % 9) + 1;
  }
}
