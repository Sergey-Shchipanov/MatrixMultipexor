import {Matrix} from "../model/matrix";
import {MatrixRowRead} from "../utils/matrix.row.read";
import {MatrixRowTransform} from "../utils/matrix.row.transform";
import {MatrixRowWrite} from "../utils/matrix.row.write";

export class MatrixMultiplicationCalculator {

    multiplyMatrices(firstMatrix: Matrix, secondMatrix: Matrix): MatrixRowWrite {
        const matrixRowReader: MatrixRowRead = new MatrixRowRead(firstMatrix);
        const matrixRowTransform: MatrixRowTransform = new MatrixRowTransform(secondMatrix);
        const matrixRowWriter: MatrixRowWrite = new MatrixRowWrite("./calculationResult.txt");

        matrixRowReader.pipe(matrixRowTransform).pipe(matrixRowWriter);

        return matrixRowReader.pipe(matrixRowTransform).pipe(matrixRowWriter);
    }
}