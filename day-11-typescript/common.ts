export async function runSolution(
    inputFilePath: string,
    solutionFunction: (input: string) => string
) {
    const input = Bun.file(inputFilePath);
    const solution = solutionFunction(await input.text());
    console.log(solution);
}

export function debug(grid: (string | number)[][]) {
    let res = grid.reduce((accum, line) => {
        return accum + line.join("") + "\n"
    }, "")

    console.log(res)
}

export function parseInput(input: string): string[][] {
    return input.split("\n")
        .map((line) => {
            return line.split("")
        })
}

export function transpose(grid: string[][]): string[][] {
    return grid[0]
        .map((_, colIndex) => {
            return grid.map(row => row[colIndex]).filter((row) => row !== undefined)
        })
}