import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

const CHARACTERS = [
{ id: 'robot', name: 'Robo Teacher', emoji: '🤖' },
{ id: 'wizard', name: 'Code Wizard', emoji: '🧙‍♂️' },
{ id: 'scientist', name: 'Python Scientist', emoji: '👩‍🔬' }
];

function App() {
const [character, setCharacter] = useState(CHARACTERS[0]);
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
const [loading, setLoading] = useState(false);
const [apiKey, setApiKey] = useState('');
const [showConfig, setShowConfig] = useState(false);

const { register, handleSubmit } = useForm();

const askQuestion = async () => {
  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        question,
        character: character.id,
        apiKey: apiKey || undefined
      }),
    });
    const data = await response.json();
    setAnswer(data.answer);
  } catch (error) {
    setAnswer("Oops! Something went wrong. Let's try again!");
  }
  setLoading(false);
};

const onConfigSubmit = (data) => {
  setApiKey(data.apiKey);
  setShowConfig(false);
};

return (
  <div className="min-h-screen bg-gradient-to-b from-purple-100 to-blue-100 p-8">
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Python Buddy</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to Python Buddy - your friendly AI tutor that makes learning Python fun and easy! 
          Choose your favorite teacher character and start asking questions about Python programming.
        </p>
        <p className="text-md text-gray-600">
          Our AI tutors are designed to explain concepts in a way that's easy for kids to understand, 
          with fun examples and interactive challenges to help you learn better.
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Choose Your Teacher!</h2>
        <div className="flex gap-4 mb-6">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => setCharacter(char)}
              className={`flex-1 p-4 rounded-lg ${
                character.id === char.id 
                  ? 'bg-purple-100 border-2 border-purple-500' 
                  : 'bg-gray-50 hover:bg-purple-50'
              }`}
            >
              <div className="text-4xl mb-2">{char.emoji}</div>
              <div className="font-medium">{char.name}</div>
            </button>
          ))}
        </div>

        <div className="mb-4">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            {showConfig ? 'Hide API Configuration' : 'Configure API Key'}
          </button>
        </div>

        {showConfig && (
          <form onSubmit={handleSubmit(onConfigSubmit)} className="mb-6">
            <input
              {...register('apiKey')}
              type="password"
              placeholder="Enter your OpenAI API key"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save API Key
            </button>
          </form>
        )}

        <div className="space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything about Python! For example: How do I print 'Hello World'?"
            className="w-full p-4 border rounded-lg h-32 focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={askQuestion}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? "Thinking..." : `Ask ${character.name}!`}
          </button>
        </div>

        {answer && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{character.emoji}</div>
              <div className="flex-1">
                <div className="font-medium text-purple-800 mb-2">{character.name} says:</div>
                <div className="text-gray-700 whitespace-pre-wrap">{answer}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default App;