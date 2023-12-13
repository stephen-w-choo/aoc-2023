import { parseInput, debug, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'



function markEmptyLines(grid: string[][]): [number[], number[]] {
    // expand empty lines
    let emptyRows: number[] = []
    let emptyColumns: number[] = []
    
    const H = grid.length
    const W = grid[0].length

    for (let i = 0; i < H; i++) {
        if (grid[i].every((char) => char == ".")) {
            emptyRows.push(i)
        }
    }

    for (let j = 0; j < W; j++) {
        let column = grid.reduce((accum, row) => { 
            accum.push(row[j])
            return accum
        } , [] as string[])

        if (column.every((char) => char == ".")) {
            emptyColumns.push(j)
        }
    }
    

    return [emptyRows, emptyColumns]
}

function solution(input: string) {
    let grid = parseInput(input)
    let [emptyRows, emptyColumns] = markEmptyLines(grid)
    // keep track of all the rows and columns where space is expanded

    const positions: [number, number][] = []

    grid.forEach((line, y) => {
        line.forEach((char, x) => {
            if (char == "#") {
                positions.push([y, x])
            }
        })
    })

    // when getting the difference, add on any empty rows and columns

    let res = 0
    for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
            let y1 = positions[i][0]
            let y2 = positions[j][0]
            let x1 = positions[i][1]
            let x2 = positions[j][1]

            if (y2 < y1) { [y1, y2] = [y2, y1] }

            if (x2 < x1) { [x1, x2] = [x2, x1] }

            res += (y2 - y1) + (x2 - x1)

            emptyRows.forEach((rowIndex) => {
                if (y1 < rowIndex && rowIndex < y2) {
                    res += 999999
                }
            })

            emptyColumns.forEach((columnIndex) => {
                if (x1 < columnIndex && columnIndex < x2) {
                    res += 999999
                }
            })

        }
    }
    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)