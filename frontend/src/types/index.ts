// src/types/index.ts

// Existing types
export type TutorCharacterType = 'friendly_teacher' | 'robot';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface TutorConfig {
  api_key?: string;
  character?: TutorCharacterType;
  difficulty?: DifficultyLevel;
  language?: string;
  interactiveMode?: boolean;
  theme?: 'light' | 'dark';
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  content: string;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  prompt: string;
  starterCode?: string;
  solution?: string;
  hints: string[];
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  code?: string;
}

// Updated CodeExecutionResult to include visualization data
export interface CodeExecutionResult {
  output: string;
  error?: string;
  success: boolean;
  steps?: ExecutionStep[];
  visualizationData?: VisualizationData;
}

export interface TutorCharacterProps {
  character: TutorCharacterType;
  name: string;
  description: string;
  onSelect: (character: TutorCharacterType) => void;
  isSelected: boolean;
}

// New types for code visualization
export interface ExecutionStep {
  line: number;
  variables: Record<string, any>;
  output: string;
  memoryState?: MemoryState;
  timestamp: number;
}

export interface MemoryState {
  heap: Record<string, any>;
  stack: StackFrame[];
}

export interface StackFrame {
  functionName: string;
  locals: Record<string, any>;
  lineNumber: number;
}

export interface VisualizationData {
  highlightedLines: number[];
  variableChanges: VariableChange[];
  outputUpdates: OutputUpdate[];
}

export interface VariableChange {
  name: string;
  oldValue: any;
  newValue: any;
  step: number;
}

export interface OutputUpdate {
  content: string;
  step: number;
  type: 'stdout' | 'stderr';
}

// Types for visualization controls
export interface VisualizationControls {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  executionSpeed: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBack: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
  onSliderChange: (step: number) => void;
}

// Types for code editor configuration
export interface CodeEditorConfig {
  theme?: 'light' | 'dark';
  fontSize?: number;
  lineNumbers?: boolean;
  highlightActiveLine?: boolean;
  enableLiveAutocompletion?: boolean;
  showInvisibles?: boolean;
  tabSize?: number;
}

// Types for execution settings
export interface ExecutionSettings {
  timeoutMs?: number;
  memoryLimitMB?: number;
  allowedModules?: string[];
  executionEnvironment?: 'sandboxed' | 'native';
}