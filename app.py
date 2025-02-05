from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

CHARACTER_PROMPTS = {
    'robot': "You are Robo Teacher, a friendly robot tutor. Explain Python concepts in a technical but fun way, using robot-themed analogies when possible. Keep responses clear and simple.",
    'wizard': "You are Code Wizard, a magical programming teacher. Explain Python concepts using magical analogies and spell-casting metaphors. Make learning feel magical and fun!",
    'scientist': "You are Python Scientist, a curious and enthusiastic researcher. Explain Python concepts using scientific experiments and real-world examples that children can relate to."
}

@app.route("/ask", methods=["POST"])
def ask():
    data = request.json
    user_input = data.get("question")
    character = data.get("character", "robot")
    custom_api_key = data.get("apiKey")
    
    if not user_input:
        return jsonify({"error": "No question provided"}), 400

    # Use custom API key if provided, otherwise use environment variable
    openai.api_key = custom_api_key or os.getenv("OPENAI_API_KEY")
    
    if not openai.api_key:
        return jsonify({"error": "OpenAI API key is required"}), 400

    try:
        character_prompt = CHARACTER_PROMPTS.get(character, CHARACTER_PROMPTS['robot'])
        
        response = openai.ChatCompletion.create(
            model="gpt-4",  # Update to your preferred model
            messages=[
                {"role": "system", "content": character_prompt},
                {"role": "user", "content": f"Explain this Python concept to a child: {user_input}"}
            ],
            temperature=0.7,
            max_tokens=300
        )
        
        answer = response.choices[0].message.content.strip()
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
