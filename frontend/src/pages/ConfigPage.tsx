import React, { useState } from 'react';
import { TutorCharacter } from '../components/ui/TutorCharacter';
import { apiClient } from '../api/client';
import { TutorCharacterType, DifficultyLevel } from '@/types';

export const ConfigPage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<TutorCharacterType>('friendly_teacher');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('beginner');

  const handleCharacterSelect = (character: string) => {
    setSelectedCharacter(character as TutorCharacterType);
  };

  const handleSave = async () => {
    try {
      await apiClient.updateConfig({
        api_key: apiKey,
        character: selectedCharacter,
        difficulty: difficulty,
      });
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Configuration</h1>
      
      <div className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="api-key" className="block text-sm font-medium mb-2">
            API Key
          </label>
          <input
            id="api-key"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your API key"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Choose Your Tutor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TutorCharacter
              character="friendly_teacher"
              name="Friendly Teacher"
              description="A patient and encouraging teacher"
              onSelect={handleCharacterSelect}
              isSelected={selectedCharacter === 'friendly_teacher'}
            />
            <TutorCharacter
              character="robot"
              name="RoboCode"
              description="An enthusiastic robot teacher"
              onSelect={handleCharacterSelect}
              isSelected={selectedCharacter === 'robot'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="difficulty-select" className="block text-sm font-medium mb-2">
            Difficulty Level
          </label>
          <select
            id="difficulty-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
            className="w-full p-2 border rounded"
            aria-label="Select difficulty level"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};