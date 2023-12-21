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
    
def getEnergisedTiles(grid, starting_point) -> int:
    H = len(grid)
    W = len(grid[0])
    STARTING_BEAM: tuple[tuple[int, int], tuple[int, int]] = starting_point

    # Start from the edges and run the same beams from EVERY single edge
    queue: list[tuple[tuple[int, int], tuple[int, int]]] = [STARTING_BEAM]
    energised = set()
    beams = set()

    while queue:
        current_position, direction = queue.pop()
        if current_position[0] >= H or current_position[0] < 0:
            continue
        if current_position[1] >= W or current_position[1] < 0:
            continue

        current_space = grid[current_position[0]][current_position[1]]
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

    return len(energised)

def solution(input_data: list[str]) -> list[str]:
    # Start from the top left, heading to the right
    # Beams will be represented as a point + vector direction
    GRID = [list(row) for row in input_data]
    H = len(GRID)  # Height of the grid
    W = len(GRID[0]) if H > 0 else 0  # Width of the grid

    top_row_coords = [((0, col), (1, 0)) for col in range(W)]  # Downward vector for top row
    bottom_row_coords = [((H - 1, col), (-1, 0)) for col in range(W)] if H > 1 else []  # Upward vector for bottom row

    left_column_coords = [((row, 0), (0, 1)) for row in range(H)] if H > 2 else []  # Rightward vector for left column
    right_column_coords = [((row, W - 1), (0, -1)) for row in range(H)] if H > 2 and W > 0 else []  # Leftward vector for right column

    edge_tiles = top_row_coords + bottom_row_coords + left_column_coords + right_column_coords
    res = 0

    for edge in edge_tiles:
        # tile_n = getEnergisedTiles(GRID, edge)

        # print(edge, tile_n)

        res = max(res, getEnergisedTiles(GRID, edge))



    print(res)

    return [""]

if __name__ == "__main__":
    run_solution(YOUR_OUTPUT_FILE_NAME, solution)