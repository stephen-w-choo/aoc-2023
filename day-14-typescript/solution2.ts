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

function transposeGridClockwise(grid: string[][]): string[][] {
    const oldH = grid.length
    const oldW = grid[0].length
    
    let newGrid: string[][] = Array.from({ length: oldW }, () => Array(oldH).fill(" "));

    grid.forEach((row, yIndex) => {
        row.forEach((position, xIndex) => {
            newGrid[xIndex][oldH - yIndex - 1] = position
        })
    })

    return newGrid
}

function advanceRocksInGrid(grid: string[][]) {
    // mutates the grid in place
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
}

function tallyLoad(grid: string[][]): number {
    return grid.reduce((accum1, line, yIndex) => {
        return accum1 + line.reduce((accum2, position) => {
            if (position == "O") {
                accum2 += grid.length - yIndex
            }
            return accum2
        }, 0)
    }, 0)
}

function solution(input: string) {
    let grid = input.split("\n")
        .map((line) => line.split(""))
        .filter((line) => line.length > 0)

    // we are going to use grid here as our source of truth and state



    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 4; j++) {
            // advance rocks then cycle
            advanceRocksInGrid(grid)
            // console.log(tallyLoad(grid))
            grid = transposeGridClockwise(grid)
        }
        console.log(`${i}, ${tallyLoad(grid)}`)
    }

    // look for cycles
}

runSolution(INPUT_FILE_PATH, solution)