import {Matrix} from "../model/matrix";
import fs, {WriteStream} from "fs";

export class FileUtils {

    matrixToFile(matrix: Matrix): WriteStream {
        const stream: WriteStream = fs.createWriteStream("./result.txt");

        for (let i: number = 0; i < matrix.rowsCount; i++) {
            stream.write(matrix.getRow(i).toString() + "\n", (err) =>  {console.log('error', err);});
        }
        return stream;
    }

    readMatrixFromFile(filePath: string): Matrix {
        const data: string[] = fs.readFileSync(filePath).toString().split("\n");

        const matrix: Matrix = new Matrix(data.length - 1, data[0].split(",").length);

        for (let i: number = 0; i < data.length - 1; i++) {
            const row: number[] = data[i].split(",").map(value => parseInt(value, 10));
            matrix.replaceRow(i, row);
        }

        return matrix;
    }
}