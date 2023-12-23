import java.io.File
import kotlin.math.min

enum class SymmetryType {
    MATCH,
    ONE_DEFECT,
    NON_MATCHED
}

fun debug(grid: List<List<Char>>) {
    grid.forEach { line ->
        line.forEach { char -> print(char)}
        print("\n")
    }
}

fun checkSymmetry(lineA: List<Char>, lineB: List<Char>): SymmetryType {
    var defect = false
    for (i in lineA.indices) {
        if (lineA[i] != lineB[i]) {
            if (defect) return SymmetryType.NON_MATCHED
            defect = true
        }
    }
    if (defect) return SymmetryType.ONE_DEFECT
    return SymmetryType.MATCH
}

fun parseInput(input: String): List<List<List<Char>>> {
    val grids = input.split("\n\n") // split into individual grids
            .map { grid ->
                grid.split("\n")
                        .map { line ->
                            line.split("")
                                    .map { char -> char.firstOrNull() }
                                    .filterNotNull()
                        }
            }
    return grids
}

fun getSymmetryWithOneDefect(grid: List<List<Char>>): Int? {
    for (i in grid.indices) {
        if (i == grid.size - 1) {
            continue
        }
        var symmetrical = true
        var defect = 0 // allow up to one defect
        for (j in 0..min(i, grid.size - i - 2)) {

            val lineA = grid[i - j]
            val lineB = grid[i + j + 1]

            when (checkSymmetry(lineA, lineB)) {
                SymmetryType.NON_MATCHED -> {
                    symmetrical = false
                    break
                }
                SymmetryType.ONE_DEFECT -> {
                    defect += 1
                    if (defect >= 2) {
                        symmetrical = false
                        break
                    }
                }
                SymmetryType.MATCH -> continue
            }
        }
        if (symmetrical && defect == 1) {
            return i + 1
        }
    }
    return null
}

fun transposeGrid(grid: List<List<Char>>): List<List<Char>> {
    // rotate clockwise

    val newGrid = MutableList(grid[0].size) {
        MutableList(grid.size) {
            ".".first()
        }
    }

    for (i in grid.indices) {
        for (j in grid[0].indices) {
            newGrid[j][grid.size - i - 1] = grid[i][j]
        }
    }

    return newGrid
}

fun intOrZero(num: Int?): Int {
    if (num != null) {
        return num
    }
    return 0
}

fun solution(input: String): String {
    val grids = parseInput(input)
    var res = 0

    for (grid in grids) {
        res += 100 * intOrZero(getSymmetryWithOneDefect(grid))
        res += intOrZero(getSymmetryWithOneDefect(transposeGrid(grid)))
    }

    return res.toString()
}

fun runSolution(inputFilePath: String, solutionFunction: (String) -> String) {
    val input = File(inputFilePath).readText()
    val res = solutionFunction(input)
    println(res)
}

runSolution("input.txt", ::solution)