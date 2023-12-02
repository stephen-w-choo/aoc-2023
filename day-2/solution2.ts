import { Round, Game, parseGames, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

function solution(input: string) {
    let res = 0

    const games = parseGames(input)

    for (let game of games) {
        let maxRed = 0
        let maxBlue = 0
        let maxGreen = 0

        for (let round of game) {
            maxRed = Math.max(maxRed, round.red)
            maxBlue = Math.max(maxBlue, round.blue)
            maxGreen = Math.max(maxGreen, round.green)
        }
        res += maxRed * maxBlue * maxGreen
    }
    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)