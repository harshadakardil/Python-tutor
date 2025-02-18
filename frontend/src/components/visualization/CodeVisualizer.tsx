// src/components/visualization/CodeVisualizer.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExecutionStep, MemoryState } from '@/types';

interface CodeVisualizerProps {
  code: string;
  steps: ExecutionStep[];
  currentStep: number;
  theme?: 'light' | 'dark';
}

const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ 
  code, 
  steps, 
  currentStep,
  theme = 'light' 
}) => {
  const codeLines = code.split('\n');
  const currentStepData = steps[currentStep];

  const renderMemoryState = (memoryState: MemoryState) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Stack Frames</h4>
        <div className="space-y-2">
          {memoryState.stack.map((frame, index) => (
            <div key={index} className="p-2 bg-gray-50 rounded">
              <div className="font-semibold">{frame.functionName}</div>
              <div className="text-sm">Line: {frame.lineNumber}</div>
              <div className="space-y-1">
                {Object.entries(frame.locals).map(([name, value]) => (
                  <div key={name} className="flex justify-between">
                    <span className="font-mono">{name}:</span>
                    <span className="font-mono">{JSON.stringify(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold mb-2">Heap</h4>
        <div className="p-2 bg-gray-50 rounded">
          {Object.entries(memoryState.heap).map(([address, value]) => (
            <div key={address} className="flex justify-between">
              <span className="font-mono">{address}:</span>
              <span className="font-mono">{JSON.stringify(value)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Code</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className={`p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'} rounded`}>
            {codeLines.map((line, index) => (
              <div
                key={index}
                className={`font-mono ${
                  currentStepData?.line === index 
                    ? theme === 'dark' 
                      ? 'bg-blue-900' 
                      : 'bg-blue-200'
                    : ''
                }`}
              >
                <span className="inline-block w-8 text-gray-500">{index + 1}</span>
                {line}
              </div>
            ))}
          </pre>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(currentStepData?.variables || {}).map(
                ([name, value]) => (
                  <div key={name} className="flex justify-between">
                    <span className="font-mono">{name}:</span>
                    <span className="font-mono">{JSON.stringify(value)}</span>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>

        {currentStepData?.memoryState && (
          <Card>
            <CardHeader>
              <CardTitle>Memory State</CardTitle>
            </CardHeader>
            <CardContent>
              {renderMemoryState(currentStepData.memoryState)}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className={`p-2 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100'} rounded`}>
              {currentStepData?.output || ''}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeVisualizer;