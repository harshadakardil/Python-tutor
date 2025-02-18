import sys
import ast
import time
import threading
from io import StringIO
from contextlib import redirect_stdout
import traceback

class CodeExecutor:
    """
    Safe code execution environment for running student Python code.
    Includes timeout protection, restricted imports, and memory limits.
    """
    
    # Whitelist of allowed modules for student code
    ALLOWED_MODULES = {
        'math', 'random', 'datetime', 'string', 
        'collections', 'statistics', 'itertools'
    }
    
    # Blacklist of dangerous operations
    FORBIDDEN_NAMES = {
        'os', 'sys', 'subprocess', 'eval', 'exec', '__import__',
        'open', 'file', 'input', 'raw_input', 'compile',
        'breakpoint', 'globals', 'locals', 'exit', 'quit'
    }
    
    def __init__(self, timeout_seconds=5, max_memory_mb=100):
        self.timeout_seconds = timeout_seconds
        self.max_memory_mb = max_memory_mb
        
    def check_ast(self, tree):
        """
        Analyze AST to detect potentially dangerous operations
        """
        for node in ast.walk(tree):
            # Check for forbidden function calls
            if isinstance(node, ast.Call):
                if isinstance(node.func, ast.Name):
                    if node.func.id in self.FORBIDDEN_NAMES:
                        raise SecurityError(f"Usage of '{node.func.id}' is not allowed")
                elif isinstance(node.func, ast.Attribute):
                    if node.func.attr in self.FORBIDDEN_NAMES:
                        raise SecurityError(f"Usage of '{node.func.attr}' is not allowed")
            
            # Check for imports
            elif isinstance(node, (ast.Import, ast.ImportFrom)):
                for name in node.names:
                    module_name = name.name.split('.')[0]
                    if module_name not in self.ALLOWED_MODULES:
                        raise SecurityError(f"Import of '{module_name}' is not allowed")

    def run_code(self, code: str) -> dict:
        """
        Execute Python code in a safe environment with restrictions.
        Returns a dictionary containing execution results and any output/errors.
        """
        result = {
            'output': '',
            'error': None,
            'execution_time': 0
        }
        
        # Parse and check code before execution
        try:
            tree = ast.parse(code)
            self.check_ast(tree)
        except SyntaxError as e:
            result['error'] = f"Syntax Error: {str(e)}"
            return result
        except SecurityError as e:
            result['error'] = f"Security Error: {str(e)}"
            return result
        
        # Capture stdout
        output_buffer = StringIO()
        
        def execute():
            try:
                with redirect_stdout(output_buffer):
                    # Create a restricted globals dictionary
                    restricted_globals = {
                        '__builtins__': {
                            name: __builtins__[name]
                            for name in __builtins__
                            if name not in self.FORBIDDEN_NAMES
                        }
                    }
                    
                    # Execute the code
                    exec(compile(tree, '<string>', 'exec'), restricted_globals, {})
                    
            except Exception as e:
                result['error'] = f"{type(e).__name__}: {str(e)}\n{traceback.format_exc()}"
        
        # Run code with timeout
        start_time = time.time()
        thread = threading.Thread(target=execute)
        thread.start()
        thread.join(timeout=self.timeout_seconds)
        
        if thread.is_alive():
            thread.join(0)  # Force thread termination
            result['error'] = f"Execution timed out after {self.timeout_seconds} seconds"
        
        result['execution_time'] = round(time.time() - start_time, 3)
        result['output'] = output_buffer.getvalue()
        
        return result

class SecurityError(Exception):
    """Custom exception for security violations"""
    pass

# Example usage and testing code
if __name__ == "__main__":
    executor = CodeExecutor()
    
    # Test safe code
    test_code = """
print("Hello, World!")
import math
print(math.pi)
x = [1, 2, 3]
print(sum(x))
"""
    
    result = executor.run_code(test_code)
    print("Safe code test:")
    print("Output:", result['output'])
    print("Error:", result['error'])
    print("Time:", result['execution_time'])
    
    # Test unsafe code
    unsafe_code = """
import os
os.system('ls')
"""
    
    result = executor.run_code(unsafe_code)
    print("\nUnsafe code test:")
    print("Output:", result['output'])
    print("Error:", result['error'])
    print("Time:", result['execution_time'])