import {Matrix} from "../model/matrix";

export class MatrixGenerator {

    generateMatrix(rowCount: number, columnCount: number): Matrix {
        const matrix: Matrix = new Matrix(rowCount, columnCount);

        for (let i: number = 0; i < rowCount; i++) {
            const row: number[] = [];
            for (let j: number = 0; j < columnCount; j++) {
                row.push(Number((Math.random() * 10).toFixed(1)));
            }
            matrix.replaceRow(i, row);
        }
        return matrix;
    }
}