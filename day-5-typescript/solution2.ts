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
            let [mapDestinationStart, mapRangeStart, mapRangeLength] = mapLine

            let valueTransformer = mapDestinationStart - mapRangeStart
            let mapRangeEnd = mapRangeStart + mapRangeLength

            let rangesToRemove = new Set()
            let rangesToAddBack: Range[] = []
            
            // current ranges are the ranges that have not been transformed yet
            // new ranges are the ranges that have been transformed
            currentRanges.forEach((currentRange) => {
                // check if the ranges intersect
                let [currentRangeStart, currentRangeLength] = currentRange
                let currentRangeEnd = currentRangeStart + currentRangeLength

                // current Range is within sourceStart -> rangeLength
                // remove it from the current range
                // transform the whole range and add to new ranges
                // this step is correct - verified
                if (mapRangeStart <= currentRangeStart && currentRangeEnd <= mapRangeEnd) {
                    rangesToRemove.add(currentRange)
                    newRanges.push([currentRangeStart + valueTransformer, currentRangeLength])
                } 
                // if rangeStart is within sourceStart -> rangeLength
                // remove it from the current range
                // transform the part from currentRangeStart -> mapRangeEnd and add to newRanges
                // add back sourceStart + rangeLength -> (sourceStart + rangeLength) - (rangeStart + rangeExtension)
                // this step also seems to be behaving as expected
                else if (mapRangeStart <= currentRangeStart && currentRangeStart < mapRangeEnd) {
                    let newRangeLength = mapRangeEnd - currentRangeStart

                    rangesToRemove.add(currentRange)
                    newRanges.push([currentRangeStart + valueTransformer, newRangeLength])
                    rangesToAddBack.push([currentRangeStart + newRangeLength, currentRangeLength - newRangeLength])
                } 
                // if rangeEnd is within sourceStart -> rangeLength
                // remove it from the current range
                // transform the part from sourceStart -> rangeEnd and add to newRanges
                // add back rangeEnd -> (sourceStart + rangeLength) - (rangeStart + rangeExtension)
                // this step is also behaving as expected if it gets to this point
                else if (currentRangeEnd <= mapRangeEnd && mapRangeStart < currentRangeEnd) {
                    let newRangeLength = currentRangeEnd - mapRangeStart
                    rangesToRemove.add(currentRange)
                    newRanges.push([mapRangeStart + valueTransformer, newRangeLength])
                    rangesToAddBack.push([currentRangeStart, currentRangeLength - newRangeLength])
                }
                
            })
            // update the ranges after each map line to only transform a range once
            currentRanges = currentRanges.filter((number) => !rangesToRemove.has(number))
            currentRanges = [...rangesToAddBack, ...currentRanges]
        }      
        currentRanges = [...newRanges, ...currentRanges]
        console.log(currentRanges)
    }
    let rangeStarts = currentRanges.map((range) => range[0])
    return Math.min(...rangeStarts).toString()
    
}

runSolution(INPUT_FILE_PATH, solution)