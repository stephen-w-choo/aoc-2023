from lib.io_utils import run_solution
from .mock_algorithm import solution
import unittest

class MyTestCase(unittest.TestCase):
    def test_example(self):
        result = run_solution(
            input_file_name='test/test-input.txt',
            solution_function=solution
        )

        expected_result = 72718

        self.assertEqual(result, expected_result)

unittest.main()
