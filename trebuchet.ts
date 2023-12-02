import assert from "node:assert"
import { readFileSync } from "node:fs"
import path from "node:path"

type NumbersPositions = {
    index: number,
    numInWords: string
}

type NumbersMap = {
    [key: string]: number
}

let numbersMap: NumbersMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
}

let numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
let numbersInWords = Object.keys(numbersMap)

let matchElements = (calibrationValue: string, ...keys: string[]) => {
    let numberOfIndex = -1;
    const numbersPositions: NumbersPositions[] = keys.reduce((acc: NumbersPositions[], item) => {
        while ((numberOfIndex = calibrationValue.indexOf(item, numberOfIndex + 1)) !== -1) {
            acc.push({ index: numberOfIndex, numInWords: item });
        }
        return acc
    }, [])

    let sorted = numbersPositions.sort((a, b) => a.index - b.index)

    const [firstChar, lastChar] = [sorted[0].numInWords, sorted[sorted.length - 1].numInWords];

    let first = isNaN(+firstChar) ? String(numbersMap[firstChar]) : firstChar
    let last = isNaN(+lastChar) ? String(numbersMap[lastChar]) : lastChar

    return first + last;
}

const trebuchet = (str: string) => str
    .split(" ")
    .map((value) => matchElements(value, ...numbers, ...numbersInWords), [])
    .reduce((acc, item) => acc + Number(item), 0)


const day1 = readFileSync(path.resolve(__dirname, 'day1.txt'), 'utf8');

assert(trebuchet("1abc2 pqr3stu8vwx a1b2c3d4e5f treb7uchet") === 142, 'error');
assert(trebuchet(day1) === 54875, 'error'); // gold star
assert(trebuchet("tgkfk8ninestnk2eightoneeightwotcs") === 82, 'error');
assert(trebuchet("1abc2 pqr3stu8vwx a1b2c3d4e5f treb7uchet") === 142, 'error');
assert(trebuchet("two1nine eightwothree abcone2threexyz xtwone3four 4nineeightseven2 zoneight234 7pqrstsixteen") === 281, 'error');
assert(trebuchet("znmfvdlhvjtwo9three4tzjqcfcgnsevenccvnsjczlpm") === 27, 'error');
assert(trebuchet("eight226three5sevenhhxhqxns") === 87, 'error');
assert(trebuchet("jbtfkfourggc5zkc3nineninekv 379eight") === 87, 'error');
assert(trebuchet("nrtjrkkfour6fivefour7fivertjnxbbzg") === 45, 'err');