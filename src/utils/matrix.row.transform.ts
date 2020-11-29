import {Transform, TransformCallback} from "stream";
import {Matrix} from "../model/matrix";
import {MatrixRow} from "../model/matrix.row";

export class MatrixRowTransform extends Transform {

    rightMatrix: Matrix;

    constructor(matrix: Matrix) {
        super({objectMode: true});
        this.rightMatrix = matrix;
    }

    _transform(chunk: MatrixRow, encoding: BufferEncoding, callback: TransformCallback) {
        try {
            console.log("transform chunk: " + chunk.rowNumber + " " + chunk.elements);
            const result: number[] = [];


            for (let i: number = 0; i < this.rightMatrix.columnsCount; i++) {
                result.push(this.calculateElement(chunk.elements, this.rightMatrix.getColumn(i)));
            }
            callback(null, new MatrixRow(chunk.rowNumber, result));
        } catch (error) {
            console.log(error);
        }
    }

    calculateElement(row: number[], column: number[]): number {
        let result: number = 0;

        for (let i: number = 0; i < column.length; i++) {
            result += row[i] * column[i];
        }

        return result;
    }
}