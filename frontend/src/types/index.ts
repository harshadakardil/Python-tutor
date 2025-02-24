// src/types/index.ts

// Character and Difficulty Types
export type TutorCharacterType = 'friendly_teacher' | 'robot' | 'wizard-mentor';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
export type ExecutionEnvironment = 'sandboxed' | 'native';
export type ThemeType = 'light' | 'dark';
export type OutputType = 'stdout' | 'stderr';

// Editor Props Interface
export interface CodeEditorProps {
  initialCode: string;
  theme?: ThemeType;
  fontSize?: number;
  lineNumbers?: boolean;
  highlightActiveLine?: boolean;
  enableLiveAutocompletion?: boolean;
  showInvisibles?: boolean;
  tabSize?: number;
  onExecute: (code: string) => Promise<void>;
}

// Base Configuration Interfaces
export interface TutorConfig {
  api_key?: string;
  character?: TutorCharacterType;
  difficulty?: DifficultyLevel;
  language?: string;
  interactiveMode?: boolean;
  theme?: ThemeType;
}

export interface CodeEditorConfig {
  theme?: ThemeType;
  fontSize?: number;
  lineNumbers?: boolean;
  highlightActiveLine?: boolean;
  enableLiveAutocompletion?: boolean;
  showInvisibles?: boolean;
  tabSize?: number;
  readOnly?: boolean;
  wrapEnabled?: boolean;
  minimapEnabled?: boolean;
  autoSave?: boolean;
}

export interface ExecutionSettings {
  timeoutMs?: number;
  memoryLimitMB?: number;
  allowedModules?: string[];
  executionEnvironment?: ExecutionEnvironment;
  maxIterations?: number;
  debugMode?: boolean;
}

// Content and Learning Interfaces
export interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  content: string;
  exercises: Exercise[];
  prerequisites?: string[];
  estimatedDuration?: number;
  tags?: string[];
  category?: string;
}

export interface Exercise {
  id: number;
  prompt: string;
  starterCode?: string;
  solution?: string;
  hints: string[];
  testCases?: TestCase[];
  timeLimit?: number;
  points?: number;
  category?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
  isHidden?: boolean;
}

// Chat and Response Interfaces
export interface ChatResponse {
  message: string;
  suggestions?: string[];
  code?: string;
  type?: 'hint' | 'explanation' | 'feedback' | 'solution';
  confidence?: number;
  timestamp?: number;
}

export interface TutorCharacterProps {
  character: TutorCharacterType;
  name: string;
  description: string;
  onSelect: (character: TutorCharacterType) => void;
  isSelected: boolean;
  avatar?: string;
  specialties?: string[];
  teachingStyle?: string;
}

// Code Execution and Visualization Interfaces
export interface CodeExecutionResult {
  output: string;
  error?: string;
  success: boolean;
  steps?: ExecutionStep[];
  visualizationData?: VisualizationData;
  executionTime?: number;
  memoryUsage?: number;
  testResults?: TestResult[];
}

export interface TestResult {
  passed: boolean;
  testCase: TestCase;
  actualOutput: string;
  executionTime: number;
}

export interface ExecutionStep {
  line: number;
  variables: Record<string, any>;
  output: string;
  memoryState?: MemoryState;
  timestamp: number;
  scope?: string;
  breakpoint?: boolean;
}

export interface MemoryState {
  heap: Record<string, any>;
  stack: StackFrame[];
  totalMemoryUsage?: number;
  garbageCollected?: boolean;
}

export interface StackFrame {
  functionName: string;
  locals: Record<string, any>;
  lineNumber: number;
  scope: string;
  returnValue?: any;
  arguments?: Record<string, any>;
}

// Visualization Interfaces
export interface VisualizationData {
  highlightedLines: number[];
  variableChanges: VariableChange[];
  outputUpdates: OutputUpdate[];
  memorySnapshots?: MemorySnapshot[];
  breakpoints?: number[];
}

export interface VariableChange {
  name: string;
  oldValue: any;
  newValue: any;
  step: number;
  scope?: string;
  type?: string;
}

export interface OutputUpdate {
  content: string;
  step: number;
  type: OutputType;
  timestamp?: number;
}

export interface MemorySnapshot {
  step: number;
  heapSize: number;
  stackSize: number;
  variables: Record<string, any>;
}

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
  onBreakpointToggle?: (line: number) => void;
  onSpeedPreset?: (preset: 'slow' | 'normal' | 'fast') => void;
}

// User Progress and Analytics
export interface UserProgress {
  lessonId: number;
  completed: boolean;
  score?: number;
  timeSpent: number;
  attempts: number;
  lastAttempt: Date;
}

export interface Analytics {
  userId: string;
  sessionId: string;
  lessonId: number;
  events: AnalyticsEvent[];
}

export interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data: Record<string, any>;
}