import { 
    debug,
    parseInput,
    Direction,
    DIRECTION_MAPPER,
    getNextDirection,
    invertDirection,
    runSolution, 
    PIPE_MAPPER
} from './common'

const INPUT_FILE_PATH = 'input.txt'
const ADJACENTS = Object.values(DIRECTION_MAPPER)
const PIPES = Object.keys(PIPE_MAPPER)

function tupleHash(tuple: [number, number]): string {
    return tuple[0].toString() + "///" + tuple[1].toString()
}

function unhashTuple(hash: string): [number, number] {
    const parts = hash.split("///");
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
}

function getInsideTile(currentTile: [number, number], previousDirection: Direction, nextDirection: Direction): [number, number][] | null {
    let [y, x] = currentTile
    // if going clockwise and on a straight tile, returns the inside tile to check
    if (previousDirection == "E" && nextDirection == "W") return [[y - 1, x]] 
    if (previousDirection == "W" && nextDirection == "E") return [[y + 1, x]] 
    if (previousDirection == "S" && nextDirection == "N") return [[y, x + 1]]
    if (previousDirection == "N" && nextDirection == "S") return [[y, x - 1]]
    // if going clockwise and on a curved tile, returns the 2 inside tiles to check
    if (previousDirection == "S" && nextDirection == "W") return [[y - 1, x], [y, x + 1]]
    if (previousDirection == "W" && nextDirection == "N") return [[y + 1, x], [y, x + 1]]
    if (previousDirection == "N" && nextDirection == "E") return [[y + 1, x], [y, x - 1]]
    if (previousDirection == "E" && nextDirection == "S") return [[y - 1, x], [y, x - 1]]
    return null
}

function spaceFiller(
    currentPoint: [number, number],
    boundary: Set<string>,
    seen: Set<string>,
    spaceOutside: [number]
) {
    let [y, x] = currentPoint

    if (boundary.has(tupleHash(currentPoint))) return
    if (seen.has(tupleHash(currentPoint))) return

    seen.add(tupleHash(currentPoint))

    spaceOutside[0] += 1

    for (let adjacent of ADJACENTS) {
        spaceFiller(
            [y + adjacent[0], x + adjacent[1]],
            boundary,
            seen,
            spaceOutside,
        )
    }
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
    let pointsOnLoop = new Set<string>
    let pointsInsideLoop = new Set<string>
    let seen = new Set<string>
    const spaceOutside: [number] = [0]

    const DIRECTION = "N"

    // get the boundary and the inner tile points
    let adjacent = adjacentDirections[DIRECTION]
    let currentPoint: [number, number] = [startPoint!![0] + adjacent[0], startPoint!![1] + adjacent[1]]
    let previousDirection = invertDirection(DIRECTION)
    
    while (true) {
        let [y, x] = currentPoint;
        let currentTerrain = grid[y][x];
        
        if (pointsOnLoop.has(tupleHash(currentPoint))) break

        pointsOnLoop.add(tupleHash(currentPoint));

        if (currentTerrain === "." || currentTerrain === "X" || currentTerrain === "S") {
            break; // Exit condition
        }

        if (typeof currentTerrain === "string") {
            let nextDirection = getNextDirection(currentTerrain, previousDirection);

            if (nextDirection) {
                let insideTiles = getInsideTile(currentPoint, previousDirection, nextDirection);
                if (insideTiles) {
                    insideTiles.forEach(insideTile => {
                        pointsInsideLoop.add(tupleHash(insideTile));
                    });
                }
                // Update the currentPoint and previousDirection for the next iteration
                currentPoint = [y + DIRECTION_MAPPER[nextDirection][0], x + DIRECTION_MAPPER[nextDirection][1]];
                previousDirection = invertDirection(nextDirection);
            } else {
                break; // No next direction, exit the loop
            }
        }
    }

    // fill the space based on the points inside the loop
    pointsInsideLoop.forEach((hashedPoint) => {
        let point = unhashTuple(hashedPoint)
        spaceFiller(
            point,
            pointsOnLoop,
            seen,
            spaceOutside
        )
    })



    return spaceOutside.toString()
}

runSolution(INPUT_FILE_PATH, solution)

