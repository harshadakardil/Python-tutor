import React from 'react';
import { PlayCircle, PauseCircle, SkipBack, SkipForward, RotateCcw } from 'lucide-react';
import { VisualizationControls, ExecutionStep } from '@/types';

interface ExecutionControlsProps extends Omit<VisualizationControls, 'onSliderChange'> {
  steps: ExecutionStep[];
  onSliderChange: (step: number) => void;
}

const ExecutionControls: React.FC<ExecutionControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  executionSpeed,
  steps,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  onSpeedChange,
  onSliderChange,
}) => {
  // Pre-convert values to strings for ARIA attributes

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm">
      {/* Progress Bar */}
      <div className="mb-4">
        <label htmlFor="step-slider" className="sr-only">
          Execution progress
        </label>
        <input
           id="step-slider"
           type="range"
           min={0}
           max={totalSteps - 1}
           value={currentStep}
           onChange={(e) => onSliderChange(Number(e.target.value))}
           className="w-full"
           aria-valuemin={0}                              // Changed from string to number
           aria-valuemax={totalSteps - 1}                 // Changed from string to number
           aria-valuenow={currentStep}                    // Changed from string to number
           aria-label={`Step ${currentStep + 1} of ${totalSteps}`}
         />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>Time: {steps[currentStep]?.timestamp ? new Date(steps[currentStep].timestamp).toLocaleTimeString() : '--:--:--'}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={onReset}
          disabled={currentStep === 0}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          aria-label="Reset execution"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={onStepBack}
          disabled={currentStep === 0}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          aria-label="Previous step"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          className="p-2 rounded hover:bg-gray-100"
          aria-label={isPlaying ? "Pause execution" : "Play execution"}
        >
          {isPlaying ? (
            <PauseCircle className="w-6 h-6" />
          ) : (
            <PlayCircle className="w-6 h-6" />
          )}
        </button>

        <button
          onClick={onStepForward}
          disabled={currentStep === totalSteps - 1}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          aria-label="Next step"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Speed Control */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <label htmlFor="speed-select" className="text-sm text-gray-500">
          Speed:
        </label>
        <select
          id="speed-select"
          value={executionSpeed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="border rounded px-2 py-1 text-sm"
          aria-label="Execution speed"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
        </select>
      </div>

      {/* Keyboard Controls Info */}
      <div className="mt-4 text-xs text-gray-400 text-center" role="note">
        Use arrow keys ← → for step control, space for play/pause
      </div>
    </div>
  );
};

export default ExecutionControls;