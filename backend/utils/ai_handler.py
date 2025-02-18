import openai
from config.settings import Config

class AIHandler:
    def __init__(self):
        self.api_key = Config.OPENAI_API_KEY
        openai.api_key = self.api_key

    def get_response(self, prompt, character_type="friendly_teacher"):
        try:
            characters = {
                "friendly_teacher": "You are a friendly and patient Python teacher.",
                "robot": "You are RoboCode, a fun robot teaching Python.",
                "wizard": "You are CodeWizard, teaching Python with magical metaphors."
            }
            
            system_prompt = characters.get(character_type, characters["friendly_teacher"])
            
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message['content']
        except Exception as e:
            return f"Error: {str(e)}"