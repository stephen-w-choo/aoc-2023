import { debug, parseInput, runSolution, transpose } from './common'

const INPUT_FILE_PATH = 'input.txt'

function expandSpace(grid: string[][]): string[][] {
    // expand empty lines
    let indexes: number[]
    
    let res = grid.reduce((accum, line) => {
        if (line.every((char) => char == ".")) {
            accum.push(line)
            console.log("found")
        }
        accum.push(line)

        return accum
    }, [] as string[][])

    return res
}

function solution(input: string) {
    let grid = parseInput(input)
    grid = transpose(transpose(transpose(expandSpace(transpose(expandSpace(grid))))))

    const positions: [number, number][] = []

    grid.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char == "#") {
                positions.push([y, x])
            }
        })
    })

    let res = 0
    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            res += Math.abs(positions[i][0] - positions[j][0]) + Math.abs(positions[i][1] - positions[j][1])
        }
    }
    return res
}

runSolution(INPUT_FILE_PATH, solution)