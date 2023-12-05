import { lineToIntArray, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

type Range = [number, number]

function solution(input: string): string {
    let inputSplitByDoubleLineBreak = input.split("\n\n")

    let currentNumbers = lineToIntArray(inputSplitByDoubleLineBreak[0])

    let currentRanges = currentNumbers.reduce((acc, curr, index, array) => {
        if (index % 2 === 0) {
            acc.push([curr, array[index + 1]])
        }
        return acc
    }, [] as Range[])

    let maps = inputSplitByDoubleLineBreak.slice(1)
        .map(individualMap => 
            individualMap.split("\n")
                .map(line => lineToIntArray(line))
                .filter(line => line.length > 0)
            )

    for (let individualMap of maps) { // For each map
        // For each line, transform the range
        let newRanges: Range[] = []
        
        for (let mapLine of individualMap) {
            let [destinationStart, sourceStart, rangeLength] = mapLine

            let difference = sourceStart - destinationStart

            let rangesToRemove = new Set()
            let rangesToAddBack: Range[] = []
        
            currentRanges.forEach((currentRange) => {
                // check if the ranges intersect
                let [rangeStart, rangeExtension] = currentRange
                let rangeEnd = rangeStart + rangeExtension

                // current Range is within sourceStart -> rangeLength
                // remove it from the current range
                // transform the whole range and add to new ranges
                if (sourceStart <= rangeStart && rangeEnd <= (sourceStart + rangeLength)) {
                    rangesToRemove.add(currentRange)
                    newRanges.push([rangeStart - difference, rangeExtension])
                } 
                // if rangeStart is within sourceStart -> rangeLength
                // remove it from the current range
                // transform the part from rangeStart -> sourceStart + rangeLength and add to newRanges
                // add back sourceStart + rangeLength -> (sourceStart + rangeLength) - (rangeStart + rangeExtension)
                else if (sourceStart <= rangeStart && rangeStart <= (sourceStart + rangeLength)) {
                    rangesToRemove.add(currentRange)
                    newRanges.push([rangeStart - difference, sourceStart + rangeLength - rangeStart])
                    rangesToAddBack.push([sourceStart + rangeLength, rangeEnd - (sourceStart + rangeLength)])
                } 
                // if rangeEnd is within sourceStart -> rangeLength
                // remove it from the current range
                // transform the part from sourceStart -> rangeEnd and add to newRanges
                // add back rangeEnd -> (sourceStart + rangeLength) - (rangeStart + rangeExtension)
                else if (rangeEnd <= (sourceStart + rangeLength)) {
                    rangesToRemove.add(currentRange)
                    newRanges.push([sourceStart, rangeEnd - sourceStart])
                    rangesToAddBack.push([rangeEnd, sourceStart + rangeLength - rangeEnd])
                }
                
            })
            // remove the ranges to remove, add back the ranges to add back
            currentRanges = currentRanges.filter((number) => !rangesToRemove.has(number))
            currentRanges = [...rangesToAddBack, ...currentRanges]
        }      
        currentRanges = [...newRanges, ...currentRanges]
    }
    let rangeStarts = currentRanges.map((range) => range[0])
    return Math.min(...rangeStarts).toString()
    
}

runSolution(INPUT_FILE_PATH, solution)