import java.io.File

fun generateNumberPositions(schematic: List<List<String>>): HashMap<List<Pair<Int, Int>>, Int> {
    val numbers = HashMap<List<Pair<Int, Int>>, Int>()
    val H = schematic.size
    val W = schematic[0].size

    for (i in 0 until H) {
        var currentNum = ""
        var currentCoOrds: MutableList<Pair<Int, Int>> = mutableListOf()

        for (j in 0 until W) {
            val char = schematic[i][j]
            if (!char.first().isDigit() && currentNum.isNotEmpty()) {
                numbers.put(currentCoOrds, currentNum.toInt())
                currentNum = ""
                currentCoOrds = mutableListOf()
            }
            if (char.isNotEmpty() && char.first().isDigit()) {
                currentNum += char
                currentCoOrds.add(Pair(i, j))
            }
        }
        if (currentNum.isNotEmpty()) {
            numbers.put(currentCoOrds, currentNum.toInt())
        }
    }
    return numbers
}

fun checkAdjacents(position: Pair<Int, Int>, symbols: Set<Pair<Int,Int>>): Boolean {
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

    for (adjacent in adjacents) {
        val newPosition = Pair(position.first + adjacent.first, position.second + adjacent.second)
        if (symbols.contains(newPosition)) {
            return true
        }
    }
    return false
}


fun solution(input: String): String {
    // Make a 2d array of characters
    var res = 0

    val schematic: List<List<String>> = input.split("\n").map { line -> line.split("").filter { it.isNotEmpty() } }
    val H = schematic.size
    val W = schematic[0].size

    // Make a set of all the number positions
    val numbers = mutableSetOf<Pair<Int, Int>>()
    schematic.forEachIndexed { i, line ->
        line.forEachIndexed { j, char ->
            if (char.first() != '.' && !char.first().isDigit()) {
                symbols.add(Pair(i, j))
            }
        }
    }

    // Make a set of the symbol positions we've already visited
    val symbols = mutableSetOf<Pair<Int, Int>>()

    schematic.forEachIndexed { i, line ->
        line.forEachIndexed { j, char ->
            if (char.first() != '.' && !char.first().isDigit()) {
                symbols.add(Pair(i, j))
            }
        }
    }

    // Iterate through the hashmap and add any numbers to res
    for ((positions, number) in numbers) {
        var numberAdded = false

        for (position in positions) {
            if (numberAdded) {
                continue
            }
            if (checkAdjacents(position, symbols)) {
                res += number
                numberAdded = true
                continue
            }
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