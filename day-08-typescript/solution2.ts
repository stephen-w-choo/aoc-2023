import { instructionMapper, parseInput, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'
const START_CHAR = "A"
const END_CHAR = "Z"


function gcd(a: number, b: number): number {
    while (b !== 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}

function lowestCommonMultiple(a: number, b: number): number {
    return Math.abs(a * b) / gcd(a, b)
}

function solution(input: string) {
    // your solution here
    const [instructions, graph] = parseInput(input)
    const nodes = Object.keys(graph)

    // get all the nodes that start with A
    let currentNodes = nodes.filter((node) => node.endsWith(START_CHAR))

    const numberOfStartNodes = currentNodes.length

    let res = 0

    // get the number of instructions at which the node reaches z (and starts looping)
    let loopSizes = currentNodes.map((currentNode) => {
        let loopSize = 0
        while (!currentNode.endsWith("Z")) {
            for (let i = 0; i < instructions.length; i++) {
                if (currentNode.endsWith("Z")) {
                    break
                }
                loopSize += 1
                currentNode = graph[currentNode][instructionMapper[instructions[i]]]
            }
        }
        return loopSize
    })

    // reduce loopsizes into the greatest common multiple

    res = loopSizes.reduce((currentLcm, n) => {
        return lowestCommonMultiple(currentLcm, n)
    })

    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)