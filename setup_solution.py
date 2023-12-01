import os
import sys

NAMING_TEMPLATE = "day-"

# Make a directory for a given number

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
        "prompt1.txt", 
        "prompt2.txt", 
        "input1.txt", 
        "input2.txt",
        "solution1.py",    
        "solution2.py"
    ]
    for file_name in file_names:
        with open(f"{directory_name}/{file_name}", "w") as file:
            if file_name.startswith("solution"):
                file.write("def solution(input: list[str]) -> str:\n")
                file.write("    pass\n")
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