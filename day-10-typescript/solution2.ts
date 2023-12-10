import { 
    debug,
    parseInput,
    Direction,
    DIRECTION_MAPPER,
    getNextDirection,
    invertDirection,
    runSolution 
} from './common'

const INPUT_FILE_PATH = 'input.txt'
const ADJACENTS = Object.values(DIRECTION_MAPPER)

function spaceFiller(
    grid: string[][],
    spaceOutside: [number],
    currentPoint: [number, number]
) {
    let [y, x] = currentPoint
    let currentTerrain = grid[y][x]

    if (currentTerrain == "O" || currentTerrain == "X") {
        return
    }

    currentTerrain == "O"

}

function markBoundary(
    previousDirection: Direction, 
    currentPoint: [number, number], 
    currentStep: number,
    grid: string[][],  
): number {
    let [y, x] = currentPoint
    let currentTerrain = grid[y][x]
    grid[y][x] = "X"

    if (currentTerrain == "." || currentTerrain == "X" || currentTerrain == "S") {
        return currentStep
    }

    if (typeof currentTerrain == "string") {
        let nextDirection = getNextDirection(currentTerrain, previousDirection)
        if (nextDirection) {
            let nextPoint: [number, number] = 
                [currentPoint[0] + DIRECTION_MAPPER[nextDirection][0], currentPoint[1] + DIRECTION_MAPPER[nextDirection][1]]        
            markBoundary(
                invertDirection(nextDirection),
                nextPoint,
                currentStep + 1,
                grid,
            )
        }
    }

    return currentStep
}

function solution(input: string) {
    const grid = parseInput(input)

    const H = grid.length
    const W = grid[0].length
    
    let startPoint: [number, number]
    
    // get the starting point
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (grid[i][j] == "S") {
                startPoint = [i, j]
                grid[i][j] = "X"
            }
        }
    }


    let adjacentDirections = DIRECTION_MAPPER
    let loopSize = 0

    // encircle
    for (let adjacentDirection in adjacentDirections) {
        let adjacent = adjacentDirections[adjacentDirection as Direction]
        let currentPoint = [startPoint!![0] + adjacent[0], startPoint!![1] + adjacent[1]]
        let maxSteps = markBoundary(
            invertDirection(adjacentDirection as Direction),
            currentPoint as [number, number],
            1,
            grid,
        )
        Math.max(loopSize, maxSteps)
    }

    debug(grid)

    const spaceOutside = [0]
    // fill the space outside of the loop


    return ""
}

runSolution(INPUT_FILE_PATH, solution)

