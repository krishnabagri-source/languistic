import type { AnalysisRequest, Scenario } from '../types';

export interface ExampleScenario {
  id: string;
  title: string;
  situation: Scenario;
  message: string;
  context: string;
  perceivedMeaning: string;
  conveyText: string;
  goal: AnalysisRequest['goal'];
  barriers: AnalysisRequest['barriers'];
  tag: string;
}

export const examples: ExampleScenario[] = [
  {
    id: 'fine', title: 'A short reply from a friend', situation: 'Friendship',
    message: 'Fine, do whatever you want.', context: 'We were deciding what to do this weekend and disagreed about the plan.',
    perceivedMeaning: 'I worry they might be upset, but I am not sure.',
    conveyText: 'I want to understand what they would prefer without making this bigger.',
    goal: 'Ask for clarification.', barriers: ['I am overthinking what the message means.', "I don't know how to start my reply."], tag: 'Friend reply',
  },
  {
    id: 'talk', title: 'An unexpected conversation', situation: 'Friendship',
    message: 'We need to talk.', context: 'A friend sent this without saying what they want to discuss.',
    perceivedMeaning: 'My mind is filling in the blanks and I feel uneasy.',
    conveyText: 'I would like a little context so I know what to expect.',
    goal: 'Ask for clarification.', barriers: ['I am overthinking what the message means.', 'I am afraid they might reject me.'], tag: 'Uncertainty',
  },
  {
    id: 'senior', title: 'Feedback from a senior', situation: 'Senior or mentor interaction',
    message: 'You should have known this already.', context: 'I asked a senior colleague to explain a process I had not used before.',
    perceivedMeaning: 'I am unsure if they are frustrated or just being brief.',
    conveyText: 'I want to ask for the information I need and keep learning.',
    goal: 'Explain my point of view.', barriers: ['I am afraid of being judged.', "I don't know how to express my feelings."], tag: 'Senior or mentor',
  },
  {
    id: 'listen', title: 'A family conversation', situation: 'Family',
    message: "I feel like you don't listen to me.", context: 'We had a disagreement about a decision that matters to both of us.',
    perceivedMeaning: 'They may feel unheard, though I may be missing context.',
    conveyText: 'I want to understand what they would like me to hear.',
    goal: 'Apologize or repair a misunderstanding.', barriers: ['I am worried about damaging the relationship.', "I don't know how to express my feelings."], tag: 'Feeling unheard',
  },
  {
    id: 'contribution', title: 'A teammate shares a concern', situation: 'Teamwork or internship',
    message: "I don't think you're contributing enough.", context: 'We are working together on a project with a deadline coming up.',
    perceivedMeaning: 'I want to know what they need from me specifically.',
    conveyText: 'I want to understand the specific concern and agree on clear next steps.',
    goal: 'Explain my point of view.', barriers: ['I am afraid the conversation will become an argument.', 'I am afraid of being judged.'], tag: 'Team project',
  },
  {
    id: 'earlier', title: 'A question about timing', situation: 'Conflict or misunderstanding',
    message: "Why didn't you tell me earlier?", context: 'I shared some information later than the other person expected.',
    perceivedMeaning: 'They may feel surprised or left out, but I do not know exactly why.',
    conveyText: 'I want to explain what happened and understand what they needed.',
    goal: 'Explain my point of view.', barriers: ['I am afraid the conversation will become an argument.', 'I am worried about damaging the relationship.'], tag: 'Timing',
  },
];
