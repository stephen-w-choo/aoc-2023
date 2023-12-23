from ast import parse
import os
from shutil import move
from runner import run_solution

YOUR_OUTPUT_FILE_NAME ="output.txt"

def get_all_bricks(start_brick, end_brick):
    if start_brick == end_brick:
        return [start_brick]
    
    diff = 0
    
    for i in range(3):
        if start_brick[i] != end_brick[i]:
            diff = i

    res = []

    for i in range(start_brick[diff], end_brick[diff] + 1):
        new_brick = tuple(start_brick[j] if j != diff else i for j in range(3))
        res.append(new_brick)

    return tuple(res)
        
def parse_input(input_data: list[str]):
    res = []
    
    for line in input_data:
        start_brick, end_brick = [tuple([int(num) for num in brick.split(",")]) for brick in line.split("~")]
        res.append(get_all_bricks(start_brick, end_brick))

    return res

def can_brick_go_down(occupied_points, brick):
    for point in brick:
        if (point[0], point[1], point[2] - 1) in occupied_points or point[2] - 1 < 0:
            return False
    return True

def can_brick_be_removed(occupied_points, brick):
    points_in_brick = set(brick)

    for point in brick:
        point_above = (point[0], point[1], point[2] + 1)
        if point_above in occupied_points and point_above not in points_in_brick:
            return False
    return True

def move_brick_down(brick: tuple[tuple[int, int, int], ...]) -> tuple[tuple[int, int, int], ...]:
    return tuple(((point[0], point[1], point[2] - 1) for point in brick))

def solution(input_data: list[str]) -> list[str]:
    # Your solution logic goes here

    # Maintain collections
    # List of bricks

    bricks: list[tuple[tuple[int, int, int], ...]] = parse_input(input_data)

    def brick_sorter(brick: tuple[tuple[int, int, int], ...]) -> int:
        highest_point = 0
        
        for point in brick:
            highest_point = max(highest_point, point[2])

        return highest_point
        
    # Sort the list by the lowest z-index of each brick
    bricks.sort(key=brick_sorter)
    # Set of occupied points (initially empty)

    occupied_points = set()

    # For each brick - advance it to the lowest point it can go, then add it to set of occupied points

    bricks_after_fall = []

    for brick in bricks:
        # the lowest brick point will always be the first in the tuple
        while can_brick_go_down(occupied_points, brick):
            brick = move_brick_down(brick)
        for point in brick:
            occupied_points.add(point)

        bricks_after_fall.append(brick)

    # build a dict where a point is the key and the value is how m

    for brick in bricks_after_fall:
        # go from the top and check each brick to see how many bricks it is being supported by
        # each time it's only being supported by one brick, add that brick to the set of bricks that can't be destroyed

        

    # Then for each brick - sort and filter the points that have the highest z-index, and check for occupied points above them.

    # Another option - maintain a hashmap that stores the occupied points, where the key is the z-index?

    pass

if __name__ == "__main__":
    run_solution(YOUR_OUTPUT_FILE_NAME, solution)