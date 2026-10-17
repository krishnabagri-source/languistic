import type { Goal, Tone } from '../types';

export type ResponseSet = [string, string, string];

export const exampleResponseTemplates: Record<string, ResponseSet> = {
  fine: [
    'Could you tell me what you would prefer? I want to understand.',
    'I am not sure how to read that. What would you like to do?',
    'I want us both to have a say. Can we pause and decide together?',
  ],
  talk: [
    'Of course. Is there something specific you would like us to discuss?',
    'Sure. When would be a good time?',
    'Okay. Can you give me a little context so I know what to expect?',
  ],
  senior: [
    'I am still learning this. Could you point me to the part I should review?',
    'I had not encountered this process before. Can you clarify what I should know?',
    'I want to get this right. Please let me know which part I should revisit.',
  ],
  listen: [
    'I want to understand what has felt unheard. Could you share an example?',
    'I hear that you feel I have not listened. What would you like me to understand?',
    'I want to hear your concern. Can we talk about one specific moment?',
  ],
  contribution: [
    'I would like to understand what you need from me. Could we talk through the tasks?',
    'Can you share a specific example and what contribution would be helpful?',
    'I am open to discussing the workload. Let us agree on clear responsibilities.',
  ],
  earlier: [
    'I can see why the timing stood out. Can I explain what happened?',
    'I shared it later than you expected. What would have been a helpful time?',
    'I would like to explain my timing and hear what you needed from me.',
  ],
};

export const neutralFallbackResponses: ResponseSet = [
  'I want to understand your message. Could you tell me a little more?',
  'I am not sure how to read this. What did you mean?',
  'I am open to talking, and I would like us to keep it respectful.',
];

export const toneOpeners: Record<Tone, string> = {
  'Warm and understanding': 'I care about understanding this. ',
  'Calm and neutral': 'I would like to understand this clearly. ',
  'Clear and direct': 'I want to be direct. ',
  'Gentle but firm': 'I want to understand, and I also want to be clear. ',
  'Casual and natural': 'Hey, ',
};

export const goalAdditions: Record<Goal, string> = {
  'Understand the message.': 'I want to make sure I have understood you.',
  'Stop overthinking possible meanings.': 'A little more context would help me avoid guessing.',
  'Reply calmly and confidently.': 'I would like us to talk this through calmly.',
  'Express my feelings clearly.': 'I also want to share how this landed for me.',
  'Explain my point of view.': 'I would like to explain my side too.',
  'Set a respectful boundary.': 'I need us to keep this conversation respectful.',
  'Ask for clarification.': 'Could you clarify what you mean?',
  'Apologize or repair a misunderstanding.': 'If I have missed something, I am open to understanding and repairing it.',
  'Decline a request respectfully.': 'I appreciate you asking, but I am not able to agree to that.',
  'Prepare to start a difficult conversation.': 'Could we find a time that works for both of us?',
  'Decide whether I want to reply at all.': 'I may need some time before I decide what I want to say.',
};
