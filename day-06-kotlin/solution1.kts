import java.io.File

fun parser(input: String): List<List<Int>> {
    return input
        .split("\n")
        .map { line ->
            line.split(" ")
                .filter { it.firstOrNull()?.isDigit() == true }
                .map {it.toInt()}
        }
        .filter { it.isNotEmpty() }
}

fun solution(input: String): String {
    val (totalRaceTimes, distancesToBeat) = parser(input)

    // speed will be subtracted from total race time = remaining race time
    // remaining race time * speed must be > than distanceToBeat
    // given the pattern, we don't need to go all the way - we just need to find the minimum dista

    var minimumRanges: MutableList<Int> = mutableListOf()

    for (i in 0..(totalRaceTimes.size - 1)) {
        val currentRaceTime = totalRaceTimes[i]
        val currentDistanceToBeat = distancesToBeat[i]

        for (j in 1..currentRaceTime) {
            val speed = j
            val time = currentRaceTime - speed
            if ((speed * time) > distancesToBeat[i]) {
                minimumRanges.add(j)
                break
            }
        }
    }

    var res = 1

    minimumRanges.forEachIndexed { index, firstWinningSpeed ->
        res *= totalRaceTimes[index] - ((firstWinningSpeed - 1) * 2) - 1
    }

    return res.toString()
}

fun runSolution(inputFilePath: String, solutionFunction: (String) -> String) {
    val input = File(inputFilePath).readText()
    val res = solutionFunction(input)
    println(res)
}

runSolution("input.txt", ::solution)