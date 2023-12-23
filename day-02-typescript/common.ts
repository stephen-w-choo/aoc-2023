export type Round = {
    "blue": number,
    "green": number,
    "red": number
}

export type Game = Round[]

export function parseGames(input: string): Game[] {
    // This is essentially a parsing problem, 
    // going to try and do it with chaining methods in the functional way
    
    return input.split("\n").map((line) => {
        return line.split(":")[1]  // Splits into games
            .split(";")            // Splits into rounds
            .map((round) => {      // Start parsing each round into a Round object
                return round
                    .split(",")
                    .reduce((currentRound, ballsShown) => { // Reduces into a single Round object
                        let [numberOfBalls, ballColour] = ballsShown
                            .trim()
                            .split(" ")
                        currentRound[ballColour as keyof Round] = parseInt(numberOfBalls, 10)
                        return currentRound
                    }, { "blue": 0, "red": 0, "green": 0 })
            })
    })
}

export async function runSolution(
    inputFilePath: string,
    solutionFunction: (input: string) => string
) {
    const input = Bun.file(inputFilePath);
    const solution = solutionFunction(await input.text());
    console.log(solution);
}
