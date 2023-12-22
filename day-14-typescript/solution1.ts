import { debug, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'
const DIRECTION: [number, number] = [-1, 0] // North

function isNextPositionEmpty(
    rockPosition: [number, number], 
    direction: [number, number], 
    grid: string[][]
): boolean {
    return (rockPosition[0] + direction[0] >= 0) &&
    (rockPosition[1] + direction[1] >= 0) &&
    (grid[rockPosition[0] + direction[0]][rockPosition[1] + direction[1]] == ".")
}

function nextPosition(
    rockPosition: [number, number], 
    direction: [number, number]
): [number, number] {
    return [rockPosition[0] + direction[0], rockPosition[1] + direction[1]]
}

function advanceRock(
    rockPosition: [number, number], 
    direction: [number, number], 
    grid: string[][]
) {
    while (isNextPositionEmpty(rockPosition, direction, grid)) {
        let [oldY, oldX] = rockPosition
        let newPosition = nextPosition(rockPosition, direction)
        let [newY, newX] = newPosition
        grid[oldY][oldX] = "."
        grid[newY][newX] = "O"
        rockPosition = newPosition
    }
}

function solution(input: string) {
    const grid = input.split("\n")
        .map((line) => line.split(""))

    // we are going to use grid here as our source of truth and state
    // mutable, passed by reference

    grid.forEach((row, i) => {
        row.forEach((position, j) => {
            if (position === "O") {
                advanceRock(
                    [i, j],
                    DIRECTION,
                    grid
                )
            }
        })
    })

    let res = grid.reduce((accum1, line, yIndex) => {
        return accum1 + line.reduce((accum2, position) => {
            if (position == "O") {
                accum2 += grid.length - yIndex
            }
            return accum2
        }, 0)
    }, 0)
    
    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)