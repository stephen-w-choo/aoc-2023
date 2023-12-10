import { 
    parseInput,
    Direction,
    DIRECTION_MAPPER,
    getNextDirection,
    invertDirection,
    runSolution 
} from './common'

const INPUT_FILE_PATH = 'input.txt'

function traverse(
    previousDirection: Direction, 
    currentPoint: [number, number], 
    currentStep: number,
    grid: (string | number)[][],
    seen: Set<[number, number]>    
): number {
    let [y, x] = currentPoint
    let currentTerrain = grid[y][x]
    // grid[y][x] = currentStep
    seen.add(currentPoint)

    if (currentTerrain == "." || typeof currentTerrain == "number" || currentTerrain == "S") {
        return currentStep
    }

    if (typeof currentTerrain == "string") {
        let nextDirection = getNextDirection(currentTerrain, previousDirection)
        if (nextDirection) {
            
            let nextPoint: [number, number] = 
                [currentPoint[0] + DIRECTION_MAPPER[nextDirection][0], currentPoint[1] + DIRECTION_MAPPER[nextDirection][1]]        
            return traverse(
                invertDirection(nextDirection),
                nextPoint,
                currentStep + 1,
                grid,
                seen,
            )
        }
    }

    return currentStep
}

function solution(input: string) {
    const grid = parseInput(input)
    const seen: Set<[number, number]> = new Set()

    const H = grid.length
    const W = grid[0].length
    
    let startPoint: [number, number]
    
    // get the starting point
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (grid[i][j] == "S") {
                startPoint = [i, j]
            }
        }
    }

    let adjacentDirections = DIRECTION_MAPPER
    let res = 0

    for (let adjacentDirection in adjacentDirections) {
        let adjacent = adjacentDirections[adjacentDirection as Direction]
        let currentPoint = [startPoint!![0] + adjacent[0], startPoint!![1] + adjacent[1]]
        let maxSteps = traverse(
            invertDirection(adjacentDirection as Direction),
            currentPoint as [number, number],
            1,
            grid,
            seen
        )
        res = Math.max(res, maxSteps)
    }

    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)

