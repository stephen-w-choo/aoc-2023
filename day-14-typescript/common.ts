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
