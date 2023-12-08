export const instructionMapper: Record<string, number> = {
    "L": 0,
    "R": 1
}

export function parseInput(input: string): [string, Record<string, [string, string]>] {
    const lines = input.split("\n")

    const instructions = lines[0]

    const nodesAsStrings = lines.slice(2,)

    const adjacencyList: Record<string, [string, string]> = {}

    for (let line of nodesAsStrings) {
        const regexPattern = /[0-9A-Z]{3}/g

        let match = line.match(regexPattern)
        if (match) {
            let [node, destination1, destination2] = match
            adjacencyList[node] = [destination1, destination2]
        }
    }

    return [instructions, adjacencyList]
}


export async function runSolution(
    inputFilePath: string,
    solutionFunction: (input: string) => string
) {
    const input = Bun.file(inputFilePath);
    const solution = solutionFunction(await input.text());
    console.log(solution);
}