// src/pages/LessonPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChatWindow } from '../components/ui/ChatWindow';
import { CodeEditor } from '../components/ui/CodeEditor';
import CodeVisualizer from '../components/visualization/CodeVisualizer';
import ExecutionControls from '../components/visualization/ExecutionControls';
import { Lesson, ExecutionStep, CodeEditorProps } from '../types';

export const LessonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [executionSteps, setExecutionSteps] = useState<ExecutionStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [executionSpeed, setExecutionSpeed] = useState(1);

  useEffect(() => {
    fetch(`/api/lessons/${id}`)
      .then(res => res.json())
      .then(data => {
        setLesson(data);
        setCode(data.starterCode || '');
      });
  }, [id]);

  const handleCodeExecution = async (code: string) => {
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      
      const result = await response.json();
      setExecutionSteps(result.steps);
      setCurrentStep(0);
      setIsPlaying(false);
    } catch (error) {
      console.error('Execution failed:', error);
    }
  };

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => setCurrentStep(0);
  const handleStepForward = () => {
    if (currentStep < executionSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && currentStep < executionSteps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000 / executionSpeed);
    } else if (currentStep >= executionSteps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, executionSpeed, executionSteps.length]);

  if (!lesson) return <div>Loading...</div>;

  const editorProps: CodeEditorProps = {
    initialCode: code,
    theme: 'light',
    fontSize: 14,
    lineNumbers: true,
    highlightActiveLine: true,
    enableLiveAutocompletion: true,
    onExecute: handleCodeExecution
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <ChatWindow />
          <CodeEditor {...editorProps} />
        </div>
        <div className="space-y-4">
          {executionSteps.length > 0 && (
            <>
              <CodeVisualizer
                code={code}
                steps={executionSteps}
                currentStep={currentStep}
                theme="light"
              />
              <ExecutionControls
                currentStep={currentStep}
                totalSteps={executionSteps.length}
                isPlaying={isPlaying}
                executionSpeed={executionSpeed}
                steps={executionSteps}
                onPlay={handlePlay}
                onPause={handlePause}
                onStepForward={handleStepForward}
                onStepBack={handleStepBack}
                onReset={handleReset}
                onSpeedChange={setExecutionSpeed}
                onSliderChange={setCurrentStep}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};