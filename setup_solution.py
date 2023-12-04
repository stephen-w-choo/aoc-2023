import os
import sys

NAMING_TEMPLATE = "day-"
LANGUAGE_NAMING_TEMPLATE = {
    "py": "python",
    "ts": "typescript",
    "kt": "kotlin"
}

PYTHON_TEMPLATE_FOLDER = "src/python_templates/"
PYTHON_TEMPLATE_FILE = "python_template.py"
PYTHON_RUNNER_FILE = "python_runner_template.py"
TS_TEMPLATE_FOLDER = "src/ts_templates/"
TS_TEMPLATE_FILE = "ts_template.ts"
TS_COMMON_FILE = "ts_common_template.ts"
KT_TEMPLATE_FOLDER = "src/kt_templates/"
KT_TEMPLATE_FILE = "kt_template.kts"

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

def generate_files_python(directory_name: str):
    # Make the files
    file_names = [
        "input.txt",
        "test-input.txt",
        "prompt.txt", 
        "solution1.py",    
        "solution2.py",
        "runner.py"
    ]
    
    python_template = read_template_file(PYTHON_TEMPLATE_FOLDER + PYTHON_TEMPLATE_FILE)
    python_runner_template = read_template_file(PYTHON_TEMPLATE_FOLDER + PYTHON_RUNNER_FILE)

    for file_name in file_names:
        with open(f"{directory_name}/{file_name}", "w") as file:
            if file_name.startswith("solution"):
                file.write(python_template)
            elif file_name.startswith("runner"): 
                file.write(python_runner_template)
            else:
                file.write("")

def generate_files_ts(directory_name: str):
    # Make the files
    file_names = [
        "input.txt",
        "test-input.txt",
        "prompt.txt", 
        "solution1.ts",    
        "solution2.ts",
        "common.ts"
    ]
    
    ts_template = read_template_file(TS_TEMPLATE_FOLDER + TS_TEMPLATE_FILE)
    ts_common_template = read_template_file(TS_TEMPLATE_FOLDER + TS_COMMON_FILE)

    for file_name in file_names:
        with open(f"{directory_name}/{file_name}", "w") as file:
            if file_name.startswith("solution"):
                file.write(ts_template)
            elif file_name.startswith("common"): 
                file.write(ts_common_template)
            else:
                file.write("")

def generate_files_kotlin(directory_name: str):
    # Make the files
    file_names = [
        "input.txt",
        "test-input.txt",
        "prompt.txt", 
        "solution1.kts",    
        "solution2.kts",
    ]
    
    kt_template = read_template_file(KT_TEMPLATE_FOLDER + KT_TEMPLATE_FILE)

    for file_name in file_names:
        with open(f"{directory_name}/{file_name}", "w") as file:
            if file_name.startswith("solution"):
                file.write(kt_template)
            else:
                file.write("")

def setup_solution(day_number: str, language: str):
    """
    Sets up a solution for a given day number
    """
    directory_name = f"{NAMING_TEMPLATE}{day_number}-{LANGUAGE_NAMING_TEMPLATE[language]}"
    make_directory(directory_name)
    if language == "py":
        generate_files_python(directory_name)
    if language == "ts":
        generate_files_ts(directory_name)
    if language == "kt":
        generate_files_kotlin(directory_name)

if __name__ == "__main__":
    # Get the input file name
    if len(sys.argv) != 3:
        raise ValueError("Usage: python3 setup_solution.py <day_number> <py|ts>")

    day_number, language = sys.argv[1], sys.argv[2]
    setup_solution(day_number, language)