# aoc-2023
Solutions for AOC 2023 (plus helper utilities and scripts to generate boilerplate). Aiming to alternate between Python, Kotlin, TypeScript this year

## Generating templates

"Usage: python3 setup_solution.py <day_number> <py|ts|kt>"

eg "python3 setup_solution.py 3 kt"

setup_solution.py will generate templates and boilerplate for each day in either Python, TS or Kotlin. 

The TypeScript templates use the Bun runtime, so you'll need that installed if you want to use it.

The Kotlin templates will generate a .kts Kotlin scripting file, rather than a standard .kt - it can be run without needing to compile first

