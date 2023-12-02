import { Round, Game, parseGames, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

const MAX_ROUND = {
    "blue": 14,
    "green": 13,
    "red": 12
}

function checkifRoundIsPossible(currentRound: Round, expectedRound: Round): Boolean {
    if (currentRound.green > expectedRound.green ||
        currentRound.red > expectedRound.red ||
        currentRound.blue > expectedRound.blue) {
            return false
        }
    return true
}

function solution(input: string): string {
    let res = 0

    const games = parseGames(input)
    
    games.forEach((game, gameIndex) => {
        let isGamePossible = true
        
        game.forEach((round) => {
            let possible = checkifRoundIsPossible(round, MAX_ROUND)
            if (!possible) {
                isGamePossible = false
            }
        })
        if (isGamePossible) {
            res += gameIndex + 1
        }
    })
    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)