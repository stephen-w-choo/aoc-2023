import requests
from dotenv import load_dotenv
import os

def load_aoc_data(day: int) -> str | None:
    if os.path.isfile('.env'):
        load_dotenv()
        COOKIE = os.environ.get("SESSION")
        print("Getting input from AOC")
        try:
            response = requests.get(
                f'https://adventofcode.com/2023/day/{day}/input',
                cookies={'session': COOKIE}
            )
            raw_data = response.content.decode('UTF-8')
            return raw_data
        except: 
            print("Failed to download input")