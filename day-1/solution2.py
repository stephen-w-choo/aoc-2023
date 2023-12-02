from runner import run_solution

YOUR_OUTPUT_FILE_NAME ="solution2"

NUMBERS = {
    "ONE": 1,
    "TWO": 2,
    "THREE": 3,
    "FOUR": 4,
    "FIVE": 5,
    "SIX": 6,
    "SEVEN": 7,
    "EIGHT": 8,
    "NINE": 9,
}

def check_index_for_number(string, index) -> int | None:
    # returns if the char at index is a number
    if string[index].isdigit():
        return int(string[index])
    
    # I'm not convinced this part is efficient 
    for number_string in NUMBERS:
        if string[index:index + len(number_string)] == number_string.lower():
            return NUMBERS[number_string]

    return None

def turn_calibration_value_to_number(calibration_val: str) -> int:
    first_int = None
    last_int = None

    for i in range(len(calibration_val)):
        print(calibration_val)
        number = check_index_for_number(calibration_val, i)
        print(number)
        if (number):
            if not first_int:
                first_int = number
            last_int = number
    
    return int(first_int) * 10 + last_int  # type: ignore


def solution(input_data: list[str]) -> list[str]:
    # Your solution logic goes here
    res = 0
    
    for calibration_val in input_data:
        res += turn_calibration_value_to_number(calibration_val)

    return [str(res)]

def main():
    run_solution(YOUR_OUTPUT_FILE_NAME, solution)

if __name__ == "__main__":
    main()