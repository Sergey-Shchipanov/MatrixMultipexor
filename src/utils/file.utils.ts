import {Matrix} from "../model/matrix";
import {WriteStream} from "fs";

export class FileUtils {

    matrixToFile(matrix: Matrix): WriteStream {
        const fs = require('fs');

        const stream: WriteStream = fs.createWriteStream("./result.txt");

        for (let i: number = 0; i < matrix.rowsCount; i++) {
            stream.write(matrix.getRow(i).toString() + "\n", (err) =>  {console.log('error', err);});
        }
        return stream;
    }
}