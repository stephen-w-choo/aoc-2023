def read_file_contents(file_path: str) -> list[str]:
    with open(file_path, "r") as file:
        return [line.strip() for line in file]

def write_file_contents(file_path: str, contents: list[str]):
    with open(file_path, "w") as file:
        for line in contents:
            file.write(line + "\n")

def run_solution(output_file_name, solution_function: callable): # type: ignore
    input_file = "input.txt"
    output_file = output_file_name + "-output.txt"

    input_data = read_file_contents(input_file)
    solution_output = solution_function(input_data)

    print(solution_output)