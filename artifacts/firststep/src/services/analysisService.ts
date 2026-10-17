import { examples } from '@/data/examples';
import { exampleResponseTemplates, goalAdditions, neutralFallbackResponses, toneOpeners } from '@/data/responseTemplates';
import type { AnalysisRequest, AnalysisResult, Barrier, Interpretation, ResponseOption, Tone } from '@/types';

export interface AnalysisService {
  analyze(input: AnalysisRequest): Promise<AnalysisResult>;
  createResponses(input: AnalysisRequest, tone: Tone, revision: number): ResponseOption[];
}

type ExampleId = (typeof examples)[number]['id'];
type ResponseSet = [string, string, string];
const safetyPattern = /\b(?:threat\w*|afraid for (?:my|our) safety|scared for (?:my|our) safety|(?:afraid|scared) of (?:him|her|them|someone)|(?:afraid|scared) (?:they|he|she|someone) (?:might|may|could|will) (?:hurt|harm|kill|attack|force)|unsafe|not safe|in danger|dangerous|hurt\w* (?:me|you)|harm\w* (?:me|you)|hit me|attacked me|force\w* (?:me|you)|coerc\w*|kill\w* (?:me|you)|following me|stalking me|won't let me leave|can't leave|cannot leave|controlling me|trapped|put (?:me|you) at risk)\b/i;

const exampleAnalysis: Record<ExampleId, Interpretation[]> = {
  fine: [
    { title: 'One possibility is frustration about the disagreement', support: 'The reply is short and follows a disagreement in your example context.', unknown: 'We cannot tell whether they are upset, tired, or simply ending the discussion.' },
    { title: 'They may be leaving the decision to you', support: '“Do whatever you want” can sometimes signal a preference to step back.', unknown: 'It is unclear whether that is genuine agreement or reluctance.' },
  ],
  talk: [
    { title: 'They may want to discuss something important', support: 'The message signals a conversation but gives no subject.', unknown: 'The topic and urgency are not stated; many possibilities remain.' },
    { title: 'They may be trying to find a time to talk', support: 'This phrase can also be a simple opening to a conversation.', unknown: 'We do not know whether the subject is serious or routine.' },
  ],
  senior: [
    { title: 'They may expect prior familiarity', support: 'The phrase refers to what they think you should already know.', unknown: 'We do not know what expectations were agreed or how the message was intended.' },
    { title: 'They may be responding in a rushed or blunt way', support: 'The message is short and does not offer an explanation.', unknown: 'We cannot know their tone or whether they would clarify if asked.' },
  ],
  listen: [
    { title: 'They may feel unheard in this moment', support: 'They directly describe feeling that listening is missing.', unknown: 'We do not know what would help them feel heard or which specific moment they have in mind.' },
    { title: 'They may be emphasizing an important concern', support: 'The wording names their experience directly.', unknown: '“I feel like” may reflect a current feeling, not a complete account of your relationship.' },
  ],
  contribution: [
    { title: 'They may be asking for a more balanced contribution', support: 'They name a concern about contribution to the work.', unknown: 'They have not specified which tasks, expectations, or examples they have in mind.' },
    { title: 'They may be feeling pressure about the shared work', support: 'A workload or deadline could be part of this situation.', unknown: 'We cannot tell what has led them to this view without more detail.' },
  ],
  earlier: [
    { title: 'They may be surprised by when they learned this', support: 'The question focuses on timing.', unknown: 'We do not know what they expected, or what affected when you shared it.' },
    { title: 'They may want to understand the delay', support: 'The wording asks why they were not told sooner.', unknown: 'We cannot know whether they feel hurt, confused, or simply want context.' },
  ],
};

const genericInterpretations: Interpretation[] = [
  { title: 'The message may be communicating a concern or request', support: 'The words themselves are the clearest evidence available.', unknown: 'Without more context, the intended meaning and tone are uncertain.' },
  { title: 'There may be more than one way to read this', support: 'Written messages can leave tone and background out.', unknown: 'A simple, open question may reveal what they meant.' },
];

const barrierGuidance: Partial<Record<Barrier, { reflection: string; exercise: string }>> = {
  'I am afraid of being judged.': { reflection: 'Fear of being judged can make it difficult to say what you really mean. You do not have to find perfect words before you begin.', exercise: 'Try writing one sentence you would say if you did not need it to be perfect.' },
  'I am afraid they might reject me.': { reflection: 'Worry about rejection can make reaching out feel like a bigger risk. You can choose a small, honest first step and decide what feels okay for you.', exercise: 'Name one thing you can control in this conversation, and one thing that belongs to the other person.' },
  'I am overthinking what the message means.': { reflection: 'When a message feels unclear, your mind may generate several explanations. Try separating what you know from what you are guessing.', exercise: 'Write one observable fact and one question you could ask instead of settling on a guess.' },
  "I don't know how to express my feelings.": { reflection: 'It can take time to find words for a feeling. You can start with what happened and how it affected you, without needing a perfect explanation.', exercise: 'Complete this privately: “When I read that, I felt… because…”' },
  'I am afraid the conversation will become an argument.': { reflection: 'You can be clear about your feelings without making the conversation hostile. It is also okay to pause before responding.', exercise: 'Choose a calm opening sentence and a pause you can take if the conversation becomes too much.' },
  'I find it difficult to say no or set boundaries.': { reflection: 'A boundary can be respectful and still be clear. You do not have to over-explain or agree to something that does not feel right.', exercise: 'Try a short practice sentence: “I’m not able to do that, but I can…”' },
  'I am worried about damaging the relationship.': { reflection: 'Caring about a relationship can make honesty feel complicated. You can be considerate without taking responsibility for every possible reaction.', exercise: 'Write down what you hope to preserve and what you still need to say.' },
  "I don't know how to start my reply.": { reflection: 'Starting can be the hardest part. A simple question or statement of what you understood is enough to begin.', exercise: 'Draft just the first line: “I want to understand…” or “Could you clarify…”' },
  'I am not sure what I am feeling.': { reflection: 'Not having a clear label yet is okay. You can notice what stands out without deciding exactly what you feel.', exercise: 'Pause and name one thing you notice in yourself, or skip labeling it for now.' },
  'Something else.': { reflection: 'There may be something specific making this conversation harder for you. You do not have to explain it before you are ready.', exercise: 'Ask yourself privately: “What would make the next step feel a little easier?”' },
  "I don't know yet.": { reflection: 'You do not have to know what is making this difficult right now. Taking time to understand your own response is a valid step.', exercise: 'Try a pause: what feels known, and what can wait until later?' },
};

function getMatchedExample(input: AnalysisRequest): ExampleId | undefined {
  const normalized = input.message.trim().toLocaleLowerCase();
  if (input.exampleId) {
    const selected = examples.find((example) => example.id === input.exampleId);
    if (selected && normalized === selected.message.toLocaleLowerCase()) return selected.id;
  }
  return examples.find((example) => normalized === example.message.toLocaleLowerCase())?.id;
}

function generateResponses(input: AnalysisRequest, tone: Tone, revision: number): ResponseOption[] {
  if (safetyPattern.test([input.message, input.context ?? '', input.perceivedMeaning ?? '', input.conveyText].join(' '))) {
    const safeOptions: ResponseSet = [
      'You do not have to reply right now. You can take time before deciding what feels safe.',
      'I am not ready to continue this conversation now. I will reach out if and when I choose.',
      'I am going to check in with someone I trust before deciding what to do.',
    ];
    return safeOptions.map((text, index) => ({
      id: `safety-pause-${revision}-${index}`,
      label: ['Pause without replying', 'A brief pause (only if safe)', 'Reach out for trusted support'][index],
      text,
      variant: revision,
    }));
  }
  const matchedId = getMatchedExample(input);
  const templates: ResponseSet = matchedId ? exampleResponseTemplates[matchedId] : neutralFallbackResponses;
  const rotation = revision % templates.length;
  const goalAddition = input.goal ? ` ${goalAdditions[input.goal]}` : '';
  const toneOpening = toneOpeners[tone];
  const optionLabels = ['Gentle and empathetic', 'Clear and direct', 'Firm but respectful'];
  return templates.map((template, index) => {
    const selected = templates[(index + rotation) % templates.length];
    return {
      id: `${matchedId ?? 'neutral'}-${tone}-${revision}-${index}`,
      label: optionLabels[index],
      text: `${toneOpening}${selected}${goalAddition}`.trim(),
      variant: revision,
    };
  });
}

function buildSafetyText(input: AnalysisRequest): string {
  return [input.message, input.context ?? '', input.perceivedMeaning ?? '', input.conveyText].join(' ');
}

export const analysisService: AnalysisService = {
  async analyze(input) {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    const message = input.message.trim();
    const context = input.context?.trim() ?? '';
    const perceivedMeaning = input.perceivedMeaning?.trim() ?? '';
    const matchedExampleId = getMatchedExample(input);
    const example = examples.find((item) => item.id === matchedExampleId);
    const interpretations = matchedExampleId ? exampleAnalysis[matchedExampleId] : genericInterpretations;
    const contextualInterpretations = perceivedMeaning
      ? interpretations.map((interpretation, index) => index === 0
        ? { ...interpretation, support: `${interpretation.support} Your own reading is “${perceivedMeaning},” which is worth considering as your perspective, not as confirmation.` }
        : interpretation)
      : interpretations;
    const literalSummary = message.length > 150
      ? `The message says: “${message.slice(0, 147).trim()}…”`
      : `The message says: “${message}”`;
    const knownFacts = [literalSummary];
    if (context) knownFacts.push(`You shared this context: “${context}”`);
    if (input.situation) knownFacts.push(`You selected the situation: ${input.situation}.`);
    const guesses = contextualInterpretations.map((item) => item.title);
    if (perceivedMeaning) guesses.push(`Your possible reading: “${perceivedMeaning}” (not confirmed).`);
    const selectedGuidance = input.barriers.map((barrier) => barrierGuidance[barrier]).filter((item): item is { reflection: string; exercise: string } => Boolean(item));
    const safetyFlag = safetyPattern.test(buildSafetyText(input));

    return {
      literalSummary,
      interpretations: contextualInterpretations,
      barrierReflection: selectedGuidance.length ? selectedGuidance.map((item) => item.reflection).join(' ') : undefined,
      barrierExercise: selectedGuidance[0]?.exercise,
      knownFacts,
      guesses,
      goalReflection: input.goal
        ? `You said you want help to: ${input.goal}${input.situation ? ` In the context you selected (${input.situation.toLowerCase()}), your own history matters more than any template.` : ''}`
        : 'You have not selected a goal. You can take time, ask for clarification, or choose not to reply.',
      conveyText: input.conveyText,
      responses: generateResponses(input, input.preferredTone, 0),
      safetyFlag,
      matchedExampleId: example?.id,
    };
  },
  createResponses: generateResponses,
};
