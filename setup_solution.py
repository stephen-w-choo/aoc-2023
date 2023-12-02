import os
import sys

from src import python_runner_template

NAMING_TEMPLATE = "day-"
PYTHON_TEMPLATE_FILE = "src/python_template.py"
PYTHON_RUNNER_FILE = "src/python_runner_template.py"

# Make a directory for a given number

def read_template_file(template_path: str) -> str:
    # Read the template file
    with open(template_path, 'r') as file:
        template_content = file.read()
        return template_content


def make_directory(directory_name: str):
    """
    Makes a directory for a given number
    """
    os.mkdir(directory_name)

def generate_files(directory_name: str):
    """
    Populates the directory with prompt1.txt, prompt2.txt, input1.txt, input2.txt
    """
    # Make the files
    file_names = [
        "test-input1.txt",
        "test-input2.txt",
        "prompt1.txt", 
        "prompt2.txt", 
        "input.txt", 
        "solution1.py",    
        "solution2.py",
        "runner.py"
    ]

    
    python_template = read_template_file(PYTHON_TEMPLATE_FILE)
    python_runner_template = read_template_file(PYTHON_RUNNER_FILE)

    for file_name in file_names:
        with open(f"{directory_name}/{file_name}", "w") as file:
            if file_name.startswith("solution"):
                file.write(python_template)
            elif file_name.startswith("runner"): 
                file.write(python_runner_template)
            else:
                file.write("")

def setup_solution(day_number: str):
    """
    Sets up a solution for a given day number
    """
    directory_name = f"{NAMING_TEMPLATE}{day_number}"
    make_directory(directory_name)
    generate_files(directory_name)

if __name__ == "__main__":
    # Get the input file name
    day_number = sys.argv[1]
    setup_solution(day_number)