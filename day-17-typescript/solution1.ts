import { runSolution } from './common'

const queue: Heap

const INPUT_FILE_PATH = 'input.txt'

type Route = [Direction?, Direction?, Direction?]
type Direction = [0, 1] | [1, 0] | [-1, 0] | [0, -1]

const directions: Array<Direction> = [
    [-1, 0], // North
    [1, 0], // South
    [0, -1], // West
    [0, 1], // East
]

function tupleHash(tuple: [number, number]): string {
    return tuple[0].toString() + "///" + tuple[1].toString()
}

function unhashTuple(hash: string): [number, number] {
    const parts = hash.split("///");
    return [parseInt(parts[0], 10), parseInt(parts[1], 10)];
}

function solution(input: string) {
    const grid = input.split("\n")
        .map((line) => line.split(""))


    const distances: Record<string, [number, Route]>
        
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