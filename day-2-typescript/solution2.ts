import { Round, Game, parseGames, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

function solution(input: string) {
    const games = parseGames(input)

    let res = games.reduce((total, game) => {
        const maxValueInGame = game.reduce((maxBalls, round) => {
            return {
                "blue": Math.max(maxBalls.blue, round.blue),
                "red": Math.max(maxBalls.red, round.red),
                "green": Math.max(maxBalls.green, round.green)
            }
        }, {"blue": 0, "red": 0, "green": 0})
        return total + Object.values(maxValueInGame).reduce((acc, val) => acc * val, 1)
    }, 0)
    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)