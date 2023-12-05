import { lineToIntArray, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

function solution(input: string): string {
    let inputSplitByDoubleLineBreak = input.split("\n\n")

    let currentNumbers = lineToIntArray(inputSplitByDoubleLineBreak[0])
    // let currentNumbers = [14]

    let maps = inputSplitByDoubleLineBreak.slice(1)
        .map(individualMap => 
            individualMap.split("\n")
                .map(line => lineToIntArray(line))
                .filter(line => line.length > 0)
            )

    for (let individualMap of maps) { // For each map
        // For each line, transform the numbers (if it's in the range)
        let newNumbers: number[] = []
        
        for (let mapLine of individualMap) {
            let [destinationStart, sourceStart, rangeLength] = mapLine
            // console.log(mapLine)

            let difference = sourceStart - destinationStart

            let numbersToRemove = new Set()
        
            currentNumbers.forEach((currentSeedNumber) => {
                if (sourceStart <= currentSeedNumber && currentSeedNumber < (sourceStart + rangeLength)) {
                    newNumbers.push(currentSeedNumber - difference)
                    numbersToRemove.add(currentSeedNumber)
                }
            })

            currentNumbers = currentNumbers.filter((number) => !numbersToRemove.has(number))
        }      
        currentNumbers = [...newNumbers, ...currentNumbers]

        console.log(currentNumbers)
    }

    return Math.min(...currentNumbers).toString()
}

runSolution(INPUT_FILE_PATH, solution)