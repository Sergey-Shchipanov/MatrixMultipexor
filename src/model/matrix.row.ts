export class MatrixRow {
    private _rowNumber: number;
    private _elements: number[];

    constructor(rowNumber: number, elements: number[]) {
        this._rowNumber = rowNumber;
        this._elements = elements;
    }

    get rowNumber(): number {
        return this._rowNumber;
    }

    get elements(): number[] {
        return this._elements;
    }
}