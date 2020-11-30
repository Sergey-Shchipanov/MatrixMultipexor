import {Matrix} from "../model/matrix";
import fs, {WriteStream} from "fs";

export class FileUtils {

    matrixToFile(matrix: Matrix): WriteStream {
        const stream: WriteStream = fs.createWriteStream("./result.txt");

        for (let i: number = 0; i < matrix.rowsCount; i++) {
            stream.write(matrix.getRow(i).toString() + "\n", (err) =>  {if (err) console.log('error', err);});
        }
        stream.end();
        return stream;
    }

    readMatrixFromFile(filePath: string): Matrix {
        let data: string[] = fs.readFileSync(filePath).toString().split("\n");
        data = data.filter(row => row && row !== "");

        const matrix: Matrix = new Matrix(data.length, data[0].split(",").length);

        for (let i: number = 0; i < data.length; i++) {
            const row: number[] = data[i].split(",").map(value => parseInt(value, 10));
            matrix.replaceRow(i, row);
        }

        return matrix;
    }
}