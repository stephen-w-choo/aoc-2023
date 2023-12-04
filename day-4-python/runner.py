def read_file_contents(file_path: str) -> list[str]:
    with open(file_path, "r") as file:
        return [line.strip() for line in file]

def write_file_contents(file_path: str, contents: list[str]):
    with open(file_path, "w") as file:
        for line in contents:
            file.write(line + "\n")

def run_solution(input_file_name, solution_function: callable): # type: ignore
    input_file = input_file_name

    input_data = read_file_contents(input_file)

    print(solution_function(input_data))