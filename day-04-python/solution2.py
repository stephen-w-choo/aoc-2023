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
    card_freq = {i: 1 for i in range(len(cards))}
    res = 0
    card_queue = deque([0])

    for card_n_minus_1 in range(len(cards)):
        if card_n_minus_1 not in card_freq:
            continue

        current_card = cards[card_n_minus_1]
        multiplier = card_freq[card_n_minus_1]

        winning_string, current_string = current_card.split(":")[1].split("|")
        winning_numbers = set(list_to_int(winning_string.split(" ")))
        current_numbers = list_to_int(current_string.split(" "))
        
        cards_matched = 0

        for number in current_numbers:
            if number in winning_numbers:
                cards_matched += 1
                res += multiplier
                card_freq[card_n_minus_1 + cards_matched] += multiplier
        
    return res + len(cards)

if __name__ == "__main__":
    run_solution(INPUT_FILE_NAME, solution)