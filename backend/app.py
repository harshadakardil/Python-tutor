from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import openai
import json

app = Flask(__name__)
CORS(app)
load_dotenv()

class TutorConfig:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "")
        self.character = "friendly_teacher"
        self.difficulty = "beginner"

    def update_config(self, new_config):
        if 'api_key' in new_config:
            self.api_key = new_config['api_key']
        if 'character' in new_config:
            self.character = new_config['character']
        if 'difficulty' in new_config:
            self.difficulty = new_config['difficulty']

tutor_config = TutorConfig()

def get_tutor_response(prompt, character):
    try:
        openai.api_key = tutor_config.api_key
        character_prompts = {
            "friendly_teacher": "You are a friendly and patient teacher helping a child learn Python.",
            "robot": "You are RoboCode, an enthusiastic robot teacher who loves teaching Python.",
            "wizard": "You are CodeWizard, a magical teacher who explains Python with fun magical metaphors."
        }
        
        system_prompt = character_prompts.get(character, character_prompts["friendly_teacher"])
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=150
        )
        
        return response.choices[0].message['content']
    except Exception as e:
        return str(e)

@app.route('/api/configure', methods=['POST'])
def configure():
    config = request.json
    tutor_config.update_config(config)
    return jsonify({"status": "success"})

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data.get('prompt', '')
    character = data.get('character', tutor_config.character)
    
    response = get_tutor_response(prompt, character)
    return jsonify({"response": response})

@app.route('/api/lessons', methods=['GET'])
def get_lessons():
    lessons = [
        {
            "id": 1,
            "title": "Introduction to Python",
            "description": "Learn about Python and write your first program!",
            "difficulty": "beginner"
        },
        {
            "id": 2,
            "title": "Variables and Types",
            "description": "Learn about different types of data in Python",
            "difficulty": "beginner"
        },
        {
            "id": 3,
            "title": "Basic Operations",
            "description": "Learn how to do math with Python",
            "difficulty": "beginner"
        }
    ]
    return jsonify(lessons)

if __name__ == '__main__':
    app.run(debug=True)