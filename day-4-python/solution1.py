import os
from runner import run_solution

INPUT_FILE_NAME = "input.txt"

def list_to_int(text_list = list[str]) -> list[int]:
    res = []
    for text in text_list:
        try:
            res.append(int(text))
        except:
            pass
    return res

def solution(cards: list[str]) -> list[str]:
    # Split by | and :
    res = 0
    for card in cards:
        winning_string, current_string = card.split(":")[1].split("|")
        winning_numbers = set(list_to_int(winning_string.split(" ")))
        current_numbers = list_to_int(current_string.split(" "))
        power = -1
        
        for number in current_numbers:
            if number in winning_numbers:
                power += 1
        
        if power >= 0:
            res += 2 ** power
    
    return res


if __name__ == "__main__":
    run_solution(INPUT_FILE_NAME, solution)