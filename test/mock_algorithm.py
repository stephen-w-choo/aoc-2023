def solution(input: list[str]) -> list[str]:
    output = []

    elf_calories = []
    
    current_elf = 0

    for line in input:
        if line == "":
            elf_calories.append(current_elf)
            current_elf = 0
            continue

        current_elf += int(line)
    
    res = max(elf_calories)

    output.append(res)

    return output