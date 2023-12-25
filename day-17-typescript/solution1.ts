import { runSolution } from './common'
import { PriorityQueue, Queue } from 'tstl';

const INPUT_FILE_PATH = 'input.txt'

type Route = [Direction?, Direction?, Direction?]
type Direction = [0, 1] | [1, 0] | [-1, 0] | [0, -1]

const directions: Array<Direction> = [
    [-1, 0], // North
    [1, 0], // South
    [0, -1], // West
    [0, 1], // East
]

function solution(input: string) {
    // implementing Djikstra's in TypeScript has been absolutely awful and I never want to do it again
    // If I'm doing DSA like this I'm either going back to Python or learning C++
    const INPUT_FILE_PATH = 'input.txt'

    type Route = [Direction?, Direction?, Direction?]
    type Direction = [0, 1] | [1, 0] | [-1, 0] | [0, -1]

    const directions: Array<Direction> = [
        [-1, 0], // North
        [1, 0], // South
        [0, -1], // West
        [0, 1], // East
    ]

    function solution(input: string) {
        const grid = input.split("\n")
            .map((line) => line.split(""))

        const hashedStartPoint = JSON.stringify([0, 0])
        const distances: Record<string, number> = { 
            initialKey: 0
        }

        const visited: Set<string> = new Set([hashedStartPoint])

        const queue: Queue<string> = new Queue<string>()
        queue.push(hashedStartPoint)

        grid.forEach((row, yIndex) => {
            row.forEach((_, xIndex) => {
                let hashedPoint = JSON.stringify([yIndex, xIndex])
                distances[hashedPoint] = Infinity
                visited.add(hashedPoint)
            })
        })

        while (queue.size() > 0) {
            let hashedCurrentPoint = JSON.parse(queue.front())
            queue.pop()
        }
    }
        
    // I know Djikstra's is a DFS that involves a kind of priority queue
    // But I don't know the exact algorithm

    // Let's take a step back. Remember the 3 algos? Bellman-Ford, Djikstra's, and Floyd-Warshall
    // You should know Bellman-Ford and Floyd-Warshall well because of Foobar.
    // Bellman-Ford determines the shortest distance from a single node to all other nodes
    // Floyd Warshall determines the shortest distance between ALL nodes
    // Bellman-Ford is conceptually similar to Djikstra's
    // We start by registering the distances to all adjacent nodes - by definition, these are the shortest distance
    // We start registering all the distances that are 2 degrees away - if there are multiple routes, take the shortest one
    // We repeat this over and over
    // We run into a problem quickly - we have a limitation here that we can't go straight three times.
    // We can store each 'shortest distance' with the route that was used to get there. This would prevent illegal routes (but I think we would lose the guarantee that it was optimal?)
}

runSolution(INPUT_FILE_PATH, solution)