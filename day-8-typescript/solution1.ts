import { instructionMapper, parseInput, runSolution } from './common'

const INPUT_FILE_PATH = 'input.txt'

const START_NODE = "AAA"
const END_NODE = "ZZZ"

function solution(input: string): string {
    // your solution here
    let [instructions, graph] = parseInput(input)
    
    let currentNode = START_NODE
    let res = 0

    while (currentNode !== END_NODE) {
        for (let i = 0; i < instructions.length; i++) {
            if (currentNode === END_NODE) {
                break
            }
            res += 1
            currentNode = graph[currentNode][instructionMapper[instructions[i]]]
        }
    }
    return res.toString()
}

runSolution(INPUT_FILE_PATH, solution)