import java.io.File

fun hashString(inputString: String): Int {
    return inputString.fold(0) { accumulator, char ->
        ((accumulator + char.code) * 17) % 256
    }
}

fun parseSolution(input: String): List<String> {
    return input.split(",")
}

fun solution(input: String): String {
    val instructions = input.split(",")
    val hashMap = List(256) { mutableListOf<Pair<String, Int>>() }
    val removeNonLetterRegex = "[^a-z]".toRegex()

    for (instruction in instructions) {
        val label = instruction.replace(removeNonLetterRegex, "")
        val hash = hashString(label)
        if ("-" in instruction) {
            val newList = hashMap[hash].filter {
                it.first != label
            }.toMutableList()
            hashMap[hash].clear()
            hashMap[hash].addAll(newList)
        } else {
            val focalLength = instruction.find { it.isDigit() }?.digitToInt()

            // check if label is in the bucket
            val labelIndex = hashMap[hash].indexOfFirst { it.first == label }
            val lens = Pair(label, focalLength!!)

            if (labelIndex == -1) {
                hashMap[hash].add(lens)
            } else {
                hashMap[hash][labelIndex] = lens
            }
        }
    }

    var res = 0

    hashMap.forEachIndexed { boxNumber, lenses  ->
        lenses.forEachIndexed { slotNumber, lens ->
            res += (boxNumber + 1) * (slotNumber + 1) * lens.second
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