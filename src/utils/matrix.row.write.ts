import {Writable} from "stream";

import fs from "fs";
import {MatrixRow} from "../model/matrix.row";

export class MatrixRowWrite extends Writable {

    filePath: string;

    constructor(filePath: string) {
        super({objectMode: true});
        this.filePath = filePath;
    }

    _write(chunk: MatrixRow, encoding: BufferEncoding, callback: (error?: (Error | null)) => void) {
        if (!fs.existsSync(this.filePath)) {
            console.log("write chunk: " + chunk.elements);
            fs.writeFileSync(this.filePath, chunk.elements + '\n');
            callback();
        } else {
            console.log("write chunk: " + chunk.elements);
            fs.appendFileSync(this.filePath, chunk.elements + '\n');
            callback();
        }
    }
}