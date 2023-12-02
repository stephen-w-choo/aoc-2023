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
            .map((round) => {
                let currentRound: Round = {
                    "blue": 0,
                    "red": 0,
                    "green": 0
                };

                round.split(",")
                    .forEach((ballsShown) => {
                        let [numberOfBalls, ballColour] = ballsShown
                            .trim()        // Remove whitespace
                            .split(" ")
                            .map(res => res.trim());

                        if (ballColour in currentRound) {
                            currentRound[ballColour as keyof Round] = parseInt(numberOfBalls, 10);
                        }
                    });
                
                return currentRound;
            });
    });
}

export async function runSolution(
    inputFilePath: string,
    solutionFunction: (input: string) => string
) {
    const input = Bun.file(inputFilePath);
    const solution = solutionFunction(await input.text());
    console.log(solution);
}
