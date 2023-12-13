import java.io.File
import kotlin.math.min

fun parseInput(input: String): List<List<List<Char>>> {
    val grids = input.split("\n\n") // split into individual grids
            .map { grid ->
                grid.split("\n")
                        .map { line ->
                            line.split("")
                                    .map { char -> char.first() }
                        }
            }
    return grids
}

fun checkLineEquality(lineA: List<Char>, lineB: List<Char>) {
    if (lineA == lineB) {
        return true
    }
}

fun getLineOfHorizontalSymmetry(grid: List<List<Char>>): Int? {
    for (i in grid.indices) {
        if (i == grid.size - 1) {
            continue
        }
        var symmetrical = true
        for (j in 0..min(i, grid.size - i - 1)) {
            val lineA = grid[i - j]
            val lineB = grid[i + j + 1]

            if (lineA != lineB) {
                symmetrical = false
                break
            }
        }
        if (symmetrical) {
            return i
        }
    }
    return null
}

fun solution(input: String): String {
    val grids = parseInput(input)

    grids.forEach
}

fun runSolution(inputFilePath: String, solutionFunction: (String) -> String) {
    val input = File(inputFilePath).readText()
    val res = solutionFunction(input)
    println(res)
}

runSolution("input.txt", ::solution)