import java.io.File

fun solution(input: String): String {
    // one liner
    val res = input.split(",")
            .map { string ->
                string.fold(0) { accumulator, char ->
                    ((accumulator + char.code) * 17) % 256
                }
            }
            .reduce { accumulator, hash ->
                accumulator + hash
            }
    return res.toString()
}

fun runSolution(inputFilePath: String, solutionFunction: (String) -> String) {
    val input = File(inputFilePath).readText()
    val res = solutionFunction(input)
    println(res)
}

runSolution("input.txt", ::solution)