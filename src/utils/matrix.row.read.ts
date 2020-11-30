import {Readable} from "stream";
import {Matrix} from "../model/matrix";
import {MatrixRow} from "../model/matrix.row";

export class MatrixRowRead extends Readable {

    sourceMatrix: Matrix;
    currentRow: number;

    constructor(matrix: Matrix) {
        super({objectMode : true});

        this.sourceMatrix = matrix;
        this.currentRow = 0;
    }

    _read() {
        if (this.currentRow < this.sourceMatrix.rowsCount) {
            console.log("read row " + this.sourceMatrix.getRow(this.currentRow));
            this.push(new MatrixRow(this.currentRow, this.sourceMatrix.getRow(this.currentRow)));
            this.currentRow++;
        } else {
            this.push(null);
        }
    }
}