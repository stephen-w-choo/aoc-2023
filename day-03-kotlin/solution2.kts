import java.io.File

fun getNumberAtCoords(schematic: List<List<String>>, coord: Pair<Int, Int>): Int {
    // Move left until no number is found
    var y = coord.first
    var x = coord.second
    while (x > 0 && schematic[y][x - 1].first().isDigit()) {
        x -= 1
    }
    var number = ""
    while (x < schematic[0].size && schematic[y][x].first().isDigit()) {
        number += schematic[y][x].first()
        x += 1
    }
    return number.toInt()
}


fun checkAdjacentsForNumbers(position: Pair<Int, Int>, schematic: List<List<String>>): Set<Int> {
    val adjacents = listOf(
        Pair(-1, -1),
        Pair(-1, 0),
        Pair(-1, 1),
        Pair(0, -1),
        Pair(0, 1),
        Pair(1, -1),
        Pair(1, 0),
        Pair(1, 1)
    )
    val numbers = mutableSetOf<Int>()
    for (adjacent in adjacents) {
        val newPosition = Pair(position.first + adjacent.first, position.second + adjacent.second)
        if (schematic[newPosition.first][newPosition.second].first().isDigit()) {
            numbers.add(getNumberAtCoords(schematic, newPosition))
        }
    }
    return numbers
}


fun solution(input: String): String {
    // Make a 2d array of characters
    var res = 0

    val schematic: List<List<String>> = input.split("\n").map { line -> line.split("").filter { it.isNotEmpty() } }
    val H = schematic.size
    val W = schematic[0].size

    // Make a set of the gear positions
    val gearPositions = mutableSetOf<Pair<Int, Int>>()

    schematic.forEachIndexed { i, line ->
        line.forEachIndexed { j, char ->
            if (char.first() == '*') {
                gearPositions.add(Pair(i, j))
            }
        }
    }
    // Iterate through the gears
    for (gearPosition in gearPositions) {
        val numbers = mutableSetOf<Int>()
        val gearNumbers = checkAdjacentsForNumbers(gearPosition, schematic).toList()
        if (gearNumbers.size == 2) {
            res += gearNumbers[0] * gearNumbers[1]
        }
    }
    return res.toString()
}

fun runSolution(inputFilePath: String, solutionFunction: (String) -> String) {
    val input = File(inputFilePath).readText()
    val res = solutionFunction(input)
    println(res)
}

runSolution("input.txt", ::solution)
