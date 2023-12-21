import os
from runner import run_solution

YOUR_OUTPUT_FILE_NAME ="solution1"

HORIZONTAL_DIRECTIONS = [(0, 1), (0, -1)]
VERTICAL_DIRECTIONS = [(-1, 0), (1, 0)]

def addTuple(tuple1, tuple2):
    return (tuple1[0] + tuple2[0], tuple1[1] + tuple2[1])

def determineIfSplit(direction, splitter) -> bool:
    if splitter == "|":
        return direction in HORIZONTAL_DIRECTIONS
    else:
        return direction in VERTICAL_DIRECTIONS
    
def determineNewDirection(direction, reflector) -> tuple[int, int]:
    if reflector == "/":
        return (-direction[1], -direction[0])
    else:
        return (direction[1], direction[0])

def solution(input_data: list[str]) -> list[str]:
    # Start from the top left, heading to the right
    # Beams will be represented as a point + vector direction
    GRID = [list(row) for row in input_data]
    H = len(GRID)
    W = len(GRID[0])
    STARTING_BEAM: tuple[tuple[int, int], tuple[int, int]] = ((0, 0), (0, 1))

    # Do either a DFS or BFS through the grid - doesn't really matter

    queue: list[tuple[tuple[int, int], tuple[int, int]]] = [STARTING_BEAM]
    energised = set()
    beams = set()

    while queue:
        current_position, direction = queue.pop()
        if current_position[0] >= H or current_position[0] < 0:
            continue
        if current_position[1] >= W or current_position[1] < 0:
            continue

        current_space = GRID[current_position[0]][current_position[1]]
        if ((current_position, direction) in beams):
            continue
        beams.add((current_position, direction))
        energised.add(current_position)

        if current_space == ".":
            queue.append((addTuple(current_position, direction), direction))
            continue
        if current_space == "|" or current_space == "-":
            splitting = determineIfSplit(direction, current_space)
            if splitting:
                if direction in VERTICAL_DIRECTIONS: # split horizontally
                    for new_direction in HORIZONTAL_DIRECTIONS:
                        queue.append((addTuple(current_position, new_direction), new_direction))
                else: # split vertically
                    for new_direction in VERTICAL_DIRECTIONS:
                        queue.append((addTuple(current_position, new_direction), new_direction))
            else:
                queue.append((addTuple(current_position, direction), direction))
                continue
        if current_space == "/" or current_space =="\\":
            new_direction = determineNewDirection(direction, current_space)
            queue.append((addTuple(current_position, new_direction), new_direction))
            continue

    print(len(energised))

    return [str(len(energised))]

if __name__ == "__main__":
    run_solution(YOUR_OUTPUT_FILE_NAME, solution)