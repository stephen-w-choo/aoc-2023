import java.io.File

fun parseInput(input: String): List<Long> {
    val regex = "\\d+".toRegex()

    return input.split("\n")
        .map { line ->
            regex.findAll(line)
                .joinToString("")
                .toLong()
        }
}

fun solution(input: String): String {
    val (currentRaceTime, currentDistanceToBeat) = parseInput(input)

    // same as the last solution, no optimisations needed

    lateinit var minimumRange: Long

    for (j in 1..currentRaceTime) {
        val speed = j
        val time = currentRaceTime - speed
        if ((speed * time) > currentDistanceToBeat) {
            minimumRange = j
            break
        }
    }

    val res = totalRaceTimes - ((minimumRange - 1) * 2) - 1
    return res.toString()
}

fun runSolution(inputFilePath: String, solutionFunction: (String) -> String) {
    val input = File(inputFilePath).readText()
    val res = solutionFunction(input)
    println(res)
}

runSolution("input.txt", ::solution)