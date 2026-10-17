export type Scenario =
  | 'Friendship'
  | 'Family'
  | 'Romantic relationship'
  | 'College or academics'
  | 'Senior or mentor interaction'
  | 'Teamwork or internship'
  | 'Conflict or misunderstanding'
  | 'Other';

export type Barrier =
  | 'I am afraid of being judged.'
  | 'I am afraid they might reject me.'
  | 'I am overthinking what the message means.'
  | "I don't know how to express my feelings."
  | 'I am afraid the conversation will become an argument.'
  | 'I find it difficult to say no or set boundaries.'
  | 'I am worried about damaging the relationship.'
  | "I don't know how to start my reply."
  | 'I am not sure what I am feeling.'
  | 'Something else.'
  | "I don't know yet.";

export type Goal =
  | 'Understand the message.'
  | 'Stop overthinking possible meanings.'
  | 'Reply calmly and confidently.'
  | 'Express my feelings clearly.'
  | 'Explain my point of view.'
  | 'Set a respectful boundary.'
  | 'Ask for clarification.'
  | 'Apologize or repair a misunderstanding.'
  | 'Decline a request respectfully.'
  | 'Prepare to start a difficult conversation.'
  | 'Decide whether I want to reply at all.';

export type Tone = 'Warm and understanding' | 'Calm and neutral' | 'Clear and direct' | 'Gentle but firm' | 'Casual and natural';
export type ReadinessChoice = 'I feel ready to respond.' | 'I want to edit my response.' | 'I would rather wait.' | 'I need more clarity first.';

export interface AnalysisRequest {
  message: string;
  exampleId?: string;
  situation?: Scenario;
  context?: string;
  perceivedMeaning?: string;
  barriers: Barrier[];
  goal?: Goal;
  conveyText: string;
  preferredTone: Tone;
}

export interface Interpretation {
  title: string;
  support: string;
  unknown: string;
}

export interface ResponseOption {
  id: string;
  label: string;
  text: string;
  variant: number;
}

export interface AnalysisResult {
  literalSummary: string;
  interpretations: Interpretation[];
  barrierReflection?: string;
  barrierExercise?: string;
  knownFacts: string[];
  guesses: string[];
  goalReflection: string;
  conveyText: string;
  responses: ResponseOption[];
  safetyFlag: boolean;
  matchedExampleId?: string;
}
