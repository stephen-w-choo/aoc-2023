export function lineToIntArray(line: string): Array<number> {
    return line.split(" ")
        .map((string) => Number(string))
        .filter((num) => !isNaN(num))
}


export async function runSolution(
    inputFilePath: string,
    solutionFunction: (input: string) => string
) {
    const input = Bun.file(inputFilePath);
    const solution = solutionFunction(await input.text());
    console.log(solution);
}