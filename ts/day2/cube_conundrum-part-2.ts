/**
 * You're launched high into the atmosphere! The apex of your trajectory just barely reaches the surface of a large island floating in the sky. You gently land in a fluffy pile of leaves. It's quite cold, but you don't see much snow. An Elf runs over to greet you.

 * The Elf explains that you've arrived at Snow Island and apologizes for the lack of snow. He'll be happy to explain the situation, but it's a bit of a walk, so you have some time. They don't get many visitors up here; would you like to play a game in the meantime?

 * As you walk, the Elf shows you a small bag and some cubes which are either red, green, or blue. Each time you play this game, he will hide a secret number of cubes of each color in the bag, and your goal is to figure out information about the number of cubes.

 * To get information, once a bag has been loaded with cubes, the Elf will reach into the bag, grab a handful of random cubes, show them to you, and then put them back in the bag. He'll do this a few times per game.

 * You play several games and record the information from each game (your puzzle input). Each game is listed with its ID number (like the 11 in Game 11: ...) followed by a semicolon-separated list of subsets of cubes that were revealed from the bag (like 3 red, 5 green, 4 blue).

 * For example, the record of a few games might look like this:

 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 * Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
 * Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
 * Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
 * Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
 * In game 1, three sets of cubes are revealed from the bag (and then put back again). The first set is 3 blue cubes and 4 red cubes; the second set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is only 2 green cubes.

 * The Elf would first like to know which games would have been possible if the bag contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

 * In the example above, games 1, 2, and 5 would have been possible if the bag had been loaded with that configuration. However, game 3 would have been impossible because at one point the Elf showed you 20 red cubes at once; similarly, game 4 would also have been impossible because the Elf showed you 15 blue cubes at once. If you add up the IDs of the games that would have been possible, you get 8.

 * Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?
 */

// - cubos vermelhos, verdes ou azuis
// - Cada vez que você jogar este jogo, ele esconderá um número secreto de cubos de cada cor na sacola, e seu objetivo é descobrir informações sobre o número de cubos.
// - Você joga vários jogos e registra as informações de cada jogo
// - Cada jogo é listado com seu número de identificação (Game 11: 3 red, 5 green, 4 blue)
// - O Elfo gostaria primeiro de saber quais jogos seriam possíveis se a sacola contivesse apenas 12 cubos vermelhos, 13 cubos verdes e 14 cubos azuis ?

/**
 * Determine quais jogos seriam possíveis se a sacola estivesse carregada com apenas 12 cubos vermelhos,
 * 13 cubos verdes e 14 cubos azuis. Qual é a soma dos IDs desses jogos?
 */

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
        })

        let cubes = {
            red: 0,
            green: 0,
            blue: 0
        }

        possibleGames.forEach((item) => {
            switch (item.color) {
                case 'red':
                    cubes.red = Math.max(cubes.red, Number(item.quantity))
                    break;
                case 'green':
                    cubes.green = Math.max(cubes.green, Number(item.quantity))
                    break;
                case 'blue':
                    cubes.blue = Math.max(cubes.blue, Number(item.quantity))
                    break;
                default:
                    break;
            }
        })

        let amountOfCubes = cubes.red * cubes.green * cubes.blue

        return [...acc, amountOfCubes]

    }, [] as any)

    console.log(possible)
    return possible.reduce((acc: number, item: string) => acc + Number(item), 0)
}

console.log(cubeConundrum(day2))
// console.log(cubeConundrum('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'))