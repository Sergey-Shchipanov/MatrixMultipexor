import express, { Request, Response } from "express";
import {MatrixGenerator} from "./services/matrix.generator";
import {FileUtils} from "./utils/file.utils";
import {MatrixMultiplicationCalculator} from "./services/matrix.multiplication.caclculator";
import {Matrix} from "./model/matrix";
import path from "path";
import fs from "fs";

const app = express()

const utils: FileUtils = new FileUtils();
const generator: MatrixGenerator = new MatrixGenerator();
const calculator: MatrixMultiplicationCalculator = new MatrixMultiplicationCalculator();
let leftMatrixPath: string;
let rightMatrixPath: string;

app.get('/matrix', (req, res) => {
    const matrix: Matrix = generator.generateMatrix(parseInt(req.query.rows.toString(), 10), parseInt(req.query.columns.toString(), 10));

    utils.matrixToFile(matrix).once('finish', () => {
       res.download("./result.txt")
    });
});

app.post('/upload', (req, res) => {
    if (fs.existsSync("./calculationResult.txt")) {
        fs.rmSync("./calculationResult.txt");
    }
    const Busboy = require('busboy');
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log("Saving file: " + filename);
        const saveTo: string = path.join((path.join(__dirname, "./" + filename)));
        if (fieldname === "left") {
            leftMatrixPath = saveTo;
        } else {
            rightMatrixPath = saveTo;
        }
        file.pipe(fs.createWriteStream(saveTo));
    });
    busboy.on('finish', () => {
        console.log("Uploading finished");
        res.sendStatus(200);
    });
    req.pipe(busboy);
});

app.get('/multiplication', (req, res) => {
    calculator.multiplyMatrices(utils.readMatrixFromFile(leftMatrixPath), utils.readMatrixFromFile(rightMatrixPath))
        .on('finish', () => {
            res.download("./calculationResult.txt");
        });
});


app.listen(8000).on("listening", () => {console.log("Connected!")});