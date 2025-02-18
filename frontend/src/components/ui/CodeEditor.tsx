import React, { useState, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CodeExecutionResult } from '@/types';
import { apiClient } from '@/api/client';
import CodeVisualizer from '../visualization/CodeVisualizer';
import ExecutionControls from '../visualization/ExecutionControls';

interface CodeEditorProps {
  initialCode?: string;
  onExecutionComplete?: (result: CodeExecutionResult) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '# Write your Python code here\n',
  onExecutionComplete,
}) => {
  const [code, setCode] = useState<string>(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [executionSteps, setExecutionSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executionSpeed, setExecutionSpeed] = useState(1);

  const runCode = useCallback(async () => {
    setIsExecuting(true);
    setError(null);
    setOutput('Executing code...');
    setExecutionSteps([]);

    try {
      const result = await apiClient.executeCode(code);
      setOutput(result.output);
      if (result.error) {
        setError(result.error);
      } else if (result.steps) {
        setExecutionSteps(result.steps);
      }
      onExecutionComplete?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      setOutput('');
    } finally {
      setIsExecuting(false);
    }
  }, [code, onExecutionComplete]);

  // Handle visualization playback
  useEffect(() => {
    let playbackTimer: NodeJS.Timeout;
    
    if (isPlaying && currentStep < executionSteps.length - 1) {
      playbackTimer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / executionSpeed);
    } else if (currentStep >= executionSteps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (playbackTimer) {
        clearTimeout(playbackTimer);
      }
    };
  }, [isPlaying, currentStep, executionSteps.length, executionSpeed]);

  return (
    <Card className="p-4 h-[600px] flex flex-col">
      <div className="flex-1 mb-4">
        <label htmlFor="code-input" className="sr-only">
          Python Code Editor
        </label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full p-2 font-mono text-sm border rounded focus:ring-2 focus:ring-blue-500"
          aria-label="Python code editor"
          placeholder="Write your Python code here"
          disabled={isExecuting}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={runCode}
          disabled={isExecuting}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          aria-label="Run Python code"
        >
          {isExecuting ? 'Running...' : 'Run Code'}
        </button>
      </div>

      {executionSteps.length > 0 && (
        <>
          <CodeVisualizer
            code={code}
            steps={executionSteps}
            currentStep={currentStep}
          />
          <ExecutionControls
            currentStep={currentStep}
            totalSteps={executionSteps.length}
            isPlaying={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onStepForward={() => setCurrentStep(prev => Math.min(executionSteps.length - 1, prev + 1))}
            onStepBack={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            onReset={() => setCurrentStep(0)}
            onSpeedChange={setExecutionSpeed}
            onSliderChange={setCurrentStep}
            executionSpeed={executionSpeed}
            steps={executionSteps}
          />
        </>
      )}

      <div
        className={`h-32 p-2 rounded overflow-auto font-mono text-sm ${
          error ? 'bg-red-50' : 'bg-gray-100'
        }`}
        role="log"
        aria-label="Code output"
        aria-live="polite"
      >
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="text-gray-800">{output}</div>
        )}
      </div>
    </Card>
  );
};

export default CodeEditor;