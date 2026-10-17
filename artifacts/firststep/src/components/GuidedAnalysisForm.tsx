import { ArrowLeft, ArrowRight, Check, Compass, HeartHandshake, MessageCircle, ShieldCheck, X } from 'lucide-react';
import { examples } from '@/data/examples';
import type { Barrier, Goal, Scenario, Tone } from '@/types';

const scenarios: Scenario[] = ['Friendship', 'Family', 'Romantic relationship', 'College or academics', 'Senior or mentor interaction', 'Teamwork or internship', 'Conflict or misunderstanding', 'Other'];
const barriers: Barrier[] = [
  'I am afraid of being judged.', 'I am afraid they might reject me.', 'I am overthinking what the message means.',
  "I don't know how to express my feelings.", 'I am afraid the conversation will become an argument.',
  'I find it difficult to say no or set boundaries.', 'I am worried about damaging the relationship.',
  "I don't know how to start my reply.", 'I am not sure what I am feeling.', 'Something else.', "I don't know yet.",
];
const goals: Goal[] = [
  'Understand the message.', 'Stop overthinking possible meanings.', 'Reply calmly and confidently.',
  'Express my feelings clearly.', 'Explain my point of view.', 'Set a respectful boundary.',
  'Ask for clarification.', 'Apologize or repair a misunderstanding.', 'Decline a request respectfully.',
  'Prepare to start a difficult conversation.', 'Decide whether I want to reply at all.',
];
const tones: Tone[] = ['Warm and understanding', 'Calm and neutral', 'Clear and direct', 'Gentle but firm', 'Casual and natural'];

interface GuidedAnalysisFormProps {
  message: string;
  context: string;
  perceivedMeaning: string;
  conveyText: string;
  scenario?: Scenario;
  goal?: Goal;
  barriers: Barrier[];
  preferredTone: Tone;
  selectedExampleId?: string;
  loading: boolean;
  error: string;
  onMessageChange: (value: string) => void;
  onContextChange: (value: string) => void;
  onPerceivedMeaningChange: (value: string) => void;
  onConveyTextChange: (value: string) => void;
  onScenarioChange: (value?: Scenario) => void;
  onGoalChange: (value?: Goal) => void;
  onToggleBarrier: (barrier: Barrier) => void;
  onToneChange: (tone: Tone) => void;
  onSelectExample: (id: string) => void;
  onClearMessage: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function GuidedAnalysisForm(props: GuidedAnalysisFormProps) {
  const { message, context, perceivedMeaning, conveyText, scenario, goal, barriers: selectedBarriers, preferredTone, selectedExampleId, loading, error } = props;
  return (
    <main className="workspace page-enter">
      <div className="workspace-top"><button className="back-link" onClick={props.onBack} data-testid="button-back-home"><ArrowLeft size={15} /> Back to FirstStep</button><span className="workspace-label"><span className="eyebrow-dot" /> GUIDED WORKSPACE</span></div>
      <div className="workspace-heading"><span className="section-kicker">Take it one piece at a time</span><h1>What’s on your <em>mind?</em></h1><p>Every question is optional except the message. Skip anything that does not feel useful.</p></div>
      <div className="progress-line" aria-label="Step 1 of 2"><span className="progress-active" /><span /><i>01 / 02 &nbsp; MESSAGE + CONTEXT</i></div>
      <div className="work-grid">
        <div className="work-main">
          <section className="form-card message-card">
            <div className="form-card-heading"><span className="form-icon"><MessageCircle size={19} /></span><div><h2>What did the other person say?</h2><p>Share only what you feel comfortable sharing.</p></div><span className="required-label">REQUIRED</span></div>
            <label className="sr-only" htmlFor="message-input">What did the other person say?</label>
            <textarea id="message-input" className="message-input" maxLength={1200} value={message} onChange={(event) => props.onMessageChange(event.target.value)} placeholder="Paste the message you received. Share only what you feel comfortable sharing." data-testid="input-message" aria-describedby="message-count message-privacy" />
            <div className="textarea-footer"><span className="privacy-caption" id="message-privacy"><ShieldCheck size={14} /> Local demo analysis only; message text is not intentionally saved. Avoid identifying or highly sensitive details.</span><span id="message-count" className={message.length > 1100 ? 'counter counter-warn' : 'counter'} aria-live="polite">{message.length} / 1,200</span></div>
            <div className="examples-wrap"><span className="example-caption">OPTIONAL FICTIONAL EXAMPLES</span><div className="example-chips">{examples.map((example) => <button key={example.id} className={`example-chip ${selectedExampleId === example.id ? 'selected' : ''}`} aria-pressed={selectedExampleId === example.id} onClick={() => props.onSelectExample(example.id)} data-testid={`button-example-${example.id}`}>{example.tag}<span aria-hidden="true">+</span></button>)}</div></div>
            {!message && <p className="empty-guidance">Start with the words you received. You can add context later or keep it simple.</p>}
            {message && <button className="text-button clear-message" onClick={props.onClearMessage} data-testid="button-clear-message"><X size={14} /> Clear message</button>}
            {error && <p className="form-error" role="alert" data-testid="status-validation">{error}</p>}
          </section>
          <section className="form-card context-card">
            <div className="form-card-heading"><span className="form-icon context-form-icon"><Compass size={19} /></span><div><h2>Help us understand the context.</h2><p>Share only the details you think would help.</p></div><span className="optional-label">OPTIONAL</span></div>
            <fieldset className="selector-group"><legend>What is the situation?</legend><div className="choice-grid situation-grid">{scenarios.map((item) => <button type="button" className={`choice ${scenario === item ? 'choice-selected' : ''}`} aria-pressed={scenario === item} onClick={() => props.onScenarioChange(scenario === item ? undefined : item)} key={item} data-testid={`select-scenario-${item.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`}>{scenario === item && <Check size={13} />}{item}</button>)}</div></fieldset>
            <div className="field-pair">
              <div className="field-block"><label htmlFor="context-input">What happened before this message?</label><textarea id="context-input" value={context} onChange={(event) => props.onContextChange(event.target.value)} placeholder="Share a little background if you think it would help." rows={3} data-testid="input-context" /></div>
              <div className="field-block"><label htmlFor="meaning-input">What do you think the other person means?</label><textarea id="meaning-input" value={perceivedMeaning} onChange={(event) => props.onPerceivedMeaningChange(event.target.value)} placeholder="Tell us what you are worried they might mean, even if you are unsure." rows={3} data-testid="input-perceived-meaning" /></div>
            </div>
            <div className="field-block convey-field"><label htmlFor="convey-input">What do you want to convey to them?</label><textarea id="convey-input" value={conveyText} onChange={(event) => props.onConveyTextChange(event.target.value)} placeholder="Explain what you want them to understand about your feelings, needs, or point of view." rows={3} data-testid="input-convey-text" /></div>
          </section>
          <section className="form-card selector-card">
            <div className="form-card-heading"><span className="form-icon context-form-icon"><HeartHandshake size={19} /></span><div><h2>What is making this conversation difficult for you?</h2><p>Choose one or more if any feel relevant. It is okay to skip.</p></div><span className="optional-label">OPTIONAL</span></div>
            <fieldset className="selector-group"><legend className="sr-only">Communication barriers</legend><div className="barrier-selector">{barriers.map((item, index) => <button type="button" className={`barrier-option ${selectedBarriers.includes(item) ? 'barrier-selected' : ''}`} aria-pressed={selectedBarriers.includes(item)} onClick={() => props.onToggleBarrier(item)} key={item} data-testid={`select-barrier-${index}`}><span className="barrier-checkbox" aria-hidden="true">{selectedBarriers.includes(item) && <Check size={12} />}</span><span>{item}</span></button>)}</div></fieldset>
          </section>
          <section className="form-card selector-card">
            <div className="form-card-heading"><span className="form-icon"><ArrowRight size={18} /></span><div><h2>What do you want help with?</h2><p>Choose one goal. There is no need to solve everything at once.</p></div><span className="optional-label">OPTIONAL</span></div>
            <fieldset className="selector-group"><legend className="sr-only">Primary communication goal</legend><div className="choice-grid goal-grid">{goals.map((item, index) => <button type="button" className={`choice ${goal === item ? 'choice-selected' : ''}`} aria-pressed={goal === item} onClick={() => props.onGoalChange(goal === item ? undefined : item)} key={item} data-testid={`select-goal-${index}`}>{goal === item && <Check size={13} />}{item}</button>)}</div></fieldset>
            <fieldset className="selector-group tone-fieldset"><legend>What tone feels most like you?</legend><div className="choice-grid tone-grid">{tones.map((item) => <button type="button" className={`choice ${preferredTone === item ? 'choice-selected' : ''}`} aria-pressed={preferredTone === item} onClick={() => props.onToneChange(item)} key={item} data-testid={`select-input-tone-${item.toLowerCase().replaceAll(/[^a-z]+/g, '-')}`}>{preferredTone === item && <Check size={13} />}{item}</button>)}</div></fieldset>
          </section>
          <div className="submit-row"><span>Prototype · No real AI or message sending</span><button className="button button-primary" disabled={!message.trim() || loading} onClick={props.onSubmit} data-testid="button-analyze">{loading ? <><span className="loading-dot" /> Taking a moment…</> : <>Help me find clarity <ArrowRight size={17} /></>}</button></div>
        </div>
        <aside className="workspace-aside">
          <div className="aside-note"><span className="aside-icon"><ShieldCheck size={18} /></span><h3>A note on information</h3><p>This prototype uses local demonstration logic and does not connect to a real AI service. Message text is not intentionally saved. Avoid names or highly sensitive details.</p></div>
          <div className="aside-note aside-soft"><span className="aside-icon"><HeartHandshake size={18} /></span><h3>You can pause</h3><p>You don’t owe anyone an immediate reply. You can leave, take a breath, or come back when it feels right.</p></div>
          <div className="aside-fine">FirstStep supports communication and reflection. It is not therapy, diagnosis, or emergency support.</div>
        </aside>
      </div>
    </main>
  );
}
