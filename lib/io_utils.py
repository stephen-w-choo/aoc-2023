import os

def get_file_name(input_file_name: str) -> str:
    """
    Returns the basename of a file 
    eg 'input/text.txt' => 'text'
    """
    basename = os.path.basename(input_file_name)
    root = os.path.splitext(basename)[0]
    return root

def get_file_directory(input_file_name: str) -> str:
    """
    Returns the directory of a file.
    e.g., 'input/text.txt' => 'input'
    """
    directory = os.path.dirname(input_file_name)
    return directory

def read_file_contents(input_file_name: str) -> list[str]:
    """
    Reads a file as a list
    """
    res = []

    with open(input_file_name, "r") as input_file_contents:
        for line in input_file_contents:
            res.append(line.strip())

    return res

def generate_answer(output_file_name: str, output_file_contents: list[str]):
    """
    Takes an output file directory name and list of strings and writes to it
    """
    with open(output_file_name, "w") as output_file:
        for line in output_file_contents:
            output_file.write(str(line) + "\n")
    print(f"Output file generated at: {output_file_name}")

def run_solution(input_file_name: str, solution_function: callable):
    file_name, file_directory = get_file_name(input_file_name), get_file_directory(input_file_name)
    
    file_contents = read_file_contents(input_file_name)

    result = solution_function(file_contents)

    output_file_name = f"{file_directory}/{file_name}-solution.txt"

    generate_answer(output_file_name, result)