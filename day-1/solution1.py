from runner import run_solution

YOUR_OUTPUT_FILE_NAME ="solution1"

def get_first_number(string: str) -> int:
    for char in string:
        if char.isdigit():
            return int(char)

    return 0    
    
def get_last_number(string: str) -> int:
    for i in range(len(string) - 1, -1, -1):
        if string[i].isdigit():
            return int(string[i])
    
    return 0

def solution(input: list[str]) -> list[str]:
    res = 0

    for line in input:
        first_number, last_number = int(get_first_number(line)), get_last_number(line)
        res += first_number * 10 + last_number 

    return [str(res)]

def main():
    run_solution(YOUR_OUTPUT_FILE_NAME, solution)

if __name__ == "__main__":
    main()