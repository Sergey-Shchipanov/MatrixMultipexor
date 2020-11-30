import express, { Request, Response } from "express";
import {MatrixGenerator} from "./services/matrix.generator";
import {FileUtils} from "./utils/file.utils";
import {MatrixMultiplicationCalculator} from "./services/matrix.multiplication.caclculator";
import {Matrix} from "./model/matrix";

const app = express()

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello World!");
})

const utils: FileUtils = new FileUtils();
const generator: MatrixGenerator = new MatrixGenerator();
const calculator: MatrixMultiplicationCalculator = new MatrixMultiplicationCalculator();

const matrixLeft: Matrix = new Matrix(2, 2);
matrixLeft.replaceRow(0, [1, 2]);
matrixLeft.replaceRow(1, [3, 4]);


const matrixRight: Matrix = new Matrix(2, 2);
matrixRight.replaceRow(0, [1, 0]);
matrixRight.replaceRow(1, [0, 1]);

let resultMatrix: Matrix;

calculator.multiplyMatrices(matrixLeft, matrixRight).on('finish', () => {
    resultMatrix = utils.readMatrixFromFile("./calculationResult.txt");
    for (let i: number = 0; i < resultMatrix.rowsCount; i++) {
        console.log(resultMatrix.getRow(i).toString());
    }});




app.listen(8000);