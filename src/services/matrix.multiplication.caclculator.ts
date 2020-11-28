import {Matrix} from "../model/matrix";

export class MatrixMultiplicationCalculator {

    multiplyMatrices(firstMatrix: Matrix, secondMatrix: Matrix): Matrix {
        const result: Matrix = new Matrix(firstMatrix.rowsCount, secondMatrix.columnsCount);


        return result;
    }
}