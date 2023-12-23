import os
from runner import run_solution

YOUR_OUTPUT_FILE_NAME ="output.txt"

def verify_possible_arrangement(immutable_record: str, arrangement: list[str]) -> bool:
    # Reverse the record, turn it into a stack - the top
    # of the stack will represent the current group being evaluated
    record = [int(char) for char in immutable_record.split(",")]
    
    record.reverse()

    contiguous: int = 0
    current_index = 0

    for index, pool in enumerate(arrangement):
        current_index = index
        if pool == "?": # if there are any remaining unknowns, consider it possible
            return True
        if pool == "#":
            contiguous += 1
        if pool == ".": # cut off the group and compare to the record
            if contiguous > 0:
                target_group_n = record.pop()
                if target_group_n != contiguous:
                    return False
                contiguous = 0 # reset the counter
        if not record:
            break
    
    # edge case 1 - we exhaust our record early - check remaining indices
    for i in range(current_index + 1, len(arrangement)):
        if arrangement[i] == "#":
            return False
    
    # edge case 2 - arrangement ends on a "#" value
    if record:
        target_group_n = record.pop()
        if record:
            return False
        if target_group_n != contiguous:
            return False

    return True

def get_possible_arrangements(immutable_record: str, arrangement: list[str], current_index: int) -> int:
    # recursive backtracking
    if not verify_possible_arrangement(immutable_record, arrangement):
        return 0

    if current_index == len(arrangement):
        return 1
    
    if arrangement[current_index] != "?":
        return get_possible_arrangements(immutable_record, arrangement, current_index + 1)
    
    res = 0

    arrangement[current_index] = "."
    res += get_possible_arrangements(immutable_record, arrangement, current_index + 1)

    arrangement[current_index] = "#"
    res += get_possible_arrangements(immutable_record, arrangement, current_index + 1)

    arrangement[current_index] = "?"

    return res

def solution(input_data: list[str]) -> list[str]:
    res = 0

    for line in input_data:
        arrangement, record_string = line.split(" ")
        arrangement = arrangement * 5
        immutable_record = record_string * 5

        print(arrangement, immutable_record)
        # arrangements = get_possible_arrangements(immutable_record, list(arrangement), 0)
        # res += arrangements

    print(res)

    return [str(res)]

if __name__ == "__main__":
    run_solution(YOUR_OUTPUT_FILE_NAME, solution)