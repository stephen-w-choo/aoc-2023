from src.run_solution import run_solution
from src.io_utils import read_file_contents
import unittest

class MyTestCase(unittest.TestCase):
    def test_example(self):
        run_solution(
            input_file_name='test/sample-problem/input1.txt',
        )
        result = read_file_contents('test/sample-problem/solution1-output.txt')[0]

        expected_result = '72718'

        self.assertEqual(result, expected_result)

unittest.main()
