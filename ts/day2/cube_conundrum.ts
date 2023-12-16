import assert from "node:assert"
import { readFileSync } from "node:fs"
import path from "node:path"

const day2 = readFileSync(path.resolve(__dirname, 'day2.txt'), 'utf8');

const cubeConundrum = (str: string) => {
    let games = str.split('\n')
    let possible = games.reduce((acc, game) => {
        let [, id] = game.split(':').join('').split(' ')
        let [, colors] = game.split(':')
        let possibleGames = colors.split(';').join(',').split(',').map((item) => {
            let [quantity, color] = item.trim().split(' ')
            return { quantity, color }
        }).map((item) => {
            if (
                item.color === 'red' && Number(item.quantity) > 12 ||
                item.color === 'green' && Number(item.quantity) > 13 ||
                item.color === 'blue' && Number(item.quantity) > 14
            ) return { id, possible: false }
            return { id, possible: true }
        })

        let r2 = possibleGames.every((item) => item.possible === true)

        return r2 ? [...acc, id] : acc
    }, [] as any)
    return possible.reduce((acc: number, item: string) => acc + Number(item), 0)
}

assert(cubeConundrum(day2) === 2810, 'error');
assert(cubeConundrum("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green") === 1, 'error');

// expected 2810