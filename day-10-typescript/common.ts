export type Direction = "S" | "N" | "W" | "E"

export const DIRECTION_MAPPER: Record<Direction, [number, number]> = {
    "N": [-1, 0], 
    "S": [1, 0], 
    "W": [0, -1], 
    "E": [0, 1]
}

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
    "N": "S",
    "S": "N",
    "E": "W",
    "W": "E"
}

export const PIPE_MAPPER: Record<string, [Direction, Direction]> = {
    "|": ["N", "S"],   // | is a vertical pipe connecting north and south.
    "-": ["E", "W"], // - is a horizontal pipe connecting east and west.
    "L": ["N", "E"],  // L is a 90-degree bend connecting north and east.
    "J": ["N", "W"], // J is a 90-degree bend connecting north and west.
    "7": ["S", "W"],  // 7 is a 90-degree bend connecting south and west.
    "F": ["S", "E"]  // F is a 90-degree bend connecting south and east.
}

export function parseInput(input: string): string[][] {
    return input.split("\n").map((line) => line.split(""))
}

export function getNextDirection(pipe: string, currentDirection: Direction): Direction | null {
    const directions = PIPE_MAPPER[pipe]
    console.log(pipe)
    if (currentDirection == directions[0]) return directions[1]
    if (currentDirection == directions[1]) return directions[0]
    return null
}

export function invertDirection(direction: Direction): Direction {
    return OPPOSITE_DIRECTIONS[direction]
}


export function debug(grid: (string | number)[][]) {
    let res = grid.reduce((accum, line) => {
        return accum + line.join("") + "\n"
    }, "")

    console.log(res)
}

export async function runSolution(
    inputFilePath: string,
    solutionFunction: (input: string) => string
) {
    const input = Bun.file(inputFilePath);
    const solution = solutionFunction(await input.text());
    console.log(solution);
}