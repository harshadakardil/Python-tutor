import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    MAX_CODE_EXECUTION_TIME = 5  # seconds
    ALLOWED_PYTHON_MODULES = ['math', 'random', 'datetime']