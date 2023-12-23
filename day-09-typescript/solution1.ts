import { runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

function parseInput(input: string): Array<Array<number>> {
    return input.split("\n")
        .map((line)=> {
            return line.split(" ")
                .map((number) => parseInt(number))
        })
}

function getExtrapolatedValue(sequence: Array<number>): number {
    let layers: number[][] = [sequence]

    while (layers[layers.length - 1][0] !== 0 || layers[layers.length - 1][1] !== 0 ) {
        let newLayer: number[] = []
        let currentLayer = layers[layers.length - 1]

        for (let i = 0; i < currentLayer.length - 1; i++) {
            newLayer.push(currentLayer[i + 1] - currentLayer[i])
        }
        
        layers.push(newLayer)
    }

    return layers.reduce((acc, layer) => {
        acc += layer[layer.length - 1]
        return acc
    }, 0)
}

function solution(input: string) {
    const inputLayers = parseInput(input)

    return inputLayers.reduce((acc, inputLayer) => {
        acc += getExtrapolatedValue(inputLayer)
        return acc
    }, 0).toString()
}

runSolution(INPUT_FILE_PATH, solution)