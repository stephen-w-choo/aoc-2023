from lib.io_utils import read_file_contents, generate_answer, get_file_name, get_file_directory
from importlib import import_module
import sys


def run_solution(input_file_name: str):
    file_name, problem_number = get_file_name(input_file_name)
    file_directory =  get_file_directory(input_file_name)
    
    # Read the file, 
    file_contents = read_file_contents(input_file_name)
    # read the solution file 
    module = import_module(f'{file_directory}.solution{problem_number}'.replace('/', '.'))
    solution_function = getattr(module, 'solution')
    # run the solution,
    result = solution_function(file_contents)
    # generate the answer in the same directory
    output_file_name = f"{file_directory}/solution{problem_number}-result.txt"

    generate_answer(output_file_name, result)

if __name__ == "__main__":
    # Get the input file name
    input_file_name = sys.argv[1]
    run_solution(input_file_name)