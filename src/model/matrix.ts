export class Matrix {

    private readonly _matrix: number[][];
    private readonly _rowsCount: number;
    private readonly _columnsCount: number;

    constructor(rowCount: number, columnCount: number) {
        this._rowsCount = rowCount;
        this._columnsCount = columnCount;
        this._matrix = new Array<number[]>();
    }


    get rowsCount(): number {
        return this._rowsCount;
    }

    get columnsCount(): number {
        return this._columnsCount;
    }

    getElement(row: number, column: number): number {
        if (row >= this._rowsCount || column >= this._columnsCount) {
            throw new Error("Index out of bounds");
        }
        return this._matrix[row][column];
    }

    replaceRow(row: number, elements: number[]) {
        if (elements.length !== this._columnsCount) {
            throw new Error("Invalid number of elements");
        }
        this._matrix[row] = (elements);
    }

    getRow(row: number): number[] {
        if (row >= this._rowsCount) {
            throw new Error("Index out of bounds");
        }
        const resultRow: number[] = [];

        for (let i: number = 0; i < this._columnsCount; i++) {
            resultRow.push(this.getElement(row, i));
        }
        return resultRow;
    }

    getColumn(column: number): number[] {
        if (column >= this.columnsCount) {
            throw new Error("Index out of bounds");
        }
        const resultColumn: number[] = [];

        for (let i: number = 0; i < this._rowsCount; i++) {
            resultColumn.push(this.getElement(i, column));
        }
        return resultColumn;
    }
}