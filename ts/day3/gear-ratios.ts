import fs from "fs";
import path from "path";

const gearRatios = (str) => {
    const rows = str.split('\n');
    const matrix = rows.map(row => row.split(''));

    const symbols = new Set(['*', '#', '+', '$']);

    let sum = 0;
    console.log(matrix)

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (symbols.has(matrix[i][j])) {
                if (i > 0 && symbols.has(matrix[i - 1][j])) sum += parseInt(matrix[i - 1][j]);
                if (i < matrix.length - 1 && symbols.has(matrix[i + 1][j])) sum += parseInt(matrix[i + 1][j]);
                if (j > 0 && symbols.has(matrix[i][j - 1])) sum += parseInt(matrix[i][j - 1]);
                if (j < matrix[i].length - 1 && symbols.has(matrix[i][j + 1])) sum += parseInt(matrix[i][j + 1]);
            }
        }
    }

    return sum;
};

const filePath = path.resolve(__dirname, 'day3.txt');
const day3 = fs.readFileSync(filePath, 'utf8');

console.log(gearRatios(day3)); // Output: Soma dos números de peça
